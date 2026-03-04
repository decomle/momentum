from apscheduler.schedulers.asyncio import AsyncIOScheduler
# trigger by interval (eg. every 24 hours) 
# from apscheduler.triggers.interval import IntervalTrigger
from apscheduler.triggers.cron import CronTrigger
from zoneinfo import ZoneInfo

from app.jobs import cleanup_job, period_backfill_job

scheduler = AsyncIOScheduler(timezone=ZoneInfo("Asia/Ho_Chi_Minh"))

def start_scheduler():
    scheduler.add_job(
        cleanup_job,
        trigger=CronTrigger(hour=0, minute=0),
        id="refresh_token_cleanup",
        replace_existing=True,
    )

    scheduler.add_job(
        period_backfill_job,
        trigger=CronTrigger(hour=0, minute=5),
        id="habit_period_backfill",
        replace_existing=True,
    )

    scheduler.start()