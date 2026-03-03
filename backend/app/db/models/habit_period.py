import uuid

from datetime import date
from sqlalchemy import (
    Date,
    Integer,
    Boolean,
    ForeignKey,
    UniqueConstraint,
    Index,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID

from app.db.database import Base
from app.db.models import Habit


class HabitPeriod(Base):
    __tablename__ = "habit_periods"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    habit_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("habits.id", ondelete="CASCADE"),
        nullable=False,
    )

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )

    start_date: Mapped[date] = mapped_column(
        Date,
        nullable=False,
    )

    end_date: Mapped[date] = mapped_column(
        Date,
        nullable=False,
    )

    effective_target: Mapped[int]  = mapped_column(
        Integer,
        nullable=False,
        default=1,
    )

    required_for_success: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    actual_logs: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
    )

    is_successful: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
    )

    # Relationships
    habit: Mapped["Habit"] = relationship(
        back_populates="periods",
    )

    __table_args__ = (
        UniqueConstraint("habit_id", "start_date"),
        Index("ix_habit_period_user_start", "user_id", "start_date"),
    )