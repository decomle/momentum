# 🎨 Frontend Tech Stack (Mobile-First, Installable PWA)

## Core Stack

- React (with Vite)
- TypeScript
- React Router (v6+)
- TanStack Query
- Tailwind CSS
- vite-plugin-pwa

---

## Why This Stack

React + Vite
- Fast dev environment
- Simple SPA setup
- No SSR complexity
- Ideal for internal tool → future SaaS

TypeScript
- Safer refactors as app expands
- Better long-term maintainability

React Router
- Expandable architecture from day one
- Clean route separation:
  / (dashboard)
  /habits/:id
  /login
  /settings

TanStack Query
- Server state management
- Automatic caching
- Retry logic
- Easy optimistic updates
- Foundation for future offline support

Tailwind CSS
- Mobile-first styling
- Fast iteration
- Minimal and controlled design
- No heavy component framework

vite-plugin-pwa
- Installable web app
- Service worker support
- Manifest configuration
- Offline-ready foundation

---

## Folder Structure (Scalable)

src/
  app/
    router.tsx
    providers.tsx
  features/
    auth/
    dashboard/
    habits/
  pages/
    DashboardPage.tsx
    HabitDetailPage.tsx
    LoginPage.tsx
  components/
    layout/
    ui/
  lib/
    api.ts
    queryClient.ts

---

## Deployment

- Build with Vite
- Serve static files via Caddy
- Reverse proxy API → FastAPI backend

---

## Product Direction Alignment

- Mobile-first
- Calm UI
- Installable like native app
- Expandable for future SaaS
- Not overengineered
- Clean separation of concerns