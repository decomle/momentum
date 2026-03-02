from app.exceptions.types import LoggingWindowExpiredError
from fastapi import Request
from fastapi.responses import JSONResponse

def habit_log_windows_handler(request: Request, exc: LoggingWindowExpiredError):
    return JSONResponse(
        status_code=400,
        content={"detail": str(exc)}
    )