import { getAccessToken } from "@/lib/tokenStore"

export type DashboardMetadataResponse = {
  date: string
  total_habits: number
  completed_today: number
  pending_today: number
  completion_rate: number
  warning_messages: string[]
  ai_message: string
}

export type DashboardHabitResponse = {
  id: string
  name: string
  frequency: string
  description: string
  current_streak: number
  longest_streak: number
  completed_today: boolean
}

export type DashboardResponse = {
  metadata: DashboardMetadataResponse
  habits: DashboardHabitResponse[]
}

export async function getDashboard() {
  const accessToken = getAccessToken()
  if (!accessToken) {
    throw new Error("Missing access token")
  }

  const res = await fetch("/api/dashboard", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  })

  if (!res.ok) {
    let message = "Failed to load dashboard"
    try {
      const data = await res.json()
      message = data?.message || message
    } catch(e) {
      // Keep the default message when body is not JSON.
      console.log('Error on quering dashboard...', e)
    }
    throw new Error(message)
  }

  return res.json() as Promise<DashboardResponse>
}
