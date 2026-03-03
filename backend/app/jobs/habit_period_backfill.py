import logging
from app.db.database import async_session_maker

from app.services.habit_service import HabitService
from app.services.habit_period_service import HabitPeriodService
from app.services.user_service import UserService
from app.utils import TimeZoneUtils
from app.db.transaction import transactional
from app.db.models.habit import Habit

logger = logging.getLogger(__name__)

async def period_backfill_job():
    logger.info("Period backfill job started")
    db = async_session_maker()
    habit_service = HabitService(db)
    user_service = UserService(db)
    habit_period_service = HabitPeriodService(db)

    batch_size = 300
    offset = 0

    last_created_at = None
    last_id = None
    
    while True:
        habits: list[Habit] = await habit_service.get_active_habits(
            no_of_record=batch_size, 
            offset=offset,
            last_created_at=last_created_at,
            last_id=last_id
        )
        if not habits:
            break

        for habit in habits:
            print("Working on", habit.name)
            try:
                user  = await user_service.get_user(habit.user_id)
                if not user:
                    continue

                await transactional(db, 
                    lambda: habit_period_service.backfill_missing_periods(
                        habit, 
                        TimeZoneUtils.get_timezone(user)
                    )
                )
            except Exception as e:
                logger.error(f"Error backfilling habit {habit.id}: {e}")
        
        last_habit = habits[-1]
        last_created_at = last_habit.created_at
        last_id = last_habit.id
        offset += batch_size

    logger.info("Period backfill job finished")
