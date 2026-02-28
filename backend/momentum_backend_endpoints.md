# Momentum Backend API Endpoints

## FastAPI Endpoint Specification (v1)

------------------------------------------------------------------------

# 🧠 Core Domains

1.  Auth
2.  User
3.  Goals (North Star)
4.  Weekly Targets
5.  Daily Logs
6.  Analytics / Progress
7.  Health / System

------------------------------------------------------------------------

# 🔐 1. Auth Endpoints

Base: `/auth`

POST /auth/register\
POST /auth/login\
POST /auth/logout\
POST /auth/refresh\
GET /auth/me

### Description

-   `register` → Create new user\
-   `login` → Return access + refresh tokens\
-   `logout` → Invalidate refresh token\
-   `refresh` → Rotate access token\
-   `me` → Return current authenticated user

------------------------------------------------------------------------

# 👤 2. User Profile

Base: `/users`

GET /users/me\
PATCH /users/me\
DELETE /users/me

------------------------------------------------------------------------

# 🎯 3. Goals (North Star)

Base: `/goals`

POST /goals\
GET /goals\
GET /goals/{goal_id}\
PATCH /goals/{goal_id}\
DELETE /goals/{goal_id}

Optional:

PATCH /goals/{goal_id}/activate

------------------------------------------------------------------------

# 📅 4. Weekly Targets

Base: `/weekly-targets`

POST /weekly-targets\
GET /weekly-targets?goal_id=xxx\
GET /weekly-targets/{id}\
PATCH /weekly-targets/{id}\
DELETE /weekly-targets/{id}

------------------------------------------------------------------------

# 📝 5. Daily Logs

Base: `/daily-logs`

POST /daily-logs\
GET /daily-logs\
GET /daily-logs/{id}\
PATCH /daily-logs/{id}\
DELETE /daily-logs/{id}

With date filtering:

GET /daily-logs?from=YYYY-MM-DD&to=YYYY-MM-DD

------------------------------------------------------------------------

# 📊 6. Analytics / Progress

Base: `/analytics`

GET /analytics/dashboard\
GET /analytics/weekly-summary\
GET /analytics/streak\
GET /analytics/heatmap

### Examples

`/analytics/dashboard` returns: - Active goal\
- Weekly progress %\
- Current streak\
- Total hours logged

`/analytics/streak` returns: - current_streak\
- longest_streak\
- last_activity_date

------------------------------------------------------------------------

# 🩺 7. Health / System

GET /health\
GET /health/db

------------------------------------------------------------------------

# 📦 Endpoint Summary

Auth: 5 endpoints\
User: 3 endpoints\
Goals: 5--6 endpoints\
Weekly Targets: 5 endpoints\
Daily Logs: 5 endpoints\
Analytics: 4 endpoints\
Health: 2 endpoints

Approximate total: 29--30 endpoints

------------------------------------------------------------------------

# 🏗 Design Principles

-   Use RESTful resource naming\
-   Avoid action-based endpoints (e.g., `/createGoal`)\
-   Keep domain boundaries clean\
-   Keep analytics endpoints computed (not CRUD)

------------------------------------------------------------------------

Ship first. Refactor second. Scale third. Distribute last.
