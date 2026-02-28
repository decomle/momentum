import logging
from app.db.database import async_session_maker
from app.services.auth_service import cleanup_expired_refresh_tokens

logger = logging.getLogger(__name__)

async def cleanup_job():
    logger.info("Cleanup job started")

    try:
        async with async_session_maker() as db:
            deleted = await cleanup_expired_refresh_tokens(db)

        logger.info(f"Cleanup job finished. Deleted {deleted} expired tokens.")
    except Exception as e:
        logger.error(f"Error during cleanup job: {e}")
    finally:
        logger.info("Cleanup job ended")
    
    