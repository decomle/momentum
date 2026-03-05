export default function DemoHabitPage() {
  const habit = {
    name: "Drink",
    description: "Drink 2l per day",
    frequency: "DAILY",
    current_streak: 0,
    longest_streak: 10,
    mood_message: "Let restart! today is a good day to start again!",
    cheer_message: "Consistency beats intensity. You showed up today 🔥",

    current_period: {
      start_date: "2026-03-03",
      end_date: "2026-03-03",
      required_for_success: 1,
      actual_logs: 0,
      is_successful: false,
    },

    recent_periods: [
      { start_date: "2026-03-03", is_successful: false },
      { start_date: "2026-03-02", is_successful: false },
      { start_date: "2026-03-01", is_successful: false },
      { start_date: "2026-02-28", is_successful: false },
      { start_date: "2026-02-27", is_successful: false },
    ],

    recent_logs: [
      { log_date: "2026-01-10", mood_score: 0 },
      { log_date: "2026-01-09", mood_score: 0 },
      { log_date: "2026-01-08", mood_score: 0 },
      { log_date: "2026-01-07", mood_score: 0 },
      { log_date: "2026-01-06", mood_score: 0 },
    ],
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex justify-center">
      <div className="w-full max-w-md p-4 space-y-5">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold">{habit.name}</h1>
          <p className="text-sm text-neutral-500">{habit.description}</p>
        </div>

        {/* Habit Stats */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-100">
          <div className="flex justify-between text-sm text-neutral-600">

            <div>
              <p className="font-medium">{habit.frequency}</p>
              <p className="text-xs text-neutral-500">Frequency</p>
            </div>

            <div>
              <p className="font-medium">🔥 {habit.current_streak}</p>
              <p className="text-xs text-neutral-500">Current</p>
            </div>

            <div>
              <p className="font-medium">🏆 {habit.longest_streak}</p>
              <p className="text-xs text-neutral-500">Best</p>
            </div>

          </div>
        </div>

        {/* Motivation */}
        <div className="text-sm italic text-neutral-500 px-1">
          {habit.mood_message}
        </div>

        {/* Current Period */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-100 space-y-2">

          <p className="text-sm text-neutral-600 font-medium">
            Current period
          </p>

          <div className="flex justify-between text-sm text-neutral-600">
            <span>
              {habit.current_period.start_date}
            </span>

            <span>
              {habit.current_period.actual_logs} / {habit.current_period.required_for_success}
            </span>
          </div>

          <div className="text-xs text-neutral-500">
            {habit.current_period.is_successful
              ? "Completed"
              : "Not completed yet"}
          </div>

        </div>

        {/* Recent Periods */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-100 space-y-3">

          <p className="text-sm text-neutral-600 font-medium">
            Recent periods
          </p>

          <div className="flex gap-2">

            {habit.recent_periods.map((p, i) => (
              <div
                key={i}
                className={`flex-1 h-8 rounded-md flex items-center justify-center text-xs
                ${
                  p.is_successful
                    ? "bg-green-500 text-white"
                    : "border border-neutral-300 text-neutral-500"
                }`}
              >
                {p.start_date.slice(5)}
              </div>
            ))}

          </div>

        </div>

        {/* Recent Logs */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-100 space-y-3">

          <p className="text-sm text-neutral-600 font-medium">
            Recent logs
          </p>

          <div className="space-y-2">

            {habit.recent_logs.map((log, i) => (
              <div
                key={i}
                className="flex justify-between text-sm text-neutral-600"
              >
                <span>{log.log_date}</span>
                <span>Mood {log.mood_score}</span>
              </div>
            ))}

          </div>

        </div>

        {/* Cheer Message */}
        <div className="text-sm italic text-neutral-500 px-1">
          {habit.cheer_message}
        </div>

        {/* Update Button */}
        <button className="w-full py-3 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition">
          Update Habit
        </button>

      </div>
    </div>
  )
}