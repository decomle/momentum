from pydantic import BaseModel
from datetime import date
from uuid import UUID
from typing import List


class DashboardMetadata(BaseModel):
    date: date
    total_habits: int
    completed_today: int
    pending_today: int
    completion_rate: int
    warning_messages: List[str]
    ai_message: str


class DashboardHabit(BaseModel):
    id: UUID
    name: str
    frequency: str
    description: str
    current_streak: int
    longest_streak: int
    completed_today: bool


class DashboardResponse(BaseModel):
    metadata: DashboardMetadata
    habits: List[DashboardHabit]