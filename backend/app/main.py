from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from contextlib import asynccontextmanager

from app.exceptions import validation_exception_handler
from app.db.database import async_engine, Base
from app.i18n import configure_i18n
from app.middlewares import locale_middleware
from app.routers import auth_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # create tables on startup (dev only)
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield


app = FastAPI(lifespan=lifespan)
configure_i18n()

# Middlewares
app.middleware("http")(locale_middleware)

# Routers
app.include_router(auth_router)


# Exception handlers
app.add_exception_handler(
    RequestValidationError,
    validation_exception_handler
)


@app.get("/")
def root():
    return {"message": "Momentum backend running"}