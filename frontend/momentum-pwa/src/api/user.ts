import { apiFetch } from "@/api/apiFetch"

export type CurrentUser = {
  id: string
  email: string
  created_at: string
  username: string | null
  first_name: string | null
  last_name: string | null
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
