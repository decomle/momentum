from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi import HTTPException, status
from app.core.security import hash_password, verify_password
from app.db.models import User

async def authenticate_user(db: AsyncSession, email: str, password: str) -> User:
    result = await db.execute(select(User).filter(User.email == email))
    user = result.scalar_one_or_none()

    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    if not verify_password(password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    return user

async def get_user_by_email(db: AsyncSession, email: str) -> User:
    result = await db.execute(select(User).filter(User.email == email))
    return result.scalar_one_or_none()

async def is_email_registered(db: AsyncSession, email: str) -> bool:
    user = await get_user_by_email(db, email)
    return user is not None

async def register_user(db: AsyncSession, email: str, password: str) -> User:
    if await is_email_registered(db, email):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    new_user = User(
        email=email,
        password_hash=hash_password(password)
    )
    db.add(new_user)

    await db.commit()
    await db.refresh(new_user)

    return new_user

async def login_user(db: AsyncSession, email: str, password: str) -> User:
    return await authenticate_user(db, email, password)
