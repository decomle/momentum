import { apiFetch } from "@/api/apiFetch"

type CurrentUserRaw = {
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

export type CurrentUser = {
  id: string
  email: string
  createdAt: string
  username: string | null
  firstName: string | null
  lastName: string | null
  timezone: string
  phoneNumber: string | null
  selfIntroduction: string | null
}

export type UpdateCurrentUserProfilePayload = {
  username: string
  firstName: string
  lastName: string
  timezone: string
  phoneNumber?: string
  selfIntroduction?: string
}

type UpdateProfileResponseRaw = {
  username: string | null
  first_name: string | null
  last_name: string | null
  timezone: string
  phone_number: string | null
  self_introduction: string | null
}

export type UpdateProfileResponse = {
  username: string | null
  firstName: string | null
  lastName: string | null
  timezone: string
  phoneNumber: string | null
  selfIntroduction: string | null
}

function mapCurrentUser(raw: CurrentUserRaw): CurrentUser {
  return {
    id: raw.id,
    email: raw.email,
    createdAt: raw.created_at,
    username: raw.username,
    firstName: raw.first_name,
    lastName: raw.last_name,
    timezone: raw.timezone,
    phoneNumber: raw.phone_number,
    selfIntroduction: raw.self_introduction,
  }
}

function mapUpdateProfileResponse(raw: UpdateProfileResponseRaw): UpdateProfileResponse {
  return {
    username: raw.username,
    firstName: raw.first_name,
    lastName: raw.last_name,
    timezone: raw.timezone,
    phoneNumber: raw.phone_number,
    selfIntroduction: raw.self_introduction,
  }
}

export async function getCurrentUser() {
  const res = await apiFetch("/api/users/me", {
    requireAuth: true,
  })

  if (!res.ok) {
    throw new Error((await res.json())?.message || "Failed to load current user")
  }

  const raw: CurrentUserRaw = await res.json()
  return mapCurrentUser(raw)
}

export async function updateCurrentUserProfile(payload: UpdateCurrentUserProfilePayload) {
  const res = await apiFetch("/api/users/me", {
    method: "PATCH",
    requireAuth: true,
    body: JSON.stringify({
      username: payload.username,
      first_name: payload.firstName,
      last_name: payload.lastName,
      timezone: payload.timezone,
      phone_number: payload.phoneNumber,
      self_introduction: payload.selfIntroduction,
    }),
  })

  if (!res.ok) {
    throw new Error((await res.json())?.message || "Failed to update profile")
  }

  const raw: UpdateProfileResponseRaw = await res.json()
  return mapUpdateProfileResponse(raw)
}
