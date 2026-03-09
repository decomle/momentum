import { apiFetch } from "@/api/apiFetch"

export type CurrentUser = {
  id: string
  email: string
  created_at: string
  username: string | null
  first_name: string | null
  last_name: string | null
  timezone: string
  phone_number: string | null
  self_introduction: string | null
}

export type UpdateCurrentUserProfilePayload = {
  username: string
  first_name: string
  last_name: string
  timezone: string
  phone_number?: string
  self_introduction?: string
}

export type UpdateProfileResponse = {
  username: string | null
  first_name: string | null
  last_name: string | null
  timezone: string
  phone_number: string | null
  self_introduction: string | null
}

export async function getCurrentUser() {
  const res = await apiFetch("/api/users/me", {
    requireAuth: true,
  })

  if (!res.ok) {
    throw new Error((await res.json())?.message || "Failed to load current user")
  }

  return res.json() as Promise<CurrentUser>
}

export async function updateCurrentUserProfile(payload: UpdateCurrentUserProfilePayload) {
  const res = await apiFetch("/api/users/me", {
    method: "PATCH",
    requireAuth: true,
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error((await res.json())?.message || "Failed to update profile")
  }

  return res.json() as Promise<UpdateProfileResponse>
}
