import { useMutation } from "@tanstack/react-query"

import { logHabit, type LogHabitPayload } from "@/api/habit"
import { queryClient } from "@/lib/queryClient"

export default function useLogHabit(habitId?: string) {
  const mutation = useMutation({
    mutationFn: (payload: LogHabitPayload) => {
      if (!habitId) {
        throw new Error("Missing habit id")
      }
      return logHabit(habitId, payload)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["habitSummary", habitId] })
    },
  })

  return {
    logHabit: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error instanceof Error ? mutation.error.message : "Failed to log habit",
  }
}
