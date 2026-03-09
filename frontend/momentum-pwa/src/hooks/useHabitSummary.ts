import { useQuery } from "@tanstack/react-query"

import { getHabitSummary } from "@/api/habit"

export default function useHabitSummary(habitId?: string) {
  const query = useQuery({
    queryKey: ["habitSummary", habitId],
    queryFn: () => getHabitSummary(habitId as string),
    enabled: Boolean(habitId),
  })

  return {
    summary: query.data ?? null,
    isLoading: query.isPending,
    isError: query.isError,
    error: query.error instanceof Error ? query.error.message : "Failed to load habit summary",
    refetch: query.refetch,
  }
}
