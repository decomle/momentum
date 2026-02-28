# Momentum Backend – Refresh Token Implementation Plan

## Goal

Implement a secure, clean, and scalable refresh token system using:

- Stateless access tokens (JWT)
- Stateful refresh tokens (DB stored)
- Rotation via UPDATE (one row per session)
- Background cleanup job for expired tokens
- HttpOnly cookie for refresh token transport

---

# 1️⃣ Architecture Overview

## Access Token
- Short-lived (~15 minutes)
- Stateless JWT
- Returned in JSON response
- Sent via `Authorization: Bearer <token>`

## Refresh Token
- Long-lived (~7 days)
- Random secure string (NOT JWT)
- Stored hashed in DB
- Sent via HttpOnly cookie
- Rotated on every refresh
- One DB row per session/device

---

# 2️⃣ Database Model

## File: models/refresh_token.py

### Fields

- `id` (UUID, primary key)
- `user_id` (FK → users.id, indexed)
- `token_hash` (indexed)
- `expires_at` (indexed)
- `created_at`
- `updated_at`

### Important Indexes

- `token_hash` → fast lookup during refresh
- `user_id` → logout / revoke all sessions
- `expires_at` → efficient cleanup query

### Design Decision

- ONE row per session
- On rotation → UPDATE row
- On logout → DELETE row
- Do NOT store raw refresh token
- Store SHA256 hash only

---

# 3️⃣ Service Layer

File:

services/refresh_token_service.py

## Responsibilities

### 1️⃣ generate_refresh_token()

- Use `secrets.token_urlsafe(64)`
- Return raw token

---

### 2️⃣ hash_token(token: str)

- Use SHA256
- Return hex digest

---

### 3️⃣ create_session(user_id)

Flow:
- Generate refresh token
- Hash token
- Insert DB row
- Set expiration (now + 7 days)
- Return raw token

---

### 4️⃣ rotate_session(refresh_token)

Flow:
- Hash incoming token
- Find DB row by token_hash
- Validate expiration
- Generate new refresh token
- UPDATE:
  - `token_hash`
  - `expires_at`
- Return new raw token

Important:
- Do NOT insert new row
- Keep one row per device/session

---

### 5️⃣ revoke_session(refresh_token)

Flow:
- Hash token
- Delete row from DB

---

### 6️⃣ cleanup_expired_tokens()

Query:

DELETE FROM refresh_tokens
WHERE expires_at < now()

---

# 4️⃣ API Endpoints

## /auth/login

After verifying credentials:

- Create access token
- Call `create_session()`
- Set refresh token as HttpOnly cookie
- Return access token JSON

Response body example:

{
  "access_token": "...",
  "token_type": "bearer"
}

---

## /auth/refresh

Flow:

1. Read refresh token from cookie
2. Call `rotate_session()`
3. Issue new access token
4. Set new refresh cookie
5. Return new access token JSON

---

## /auth/logout

Flow:

1. Read refresh token from cookie
2. Call `revoke_session()`
3. Delete cookie
4. Return success message

---

# 5️⃣ Cookie Configuration

Set on login and refresh:

- key="refresh_token"
- httponly=True
- secure=True (production)
- samesite="lax"
- max_age=7 days

Reason:

- HttpOnly → Prevent XSS token theft
- Secure → HTTPS only
- SameSite → Basic CSRF mitigation

---

# 6️⃣ Background Cleanup Job

File:

core/background_tasks.py

## Strategy

- Run cleanup every 6–12 hours
- Delete expired refresh tokens

## Implementation Concept

- Use FastAPI lifespan
- Start background async task
- Sleep interval
- Run delete query
- Commit

Note:
If running multiple workers,
each worker runs cleanup independently.
This is safe because DELETE is idempotent.

---

# 7️⃣ Expiration Strategy

Access Token:
- 15 minutes

Refresh Token:
- 7 days

Cleanup Interval:
- Every 6–12 hours

---

# 8️⃣ Security Model

- Refresh tokens stored hashed
- Access tokens stateless
- Rotation on every refresh
- Cookie transport for browser security
- No reuse detection (learning phase)
- No Redis (single DB architecture)

---

# 9️⃣ Folder Structure After Implementation

core/
    background_tasks.py

models/
    refresh_token.py

services/
    refresh_token_service.py

routers/
    auth.py

---

# 🔟 Future Upgrade Path

If scaling later:

- Replace DB storage with Redis
- Add reuse detection logic
- Add device metadata (user_agent, ip_address)
- Add session management endpoint
- Add revoke-all-sessions endpoint

Because logic is isolated in refresh_token_service,
storage backend can be swapped without changing routers.

---

# Final Design Summary

✅ Stateless access tokens  
✅ Stateful refresh tokens  
✅ UPDATE-based rotation  
✅ HttpOnly secure cookie  
✅ Background cleanup job  
✅ Clean service abstraction  
✅ Scalable for personal deployment  
✅ Minimal infrastructure cost  
