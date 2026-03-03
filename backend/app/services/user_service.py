    

import uuid

from sqlalchemy import select

from app.services import BaseService
from app.db.models.user import User

class UserService(BaseService):
    async def get_user(self, user_id: uuid.UUID):
        stmp = select(User).where(User.id == user_id)
        result = await self.db.execute(stmp)
        return result.scalar_one_or_none()