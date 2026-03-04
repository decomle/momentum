from .auth import router as auth_router
from .habit import router as habits_router
from .habit_log import router as habit_log_router
from .dashboard import router as dashboard_router
from .user import router as user_router
__all__ = ["auth_router", "habits_router", "habit_log_router", "dashboard_router", "user_router"]
