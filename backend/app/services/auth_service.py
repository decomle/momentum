from datetime import datetime, timezone
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete

from app.core.security import hash_password, verify_password
from app.db.models import User, RefreshToken
from app.services.refresh_token_service import RefreshTokenService
from app.core.security import create_access_token
from app.exceptions.types import InvalidCredentialsError


class AuthService:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def authenticate_user(self, email: str, password: str) -> User:
        result = await self.db.execute(select(User).filter(User.email == email))
        user = result.scalar_one_or_none()

        if not user or not verify_password(password, user.password_hash):
            raise InvalidCredentialsError("Invalid email or password")

        return user

    async def get_user_by_email(self, email: str) -> User | None:
        result = await self.db.execute(select(User).filter(User.email == email))
        return result.scalar_one_or_none()

    async def is_email_registered(self, email: str) -> bool:
        user = await self.get_user_by_email(email)
        return user is not None

    async def register_user(self, email: str, password: str) -> User:
        if await self.is_email_registered(email):
            raise InvalidCredentialsError("Email is already registered")

        new_user = User(
            email=email,
            password_hash=hash_password(password)
        )
        self.db.add(new_user)
        await self.db.flush()

        return new_user

    async def login_user(self, email: str, password: str) -> User:
        # alias for authenticate_user, kept for clarity
        return await self.authenticate_user(email, password)

    async def logout_user(self, raw_refresh_token: str) -> None:
        token_hash = RefreshTokenService.hash_token(raw_refresh_token)
        result = await self.db.execute(
            select(RefreshToken).where(RefreshToken.token_hash == token_hash)
        )
        token = result.scalar_one_or_none()
        if token:
            await self.db.delete(token)

    async def refresh_access_token(self, raw_refresh_token: str) -> tuple[str, str]:
        token_hash = RefreshTokenService.hash_token(raw_refresh_token)

        result = await self.db.execute(
            select(RefreshToken).where(RefreshToken.token_hash == token_hash)
        )
        token = result.scalar_one_or_none()
        if not token:
            raise InvalidCredentialsError("Invalid refresh token")

        if token.expires_at < datetime.now(timezone.utc):
            raise InvalidCredentialsError("Refresh token expired")

        user_id = token.user_id
        await self.db.delete(token)

        token_service = RefreshTokenService(self.db)
        new_refresh_token = await token_service.create_refresh_token(user_id)
        new_access_token = create_access_token({
            "sub": str(user_id),
            "roles": ["user"],
        })

        return new_access_token, new_refresh_token

    async def cleanup_expired_refresh_tokens(self) -> int:
        now = datetime.now(timezone.utc)
        stmt = delete(RefreshToken).where(RefreshToken.expires_at < now)

        result = await self.db.execute(stmt)

        return result.rowcount or 0
