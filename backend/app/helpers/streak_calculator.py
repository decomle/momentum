
import math

from datetime import date

from app.core.constants import SUCCESS_RATIO


class StreakCalculatorHelper: 

    @staticmethod
    def get_habit_targets(
        target_per_period: int,
        log_date: date,
        period_start_date: date,
        period_end_date: date,
    ) -> tuple[int, int]:
        total_days = (period_end_date - period_start_date).days + 1

        effective_start = max(log_date, period_start_date)
        remaining_days = (period_end_date - effective_start).days + 1

        effective_target = math.ceil(
            target_per_period * (remaining_days / total_days)
        )

        required_for_success = math.ceil(
            effective_target * SUCCESS_RATIO
        )

        return effective_target, required_for_success