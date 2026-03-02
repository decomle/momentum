# app/services/habit_service.py

from sqlalchemy.ext.asyncio import AsyncSession
from app.db.models import Habit
from app.schemas.habit import CreateHabitRequest


class HabitService:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def create_habit(self, user_id, payload: CreateHabitRequest):
        habit = Habit(
            user_id=user_id,
            name=payload.name,
            frequency=payload.frequency,
            target_per_period=payload.target_per_period,
            is_active=True,
        )

        self.db.add(habit)
        await self.db.flush()

        return habit
        