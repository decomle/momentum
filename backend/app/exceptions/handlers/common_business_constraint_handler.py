from fastapi import Request
from fastapi.responses import JSONResponse
from app.exceptions.types import CommonBusinessConstraintError
from app.core.translator import t

def common_business_constrait_handler(request: Request, exc: CommonBusinessConstraintError):
    return JSONResponse(
        status_code=400,
        content={"errors": [exc.message]},
    )