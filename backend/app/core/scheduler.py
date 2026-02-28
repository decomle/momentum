from apscheduler.schedulers.asyncio import AsyncIOScheduler
# trigger by interval (every 24 hours) 
# from apscheduler.triggers.interval import IntervalTrigger
from apscheduler.triggers.cron import CronTrigger
from zoneinfo import ZoneInfo

from backend.app.jobs.cleanup import cleanup_job

scheduler = AsyncIOScheduler(timezone=ZoneInfo("Asia/Ho_Chi_Minh"))

def start_scheduler():
    scheduler.add_job(
        cleanup_job,
        trigger=CronTrigger(hour=19, minute=0),
        id="refresh_token_cleanup",
        replace_existing=True,
    )

    scheduler.start()