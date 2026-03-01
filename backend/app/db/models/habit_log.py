import uuid
from datetime import date as datetype
from sqlalchemy import (
    Date,
    DateTime,
    ForeignKey,
    Integer,
    UniqueConstraint,
    Index
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.database import Base


class HabitLog(Base):
    __tablename__ = "habit_logs"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    habit_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("habits.id", ondelete="CASCADE"),
        nullable=False
    )

    log_date: Mapped[datetype] = mapped_column(
        Date,
        nullable=False,
        index=True
    )

    value: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=1
    )

    created_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )

    habit = relationship("Habit", back_populates="logs")

    __table_args__ = (
        UniqueConstraint("habit_id", "log_date", name="uq_habit_log_date"),
        Index("ix_habit_logs_habit_logdate", "habit_id", "log_date"),
    )