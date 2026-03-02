# routers/habit.py

import uuid

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.habit import CreateHabitRequest, HabitListResponse, HabitResponse, HabitUpdateRequest
from app.services.habit_service import HabitService
from app.db.database import get_db
from app.db.transaction import transactional
from app.dependencies.auth import verify_access_token

router = APIRouter(prefix="/habits", tags=["habits"])

@router.post("", response_model=HabitResponse)
async def create_habit(
    payload: CreateHabitRequest,
    db: AsyncSession = Depends(get_db),
    jwt_payload = Depends(verify_access_token),
):
    habit_service = HabitService(db)
    return await transactional(db, lambda: habit_service.create_habit(
        user_id=jwt_payload["sub"],
        payload=payload,
    ))

@router.get("", response_model=HabitListResponse)
async def list_habits(
    jwt_payload: dict = Depends(verify_access_token),
    db: AsyncSession = Depends(get_db),
    page: int = Query(1, ge=1),
    size: int = Query(5, ge=1, le=20),
):
    habit_service = HabitService(db)
    user_id = jwt_payload["sub"]
    return await habit_service.get_user_habits(user_id, page=page, size=size)

@router.get("/{habit_id}", response_model=HabitResponse)
async def get_habit(
    habit_id: uuid.UUID,
    jwt_payload: dict = Depends(verify_access_token),
    db: AsyncSession = Depends(get_db),
):
    user_id = jwt_payload["sub"]
    service = HabitService(db)

    habit = await service.get_habit(habit_id=habit_id,user_id=user_id)

    return habit

@router.patch("/{habit_id}", response_model=HabitResponse)
async def update_habit(
    habit_id: uuid.UUID,
    data: HabitUpdateRequest,
    jwt_payload: dict = Depends(verify_access_token),
    db: AsyncSession = Depends(get_db),
):
    user_id = jwt_payload["sub"]
    habit_service = HabitService(db)

    # Only include fields actually sent by client
    update_data = data.model_dump(exclude_unset=True)

    habit = await transactional(
        db,
        lambda: habit_service.update_habit(
            habit_id=habit_id,
            user_id=user_id,
            update_data=update_data,
        ),
    )

    return habit

@router.delete("/{habit_id}")
async def delete_habit(
    habit_id: uuid.UUID,
    jwt_payload: dict = Depends(verify_access_token),
    db: AsyncSession = Depends(get_db),
):
    user_id = jwt_payload["sub"]
    service = HabitService(db)

    await transactional(
        db,
        lambda: service.delete_habit(
            habit_id=habit_id,
            user_id=user_id,
        ),
    )

    return {"message": "Habit deleted successfully."}