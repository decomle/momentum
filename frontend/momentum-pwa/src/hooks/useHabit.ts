import { useQuery } from "@tanstack/react-query"

import { getHabit } from "@/api/habit"

export default function useHabit(habitId?: string) {
  const query = useQuery({
    queryKey: ["habit", habitId],
    queryFn: () => getHabit(habitId as string),
    enabled: Boolean(habitId),
  })

  return {
    habit: query.data ?? null,
    isLoading: query.isPending,
    isError: query.isError,
    error: query.error instanceof Error ? query.error.message : "Failed to load habit",
    refetch: query.refetch,
  }
}
