import { useMutation } from "@tanstack/react-query"

import { updateCurrentUserProfile } from "@/api/user"
import { queryClient } from "@/lib/queryClient"
import { type UpdateProfileFormValues } from "@/lib/schemas"

function toNullable(value?: string) {
  const trimmed = value?.trim()
  return trimmed ? trimmed : undefined
}

export default function useUpdateProfile() {
  const mutation = useMutation({
    mutationFn: (data: UpdateProfileFormValues) =>
      updateCurrentUserProfile({
        username: data.username.trim(),
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        timezone: data.timezone,
        phoneNumber: toNullable(data.phoneNumber),
        selfIntroduction: toNullable(data.selfIntroduction),
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["currentUser"] })
    },
  })

  return {
    updateProfile: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error instanceof Error ? mutation.error.message : "Failed to update profile",
  }
}
