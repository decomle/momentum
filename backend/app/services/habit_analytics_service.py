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

MOTIVATION_QUOTES = [
  "It does not matter how slowly you go as long as you do not stop.",
  "Momentum begets momentum.",
  "The way to get started is to quit talking and begin doing.",
  "A body at rest tends to stay at rest. A body in motion tends to stay in motion.",
  "Small daily improvements are the key to staggering long-term results.",
  "If you're going through hell, keep going.",
  "Don’t watch the clock; do what it does. Keep going.",
  "Keep the wheels turning.",
  "Done is better than perfect.",
  "Focus on the step, not the mountain.",
  "Small wins lead to big victories.",
  "Action is the foundational key to all success.",
  "The secret of getting ahead is getting started.",
  "Start where you are. Use what you have.",
  "A year from now you may wish you had started today.",
  "Don't watch the clock; do what it does. Keep going.",
  "One day or day one. You decide.",
  "Don't stop when you're tired. Stop when you're done.",
  "Discipline is doing what needs to be done even if you don't feel like it.",
  "The only bad workout (or habit) is the one that didn't happen.",
  "You don't have to be great to start, but you have to start to be great.",
  "Continuous improvement is better than delayed perfection.",
  "Your future self will thank you for what you do today.",
  "Success is the sum of small efforts repeated daily.",
  "Don't wait for opportunity. Create it.",
  "Motivation gets you started. Habit keeps you going.",
  "Be stronger than your strongest excuse.",
  "Action cures fear.",
  "The best way out is always through.",
  "You are one habit away from a different life.",
  "Consistency beats intensity.",
  "Focus on progress, not perfection.",
  "Don't give up what you want most for what you want now.",
  "Success is a series of small wins.",
  "Make it happen.",
  "Every strike brings me closer to the next home run.",
  "Dream big. Start small. Act now.",
  "Do it for your future self.",
  "Small steps lead to big destinations.",
  "The only person you should try to be better than is the person you were yesterday.",
  "Hard work beats talent when talent doesn't work hard.",
  "Don't count the days, make the days count.",
  "Persistence pays off.",
  "Stay focused and never give up.",
  "You've got this.",
  "Believe in yourself and all that you are.",
  "Everything you've ever wanted is on the other side of fear.",
  "The only limit to our realization of tomorrow will be our doubts of today.",
  "The struggle you're in today is developing the strength you need for tomorrow.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "The only way to do great work is to love what you do.",
  "In the middle of every difficulty lies opportunity.",
  "The difference between who you are and who you want to be is what you do.",
  "If you want to live a happy life, tie it to a goal, not to people or things.",
  "Don't let yesterday take up too much of today.",
  "You are never too old to set another goal or to dream a new dream.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "It's not about how hard you hit. It's about how hard you can get hit and keep moving forward.",
  "The only way to achieve the impossible is to believe it is possible.",
  "Opportunities don't happen. You create them.",
  "Success is not just about what you accomplish in your life; it's about what you inspire others to do.",
  "Your time is limited, so don't waste it living someone else's life.",
  "The only thing standing between you and your goal is the story you keep telling yourself as to why you can't achieve it.",
  "Keep your eyes on the stars, and your feet on the ground.",
  "Believe you can and you're halfway there.",
  "Change your thoughts and you change your world."
]

class HabitAnalyticsService:
    @staticmethod
    def generate_cheerful_message() -> str:
        return random.choice(CHEER_MESSAGES)
    
    @staticmethod
    def generate_motivation_quote() -> str:
        return random.choice(MOTIVATION_QUOTES)
    
    @staticmethod
    def generate_ai_message(streak: int) -> str:
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