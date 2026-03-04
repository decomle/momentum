from sqlalchemy import select

from app.core.translator import t
import random
from app.services import BaseService

CHEER_MESSAGES = [
    "Small steps every day lead to big results. Keep going 💪",
    "Consistency beats intensity. You showed up today 🔥",
    "One more brick in your foundation. Nice work 🧱",
    "Momentum is building. Don’t stop now 🚀",
    "Discipline is freedom. You're practicing it 💎",
    "Future you is grateful for today’s effort 🙌",
    "Habits shape identity. You're becoming that person 🌱",
    "Another vote for the person you want to be 🗳️",
    "Progress > perfection. Always 📈",
    "Streaks aren’t luck. They’re earned. Nice job ⭐",
]

class HabitAnalyticsService(BaseService):
    # Later be a anaylytic from AI to read mood_score, remarks, streak data
    def generate_cheerful_message(self) -> str:
        return random.choice(CHEER_MESSAGES)

    def generate_ai_message(self, streak: int) -> str:
        if streak == -1:
            return t("habit_analytics.NO_LOGS_MESSAGE")
        elif streak == 0:
            return t("habit_analytics.STREAK_ZERO_MESSAGE")
        elif streak < 5:
            return t("habit_analytics.STREAK_FIVE_AND_UNDER_MESSAGE")
        elif streak < 10:
            return t("habit_analytics.STREAK_TEN_AND_UNDER_MESSAGE")
        else:
            return t("habit_analytics.STREAK_TEN_AND_OVER_MESSAGE")