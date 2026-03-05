    

import uuid

from sqlalchemy import select, exists, func
from sqlalchemy.orm import selectinload
from pydantic_core import PydanticCustomError

from app.services import BaseService
from app.db.models import User, UserProfile
from app.schemas.user import UserUpdateRequest
from app.db.models.user_profile import UserProfile
from app.schemas.user import UserUpdateRequest


class UserService(BaseService):
    async def get_user(self, user_id: uuid.UUID, with_profile : bool = False) -> User:
        stmp = select(User).where(User.id == user_id)
        if with_profile:
            stmp = stmp.options(selectinload(User.profile))
        result = await self.db.execute(stmp)
        return result.scalar_one_or_none()
    
    async def is_username_registered(self, username: str) -> bool:
        stmt = select(
            exists().where(UserProfile.username == username)
        )
        result = await self.db.execute(stmt)
        return result.scalar()

    async def upsert_profile(
        self,
        user_id: uuid.UUID,
        payload: UserUpdateRequest,
    ) -> UserProfile:

        profile: UserProfile | None = await self.db.get(UserProfile, user_id)
        update_data = payload.model_dump(exclude_unset=True)

        if not profile:
            if "username" not in update_data:
                raise PydanticCustomError( "validations.USERNAME_REQUIRED",
                    "Username is required when creating profile"
                )

            if await self.is_username_registered(update_data["username"]):
                raise PydanticCustomError( "validations.USERNAME_UNIQUE",
                    "Username already exists"
                )

            profile = UserProfile(
                user_id=user_id,
                **update_data,
            )

            self.db.add(profile)
            await self.db.flush()

            return profile

        if "username" in update_data:
            new_username = update_data["username"]

            if new_username != profile.username:
                if await self.is_username_registered(new_username):
                    raise PydanticCustomError( "validations.USERNAME_UNIQUE",
                    "Username already exists"
                )

        for field, value in update_data.items():
            setattr(profile, field, value)

        await self.db.flush()
        return profile