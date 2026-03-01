# services/habit_service.py

from datetime import timedelta, date
from uuid import UUID
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession

from app.utils import TimeZoneUtils
from app.db.models import Habit, HabitLog
from app.services.period_service import PeriodService

from app.exceptions.types import (
    HabitArchivedError,
    LoggingWindowExpiredError,
    FutureDateError,
    NotFoundError,
)


class HabitService:
    @staticmethod
    async def log_habit(db: AsyncSession, user_id: UUID, habit_id: UUID, log_date: date, value: int,) -> dict:

        result = await db.execute(
            select(Habit)
            .options(selectinload(Habit.user))
            .where( Habit.id == habit_id, Habit.user_id == user_id))
        habit = result.scalar_one_or_none()

        if not habit:
            raise NotFoundError("Habit not found")

        if habit.archived_at:
            raise HabitArchivedError()

        today = TimeZoneUtils.get_today_for_user(habit.user)

        if log_date > today:
            raise FutureDateError()

        if log_date < today - timedelta(days=2):
            raise LoggingWindowExpiredError()

        result = await db.execute(
            select(HabitLog).where(
                HabitLog.habit_id == habit_id,
                HabitLog.log_date == log_date,
            )
        )
        existing_log = result.scalar_one_or_none()

        if existing_log:
            existing_log.value = value
        else:
            new_log = HabitLog(
                habit_id=habit_id,
                log_date=log_date,
                value=value,
            )
            db.add(new_log)

        await db.commit()

        await PeriodService.recalculate_affected_period(
            db=db,
            habit=habit,
            log_date=log_date,
        )

        return {
            "habit_id": habit_id,
            "log_date": log_date,
            "value": value,
        }