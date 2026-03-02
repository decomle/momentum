import uuid

from math import ceil
from datetime import date, datetime, timedelta
from zoneinfo import ZoneInfo
from sqlalchemy import desc, func, select

from app.services.base_service import BaseService
from app.db.models import Habit
from app.db.models import HabitLog
from app.exceptions.types import NotFoundError, LoggingWindowExpiredError
from app.schemas.habit_log import HabitLogCreate


class HabitLogService(BaseService):
    
    async def create_log(self, user_id, habit_id, timezone, payload: HabitLogCreate):
        user_today = datetime.now(ZoneInfo(timezone)).date()
        allowed_dates = {
            user_today,
            user_today - timedelta(days=1),
            user_today - timedelta(days=2),
        }

        if payload.log_date not in allowed_dates:
            raise LoggingWindowExpiredError("You can only log for today and the past 2 days")

        result = await self.db.execute(
            select(Habit).where(
                Habit.id == habit_id,
                Habit.user_id == user_id
            )
        )
        habit = result.scalar_one_or_none()

        if not habit:
            raise NotFoundError("Habit not found")

        log = HabitLog(
            user_id=user_id,
            habit_id=habit_id,
            log_date=payload.log_date,
            mood_score=payload.mood_score,
            remark=payload.remark,
        )

        self.db.add(log)
        await self.db.flush()

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
        offset = (page - 1) * page_size

        base_query = select(HabitLog).where(
            HabitLog.user_id == user_id,
            HabitLog.habit_id == habit_id,
        )

        if from_date:
            base_query = base_query.where(HabitLog.log_date >= from_date)

        if to_date:
            base_query = base_query.where(HabitLog.log_date <= to_date)

        # Count total (optional but recommended)
        count_query = select(func.count()).select_from(base_query.subquery())
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

        total_pages = ceil(total / page_size) if total > 0 else 1

        return {
            "items": logs,
            "meta": {
                "total": total,
                "page": page,
                "size": page_size,
                "total_pages": total_pages,
            }
        }