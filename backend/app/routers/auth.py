from fastapi import APIRouter, Depends, Request, Response
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException, status

from app.db.database import get_db
from app.db.models import User
from app.schemas.user import UserCreate, UserResponse
from app.schemas.auth import LoginRequest, TokenResponse
from app.services.auth_service import AuthService
from app.services.refresh_token_service import RefreshTokenService
from app.core.security import create_access_token
from app.dependencies.auth import get_current_user, verify_access_token
from app.db.transaction import transactional
from app.utils.timezone import TimeZoneUtils

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login", response_model=TokenResponse)
async def login(data: LoginRequest, response: Response, db: AsyncSession = Depends(get_db)):
    auth_service = AuthService(db)
    # user = await service.login_user(data.email, data.password)
    user = await transactional(db, lambda: auth_service.login_user(data.email, data.password))

    # We will need roles and permissions later, for now we just put "user" role
    access_token = create_access_token({
        "sub": str(user.id),
        "roles": ["user"],
        "tz": str(TimeZoneUtils.get_timezone(user)),
    })

    token_service = RefreshTokenService(db)
    refresh_token = await transactional(db, lambda: token_service.create_refresh_token(user.id))

    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=60 * 60 * 24 * 7,
    )


    return { "access_token": access_token }

@router.post("/register", response_model=UserResponse)
async def register(user_data: UserCreate, db: AsyncSession = Depends(get_db)):
    auth_service = AuthService(db)
    return await transactional(db, lambda: auth_service.register_user(user_data.email, user_data.password))

@router.post("/refresh", response_model=TokenResponse)
async def refresh(request: Request, response: Response, db: AsyncSession = Depends(get_db)):
    refresh_token = request.cookies.get("refresh_token")

    if not refresh_token:
        raise HTTPException(status_code=401, detail="Missing refresh token")

    auth_service = AuthService(db)
    access_token, new_refresh_token = await transactional(db, lambda: auth_service.refresh_access_token(refresh_token))

    # Set new refresh token cookie
    response.set_cookie(
        key="refresh_token",
        value=new_refresh_token,
        httponly=True,
        secure=True,      # True in production
        samesite="lax",   # adjust if cross-site
        max_age=60 * 60 * 24 * 7,  # 7 days
    )

    return {"access_token": access_token}

@router.post("/logout")
async def logout(request: Request, response: Response, db: AsyncSession = Depends(get_db)):
    refresh_token = request.cookies.get("refresh_token")

    if refresh_token:
        auth_service = AuthService(db)
        await transactional(db, lambda: auth_service.logout_user(refresh_token))

    # Clear the cookie
    response.delete_cookie("refresh_token")
    return {"message": "Logged out successfully"}


@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.get("/protected")
def get_protected(_: dict = Depends(verify_access_token)):
    return {"message": "This is a protected endpoint"}