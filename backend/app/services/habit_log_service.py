from datetime import datetime, timedelta
from zoneinfo import ZoneInfo
from sqlalchemy import select

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