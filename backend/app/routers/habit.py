# routers/habit.py

import uuid

from fastapi import APIRouter, Depends, Query, Request
from sqlalchemy.ext.asyncio import AsyncSession

from app.schemas.habit import (
    CreateHabitRequest, 
    HabitListResponse, 
    HabitResponse, 
    HabitDetailResponse, 
    HabitUpdateRequest
)
from app.core.translator import t
from app.services.habit_service import HabitService
from app.services.habit_log_service import HabitLogService
from app.services.habit_period_service import HabitPeriodService
from app.services.habit_analytics_service import HabitAnalyticsService
from app.utils.timezone import TimeZoneUtils
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

@router.get("/{habit_id}", response_model=HabitDetailResponse)
async def get_habit(
    habit_id: uuid.UUID,
    request: Request,
    jwt_payload: dict = Depends(verify_access_token),
    db: AsyncSession = Depends(get_db),
):
    user_id = jwt_payload["sub"]
    timezone = TimeZoneUtils.get_timezone(jwt_payload)
    habit_service = HabitService(db)
    habit_log_service = HabitLogService(db)
    habit_period_service = HabitPeriodService(db)

    habit = await habit_service.get_habit(habit_id=habit_id,user_id=user_id)
    
    res_model = HabitDetailResponse.model_validate(habit, from_attributes=True)

    res_model = res_model.model_copy(update={
        "recent_logs": await habit_log_service.get_recent_logs(user_id=user_id, habit_id=habit_id, timezone=timezone),
        "recent_periods": await habit_period_service.get_recent_periods(user_id=user_id, habit_id=habit_id, timezone=timezone),
        "current_period": await habit_period_service.get_current_period(user_id=user_id, habit_id=habit_id, timezone=timezone),
        "mood_message": t(HabitAnalyticsService.generate_ai_message(habit.current_streak), request=request),
        "cheer_message": HabitAnalyticsService.generate_cheerful_message()
    })

    return res_model

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