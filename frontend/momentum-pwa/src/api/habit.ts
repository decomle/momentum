import { apiFetch } from "@/api/apiFetch"

type HabitPeriodRaw = {
  start_date: string
  end_date: string
  required_for_success: number
  actual_logs: number
  is_successful: boolean
  result_tag: "COMPLETED" | "NOT_COMPLETE" | null
}

type HabitRecentPeriodRaw = {
  start_date: string
  end_date: string
  is_successful: boolean
}

type HabitRecentLogRaw = {
  log_date: string
  mood_score: number
}

type HabitRaw = {
  id: string
  name: string
  frequency: string
  description: string | null
  mood_message: string
  cheer_message: string
  current_streak: number | null
  longest_streak: number | null
  current_period: HabitPeriodRaw
  recent_periods: HabitRecentPeriodRaw[]
  recent_logs: HabitRecentLogRaw[]
}

export type HabitPeriod = {
  startDate: string
  endDate: string
  requiredForSuccess: number
  actualLogs: number
  isSuccessful: boolean
  resultTag: "COMPLETED" | "NOT_COMPLETE" | null
}

export type HabitRecentPeriod = {
  startDate: string
  endDate: string
  isSuccessful: boolean
}

export type HabitRecentLog = {
  logDate: string
  moodScore: number
}

export type Habit = {
  id: string
  name: string
  frequency: string
  description: string | null
  moodMessage: string
  cheerMessage: string
  currentStreak: number | null
  longestStreak: number | null
  currentPeriod: HabitPeriod
  recentPeriods: HabitRecentPeriod[]
  recentLogs: HabitRecentLog[]
}

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

function mapHabit(raw: HabitRaw): Habit {
  return {
    id: raw.id,
    name: raw.name,
    frequency: raw.frequency,
    description: raw.description,
    moodMessage: raw.mood_message,
    cheerMessage: raw.cheer_message,
    currentStreak: raw.current_streak,
    longestStreak: raw.longest_streak,
    currentPeriod: {
      startDate: raw.current_period.start_date,
      endDate: raw.current_period.end_date,
      requiredForSuccess: raw.current_period.required_for_success,
      actualLogs: raw.current_period.actual_logs,
      isSuccessful: raw.current_period.is_successful,
      resultTag: raw.current_period.result_tag,
    },
    recentPeriods: raw.recent_periods.map((period) => ({
      startDate: period.start_date,
      endDate: period.end_date,
      isSuccessful: period.is_successful,
    })),
    recentLogs: raw.recent_logs.map((log) => ({
      logDate: log.log_date,
      moodScore: log.mood_score,
    })),
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

export async function getHabit(habitId: string): Promise<Habit> {
  const res = await apiFetch(`/api/habits/${habitId}`, {
    requireAuth: true,
  })

  if (!res.ok) {
    throw new Error((await res.json())?.message || "Failed to load habit")
  }

  const raw: HabitRaw = await res.json()
  return mapHabit(raw)
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
