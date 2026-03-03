import uuid
from datetime import date, timedelta
from sqlalchemy import select, func

from app.services import BaseService
from app.helpers import HabitPeriodBoundHelper
from app.db.models import Habit, HabitLog, HabitPeriod
from app.enums import HabitFrequency
from app.helpers import StreakCalculatorHelper


class HabitPeriodService(BaseService):
    async def upsert_for_log(self, habit: Habit, user_id: uuid.UUID, log_date: date) -> HabitPeriod:
        start_date, end_date = HabitPeriodBoundHelper.get_period_bounds(log_date, habit.frequency)

        period = await self._get_or_create_period(
            habit=habit,
            user_id=user_id,
            log_date=log_date,
            start_date=start_date,
            end_date=end_date,
        )

        await self._recalculate_period(habit, period)

        return period


    async def _get_or_create_period(
        self, 
        habit: Habit, 
        user_id: uuid.UUID, 
        log_date: date, 
        start_date: date, 
        end_date: date
    ) -> HabitPeriod:

        result = await self.db.execute(
            select(HabitPeriod).where(
                HabitPeriod.habit_id == habit.id,
                HabitPeriod.start_date == start_date,
            )
        )
        period = result.scalar_one_or_none()

        if period:
            return period
        
        effective_target, required_for_success = StreakCalculatorHelper.get_habit_targets(
            target_per_period=habit.target_per_period,
            log_date=log_date,
            period_start_date=start_date,
            period_end_date=end_date,
        )

        period = HabitPeriod(
            habit_id=habit.id,
            user_id=user_id,
            start_date=start_date,
            end_date=end_date,
            actual_logs=0,
            effective_target=effective_target,
            required_for_success=required_for_success,
            is_successful=False,
        )

        self.db.add(period)
        await self.db.flush()

        return period

    async def _recalculate_period(self, habit: Habit, period: HabitPeriod) -> None:
        result = await self.db.execute(
            select(func.count()).where(
                HabitLog.habit_id == habit.id,
                HabitLog.log_date >= period.start_date,
                HabitLog.log_date <= period.end_date,
            )
        )
        actual = result.scalar_one()

        period.actual_logs = actual
        period.is_successful = actual >= period.required_for_success
