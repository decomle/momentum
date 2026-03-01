import uuid
from datetime import date
from sqlalchemy import (
    Date,
    DateTime,
    ForeignKey,
    Integer,
    Boolean,
    Index
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func 
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.database import Base


class HabitPeriod(Base):
    __tablename__ = "habit_periods"

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

    start_date: Mapped[date] = mapped_column(
        Date,
        nullable=False
    )

    end_date: Mapped[date] = mapped_column(
        Date,
        nullable=False
    )

    required_count: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    actual_value: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    is_successful: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False
    )

    evaluated_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )

    habit = relationship("Habit", back_populates="periods")

    __table_args__ = (
        Index("ix_habit_periods_habit_start", "habit_id", "start_date"),
    )