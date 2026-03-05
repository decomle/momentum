export default function HabitPage() {
  const habit = {
    name: "Drink",
    description: "Drink 2l per day",
    frequency: "DAILY",
    target_per_period: 1,
    current_streak: 0,
    longest_streak: 10,
    mood_message: "Let restart! today is a good day to start again!",
    cheer_message: "Future you is grateful for today’s effort 🙌",
    current_period: {
      start_date: "2026-03-03",
      is_successful: false,
      actual_logs: 0,
      required_for_success: 1
    },
    recent_periods: [
      { start_date: "2026-03-03", is_successful: false },
      { start_date: "2026-03-02", is_successful: false },
      { start_date: "2026-03-01", is_successful: false },
      { start_date: "2026-02-28", is_successful: false },
      { start_date: "2026-02-27", is_successful: false }
    ]
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex justify-center">
      <div className="w-full max-w-md p-4 space-y-6">

        {/* Back */}
        <button className="text-sm text-neutral-500">
          ← Back
        </button>

        {/* Habit identity */}
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">{habit.name}</h1>
          <p className="text-sm text-neutral-600">
            {habit.description}
          </p>
        </div>

        {/* Frequency */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-100">
          <p className="text-sm text-neutral-600">
            {habit.frequency} • Target {habit.target_per_period}
          </p>
        </div>

        {/* Streaks */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-100 flex justify-between">

          <div>
            <p className="text-lg font-semibold">
              {habit.current_streak}
            </p>
            <p className="text-xs text-neutral-500">
              Current streak
            </p>
          </div>

          <div>
            <p className="text-lg font-semibold">
              {habit.longest_streak}
            </p>
            <p className="text-xs text-neutral-500">
              Longest streak
            </p>
          </div>

        </div>

        {/* Message */}
        <div className="text-sm italic text-neutral-500">
          {habit.mood_message}
        </div>

        {/* Log today */}
        <button className="w-full py-3 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition">
          Log today
        </button>

        {/* History */}
        <div className="space-y-2">

          <h2 className="text-sm text-neutral-600">
            Recent periods
          </h2>

          <div className="bg-white rounded-xl p-3 shadow-sm border border-neutral-100 flex justify-between">

            {habit.recent_periods.map((p, i) => (
              <div
                key={i}
                className={`w-7 h-7 flex items-center justify-center rounded-full text-xs
                ${p.is_successful
                    ? "bg-green-500 text-white"
                    : "border border-neutral-300"
                  }`}
              >
                {p.is_successful ? "✓" : ""}
              </div>
            ))}

          </div>

        </div>

      </div>
    </div>
  )
}