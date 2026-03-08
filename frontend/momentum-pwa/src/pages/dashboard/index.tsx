import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

import { AuthorCard, JammyLoader } from "@/components/commons"
import { DashboardHeading } from "@/components/headings"
import { LogoutCard, LoadingDots } from "@/components/commons"
import { getDashboard } from "@/api/dashboard"
import { CreateHabitCard, HabitCard, MetadataCard, CreateHabitButtons } from "../dashboard/DashboardSections"

export default function DashboardPage() {
  const navigate = useNavigate()
  const [isAtBottom, setIsAtBottom] = useState(false)

  const dashboardQuery = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  })

  const meta = dashboardQuery.data?.metadata ?? {
    date: "",
    totalHabits: 0,
    completedToday: 0,
    pendingToday: 0,
    completionRate: 0,
    warningMessages: [],
    aiMessage: "",
  }

  const habits = (dashboardQuery.data?.habits ?? []).map((habit) => ({
    name: habit.name,
    description: habit.description,
    done: habit.isCompletedToday,
    stats: `${habit.frequency} • 🔥 ${habit.currentStreak} days • 🏆 ${habit.longestStreak} days`,
    note: habit.description || "Keep the momentum going.",
  }))
  const isLoading = dashboardQuery.isPending
  const isError = dashboardQuery.isError
  const isSuccess = dashboardQuery.isSuccess
  const hasHabits = habits.length > 0
  const errorMessage = dashboardQuery.error instanceof Error
    ? dashboardQuery.error.message
    : "Failed to load dashboard data."


  const handleLogout = () => {
    console.log('Fake logout action')
    navigate("/demo/login", { replace: true })
  }

  useEffect(() => {
    const scrollContainer = document.getElementById("app-scroll-container")
    if (!scrollContainer) return

    const updateBottomState = () => {
      const distanceToBottom =
        scrollContainer.scrollHeight - scrollContainer.scrollTop - scrollContainer.clientHeight
      setIsAtBottom(distanceToBottom <= 16)
    }

    updateBottomState()
    scrollContainer.addEventListener("scroll", updateBottomState, { passive: true })
    window.addEventListener("resize", updateBottomState)

    return () => {
      scrollContainer.removeEventListener("scroll", updateBottomState)
      window.removeEventListener("resize", updateBottomState)
    }
  }, [])

  return (
    <div className="min-h-full flex justify-center">
      <div className="w-full max-w-md min-h-full p-4 pb-6 flex flex-col">
        <div className="space-y-5">

          {/* Header */}
          <DashboardHeading additionalComponent={<LogoutCard onLogout={handleLogout} />} />

          {isLoading && (
            <JammyLoader desc={<LoadingDots prefix="Loading dashboard..." />}/>
          )}

          {isError && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-md px-4 py-3 text-sm">
              {errorMessage}
            </div>
          )}

          {isSuccess && (
            <>
              <MetadataCard
                totalHabits={meta.totalHabits}
                completedToday={meta.completedToday}
                pendingToday={meta.pendingToday}
                completionRate={meta.completionRate}
              />

              <div className="text-sm italic text-neutral-500 px-1">
                {meta.aiMessage}
              </div>

              {hasHabits ? (
                habits.map((habit) => (
                  <HabitCard habit={habit} />
                ))
              ) : (
                <CreateHabitCard />
              )}

              {hasHabits && (
                <CreateHabitButtons isAtBottom={isAtBottom} />
              )}
            </>
          )}

        </div>

        <div className="pt-5 mt-auto border-t border-neutral-200 text-center">
          <AuthorCard />
        </div>
      </div>
    </div>
  )
}
