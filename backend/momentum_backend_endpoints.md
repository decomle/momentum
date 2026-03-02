# 🧱 Habit Tracker MVP – Endpoint List

## 🔐 AUTH (MVP readeay)

| Method | Endpoint            | Description |
|--------|--------------------|------------|
| POST   | /auth/register     | Create account |
| POST   | /auth/login        | Login and receive access + refresh token |
| POST   | /auth/refresh      | Rotate refresh token |
| POST   | /auth/logout       | Invalidate refresh token |

---

## 📝 HABITS

| Method | Endpoint              | Description |
|--------|-----------------------|------------|
| POST   | /habits               | Create a new habit - MVP ready|
| GET    | /habits               | List all active habits (optional: include_archived) |
| GET    | /habits/{id}          | Get single habit detail |
| PATCH  | /habits/{id}          | Update habit (name, description, target) |
| DELETE | /habits/{id}          | Soft delete (archive habit) |

---

## ✅ HABIT LOGS

| Method | Endpoint        | Description |
|--------|----------------|------------|
| POST   | /habits/log    | Log completion for a day (idempotent) |
| DELETE | /habits/log    | Remove log for a specific day |

---

## 📊 DASHBOARD

| Method | Endpoint            | Description |
|--------|--------------------|------------|
| GET    | /dashboard/today   | View today's completion status |
| GET    | /dashboard/week    | View weekly progress summary |

---

# 🎯 Core Product Loop

1. Create habit  
2. Log habit  
3. View weekly progress  

Total Endpoints: **13**
