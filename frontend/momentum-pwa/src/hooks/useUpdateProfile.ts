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
        first_name: data.firstName.trim(),
        last_name: data.lastName.trim(),
        timezone: data.timezone,
        phone_number: toNullable(data.phoneNumber),
        self_introduction: toNullable(data.selfIntroduction),
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
