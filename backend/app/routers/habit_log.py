# app/routers/habit_log.py

from datetime import date

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID

from app.db.database import get_db
from app.db.transaction import transactional
from app.dependencies.auth import verify_access_token
from app.schemas.habit_log import HabitLogCreate, HabitLogListResponse, HabitLogResponse
from app.services.habit_log_service import HabitLogService

router = APIRouter(prefix="/habits", tags=["habit_logs"])


@router.post( "/{habit_id}/logs", response_model=HabitLogResponse, status_code=status.HTTP_201_CREATED,)
async def create_habit_log(
    habit_id: UUID,
    payload: HabitLogCreate,
    db: AsyncSession = Depends(get_db),
    jwt_payload=Depends(verify_access_token),
):
    hatbit_log_service = HabitLogService(db)

    return await transactional(db, lambda: hatbit_log_service.create_log(
        user_id=jwt_payload["sub"],
        habit_id=habit_id,
        timezone=jwt_payload["tz"],
        payload=payload,
    ))

@router.get("/{habit_id}/logs", response_model=HabitLogListResponse)
async def get_habit_logs(
    habit_id: UUID,
    db: AsyncSession = Depends(get_db),
    jwt_payload=Depends(verify_access_token),
    from_date: date | None = Query(None),
    to_date: date | None = Query(None),
    page: int = Query(1, ge=1),
    size: int = Query(5, ge=1, le=20),
):
    habit_log_service = HabitLogService(db)
    user_id = jwt_payload["sub"]
    return await habit_log_service.get_logs(
        user_id=user_id,
        habit_id=habit_id,
        from_date=from_date,
        to_date=to_date,
        page=page,
        page_size=size,
    )