import uuid

from math import ceil
from datetime import date, datetime, timedelta
from zoneinfo import ZoneInfo
from sqlalchemy import desc, func, select

from app.services import BaseService
from app.db.models import Habit
from app.db.models import HabitLog
from app.exceptions.types import NotFoundError, LoggingWindowExpiredError
from app.schemas.habit_log import HabitLogCreate
from app.services.habit_period_service import HabitPeriodService
from app.services.habit_streak_service import HabitStreakService


class HabitLogService(BaseService):
    def __init__(self, db):
        super().__init__(db)
        self.habit_period_service = HabitPeriodService(db)
        self.habit_streak_service = HabitStreakService(db)
    
    async def create_log(self, user_id, habit_id, timezone, payload: HabitLogCreate):
        user_today = datetime.now(ZoneInfo(timezone)).date()

        allowed_dates = {
            user_today,
            user_today - timedelta(days=1),
            user_today - timedelta(days=2),
        }

        if payload.log_date not in allowed_dates:
            raise LoggingWindowExpiredError("You can only log for today and the past 2 days")
        
        habit = await self._get_habit(user_id, habit_id)

        if not habit:
            raise NotFoundError("Habit not found")

        log = HabitLog(
            user_id=user_id,
            habit=habit,
            log_date=payload.log_date,
            mood_score=payload.mood_score,
            remark=payload.remark,
        )

        self.db.add(log)
        await self.db.flush()

        await self.habit_period_service.upsert_for_log(habit, user_id, payload.log_date)
        current_streak, longest_streak = await self.habit_streak_service.evaluate(habit.id, timezone)
        habit.current_streak = current_streak
        habit.longest_streak = longest_streak

        return log

    async def get_logs(
        self,
        user_id: uuid.UUID,
        habit_id: uuid.UUID,
        from_date: date | None = None,
        to_date: date | None = None,
        page: int = 1,
        page_size: int = 20,
    ):
        page = max(page, 1)
        page_size = max(min(page_size, 100), 1)
        offset = (page - 1) * page_size

        base_query = select(HabitLog).where(
            HabitLog.user_id == user_id,
            HabitLog.habit_id == habit_id,
        )
        count_query = select(func.count()).where(
            HabitLog.user_id == user_id,
            HabitLog.habit_id == habit_id,
        )

        if from_date:
            base_query = base_query.where(HabitLog.log_date >= from_date)
            count_query = count_query.where(HabitLog.log_date >= from_date)

        if to_date:
            base_query = base_query.where(HabitLog.log_date <= to_date)
            count_query = count_query.where(HabitLog.log_date <= to_date)

        
        total_result = await self.db.execute(count_query)
        total = total_result.scalar_one()

        query = (
            base_query
            .order_by(desc(HabitLog.log_date))
            .offset(offset)
            .limit(page_size)
        )

        result = await self.db.execute(query)
        logs = result.scalars().all()

        total_pages = ceil(total / page_size) if total > 0 else 0

        return {
            "items": logs,
            "meta": {
                "total": total,
                "page": page,
                "size": page_size,
                "total_pages": total_pages,
            }
        }

    async def _get_habit(self, user_id, habit_id) -> Habit | None:
        result = await self.db.execute(
            select(Habit).where(
                Habit.id == habit_id,
                Habit.user_id == user_id,
            )
        )
        return result.scalar_one_or_none()