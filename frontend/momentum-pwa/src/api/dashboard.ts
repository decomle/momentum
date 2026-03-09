import { apiFetch } from "@/api/apiFetch"

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
  isCompletedToday: boolean
}

export type DashboardData = {
  metadata: DashboardMetadata
  habits: DashboardHabit[]
}

const mapDashboard = (r: any): DashboardData => ({
  metadata: {
    ...r.metadata,
    totalHabits: r.metadata.total_habits,
    completedToday: r.metadata.completed_today,
    pendingToday: r.metadata.pending_today,
    completionRate: r.metadata.completion_rate,
    aiMessage: r.metadata.ai_message,
  },
  habits: r.habits.map((h: any) => ({
    ...h,
    currentStreak: h.current_streak,
    longestStreak: h.longest_streak,
    isCompletedToday: h.completed_today,
  })),
})


const handleResponse = async (res: Response, errorMsg: string) => {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || errorMsg);
  }
  return res.json();
}

export async function getDashboard(): Promise<DashboardData> {
  const res = await apiFetch("/api/dashboard", { requireAuth: true });
  
  const data = await handleResponse(res, "Failed to load dashboard");
  
  return mapDashboard(data);
}