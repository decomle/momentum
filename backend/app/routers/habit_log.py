# app/routers/habit_log.py

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID

from app.db.database import get_db
from app.db.transaction import transactional
from app.dependencies.auth import verify_access_token
from app.schemas.habit_log import HabitLogCreate, HabitLogResponse
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

    return transactional(db, lambda: hatbit_log_service.create_log(
        db=db,
        user_id=jwt_payload["sub"],
        habit_id=habit_id,
        timezone=jwt_payload["tz"],
        payload=payload,
    ))