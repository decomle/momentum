import { LeftAlginedHeading } from "@/components/Heading"

export default function DemoWeeklyHabitPage() {
  const habit = {
    name: "Meet friend",
    description: "Let meetup with the hoomies",
    frequency: "WEEKLY",
    current_streak: 0,
    longest_streak: 10,
    mood_message: "Let restart! today is a good day to start again!",
    cheer_message: "Consistency beats intensity. You showed up today 🔥",

    current_period: {
      start_date: "2026-03-02",
      end_date: "2026-03-08",
      required_for_success: 5,
      actual_logs: 6,
      is_successful: true,
      result_tag: "COMPLETED" as "COMPLETED" | "NOT_COMPLETE" | null,
    },

    recent_periods: [
      { start_date: "2026-02-23", end_date: "2026-03-01", is_successful: true },
      { start_date: "2026-02-16", end_date: "2026-02-22", is_successful: false },
      { start_date: "2026-02-09", end_date: "2026-02-15", is_successful: true },
      { start_date: "2026-02-02", end_date: "2026-02-08", is_successful: false },
      { start_date: "2026-01-26", end_date: "2026-02-01", is_successful: true },
    ],

    recent_logs: [
      { log_date: "2026-03-08", mood_score: 1 },
      { log_date: "2026-03-07", mood_score: 0 },
      { log_date: "2026-03-06", mood_score: 2 },
      { log_date: "2026-03-05", mood_score: -1 },
      { log_date: "2026-03-04", mood_score: 3 },
      { log_date: "2026-03-03", mood_score: -2 },
      { log_date: "2026-03-02", mood_score: -3 },
    ],
  }
  const headingSlogan =
    habit.description?.trim() || "Small daily steps create lasting momentum."
  const periodActual = habit.current_period.actual_logs
  const periodRequired = habit.current_period.required_for_success
  const isMetTarget = periodActual === periodRequired
  const isOverTarget = periodActual > periodRequired
  const moodEmojiByScore: Record<number, string> = {
    "-3": "😫",
    "-2": "😟",
    "-1": "🙁",
    0: "🙂",
    1: "😄",
    2: "😁",
    3: "🤩",
  }

  return (
    <div className="min-h-full flex justify-center">
      <div className="w-full max-w-md p-4 space-y-6">

        {/* Header */}
        <LeftAlginedHeading heading={habit.name} desc={headingSlogan} />

        <div className="pt-6 border-t border-neutral-200 space-y-6">
          {/* Habit Stats */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-100">
            <div className="flex items-center justify-between text-sm text-neutral-600">

              <div className="text-center flex-1">
                <p className="text-xs bg-neutral-100 px-2 py-1 rounded-md inline-block">
                  {habit.frequency}
                </p>
                <p className="text-xs text-neutral-500 mt-1">Frequency</p>
              </div>

              <div className="w-px h-10 bg-neutral-200" />

              <div className="text-center flex-1">
                <p className="font-medium text-lg">🏃 {habit.current_streak}</p>
                <p className="text-xs text-neutral-500">Current</p>
              </div>

              <div className="w-px h-10 bg-neutral-200" />

              <div className="text-center flex-1">
                <p className="font-medium text-lg">🏆 {habit.longest_streak}</p>
                <p className="text-xs text-neutral-500">Best</p>
              </div>

            </div>
          </div>

          {/* Motivation */}
          <div className="text-sm italic text-neutral-500 text-center">
            {habit.mood_message}
          </div>

          {/* Current Period */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-100 space-y-3">

            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-neutral-600">
                Current period
              </p>
              {habit.current_period.result_tag === "COMPLETED" && (
                <span className="text-xs text-green-700 font-medium bg-green-50 border border-green-200 rounded-full px-2 py-0.5">
                  Completed
                </span>
              )}
              {habit.current_period.result_tag === "NOT_COMPLETE" && (
                <span className="text-xs text-amber-700 font-medium bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
                  Not complete
                </span>
              )}
            </div>

            <div className="bg-neutral-50 rounded-md px-3 py-2 flex justify-between text-sm text-neutral-700">
              <span>{habit.current_period.start_date}</span>

              <span className="inline-flex items-center gap-1.5">
                {isMetTarget && (
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full text-xs bg-green-500 text-white">
                    ✓
                  </span>
                )}
                {isOverTarget && <span className="text-sm">🔥</span>}
                <span>{periodActual}/{periodRequired}</span>
              </span>
            </div>

          </div>

          {/* Recent Periods */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-100 space-y-3">

            <p className="text-sm font-medium text-neutral-600">
              Recent periods
            </p>

            <div className="flex gap-2">

              {habit.recent_periods.map((p, i) => (
                <div
                  key={i}
                  className={`flex-1 h-8 rounded-md flex items-center justify-center text-xs
                ${p.is_successful
                      ? "bg-green-500 text-white"
                      : "bg-neutral-100 text-neutral-600"
                    }`}
                >
                  {p.start_date.slice(5)}
                </div>
              ))}

            </div>

          </div>

          {/* Recent Logs */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-100 space-y-3">

            <p className="text-sm font-medium text-neutral-600">
              Recent logs
            </p>

            <div className="space-y-2">

              {habit.recent_logs.map((log, i) => (
                <div
                  key={i}
                  className="flex justify-between text-sm text-neutral-600"
                >
                  <span>{log.log_date}</span>
                  <span>{moodEmojiByScore[log.mood_score] ?? "🙂"}</span>
                </div>
              ))}

            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">

            <button className="flex-1 py-3 btn-primary rounded-md transition flex items-center justify-center gap-2">
              ✏️ Log Habit
            </button>

            <button className="flex-1 py-3 border border-neutral-300 rounded-md hover:bg-neutral-100 transition flex items-center justify-center gap-2">
              ⚙️ Update Habit
            </button>

          </div>

          {/* Cheer Message */}
          <div className="text-sm italic text-neutral-500 text-center">
            {habit.cheer_message}
          </div>
        </div>

      </div>
    </div>
  )
}
