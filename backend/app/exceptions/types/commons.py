class AppException(Exception):
    """Base application exception."""
    def __init__(self, message: str):
        self.message = message
        super().__init__(message)


class NotFoundError(AppException):
    pass

class CommonBusinessConstraintError(AppException):
    def __init__(self, message: str = "Failed business constraits"):
        super().__init__(message)

class HabitArchivedError(AppException):
    def __init__(self, message: str = "Habit is archived and cannot be modified"):
        super().__init__(message)


class LoggingWindowExpiredError(AppException):
    def __init__(self, message: str = "Logging window has expired (older than 2 days)"):
        super().__init__(message)


class FutureDateError(AppException):
    def __init__(self, message: str = "Cannot log for a future date"):
        super().__init__(message)

class InvalidCredentialsError(AppException):
    def __init__(self, message: str = "Invalid credentials"):
        super().__init__(message)


class InvalidUserNameException(AppException):
    def __init__(self, message: str = "Username already exists"):
        super().__init__(message)


class DatabaseTechnicalIssueException(AppException):
    def __init__(self, message: str = "A technical issue occurred. Please try again later"):
        super().__init__(message)
