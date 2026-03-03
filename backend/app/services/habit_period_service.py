import uuid
from datetime import date, datetime, timedelta
from zoneinfo import ZoneInfo
from sqlalchemy import select, func

from app.services import BaseService
from app.helpers import HabitPeriodBoundHelper
from app.db.models import Habit, HabitLog, HabitPeriod
from app.helpers import StreakCalculatorHelper


class HabitPeriodService(BaseService):
    async def backfill_missing_periods(
        self,
        habit: Habit,
        timezone: ZoneInfo
    ) -> None:
        """
        Ensure all CLOSED periods from habit creation until yesterday exist.
        Idempotent and self-healing.
        """

        # Compute user today in their timezone
        today: date = datetime.now(timezone).date()
        yesterday = today - timedelta(days=1)

        # Determine last closed period bounds
        last_closed_start, last_closed_end = HabitPeriodBoundHelper.get_period_bounds(yesterday, habit.frequency)

        create_date = habit.created_at.astimezone(timezone).date()

        # If habit created after last closed period → nothing to do
        if create_date > last_closed_end:
            return

        # Get latest existing period
        stmt = (
            select(HabitPeriod)
            .where(HabitPeriod.habit_id == habit.id)
            .order_by(HabitPeriod.start_date.desc())
            .limit(1)
        )

        result = await self.db.execute(stmt)
        last_period = result.scalars().first()

        # Determine first missing period start date
        if last_period is None:
            next_date = create_date
        else:
            # Already fully up to date
            if last_period.end_date >= last_closed_end:
                return

            next_date = last_period.end_date + timedelta(days=1)

        # Align to correct period boundary
        next_start, next_end = (
            HabitPeriodBoundHelper.get_period_bounds(
                next_date,
                habit.frequency
            )
        )

        # Generate all missing CLOSED periods
        while next_start <= last_closed_start:

            # Count logs in this period
            log_stmt = (
                select(func.count())
                .select_from(HabitLog)
                .where(
                    HabitLog.habit_id == habit.id,
                    HabitLog.log_date >= next_start,
                    HabitLog.log_date <= next_end,
                )
            )

            log_result = await self.db.execute(log_stmt)
            actual_logs = log_result.scalar_one()

            # Calculate targets
            effective_target, required_for_success = (
                StreakCalculatorHelper.get_habit_targets(
                    target_per_period=habit.target_per_period,
                    log_date=next_start,
                    period_start_date=next_start,
                    period_end_date=next_end,
                )
            )

            is_successful = actual_logs >= required_for_success

            period = HabitPeriod(
                habit_id=habit.id,
                user_id=habit.user_id,
                start_date=next_start,
                end_date=next_end,
                actual_logs=actual_logs,
                effective_target=effective_target,
                required_for_success=required_for_success,
                is_successful=is_successful,
            )

            self.db.add(period)

            # Move forward
            next_date = next_end + timedelta(days=1)
            next_start, next_end = (
                HabitPeriodBoundHelper.get_period_bounds(
                    next_date,
                    habit.frequency
                )
            )


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
