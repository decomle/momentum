from pydantic import BaseModel
from datetime import date


class HabitPeriod(BaseModel):
    start_date: date
    end_date: date
    effective_target: int
    required_for_success: int
    actual_logs: int
    is_successful: bool