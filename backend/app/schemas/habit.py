import uuid

from pydantic import BaseModel, model_validator
from enum import Enum

from pydantic_core import PydanticCustomError
from app.enums import HabitFrequency

class CreateHabitRequest(BaseModel):
    name: str
    frequency: HabitFrequency
    description: str | None = None
    target_per_period: int

    @model_validator(mode="after")
    def validate_target(self):
        if self.frequency == HabitFrequency.DAILY:
            if self.target_per_period != 1:
                raise PydanticCustomError("validations.DAILY_HABIT_TARGET", "Daily habit must have target_per_period = 1")

        if self.frequency == HabitFrequency.WEEKLY:
            if not (1 <= self.target_per_period <= 7):
                raise PydanticCustomError("validations.WEEKLY_HABIT_TARGET", "Weekly habit target must be between 1 and 7")

        return self


class HabitResponse(BaseModel):
    id: uuid.UUID
    name: str
    description: str | None
    frequency: HabitFrequency
    target_per_period: int
    is_active: bool