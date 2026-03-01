# routers/habit.py

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.habit import CreateHabitRequest, HabitResponse
from app.services.habit_service import HabitService
from app.db.database import get_db
from app.dependencies.auth import verify_access_token

router = APIRouter(prefix="/habits", tags=["habits"])

@router.post("", response_model=HabitResponse)
async def create_habit(
    payload: CreateHabitRequest,
    db: AsyncSession = Depends(get_db),
    jwt_payload = Depends(verify_access_token),
):
    return await HabitService.create_habit(
        db=db,
        user_id=jwt_payload["sub"],
        payload=payload,
    )