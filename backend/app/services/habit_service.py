from datetime import datetime, timezone
from math import ceil
import uuid

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import func, select
from app.db.models import Habit
from app.schemas.habit import CreateHabitRequest
from app.exceptions.types.commons import NotFoundError
from app.services.base_service import BaseService

class HabitService(BaseService):

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
    
    async def get_user_habits(self, user_id: uuid.UUID, page: int, size: int) -> list[Habit]:
        offset = (page - 1) * size
        data_stmt = (
            select(Habit)
            .where(Habit.user_id == user_id, Habit.deleted_at.is_(None))
            .order_by(
                Habit.created_at.desc(),
                Habit.id.desc(),
            )
            .offset(offset)
            .limit(size)
        )

        count_stmt = (
            select(func.count())
            .select_from(Habit)
            .where(
                Habit.user_id == user_id,
                Habit.deleted_at.is_(None),
            )
        )

        result = await self.db.execute(data_stmt)
        habits = result.scalars().all()

        total_result = await self.db.execute(count_stmt)
        total = total_result.scalar_one()

        total_pages = ceil(total / size) if total > 0 else 1

        return {
            "items": habits,
            "meta": {
                "page": page,
                "size": size,
                "total": total,
                "total_pages": total_pages,
            },
        }
    
    async def get_habit(self, habit_id: uuid.UUID, user_id: uuid.UUID) -> Habit:
        result = await self.db.execute(
            select(Habit).where(
                Habit.id == habit_id,
                Habit.user_id == user_id,
                Habit.deleted_at.is_(None)
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
    
    async def delete_habit(self, habit_id: uuid.UUID, user_id: uuid.UUID) -> None:
        habit = await self.get_habit(habit_id, user_id)

        # Soft delete
        habit.deleted_at = datetime.now(timezone.utc)

        await self.db.flush()