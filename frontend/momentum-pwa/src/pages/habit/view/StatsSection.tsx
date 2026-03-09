import { type Habit } from "@/api/habit"

type StatsSectionProps = {
  habit: Habit
}

export default function StatsSection({ habit }: StatsSectionProps) {
  return (
    <>
      <div className="rounded-xl border border-neutral-100 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between text-sm text-neutral-600">
          <div className="flex-1 text-center">
            <p className="inline-block rounded-md bg-neutral-100 px-2 py-1 text-xs">{habit.frequency}</p>
            <p className="mt-1 text-xs text-neutral-500">Frequency</p>
          </div>

          <div className="h-10 w-px bg-neutral-200" />

          <div className="flex-1 text-center">
            <p className="text-lg font-medium">🏃 {habit.currentStreak ?? 0}</p>
            <p className="text-xs text-neutral-500">Current</p>
          </div>

          <div className="h-10 w-px bg-neutral-200" />

          <div className="flex-1 text-center">
            <p className="text-lg font-medium">🏆 {habit.longestStreak ?? 0}</p>
            <p className="text-xs text-neutral-500">Best</p>
          </div>
        </div>
      </div>

      <div className="text-center text-sm italic text-neutral-500">{habit.moodMessage}</div>
    </>
  )
}
