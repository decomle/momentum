import { useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { AuthorCard, ErrorSection, LoadingDots } from "@/components/commons"
import { LeftAlginedHeading } from "@/components/headings"
import { useHabit } from "@/hooks"
import ActionButtonsSection from "@/pages/habits/view/ActionButtonsSection"
import CurrentPeriodSection from "@/pages/habits/view/CurrentPeriodSection"
import RecentPeriodsSection from "@/pages/habits/view/RecentPeriodsSection"
import StatsSection from "@/pages/habits/view/StatsSection"

export default function HabitViewPage() {
  const navigate = useNavigate()
  const { habit_id: habitId } = useParams<{ habit_id: string }>()
  const { habit, isLoading, isError, error } = useHabit(habitId)

  const content = useMemo(() => {
    if (!habitId) {
      return <ErrorSection error="Missing habit id." />
    }

    if (isLoading) {
      return <LoadingDots prefix="Loading habit..." />
    }

    if (isError || !habit) {
      return <ErrorSection error={error} />
    }

    return (
      <>
        <StatsSection habit={habit} />
        <CurrentPeriodSection habit={habit} />
        <RecentPeriodsSection habit={habit} />

        <ActionButtonsSection
          onLogHabit={() => navigate(`/habits/${habit.id}/log`)}
          onUpdateHabit={() => navigate(`/habits/${habit.id}/update`)}
        />

        <div className="text-center text-sm italic text-neutral-500">{habit.cheerMessage}</div>
      </>
    )
  }, [error, habit, habitId, isError, isLoading, navigate])

  return (
    <div className="min-h-full flex justify-center">
      <div className="w-full max-w-md min-h-full p-4 pb-6 flex flex-col">
        <div className="space-y-6">
          <LeftAlginedHeading
            heading={habit?.name || "Habit"}
            desc={habit?.description?.trim() || "Small daily steps create lasting momentum."}
          />

          <div className="space-y-6 border-t border-neutral-200 pt-6">{content}</div>
        </div>

        <div className="pt-5 mt-auto border-t border-neutral-200 text-center">
          <AuthorCard />
        </div>
      </div>
    </div>
  )
}
