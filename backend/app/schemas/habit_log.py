from pydantic import BaseModel, Field
from datetime import date
from uuid import UUID


class HabitLogRequest(BaseModel):
    habit_id: UUID
    log_date: date
    value: int = Field(ge=0)


class HabitLogResponse(BaseModel):
    habit_id: UUID
    log_date: date
    value: int