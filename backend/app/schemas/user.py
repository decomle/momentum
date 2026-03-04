import uuid, re

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, field_validator
from pydantic_core import PydanticCustomError

from app.core.translator import t
from app.core.types.email import LocalizedEmail


class UserCreateRequest(BaseModel):
    email: LocalizedEmail
    password: str
    username: str
    first_name: str
    last_name: str
    phone_number: Optional[str] = None
    self_introduction: Optional[str] = None

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

class UserUpdateRequest(BaseModel):
    username: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone_number: Optional[str] = None
    self_introduction: Optional[str] = None

class UserDetailResponse(UserResponse):
    username: Optional[str]
    first_name: Optional[str]
    last_name: Optional[str]
    self_introduction: Optional[str]
    phone_number: Optional[str]