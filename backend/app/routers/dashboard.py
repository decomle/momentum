from app.db.database import get_db
from sqlalchemy.ext.asyncio import AsyncSession

from app.dependencies.auth import verify_access_token
from app.schemas.dashboard import DashboardResponse
from app.services.dashboard_service import DashboardService
from app.utils.timezone import TimeZoneUtils

from fastapi import APIRouter, Depends, Query, Request


router = APIRouter(prefix="/dashboard", tags=["dashboard"])

@router.get("", response_model=DashboardResponse)
async def get_dashboard(
    request: Request,
    db: AsyncSession = Depends(get_db),
    jwt_payload: dict = Depends(verify_access_token),
):
    service = DashboardService(db)

    user_id = jwt_payload["sub"]
    timezone = TimeZoneUtils.get_timezone(jwt_payload)

    return await service.get_dashboard(
        user_id=user_id,
        timezone=timezone,
        locale=request.state.locale,
    )