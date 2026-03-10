import { useMutation } from "@tanstack/react-query"
import { type HabitFormValues } from "@/lib/schemas"
import { updateHabit } from "@/api/habit"
import { queryClient } from "@/lib/queryClient"

function toNullable(value?: string) {
  const trimmed = value?.trim()
  return trimmed ? trimmed : undefined
}

export default function useUpdateHabit(habitId: string) {
  const mutation = useMutation({
    mutationFn: (data: HabitFormValues) =>
      updateHabit(habitId, {
        name: data.habitName,
        description: toNullable(data.description),
        frequency: data.frequency,
        targetPerPeriod: data.targetPerPeriod
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["habitSummary", habitId] })
    },
  })

  return {
    updateHabit: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error instanceof Error ? mutation.error.message : "Failed to update Habit",
  }
}