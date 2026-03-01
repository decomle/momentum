import uuid
from sqlalchemy import (
    String,
    Text,
    DateTime,
    ForeignKey,
    Integer,
    Float,
    Enum,
    Index
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.database import Base
from app.db.enums import HabitFrequency


class Habit(Base):
    __tablename__ = "habits"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    name: Mapped[str] = mapped_column(
        String(120),
        nullable=False
    )

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    frequency: Mapped[HabitFrequency] = mapped_column(
        Enum(HabitFrequency, name="habit_frequency"),
        nullable=False
    )

    target_per_period: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=1
    )

    consistency_window_days: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=30
    )

    weight: Mapped[float] = mapped_column(
        Float,
        nullable=False,
        default=1.0
    )

    created_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )

    archived_at: Mapped[DateTime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True
    )

    # Relationships
    user = relationship("User", back_populates="habits")

    logs = relationship(
        "HabitLog",
        back_populates="habit",
        cascade="all, delete-orphan"
    )

    periods = relationship(
        "HabitPeriod",
        back_populates="habit",
        cascade="all, delete-orphan"
    )

    __table_args__ = (
        Index("ix_habits_user_active", "user_id", "archived_at"),
    )