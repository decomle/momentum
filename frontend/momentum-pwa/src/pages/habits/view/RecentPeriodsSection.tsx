import { type Habit } from "@/api/habit"

type RecentPeriodsSectionProps = {
  habit: Habit
}

export default function RecentPeriodsSection({ habit }: RecentPeriodsSectionProps) {
  return (
    <div className="space-y-3 rounded-xl border border-neutral-100 bg-white p-4 shadow-sm">
      <p className="text-sm font-medium text-neutral-600">Recent periods</p>

      <div className="flex gap-2">
        {habit.recentPeriods.map((period, index) => (
          <div
            key={`${period.startDate}-${index}`}
            className={`flex h-8 flex-1 items-center justify-center rounded-md text-xs ${
              period.isSuccessful ? "bg-green-500 text-white" : "bg-neutral-100 text-neutral-600"
            }`}
          >
            {period.startDate.slice(5)}
          </div>
        ))}
      </div>
    </div>
  )
}
