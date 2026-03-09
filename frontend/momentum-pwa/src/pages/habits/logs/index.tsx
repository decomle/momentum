import { useMemo } from "react"
import { useParams } from "react-router-dom"

import { AuthorCard, ErrorSection, JammyLoader, LoadingDots, MessageCard } from "@/components/commons"
import { LeftAlginedHeading } from "@/components/headings"
import { useHabitSummary } from "@/hooks"
import HabitInfoSection from "@/pages/habits/logs/HabitInfoSection"
import LogSection from "@/pages/habits/logs/LogSection"

export default function HabitLogPage() {
  const { habit_id: habitId } = useParams<{ habit_id: string }>()
  const { summary, isLoading, isError, error } = useHabitSummary(habitId)

  const content = useMemo(() => {
    if (!habitId) {
      return <ErrorSection error="Missing habit id." />
    }

    if (isLoading) {
      return <LoadingDots prefix="Loading habit..." />
    }

    if (isError || !summary) {
      return <ErrorSection error={error} />
    }

    const isAllRecentDaysLogged =
      summary.completedToday &&
      summary.completedYesterday &&
      summary.completedTwoDaysAgo

    return (
      <>
        {isAllRecentDaysLogged ? (
          <>
            <MessageCard message="Great consistency. You have logged all recent 3 days. Keep the momentum going." />
            <JammyLoader />
          </>
        ) : (
          <LogSection habit={summary} />
        )}
        <HabitInfoSection habit={summary} />
      </>
    )
  }, [error, habitId, isError, isLoading, summary])

  return (
    <div className="flex h-full flex-col p-4">
      <div className="flex w-full flex-1 flex-col">
        <LeftAlginedHeading heading="Log Habit" desc="Record your progress for this habit." />

        <div className="space-y-3 border-t border-neutral-200 pt-6">{content}</div>

        <div className="mt-auto border-t border-neutral-200 pt-5 text-center">
          <AuthorCard />
        </div>
      </div>
    </div>
  )
}
