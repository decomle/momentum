from datetime import date, timedelta

from app.enums import HabitFrequency

class HabitPeriodBoundHelper:
    @staticmethod
    def get_period_bounds(log_date: date, frequency: HabitFrequency) -> tuple[date, date]:
        if(frequency == HabitFrequency.WEEKLY):
            start = log_date - timedelta(days=log_date.weekday())
            end = start + timedelta(days=6)
        elif frequency == HabitFrequency.DAILY:
            start = end = log_date
        else:
            raise ValueError("Unsupported frequency")


        return start, end