import uuid

from pydantic import BaseModel, field_validator
from app.core.types.email import LocalizedEmail
from pydantic_core import PydanticCustomError
from app.core.translator import t
from datetime import datetime
import re

class UserCreateRequest(BaseModel):
    email: LocalizedEmail
    password: str
    username: str
    first_name: str
    last_name: str
    phone_number: str | None = None
    self_introduction: str | None = None

    @field_validator("password")
    @classmethod
    def validate_password(cls, value):
        if len(value) < 6:
            raise PydanticCustomError("validations.PASSWORD_TOO_SHORT", "Short password")

        if not re.search(r"\d", value):
            raise PydanticCustomError("validations.PASSWORD_NO_NUMBER", "No number in password")

        if not re.search(r"[A-Za-z]", value):
            raise PydanticCustomError("validations.PASSWORD_NO_LETTER", "No letter in password")

        return value

class UserResponse(BaseModel):
    id: uuid.UUID
    email: str
    created_at: datetime

    class Config:
        from_attributes = True