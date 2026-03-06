import { useState } from "react"

export default function DemoHabitLogPage() {
  const [selectedDate, setSelectedDate] = useState("today")
  const [mood, setMood] = useState(0)

  const habit = {
    name: "Morning Exercise",
    description: "10 minutes of stretching or light workout",
    frequency: "Daily",
    current_streak: 5,
    longest_streak: 12,
  }

  return (
    <div className="min-h-full flex justify-center">
      <div className="w-full max-w-md p-4 space-y-6">
        {/* Title */}
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            <img
              src="/icons/generated/m-mark-neutral-120.png"
              alt="Momentum M icon"
              className="w-10 h-10 object-contain"
            />
            <h1 className="text-2xl font-semibold tracking-tight">Log Habit</h1>
          </div>
          <p className="text-sm text-neutral-500">
            Record your progress for this habit.
          </p>
        </div>

        <div className="pt-6 border-t border-neutral-200 space-y-6">
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

          {/* Log Date */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-100 space-y-3">
            <p className="text-sm text-neutral-600">Log date</p>

            <div className="flex gap-2">

              {[
                { label: "Today", value: "today" },
                { label: "Yesterday", value: "yesterday" },
                { label: "2 days ago", value: "two_days" },
              ].map((d) => (
                <button
                  key={d.value}
                  onClick={() => setSelectedDate(d.value)}
                  className={`flex-1 py-2 text-sm rounded-md border
                ${selectedDate === d.value
                      ? "bg-neutral-900 text-white border-neutral-900"
                      : "border-neutral-200 text-neutral-600"
                    }`}
                >
                  {d.label}
                </button>
              ))}

            </div>
          </div>

          {/* Mood */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-100 space-y-3">
            <p className="text-sm text-neutral-600">
              Mood
            </p>

            <div className="flex justify-between">

              {[-3, -2, -1, 0, 1, 2, 3].map((m) => (
                <button
                  key={m}
                  onClick={() => setMood(m)}
                  className={`w-9 h-9 flex items-center justify-center rounded-full text-sm
                ${mood === m
                      ? "bg-neutral-900 text-white"
                      : "border border-neutral-300 text-neutral-600"
                    }`}
                >
                  {m}
                </button>
              ))}

            </div>

            <p className="text-xs text-neutral-500">
              -3 very low · 0 neutral · +3 great
            </p>
          </div>

          {/* Remark */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-100 space-y-2">
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
          <button className="w-full py-3 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition">
            Save log
          </button>
        </div>

      </div>
    </div>
  )
}
