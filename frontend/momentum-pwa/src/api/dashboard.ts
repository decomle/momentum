import { apiFetch } from "@/api/apiFetch"

// --- 1. Raw API Shapes (Snake Case from Python) ---
type DashboardMetadataRaw = {
  date: string
  total_habits: number
  completed_today: number
  pending_today: number
  completion_rate: number
  warning_messages: string[]
  ai_message: string
}

type DashboardHabitRaw = {
  id: string
  name: string
  frequency: string
  description: string
  quote: string
  current_streak: number
  longest_streak: number
  completed_today: boolean
}

type DashboardResponseRaw = {
  metadata: DashboardMetadataRaw
  habits: DashboardHabitRaw[]
}

// --- 2. Clean Frontend Types (Camel Case for React) ---
export type DashboardMetadata = {
  date: string
  totalHabits: number
  completedToday: number
  pendingToday: number
  completionRate: number
  warningMessages: string[]
  aiMessage: string
}

export type DashboardHabit = {
  id: string
  name: string
  frequency: string
  description: string
  quote: string
  currentStreak: number
  longestStreak: number
  isCompletedToday: boolean // Renamed for better boolean clarity
}

export type DashboardData = {
  metadata: DashboardMetadata
  habits: DashboardHabit[]
}

export async function getDashboard(): Promise<DashboardData> {
  const res = await apiFetch("/api/dashboard", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    requireAuth: true,
  })

  if (!res.ok) {
    let message = "Failed to load dashboard"
    try {
      const data = await res.json()
      message = data?.message || message
    } catch (e) {
      console.error('Error querying dashboard...', e)
    }
    throw new Error(message)
  }

  const raw: DashboardResponseRaw = await res.json()

  // Manual Mapping: Transform snake_case to camelCase
  return {
    metadata: {
      date: raw.metadata.date,
      totalHabits: raw.metadata.total_habits,
      completedToday: raw.metadata.completed_today,
      pendingToday: raw.metadata.pending_today,
      completionRate: raw.metadata.completion_rate,
      warningMessages: raw.metadata.warning_messages,
      aiMessage: raw.metadata.ai_message,
    },
    habits: raw.habits.map((habit) => ({
      id: habit.id,
      name: habit.name,
      frequency: habit.frequency,
      description: habit.description,
      quote: habit.quote,
      currentStreak: habit.current_streak,
      longestStreak: habit.longest_streak,
      isCompletedToday: habit.completed_today,
    })),
  }
}
