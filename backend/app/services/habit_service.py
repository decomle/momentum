import uuid

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.models import Habit
from app.schemas.habit import CreateHabitRequest
from app.exceptions.types.commons import NotFoundError


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
    
    async def get_user_habits(self, user_id: uuid.UUID) -> list[Habit]:
        result = await self.db.execute(
            select(Habit).where(Habit.user_id == user_id)
        )
        return result.scalars().all()
    
    async def get_habit(self, habit_id: uuid.UUID, user_id: uuid.UUID) -> Habit:
        result = await self.db.execute(
            select(Habit).where(
                Habit.id == habit_id,
                Habit.user_id == user_id
            )
        )
        habit = result.scalar_one_or_none()

        if not habit:
            raise NotFoundError("Habit not found")

        return habit
    
    async def update_habit(self, habit_id: uuid.UUID, user_id: uuid.UUID, update_data: dict) -> Habit:
        habit = await self.get_habit(habit_id, user_id)

        # Dynamically update provided fields
        for field, value in update_data.items():
            setattr(habit, field, value)

        await self.db.flush()

        return habit