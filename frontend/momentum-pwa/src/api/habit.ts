import { apiFetch } from "@/api/apiFetch"

export type HabitPeriod = { startDate: string; endDate: string; requiredForSuccess: number; actualLogs: number; isSuccessful: boolean; resultTag: "COMPLETED" | "NOT_COMPLETE" | null }
export type HabitRecentPeriod = { startDate: string; endDate: string; isSuccessful: boolean }
export type HabitRecentLog = { logDate: string; moodScore: number }

export type Habit = {
  id: string; name: string; frequency: string; description: string | null;
  moodMessage: string; cheerMessage: string; currentStreak: number | null;
  longestStreak: number | null; currentPeriod: HabitPeriod;
  recentPeriods: HabitRecentPeriod[]; recentLogs: HabitRecentLog[];
}

export type HabitSummary = {
  id: string; name: string; frequency: string; description: string | null; quote: string;
  targetPerPeriod: number, currentStreak: number | null; longestStreak: number | null;
  completedToday?: boolean; completedYesterday?: boolean; completedTwoDaysAgo?: boolean;
}

export type HabitLog = { id: string; habitId: string; userId: string; logDate: string; moodScore: number; remark: string | null; createdAt: string }
export type LogHabitPayload = { logDate: string; moodScore: number; remark?: string }
export type UpdateHabitPayload = {name: string, description: string | undefined, frequency: string, targetPerPeriod: number}

const mapHabit = (r: any): Habit => ({
  ...r,
  moodMessage: r.mood_message,
  cheerMessage: r.cheer_message,
  currentStreak: r.current_streak,
  longestStreak: r.longest_streak,
  currentPeriod: {
    startDate: r.current_period.start_date,
    endDate: r.current_period.end_date,
    requiredForSuccess: r.current_period.required_for_success,
    actualLogs: r.current_period.actual_logs,
    isSuccessful: r.current_period.is_successful,
    resultTag: r.current_period.result_tag,
  },
  recentPeriods: r.recent_periods.map((p: any) => ({
    startDate: p.start_date,
    endDate: p.end_date,
    isSuccessful: p.is_successful,
  })),
  recentLogs: r.recent_logs.map((l: any) => ({
    logDate: l.log_date,
    moodScore: l.mood_score,
  })),
})

const mapHabitSummary = (r: any): HabitSummary => ({
  ...r,
  targetPerPeriod: r.target_per_period,
  currentStreak: r.current_streak,
  longestStreak: r.longest_streak,
  completedToday: r.completed_today,
  completedYesterday: r.completed_yesterday,
  completedTwoDaysAgo: r.completed_two_days_ago,
})

const mapHabitLog = (r: any): HabitLog => ({
  ...r,
  habitId: r.habit_id,
  userId: r.user_id,
  logDate: r.log_date,
  moodScore: r.mood_score,
  createdAt: r.created_at,
})

// --- 3. Internal Response Helper ---
const handleResponse = async (res: Response, errorMsg: string) => {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || errorMsg);
  }
  return res.json();
}

// --- 4. API Functions ---
export const getHabit = async (id: string): Promise<Habit> => {
  const response = await apiFetch(`/api/habits/${id}`, { requireAuth: true });
  const data = await handleResponse(response, "Failed to load habit");
  return mapHabit(data);
}

export const getHabitSummary = async (id: string): Promise<HabitSummary> => {
  const response = await apiFetch(`/api/habits/${id}/summary`, {requireAuth: true});
  const data = await handleResponse(response, "Failed to load summary");
  return mapHabitSummary(data);
};

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
  const data = await handleResponse(res, "Failed to log habit");
  return mapHabitLog(data);
}

export async function updateHabit(habitId: string, payload: UpdateHabitPayload): Promise<any> {
  const res = await apiFetch(`/api/habits/${habitId}`, {
    method: "PATCH",
    requireAuth: true,
    body: JSON.stringify({
      name: payload.name,
      description: payload.description,
      frequency: payload.frequency,
      target_per_period: payload.targetPerPeriod,
    }),
  })
  const data = await handleResponse(res, "Failed to update habit");
  return mapHabitSummary(data);
}