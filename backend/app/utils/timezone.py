# app/utils/timezone.py

from datetime import datetime, date
from zoneinfo import ZoneInfo

DEFAULT_TZ = "Asia/Ho_Chi_Minh"


class TimeZoneUtils:
    @staticmethod
    def get_user_timezone(user) -> ZoneInfo:
        if hasattr(user, "timezone") and user.timezone:
            return ZoneInfo(user.timezone)

        return ZoneInfo(DEFAULT_TZ)

    @staticmethod
    def get_today_for_user(user) -> date:
        tz = TimeZoneUtils.get_user_timezone(user)
        return datetime.now(tz).date()