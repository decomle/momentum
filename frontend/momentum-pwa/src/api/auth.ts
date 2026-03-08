import { apiFetch } from "@/api/apiFetch"
import { type RegisterFormValues } from "@/lib/schemas"

export async function login(email: string, password: string) {
  const res = await apiFetch("/api/auth/login", {
    method: "POST",
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

export async function register(data: RegisterFormValues) {
  const response = await apiFetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({
      username: data.username,
      email: data.email,
      password: data.password,
      first_name: data.firstName,
      last_name: data.lastName,
      phone_number: data.phoneNumber || undefined,
      self_introduction: data.selfIntroduction || undefined,
      timezone: data.timezone,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to create account.");
  }

  return response.json();
}

export async function logout() {
  const res = await apiFetch("/api/auth/logout", {
    method: "POST",
    requireAuth: false,
  })

  if (!res.ok) {
    throw new Error((await res.json())?.message || "Logout failed")
  }

  return res.json()
}
