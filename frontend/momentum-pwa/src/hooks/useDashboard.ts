import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "@/api/dashboard";
import { useMemo } from "react";

export default function useDashboard() {
  const query = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });

  // 1. Transform Metadata with fallbacks
  const metadata = useMemo(() => ({
    totalHabits: query.data?.metadata?.totalHabits ?? 0,
    completedToday: query.data?.metadata?.completedToday ?? 0,
    pendingToday: query.data?.metadata?.pendingToday ?? 0,
    completionRate: query.data?.metadata?.completionRate ?? 0,
    aiMessage: query.data?.metadata?.aiMessage ?? "Keep the momentum going!",
  }), [query.data?.metadata]);

  // 2. Transform Habits for the UI cards
  const habits = useMemo(() => (query.data?.habits ?? []).map((habit: any) => ({
    id: habit.id,
    name: habit.name,
    done: habit.isCompletedToday,
    stats: `${habit.frequency} • 🔥 ${habit.currentStreak} days • 🏆 ${habit.longestStreak} days`,
    note: habit.description || "Keep the momentum going.",
  })), [query.data?.habits]);

  return {
    metadata,
    habits,
    hasHabits: habits.length > 0,
    isLoading: query.isPending,
    isError: query.isError,
    isSuccess: query.isSuccess,
    errorMessage: query.error instanceof Error ? query.error.message : "Failed to load dashboard.",
    refetch: query.refetch,
  };
}