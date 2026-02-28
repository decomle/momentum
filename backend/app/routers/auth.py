from fastapi import APIRouter, Depends, Request, Response
from sqlalchemy.orm import Session
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException, status

from app.db.database import get_db
from app.db.models import User
from app.schemas.user import UserCreate, UserResponse
from app.schemas.auth import LoginRequest, TokenResponse
from app.services.auth_service import login_user, logout_user, register_user
from app.services.refresh_token_service import create_refresh_token
from app.core.security import create_access_token
from app.dependencies.auth import get_current_user, verify_access_token
from app.services.auth_service import refresh_access_token


router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login", response_model=TokenResponse)
async def login(data: LoginRequest, response: Response, db: Session = Depends(get_db)):
    user = await login_user(db, data.email, data.password)

    # We will need roles and permissions later, for now we just put "user" role
    access_token = create_access_token({
        "sub": str(user.id),
        "roles": ["user"]
    })

    refresh_token = await create_refresh_token(db, user.id)

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
    return await register_user(db, user_data.email, user_data.password)

@router.post("/refresh", response_model=TokenResponse)
async def refresh(request: Request, response: Response, db: AsyncSession = Depends(get_db)):
    refresh_token = request.cookies.get("refresh_token")

    if not refresh_token:
        raise HTTPException(status_code=401, detail="Missing refresh token")

    access_token, new_refresh_token = await refresh_access_token(db, refresh_token)

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
        await logout_user(db, refresh_token)

    # Clear the cookie
    response.delete_cookie("refresh_token")
    return {"message": "Logged out successfully"}


@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.get("/protected")
def get_protected(_: dict = Depends(verify_access_token)):
    return {"message": "This is a protected endpoint"}