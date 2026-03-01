from datetime import timedelta, date
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models import Habit, HabitLog, HabitPeriod


class PeriodService:
    @staticmethod
    async def recalculate_affected_period( db: AsyncSession, habit: Habit, log_date: date,) -> None:

        if habit.frequency == "DAILY":
            start_date = log_date
            end_date = log_date

        elif habit.frequency == "WEEKLY":
            start_date = log_date - timedelta(days=log_date.weekday())
            end_date = start_date + timedelta(days=6)

        else:
            return  # future-proof if more frequencies added

        result = await db.execute(
            select(HabitPeriod).where(
                HabitPeriod.habit_id == habit.id,
                HabitPeriod.start_date == start_date,
                HabitPeriod.end_date == end_date,
            )
        )
        period = result.scalar_one_or_none()

        if not period:
            return

        result = await db.execute(
            select(func.coalesce(func.sum(HabitLog.value), 0)).where(
                HabitLog.habit_id == habit.id,
                HabitLog.log_date >= start_date,
                HabitLog.log_date <= end_date,
            )
        )
        actual_value = result.scalar_one()

        period.actual_value = actual_value
        period.is_successful = actual_value >= habit.target_per_period

        await db.commit()