import logging
from app.db.database import async_session_maker
from app.services.auth_service import AuthService
from app.db.transaction import transactional

logger = logging.getLogger(__name__)

async def cleanup_job():
    logger.info("Cleanup job started")

    try:
        db = async_session_maker()
        auth_service = AuthService(db)
        deleted = await transactional(db, lambda: auth_service.cleanup_expired_refresh_tokens())

        logger.info(f"Cleanup job finished. Deleted {deleted} expired tokens.")
    except Exception as e:
        logger.error(f"Error during cleanup job: {e}")
    finally:
        logger.info("Cleanup job ended")
    
    