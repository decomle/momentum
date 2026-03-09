import { useNavigate, useParams } from "react-router-dom"
import { AuthorCard, ErrorSection, LoadingDots } from "@/components/commons"
import { LeftAlginedHeading } from "@/components/headings"
import { useHabit } from "@/hooks"
import ActionButtonsSection from "@/pages/habit/view/ActionButtonsSection"
import CurrentPeriodSection from "@/pages/habit/view/CurrentPeriodSection"
import RecentPeriodsSection from "@/pages/habit/view/RecentPeriodsSection"
import RecentLogsSection from "@/pages/habit/view/RecentLogsSection"
import StatsSection from "@/pages/habit/view/StatsSection"

export default function HabitViewPage() {
  const navigate = useNavigate()
  const { habit_id: habitId } = useParams<{ habit_id: string }>()
  const { habit, isLoading, isError, error } = useHabit(habitId)

  // 1. Validation: Ensure we actually have an ID from the URL
  if (!habitId) {
    return (
      <div className="p-4">
        <ErrorSection error="Missing habit id." />
      </div>
    )
  }

  // 2. Loading State: Show a clean spinner/dots while fetching
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingDots prefix="Loading habit..." />
      </div>
    )
  }

  // 3. Error or Empty State: Handle API failures or "Not Found"
  if (isError || !habit) {
    return (
      <div className="p-4">
        <ErrorSection error={error || "Habit not found."} />
      </div>
    )
  }

  /** * 4. Happy Path: At this point, TypeScript knows 'habit' is defined.
   * We can now safely access habit.name, habit.id, etc., without '?'
   */
  const displayDescription = habit.description?.trim() || "Small daily steps create lasting momentum."

  return (
    <div className="min-h-full flex justify-center">
      <div className="w-full max-w-md min-h-full p-4 pb-6 flex flex-col">
        {/* Header Section */}
        <LeftAlginedHeading heading={habit.name} desc={displayDescription} />
        <div className="space-y-6">
          <div className="space-y-6 border-t border-neutral-200 pt-6">
            <StatsSection habit={habit} />
            <CurrentPeriodSection habit={habit} />
            <RecentPeriodsSection habit={habit} />
            <RecentLogsSection habit={habit} />

            <ActionButtonsSection
              onLogHabit={() => navigate(`/habits/${habit.id}/log`)}
              onUpdateHabit={() => navigate(`/habits/${habit.id}/update`)}
            />

            {habit.cheerMessage && (
              <div className="text-center text-sm italic text-neutral-500">
                {habit.cheerMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}