from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import get_db
from app.db.models import User
from app.schemas.user import UserCreate, UserResponse
from app.schemas.auth import LoginRequest, TokenResponse
from app.services.auth_service import login_user, register_user
from app.services.refresh_token_service import create_refresh_token
from app.core.security import create_access_token
from app.dependencies.auth import get_current_user, verify_access_token


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

@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    print("Current user:", current_user.password_hash)
    return current_user

@router.get("/protected")
def get_protected(_: dict = Depends(verify_access_token)):
    return {"message": "This is a protected endpoint"}