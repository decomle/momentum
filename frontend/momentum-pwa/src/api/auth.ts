import { apiFetch } from "@/api/apiFetch"
import { type RegisterFormValues } from "@/lib/schemas"

export type AuthResponse = {
  accessToken: string
}

const handleResponse = async (res: Response, errorMsg: string) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.message || errorMsg);
  }
  return data;
}

const mapToken = (r: any): AuthResponse => ({
  accessToken: r.access_token,
})

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    requireAuth: false,
  })

  const data = await handleResponse(res, "Invalid credentials")
  return mapToken(data)
}

export async function refreshAccessToken(): Promise<AuthResponse> {
  const res = await apiFetch("/api/auth/refresh", {
    method: "POST",
    requireAuth: false,
  })

  const data = await handleResponse(res, "Session refresh failed")
  return mapToken(data)
}

export async function register(data: RegisterFormValues): Promise<AuthResponse> {
  const res = await apiFetch("/api/auth/register", {
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
  })

  const responseData = await handleResponse(res, "Failed to create account.")
  return mapToken(responseData)
}

export async function logout(): Promise<void> {
  const res = await apiFetch("/api/auth/logout", {
    method: "POST",
    requireAuth: false,
  })

  await handleResponse(res, "Logout failed")
}