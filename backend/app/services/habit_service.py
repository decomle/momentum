# app/services/habit_service.py

from sqlalchemy.ext.asyncio import AsyncSession
from app.db.models import Habit
from app.schemas.habit import CreateHabitRequest


class HabitService:
    @staticmethod
    async def create_habit(db: AsyncSession, user_id, payload: CreateHabitRequest):
        habit = Habit(
            user_id=user_id,
            name=payload.name,
            frequency=payload.frequency,
            target_per_period=payload.target_per_period,
            is_active=True,
        )

        db.add(habit)
        await db.commit()
        await db.refresh(habit)

        return habit