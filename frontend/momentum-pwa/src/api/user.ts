import { apiFetch } from "@/api/apiFetch"

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

export type UpdateProfileResponse = Omit<CurrentUser, 'id' | 'email' | 'createdAt'>

const mapCurrentUser = (r: any): CurrentUser => ({
  ...r,
  createdAt: r.created_at,
  firstName: r.first_name,
  lastName: r.last_name,
  phoneNumber: r.phone_number,
  selfIntroduction: r.self_introduction,
})

const mapUpdateProfileResponse = (r: any): UpdateProfileResponse => ({
  username: r.username,
  firstName: r.first_name,
  lastName: r.last_name,
  timezone: r.timezone,
  phoneNumber: r.phone_number,
  selfIntroduction: r.self_introduction,
})

const handleResponse = async (res: Response, errorMsg: string) => {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || errorMsg);
  }
  return res.json();
}

export async function getCurrentUser(): Promise<CurrentUser> {
  const res = await apiFetch("/api/users/me", { requireAuth: true });
  const data = await handleResponse(res, "Failed to load current user");
  return mapCurrentUser(data);
}

export async function updateCurrentUserProfile(
  payload: UpdateCurrentUserProfilePayload
): Promise<UpdateProfileResponse> {
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
  });

  const data = await handleResponse(res, "Failed to update profile");
  return mapUpdateProfileResponse(data);
}