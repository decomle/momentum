import { useNavigate } from "react-router-dom"

export default function DemoDashboardPage() {
  const navigate = useNavigate()

  const meta = {
    date: "2026-03-05",
    total_habits: 5,
    completed_today: 2,
    pending_today: 3,
    completion_rate: 40,
    warning_messages: [],
    ai_message: "A fresh start is always possible.",
  }

  const goToHabitLog = () => {
    navigate("/demo/habit_log")
  }

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-md p-4 space-y-5">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Momentum</h1>
          <span className="text-sm text-neutral-500">{meta.date}</span>
        </div>

        {/* Meta */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-100">
          <div className="flex justify-between text-sm text-neutral-600">
            <div>
              <p className="font-medium">{meta.total_habits}</p>
              <p className="text-xs text-neutral-500">Habits</p>
            </div>

            <div>
              <p className="font-medium">{meta.completed_today}</p>
              <p className="text-xs text-neutral-500">Done</p>
            </div>

            <div>
              <p className="font-medium">{meta.pending_today}</p>
              <p className="text-xs text-neutral-500">Pending</p>
            </div>

            <div>
              <p className="font-medium">{meta.completion_rate}%</p>
              <p className="text-xs text-neutral-500">Completion</p>
            </div>
          </div>
        </div>

        {/* AI Message */}
        <div className="text-sm italic text-neutral-500 px-1">
          {meta.ai_message}
        </div>

        {/* Habit Card */}
        <div
          onClick={goToHabitLog}
          className="bg-white rounded-xl p-4 shadow-sm border border-neutral-100 cursor-pointer hover:bg-neutral-50 transition"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-semibold text-lg">Morning Exercise</h2>
              <p className="text-sm text-neutral-500">
                10 minutes of stretching or light workout
              </p>
            </div>

            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-green-500 text-white text-sm">
              ✓
            </div>
          </div>

          <div className="mt-3 text-sm text-neutral-600">
            Daily • 🔥 5 days • 🏆 12 days
          </div>

          <div className="mt-3 text-sm italic text-neutral-500">
            Keep the momentum going.
          </div>
        </div>

        {/* Habit Card */}
        <div
          onClick={goToHabitLog}
          className="bg-white rounded-xl p-4 shadow-sm border border-neutral-100 cursor-pointer hover:bg-neutral-50 transition"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-semibold text-lg">Drink Water</h2>
              <p className="text-sm text-neutral-500">
                At least 8 glasses
              </p>
            </div>

            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-green-500 text-white text-sm">
              ✓
            </div>
          </div>

          <div className="mt-3 text-sm text-neutral-600">
            Daily • 🔥 3 days • 🏆 9 days
          </div>

          <div className="mt-3 text-sm italic text-neutral-500">
            Small habits compound.
          </div>
        </div>

        {/* Habit Card */}
        <div
          onClick={goToHabitLog}
          className="bg-white rounded-xl p-4 shadow-sm border border-neutral-100 cursor-pointer hover:bg-neutral-50 transition"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-semibold text-lg">Read Book</h2>
              <p className="text-sm text-neutral-500">
                Read at least 10 pages
              </p>
            </div>

            <div className="flex items-center justify-center w-7 h-7 rounded-full border border-neutral-300"></div>
          </div>

          <div className="mt-3 text-sm text-neutral-600">
            Daily • 🔥 2 days • 🏆 8 days
          </div>

          <div className="mt-3 text-sm italic text-neutral-500">
            Knowledge compounds over time.
          </div>
        </div>

      </div>
    </div>
  )
}
