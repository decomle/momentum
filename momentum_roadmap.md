# Momentum -- Goal Monitoring App

## Fullstack Learning Roadmap (FastAPI + React + TypeScript)

------------------------------------------------------------------------

# 🎯 Project Objective

Build a goal monitoring system for developers in transition while:

-   Strengthening backend fundamentals (FastAPI, DB design, async)
-   Improving frontend architecture (React + TypeScript)
-   Understanding clean modular monolith design
-   Preparing for future microservice extraction

------------------------------------------------------------------------

# 🧱 Tech Stack

## Backend

-   Python
-   FastAPI
-   Postgres
-   SQLAlchemy
-   Alembic (migrations)

## Frontend

-   React
-   TypeScript
-   TailwindCSS
-   TanStack Query (server state management)

------------------------------------------------------------------------

# 📅 Phase 1 --- Core MVP (Week 1)

### Goal:

Ship a working, ugly, functional product.

## Backend

-   Project structure setup
-   User authentication (JWT or session-based)
-   Models:
    -   User
    -   Goal (North Star)
    -   WeeklyTarget
    -   DailyLog
-   Basic CRUD endpoints
-   Input validation with Pydantic
-   Connect to Postgres
-   Alembic migrations

## Frontend

-   Auth pages (Login/Register)
-   Dashboard page
-   Create goal form
-   Daily log submission
-   Weekly progress display
-   Basic API integration
-   Tailwind layout (minimal design)

## Learning Focus

-   REST principles
-   Request/response lifecycle
-   DB relationships
-   Type-safe API communication

------------------------------------------------------------------------

# 🏗 Phase 2 --- Clean Architecture (Week 2)

### Goal:

Refactor into proper modular monolith.

## Backend Improvements

-   Introduce service layer
-   Introduce repository pattern
-   Dependency injection
-   Proper folder boundaries:

```{=html}
<!-- -->
```
    /modules
      /auth
      /goals
      /tracking
      /analytics

-   Centralized error handling
-   Logging middleware

## Frontend Improvements

-   Extract reusable components
-   Central API client
-   Better TypeScript types
-   Improve state separation:
    -   Server state (TanStack Query)
    -   UI state (local)

## Learning Focus

-   Separation of concerns
-   Clean architecture principles
-   Scalable project structure

------------------------------------------------------------------------

# 📊 Phase 3 --- Advanced Engineering (Week 3)

### Goal:

Add real engineering depth.

## Backend

-   Background job for streak calculation
-   Scheduled weekly metrics snapshot
-   Add caching layer (Redis optional)
-   Rate limiting
-   Structured logging
-   Basic metrics endpoint

## Frontend

-   Progress heatmap (GitHub-style)
-   Weekly analytics graph
-   Optimistic updates
-   Error boundary handling

## Learning Focus

-   Async tasks
-   Performance considerations
-   Observability basics
-   Production readiness

------------------------------------------------------------------------

# 🔄 Phase 4 --- Microservice Extraction (Optional / Learning Mode)

### Goal:

Practice distributed systems.

## Step 1

Extract analytics module into separate service.

## Step 2

Introduce event-driven communication: - Publish event:
`DailyLogCreated` - Analytics service subscribes

## Step 3

Add message broker (Redis Pub/Sub or NATS)

## Step 4

Implement service-to-service authentication

## Learning Focus

-   Event-driven architecture
-   Service boundaries
-   API gateway concepts
-   Distributed system tradeoffs

------------------------------------------------------------------------

# 🧠 Core Data Model

## User

-   id
-   email
-   password_hash
-   created_at

## Goal

-   id
-   user_id
-   title
-   description
-   created_at

## WeeklyTarget

-   id
-   goal_id
-   metric_name
-   target_value
-   week_start
-   week_end

## DailyLog

-   id
-   user_id
-   goal_id
-   duration_minutes
-   description
-   created_at

------------------------------------------------------------------------

# 🚀 Deployment Strategy

## Initial

-   Backend: Render / Railway
-   Frontend: Vercel
-   DB: Managed Postgres

## Later

-   Dockerize backend
-   Add CI/CD pipeline
-   Add environment-based configs

------------------------------------------------------------------------

# 📈 Personal Growth Goals

By the end of this project you should:

-   Fully understand API design
-   Be comfortable with DB schema evolution
-   Know how to structure scalable backend code
-   Understand frontend/server state separation
-   Have practical knowledge of async and background tasks
-   Experience extracting a microservice from a monolith

------------------------------------------------------------------------

# 🏁 Guiding Rule

Ship first. Refactor second. Scale third. Distribute last.

Momentum over perfection.
