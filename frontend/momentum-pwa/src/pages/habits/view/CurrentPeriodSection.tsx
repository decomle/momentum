import { type Habit } from "@/api/habit"

type CurrentPeriodSectionProps = {
  habit: Habit
}

export default function CurrentPeriodSection({ habit }: CurrentPeriodSectionProps) {
  const periodActual = habit.currentPeriod.actualLogs
  const periodRequired = habit.currentPeriod.requiredForSuccess
  const isSingleRequired = periodRequired <= 1
  const isMetTarget = periodActual === periodRequired
  const isOverTarget = periodActual > periodRequired

  return (
    <div className="space-y-3 rounded-xl border border-neutral-100 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-neutral-600">Current period</p>
        {habit.currentPeriod.resultTag === "COMPLETED" && (
          <span className="rounded-full border border-green-200 bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
            Completed
          </span>
        )}
        {habit.currentPeriod.resultTag === "NOT_COMPLETE" && (
          <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
            Not complete
          </span>
        )}
      </div>

      <div className="flex justify-between rounded-md bg-neutral-50 px-3 py-2 text-sm text-neutral-700">
        <span>{habit.currentPeriod.startDate}</span>

        {isSingleRequired ? (
          <span
            className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-xs ${
              periodActual > 0
                ? "bg-green-500 text-white"
                : "border border-neutral-300 text-transparent"
            }`}
          >
            ✓
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5">
            {isMetTarget && (
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs text-white">
                ✓
              </span>
            )}
            {isOverTarget && <span className="text-sm">🔥</span>}
            <span>{periodActual}/{periodRequired}</span>
          </span>
        )}
      </div>
    </div>
  )
}
