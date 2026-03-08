import { apiFetch } from "@/api/apiFetch"

export async function login(email: string, password: string) {
  const res = await apiFetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
    requireAuth: false,
  })

  if (!res.ok) {
    throw new Error((await res.json())?.message || "Invalid credentials")
  }

  return res.json()
}

type RegisterPayload = {
  email: string
  password: string
  username: string
  first_name: string
  last_name: string
  phone_number?: string
  self_introduction?: string
}

export async function register(payload: RegisterPayload) {
  const res = await apiFetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    requireAuth: false,
  })

  if (!res.ok) {
    throw new Error((await res.json())?.message || "Registration failed")
  }

  return res.json()
}
