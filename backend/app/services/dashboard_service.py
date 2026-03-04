# dashboard_service.py

import uuid
from datetime import date
from typing import Tuple, List, Dict
from datetime import datetime
from sqlalchemy import select, func, and_

from app.core.translator import t
from zoneinfo import ZoneInfo
from app.services import BaseService
from app.db.models import Habit, HabitLog
from app.enums import HabitFrequency
from app.core.constants import DAILY_WARNING_THRESHOLD, WEEKLY_WARNING_THRESHOLD

class DashboardService(BaseService):

    async def get_dashboard(
        self,
        user_id: uuid.UUID,
        timezone: ZoneInfo,
        locale: str = None
    ) -> dict:
        today = datetime.now(timezone).date()
        metadata = await self._get_metadata(user_id, today)

        habits, daily_count, weekly_count = await self._get_dashboard_habits(
            user_id,
            today,
        )

        warning_messages = self._generate_warning_messages(
            daily_count,
            weekly_count,
            locale
        )

        metadata["warning_messages"] = warning_messages

        return {
            "metadata": metadata,
            "habits": habits,
        }

    async def _get_metadata(
        self,
        user_id: uuid.UUID,
        today: date,
    ) -> dict:

        stmt = (
            select(
                func.count(Habit.id).label("total_habits"),
                func.count(HabitLog.habit_id).label("completed_today"),
            )
            .select_from(Habit)
            .outerjoin(
                HabitLog,
                and_(
                    HabitLog.habit_id == Habit.id,
                    HabitLog.user_id == user_id,
                    HabitLog.log_date == today,
                )
            )
            .where(
                Habit.user_id == user_id,
                Habit.deleted_at.is_(None),
            )
        )

        result = await self.db.execute(stmt)
        row = result.one()

        total_habits = row.total_habits or 0
        completed_today = row.completed_today or 0
        pending_today = total_habits - completed_today

        completion_rate = (
            int((completed_today / total_habits) * 100)
            if total_habits > 0
            else 0
        )

        ai_message = self._generate_ai_message(completion_rate)

        return {
            "date": today,
            "total_habits": total_habits,
            "completed_today": completed_today,
            "pending_today": pending_today,
            "completion_rate": completion_rate,
            "warning_messages": [],  # injected later
            "ai_message": ai_message,
        }

    async def _get_dashboard_habits(
        self,
        user_id: uuid.UUID,
        today: date,
    ) -> Tuple[List[Dict], int, int]:

        stmt = (
            select(
                Habit.id,
                Habit.name,
                Habit.frequency,
                Habit.current_streak,
                Habit.longest_streak,
                HabitLog.habit_id.label("logged_habit_id"),
            )
            .select_from(Habit)
            .outerjoin(
                HabitLog,
                and_(
                    HabitLog.habit_id == Habit.id,
                    HabitLog.user_id == user_id,
                    HabitLog.log_date == today,
                )
            )
            .where(
                Habit.user_id == user_id,
                Habit.deleted_at.is_(None),
            )
            .order_by(HabitLog.habit_id.isnot(None))
        )

        result = await self.db.execute(stmt)
        rows = result.all()

        habits = []
        daily_count = 0
        weekly_count = 0

        for row in rows:
            completed_today = row.logged_habit_id is not None

            if row.frequency == HabitFrequency.DAILY:
                daily_count += 1
            elif row.frequency == HabitFrequency.WEEKLY:
                weekly_count += 1

            habits.append({
                "id": row.id,
                "name": row.name,
                "frequency": row.frequency,
                "current_streak": row.current_streak,
                "longest_streak": row.longest_streak,
                "completed_today": completed_today,
            })

        return habits, daily_count, weekly_count

    def _generate_warning_messages(
        self,
        daily_count: int,
        weekly_count: int,
        locale: str
    ) -> List[str]:

        messages = []

        if daily_count >= DAILY_WARNING_THRESHOLD:
            messages.append(t("habit_analytics.HABIT_DAILY_WARNING", locale=locale, count=daily_count, cap=DAILY_WARNING_THRESHOLD))

        if weekly_count >= WEEKLY_WARNING_THRESHOLD:
            messages.append(t("habit_analytics.HABIT_WEEKLY_WARNING", locale=locale, count=weekly_count, cap=WEEKLY_WARNING_THRESHOLD))

        return messages

    def _generate_ai_message(self, completion_rate: int) -> str:

        if completion_rate == 100:
            return "Perfect day. Keep the momentum."

        if completion_rate >= 60:
            return "Good progress today. Keep going."

        if completion_rate > 0:
            return "Every small win counts."

        return "A fresh start is always possible."