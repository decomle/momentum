import { useEffect, useMemo, useState } from "react"

import { ErrorSection, MessageCard } from "@/components/commons"
import { type HabitSummary } from "@/api/habit"
import { useLogHabit } from "@/hooks"

type LogSectionProps = {
  habit: HabitSummary
}

type DateOptionValue = "today" | "yesterday" | "two_days_ago"

const DATE_OPTIONS: Array<{ label: string; value: DateOptionValue }> = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "2 days ago", value: "two_days_ago" },
]

const MOOD_OPTIONS = [
  { score: -3, emoji: "😫" },
  { score: -2, emoji: "😟" },
  { score: -1, emoji: "🙁" },
  { score: 0, emoji: "🙂" },
  { score: 1, emoji: "😄" },
  { score: 2, emoji: "😁" },
  { score: 3, emoji: "🤩" },
]

function getIsoDateByOption(value: DateOptionValue) {
  const date = new Date()

  if (value === "yesterday") {
    date.setDate(date.getDate() - 1)
  }
  if (value === "two_days_ago") {
    date.setDate(date.getDate() - 2)
  }

  return date.toISOString().slice(0, 10)
}

export default function LogSection({ habit }: LogSectionProps) {
  const [selectedDate, setSelectedDate] = useState<DateOptionValue>("today")
  const [mood, setMood] = useState(0)
  const [remark, setRemark] = useState("")

  const { logHabit, isLoading, isSuccess, isError, error } = useLogHabit(habit.id)

  const availableDateOptions = useMemo(
    () =>
      DATE_OPTIONS.filter((option) => {
        if (option.value === "today") return !habit.completedToday
        if (option.value === "yesterday") return !habit.completedYesterday
        return !habit.completedTwoDaysAgo
      }),
    [habit.completedToday, habit.completedYesterday, habit.completedTwoDaysAgo]
  )

  useEffect(() => {
    if (!availableDateOptions.some((option) => option.value === selectedDate)) {
      setSelectedDate(availableDateOptions[0]?.value ?? "today")
    }
  }, [availableDateOptions, selectedDate])

  const handleSubmit = () => {
    const payload = {
      logDate: getIsoDateByOption(selectedDate),
      moodScore: mood,
      remark: remark.trim() || undefined,
    }

    logHabit(payload)
  }

  const isAllDatesLogged = availableDateOptions.length === 0

  return (
    <div className="space-y-3">
      {isSuccess && <MessageCard message="Habit log saved successfully." />}
      {isError && <ErrorSection title="Failed to save log" error={error} />}

      <div className="space-y-3 rounded-xl border border-neutral-100 bg-white p-4 shadow-sm">
        {availableDateOptions.length <= 1 ? (
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm text-neutral-600">Log date:</p>
            <p className="text-sm italic text-neutral-500">{availableDateOptions[0]?.label ?? "No available date"}</p>
          </div>
        ) : (
          <p className="text-sm text-neutral-600">Log date</p>
        )}

        {availableDateOptions.length > 1 && (
          <div className="flex gap-2">
            {availableDateOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setSelectedDate(option.value)}
                className={`flex-1 rounded-md border py-2 text-sm ${
                  selectedDate === option.value
                    ? "border-neutral-300 bg-neutral-200 text-neutral-700"
                    : "border-neutral-200 text-neutral-600"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-3 rounded-xl border border-neutral-100 bg-white p-4 shadow-sm">
        <p className="text-sm text-neutral-600">How do you feel?</p>

        <div className="flex justify-between">
          {MOOD_OPTIONS.map((option) => (
            <button
              key={option.score}
              type="button"
              onClick={() => setMood(option.score)}
              className={`flex h-10 w-10 items-center justify-center rounded-full border text-xl transition ${
                mood === option.score
                  ? "border-neutral-300 bg-neutral-200"
                  : "border-neutral-300 bg-white hover:bg-neutral-50"
              }`}
            >
              {option.emoji}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-neutral-600">Remark (optional)</p>
        <textarea
          value={remark}
          onChange={(event) => setRemark(event.target.value)}
          placeholder="Write a short note..."
          rows={3}
          className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
        />
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={isLoading || isAllDatesLogged}
        className="btn-primary w-full rounded-md py-3 transition disabled:opacity-50"
      >
        {isLoading ? "Saving..." : isAllDatesLogged ? "All recent dates logged" : "Save log"}
      </button>

      <div className="border-t border-neutral-200 pt-2" />
    </div>
  )
}
