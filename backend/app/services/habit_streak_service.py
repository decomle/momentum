from datetime import date, datetime
from uuid import UUID
from typing import List
from zoneinfo import ZoneInfo

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models import HabitPeriod
from app.services import BaseService


class HabitStreakService(BaseService):

    async def evaluate(self, habit_id: UUID, timezone: str) -> tuple[int, int]:
        user_today = datetime.now(ZoneInfo(timezone)).date()
        stmt = (
            select(HabitPeriod)
            .where(
                HabitPeriod.habit_id == habit_id,
                HabitPeriod.end_date < user_today
            )
            .order_by(HabitPeriod.start_date.asc())
        )

        result = await self.db.execute(stmt)
        periods: List[HabitPeriod] = result.scalars().all()

        if not periods:
            return 0, 0

        longest_streak = 0
        current_run = 0

        for period in periods:
            if period.is_successful:
                current_run += 1
                longest_streak = max(longest_streak, current_run)
            else:
                current_run = 0

        current_streak = 0
        for period in reversed(periods):
            if period.is_successful:
                current_streak += 1
            else:
                break

        return current_streak, longest_streak