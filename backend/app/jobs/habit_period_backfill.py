import logging
from app.db.database import async_session_maker

from app.services.habit_service import HabitService
from app.services.habit_streak_service import HabitStreakService
from app.services.habit_period_service import HabitPeriodService
from app.utils import TimeZoneUtils
from app.db.transaction import transactional
from app.db.models.habit import Habit

logger = logging.getLogger(__name__)

async def period_backfill_job():
    logger.info("Period backfill job started")
    async with async_session_maker() as db:
        habit_service = HabitService(db)
        habit_period_service = HabitPeriodService(db)
        habit_streak_service = HabitStreakService(db)

        batch_size = 300
        last_created_at = None
        last_id = None
        
        while True:
            habits: list[Habit] = await habit_service.get_active_habits(
                no_of_record=batch_size, 
                last_created_at=last_created_at,
                last_id=last_id,
            )
            if not habits:
                break

            for habit in habits:
                try:
                    user  = habit.user
                    if not user:
                        continue
                    user_timezone = TimeZoneUtils.get_timezone(user)

                    async def back_fill_and_update():
                        has_success_period = await habit_period_service.backfill_missing_periods(habit, user_timezone)
                        if has_success_period:
                            current_streak, longest_streak = await habit_streak_service.evaluate(habit.id, user_timezone)
                            habit.current_streak = current_streak
                            habit.longest_streak = longest_streak

                    await transactional(db, back_fill_and_update)
                except Exception as e:
                    logger.error(f"Error backfilling habit: {e}")
            
            last_habit = habits[-1]
            last_created_at = last_habit.created_at
            last_id = last_habit.id

    logger.info("Period backfill job finished")
