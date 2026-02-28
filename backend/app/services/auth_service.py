from datetime import datetime, timezone
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.security import hash_password, verify_password
from app.db.models import User, RefreshToken
from app.services.refresh_token_service import create_refresh_token, hash_token
from app.core.security import create_access_token
from app.exceptions.types import InvalidCredentialsError

async def authenticate_user(db: AsyncSession, email: str, password: str) -> User:
    result = await db.execute(select(User).filter(User.email == email))
    user = result.scalar_one_or_none()

    if not user or not verify_password(password, user.password_hash):
        raise InvalidCredentialsError("Invalid email or password")

    return user

async def get_user_by_email(db: AsyncSession, email: str) -> User:
    result = await db.execute(select(User).filter(User.email == email))
    return result.scalar_one_or_none()

async def is_email_registered(db: AsyncSession, email: str) -> bool:
    user = await get_user_by_email(db, email)
    return user is not None

async def register_user(db: AsyncSession, email: str, password: str) -> User:
    if await is_email_registered(db, email):
        raise InvalidCredentialsError("Email is already registered")

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

async def refresh_access_token(db: AsyncSession, raw_refresh_token: str) -> str:
    # This function will be implemented later when we handle refresh tokens
    token_hash = hash_token(raw_refresh_token)

    result = await db.execute(select(RefreshToken).where(RefreshToken.token_hash == token_hash))
    token = result.scalar_one_or_none()
    if not token:
        raise InvalidCredentialsError("Invalid refresh token")
    
    if token.expires_at < datetime.now(timezone.utc):
        raise InvalidCredentialsError("Refresh token expired")

    user_id = token.user_id
    await db.delete(token)

    new_refresh_token = await create_refresh_token(db, user_id)
    new_access_token = create_access_token({
        "sub": str(user_id),
        "roles": ["user"]
    })

    return new_access_token, new_refresh_token