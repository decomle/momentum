# routers/habit.py

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.habit_log import HabitLogRequest, HabitLogResponse
from app.services.habit_service import HabitService
from app.db.database import get_db
from app.dependencies.auth import get_current_user

router = APIRouter(prefix="/habits", tags=["habits"])


@router.post("/log", response_model=HabitLogResponse, status_code=status.HTTP_200_OK)
async def log_habit(
    payload: HabitLogRequest,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_user),
):
    return await HabitService.log_habit(
        db=db,
        user_id=current_user.id,
        habit_id=payload.habit_id,
        log_date=payload.log_date,
        value=payload.value,
    )