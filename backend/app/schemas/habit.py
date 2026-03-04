import uuid

from pydantic import BaseModel, field_validator, model_validator
from pydantic_core import PydanticCustomError
from typing import Optional

from app.enums import HabitFrequency
from app.schemas.habit_log import HabitLog
from app.schemas.habit_period import HabitPeriod
from app.schemas.pagination import PaginationMeta

class CreateHabitRequest(BaseModel):
    name: str
    frequency: HabitFrequency
    description: Optional[str] = None
    target_per_period: int

    @field_validator("name")
    @classmethod
    def validate_name(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return value

        value = value.strip()

        if len(value) > 120:
            raise PydanticCustomError(
                "validations.HABIT_NAME_LENGTH",
                "Habit name must not exceed 120 characters.",
            )

        return value

    @model_validator(mode="after")
    def validate_target(self):
        if self.frequency == HabitFrequency.DAILY:
            if self.target_per_period != 1:
                raise PydanticCustomError("validations.DAILY_HABIT_TARGET", "Daily habit must have target_per_period = 1")

        if self.frequency == HabitFrequency.WEEKLY:
            if not (1 <= self.target_per_period <= 7):
                raise PydanticCustomError("validations.WEEKLY_HABIT_TARGET", "Weekly habit target must be between 1 and 7")

        return self
    
class HabitUpdateRequest(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None

    @field_validator("name")
    @classmethod
    def validate_name(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return value

        value = value.strip()

        if len(value) > 120:
            raise PydanticCustomError(
                "validations.HABIT_NAME_LENGTH",
                "Habit name must not exceed 120 characters.",
            )

        return value


class HabitResponse(BaseModel):
    id: uuid.UUID
    name: str
    description: Optional[str]
    frequency: HabitFrequency
    target_per_period: int
    is_active: bool
    current_streak: Optional[int]
    longest_streak: Optional[int]

class HabitDetailResponse(HabitResponse):
    mood_message: Optional[str] = None
    cheer_message: Optional[str] = None

    recent_logs: list[HabitLog] | None = None
    recent_periods: list[HabitPeriod] | None = None
    current_period: HabitPeriod | None = None

    class Config:
        from_attributes = True

class HabitListResponse(BaseModel):
    items: list[HabitResponse]
    meta: PaginationMeta