import { useMutation } from "@tanstack/react-query"
import { deleteHabit } from "@/api/habit"
import { useNavigate } from "react-router-dom"

export default function useDeleteHabit(habitId: string) {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => deleteHabit(habitId),
    onSuccess: async () => {
      navigate("/dashboard", {
        replace: true,
        state: { message: "Habit archived successfully" },
      });
    },
  })

  return {
    deleteHabit: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error instanceof Error ? mutation.error.message : "Failed to delete Habit",
  }
}