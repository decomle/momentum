import { apiFetch } from "@/api/apiFetch"

type HabitSummaryRaw = {
  id: string
  name: string
  frequency: string
  description: string | null
  quote: string
  current_streak: number | null
  longest_streak: number | null
  completed_today: boolean
  completed_yesterday: boolean
  completed_two_days_ago: boolean
}

export type HabitSummary = {
  id: string
  name: string
  frequency: string
  description: string | null
  quote: string
  currentStreak: number | null
  longestStreak: number | null
  completedToday: boolean
  completedYesterday: boolean
  completedTwoDaysAgo: boolean
}

type HabitLogRaw = {
  id: string
  habit_id: string
  user_id: string
  log_date: string
  mood_score: number
  remark: string | null
  created_at: string
}

export type HabitLog = {
  id: string
  habitId: string
  userId: string
  logDate: string
  moodScore: number
  remark: string | null
  createdAt: string
}

export type LogHabitPayload = {
  logDate: string
  moodScore: number
  remark?: string
}

function mapHabitSummary(raw: HabitSummaryRaw): HabitSummary {
  return {
    id: raw.id,
    name: raw.name,
    frequency: raw.frequency,
    description: raw.description,
    quote: raw.quote,
    currentStreak: raw.current_streak,
    longestStreak: raw.longest_streak,
    completedToday: raw.completed_today,
    completedYesterday: raw.completed_yesterday,
    completedTwoDaysAgo: raw.completed_two_days_ago,
  }
}

function mapHabitLog(raw: HabitLogRaw): HabitLog {
  return {
    id: raw.id,
    habitId: raw.habit_id,
    userId: raw.user_id,
    logDate: raw.log_date,
    moodScore: raw.mood_score,
    remark: raw.remark,
    createdAt: raw.created_at,
  }
}

export async function getHabitSummary(habitId: string): Promise<HabitSummary> {
  const res = await apiFetch(`/api/habits/${habitId}/summary`, {
    requireAuth: true,
  })

  if (!res.ok) {
    throw new Error((await res.json())?.message || "Failed to load habit summary")
  }

  const raw: HabitSummaryRaw = await res.json()
  return mapHabitSummary(raw)
}

export async function logHabit(habitId: string, payload: LogHabitPayload): Promise<HabitLog> {
  const res = await apiFetch(`/api/habits/${habitId}/logs`, {
    method: "POST",
    requireAuth: true,
    body: JSON.stringify({
      log_date: payload.logDate,
      mood_score: payload.moodScore,
      remark: payload.remark,
    }),
  })

  if (!res.ok) {
    throw new Error((await res.json())?.message || "Failed to log habit")
  }

  const raw: HabitLogRaw = await res.json()
  return mapHabitLog(raw)
}
