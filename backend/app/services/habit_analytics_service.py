from datetime import date, timedelta
from typing import List
from uuid import UUID
from sqlalchemy import select

from app.core.translator import t
from app.db.models import HabitLog
from app.services import BaseService


class HabitAnalyticsService(BaseService):

    async def calculate_streak(self, user_id: UUID, habit_id: UUID) -> int:
        """
        Returns:
        -1 → habit has no logs yet
         0 → streak broken (no log today)
        >=1 → active streak
        """

        today = date.today()

        stmt = (
            select(HabitLog.log_date)
            .where(
                HabitLog.user_id == user_id,
                HabitLog.habit_id == habit_id,
            )
            .order_by(HabitLog.log_date.desc())
        )

        result = await self.db.execute(stmt)
        log_dates: List[date] = result.scalars().all()

        # Special state: no logs at all
        if not log_dates:
            return -1

        streak = 0
        expected_date = today

        for log_date in log_dates:
            if log_date == expected_date:
                streak += 1
                expected_date -= timedelta(days=1)
            elif log_date < expected_date:
                break

        return streak

    async def generate_fake_ai_message(self, streak: int) -> str:
        if streak == -1:
            return t("habit_analytics.NO_LOGS_MESSAGE")
        elif streak == 0:
            return t("habit_analytics.STREAK_ZERO_MESSAGE")
        elif streak < 5:
            return t("habit_analytics.STREAK_FIVE_AND_UNDER_MESSAGE")
        elif streak < 10:
            return t("habit_analytics.STREAK_TEN_AND_UNDER_MESSAGE")
        else:
            return t("habit_analytics.STREAK_TEN_AND_OVER_MESSAGE")