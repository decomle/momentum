from datetime import datetime, timezone
from math import ceil
from uuid import UUID

from sqlalchemy import func, select, tuple_
from sqlalchemy.orm import joinedload
from app.db.models import Habit
from app.schemas.habit import CreateHabitRequest
from app.exceptions.types.commons import NotFoundError
from app.services import BaseService

class HabitService(BaseService):

    async def create_habit(self, user_id, payload: CreateHabitRequest):
        habit = Habit(
            user_id=user_id,
            name=payload.name,
            description=payload.description,
            frequency=payload.frequency,
            target_per_period=payload.target_per_period,
            is_active=True,
        )

        self.db.add(habit)
        await self.db.flush()

        return habit
    
    async def get_user_habits(self, user_id: UUID, page: int, size: int) -> list[Habit]:
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

        total_pages = ceil(total / size) if total > 0 else 0

        return {
            "items": habits,
            "meta": {
                "page": page,
                "size": size,
                "total": total,
                "total_pages": total_pages,
            },
        }
    
    async def get_habit(
            self, 
            habit_id: UUID, 
            user_id: UUID, 
    ) -> Habit:
        
        query = select(Habit).where(
            Habit.id == habit_id,
            Habit.user_id == user_id,
            Habit.deleted_at.is_(None)
        )
        result = await self.db.execute(query)
        habit = result.scalar_one_or_none()

        if not habit:
            raise NotFoundError("Habit not found")

        return habit
    
    async def update_habit(self, habit_id: UUID, user_id: UUID, update_data: dict) -> Habit:
        habit = await self.get_habit(habit_id, user_id)

        # Dynamically update provided fields
        for field, value in update_data.items():
            setattr(habit, field, value)

        await self.db.flush()

        return habit
    
    async def delete_habit(self, habit_id: UUID, user_id: UUID) -> None:
        habit = await self.get_habit(habit_id, user_id)

        # Soft delete
        habit.deleted_at = datetime.now(timezone.utc)

        await self.db.flush()

    async def get_active_habits(
        self, 
        no_of_record = 10, 
        last_created_at: datetime | None = None,
        last_id: UUID | None = None
    ) -> list[Habit]:
        stmt = (
            select(Habit)
            .options(joinedload(Habit.user))
            .where(
                Habit.is_active.is_(True), 
                Habit.deleted_at.is_(None),
            )
            .order_by(Habit.created_at.asc(), Habit.id.asc())
            .limit(no_of_record)
        )
        if last_created_at is not None and last_id is not None:
            stmt = stmt.where(
                tuple_(Habit.created_at, Habit.id) > (last_created_at, last_id)
            )


        result = await self.db.execute(stmt)
        return result.scalars().all()