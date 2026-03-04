import uuid

from typing import Optional
from datetime import date, datetime
from pydantic import BaseModel, Field, field_validator
from pydantic_core import PydanticCustomError

from app.schemas.pagination import PaginationMeta

class HabitLog(BaseModel):
    log_date: date
    mood_score: int
    remark: str

class HabitLogCreate(BaseModel):
    log_date: date
    mood_score: int = 0
    remark: Optional[str] = None

    @field_validator("mood_score")
    @classmethod
    def validate_mood_score(cls, value: int) -> int:
        if value < -3 or value > 3:
            raise PydanticCustomError(
                "validations.INVALID_MOOD_SCORE",
                "Mood score must be between -3 and 3.",
            )
        return value
    
    @field_validator("remark")
    @classmethod
    def validate_remark(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return value

        trimmed = value.strip()

        if len(trimmed) > 255:
            raise PydanticCustomError(
                "validations.REMARK_TOO_LONG",
                "Remark must not exceed 255 characters.",
            )

        return trimmed


class HabitLogResponse(BaseModel):
    id: uuid.UUID
    habit_id: uuid.UUID
    user_id: uuid.UUID
    log_date: date
    mood_score: int
    remark: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True

class HabitLogListResponse(BaseModel):
    items: list[HabitLogResponse]
    meta: PaginationMeta