import { useEffect, useState } from "react"
import { LeftAlginedHeading } from "@/components/headings"
import { AuthorCard } from "@/components/commons"

export default function DemoHabitLogPage() {
  const [selectedDate, setSelectedDate] = useState("today")
  const [mood, setMood] = useState(0)
  const dateOptions = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "2 days ago", value: "two_days" },
  ]
  const alreadyLoggedByOption: Record<string, boolean> = {
    yesterday: false,
    two_days: false,
  }
  const availableDateOptions = dateOptions.filter(
    (option) => option.value === "today" || !alreadyLoggedByOption[option.value]
  )
  const moodOptions = [
    { score: -3, emoji: "😫" },
    { score: -2, emoji: "😟" },
    { score: -1, emoji: "🙁" },
    { score: 0, emoji: "🙂" },
    { score: 1, emoji: "😄" },
    { score: 2, emoji: "😁" },
    { score: 3, emoji: "🤩" },
  ]

  const habit = {
    name: "Morning Exercise",
    description: "10 minutes of stretching or light workout",
    frequency: "Daily",
    current_streak: 5,
    longest_streak: 12,
  }

  useEffect(() => {
    if (!availableDateOptions.some((option) => option.value === selectedDate)) {
      setSelectedDate(availableDateOptions[0]?.value ?? "today")
    }
  }, [availableDateOptions, selectedDate])

  return (
    <div className="min-h-full flex justify-center">
      <div className="w-full max-w-md p-4">
        {/* Heading */}
        <LeftAlginedHeading heading="Log Habit" desc="Record your progress for this habit." />

        <div className="pt-6 border-t border-neutral-200 space-y-2">
          {/* Log Date */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-100 space-y-3">
            {availableDateOptions.length === 1 ? (
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm text-neutral-600">Log date:</p>
                <p className="text-sm text-neutral-500 italic">Today</p>
              </div>
            ) : (
              <p className="text-sm text-neutral-600">Log date</p>
            )}

            {availableDateOptions.length > 1 && (
              <div className="flex gap-2">

                {availableDateOptions.map((d) => (
                  <button
                    key={d.value}
                    onClick={() => setSelectedDate(d.value)}
                    className={`flex-1 py-2 text-sm rounded-md border
                ${selectedDate === d.value
                        ? "bg-neutral-200 border-neutral-300 text-neutral-700"
                        : "border-neutral-200 text-neutral-600"
                      }`}
                  >
                    {d.label}
                  </button>
                ))}

              </div>
            )}
          </div>

          {/* Mood */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-100 space-y-3">
            <p className="text-sm text-neutral-600">
              How do you feel?
            </p>

            <div className="flex justify-between">

              {moodOptions.map((m) => (
                <button
                  key={m.score}
                  onClick={() => setMood(m.score)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-xl transition
                ${mood === m.score
                      ? "bg-neutral-200 border border-neutral-300"
                      : "border border-neutral-300 bg-white hover:bg-neutral-50"
                    }`}
                >
                  {m.emoji}
                </button>
              ))}

            </div>
          </div>

          {/* Remark */}
          <div className="space-y-2">
            <p className="text-sm text-neutral-600">
              Remark (optional)
            </p>

            <textarea
              placeholder="Write a short note..."
              rows={3}
              className="w-full border border-neutral-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
            />
          </div>

          {/* Submit */}
          <button className="w-full py-3 btn-primary rounded-md transition">
            Save log
          </button>

          <div className="pt-2 border-t border-neutral-200" />

          {/* Habit Info */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-100 space-y-4">

            <div>
              <h2 className="font-semibold text-lg">
                {habit.name}
              </h2>
              <p className="text-sm text-neutral-500">
                {habit.description}
              </p>
            </div>

            <div className="text-sm text-neutral-600">
              {habit.frequency} • 🔥 {habit.current_streak} days • 🏆 {habit.longest_streak} days
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-1">

              <button className="flex-1 flex items-center justify-center gap-2 py-2 text-sm border border-neutral-300 rounded-md hover:bg-neutral-100">
                <span>👁</span>
                <span>View</span>
              </button>

              <button className="flex-1 flex items-center justify-center gap-2 py-2 text-sm border border-neutral-300 rounded-md hover:bg-neutral-100">
                <span>✏️</span>
                <span>Edit</span>
              </button>

            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
