import { useMutation } from "@tanstack/react-query"
import { type HabitFormValues } from "@/lib/schemas"
import { createHabit } from "@/api/habit"
import { useNavigate } from "react-router-dom"

function toNullable(value?: string) {
  const trimmed = value?.trim()
  return trimmed ? trimmed : undefined
}

export default function useCreateHabit() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: HabitFormValues) =>
      createHabit({
        name: data.name,
        description: toNullable(data.description),
        frequency: data.frequency,
        targetPerPeriod: data.targetPerPeriod
      }),
    onSuccess: async () => {
      navigate("/dashboard", {
        replace: true,
        state: { message: "Habit created successfully" },
      });
    },
  })

  return {
    createHabit: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error instanceof Error ? mutation.error.message : "Failed to update Habit",
  }
}