import { useNavigate } from "react-router-dom"

export default function DemoDashboardPage() {
  const navigate = useNavigate()

  const habits = [
    {
      name: "Morning Exercise",
      description: "10 minutes of stretching or light workout",
      stats: "Daily • 🔥 5 days • 🏆 12 days",
      note: "Keep the momentum going.",
      done: true,
    },
    {
      name: "Drink Water",
      description: "At least 8 glasses",
      stats: "Daily • 🔥 3 days • 🏆 9 days",
      note: "Small habits compound.",
      done: true,
    },
    {
      name: "Read Book",
      description: "Read at least 10 pages",
      stats: "Daily • 🔥 2 days • 🏆 8 days",
      note: "Knowledge compounds over time.",
      done: false,
    },
    {
      name: "Meditate",
      description: "5 minutes mindful breathing",
      stats: "Daily • 🔥 4 days • 🏆 10 days",
      note: "Calm mind, clearer focus.",
      done: true,
    },
    {
      name: "Journal",
      description: "Write 3 short reflections",
      stats: "Daily • 🔥 1 day • 🏆 6 days",
      note: "Small notes build awareness.",
      done: false,
    },
    {
      name: "Language Practice",
      description: "15 minutes vocabulary review",
      stats: "Daily • 🔥 6 days • 🏆 14 days",
      note: "Consistency beats intensity.",
      done: true,
    },
    {
      name: "Evening Walk",
      description: "20 minutes outdoor walk",
      stats: "Daily • 🔥 2 days • 🏆 7 days",
      note: "Movement helps reset the day.",
      done: false,
    },
    {
      name: "No Sugar Soda",
      description: "Avoid sweet drinks today",
      stats: "Daily • 🔥 8 days • 🏆 16 days",
      note: "Your future self will thank you.",
      done: true,
    },
    {
      name: "Plan Tomorrow",
      description: "Set top 3 priorities before bed",
      stats: "Daily • 🔥 3 days • 🏆 11 days",
      note: "Clear plan, smoother morning.",
      done: false,
    },
  ]

  const meta = {
    date: "2026-03-05",
    total_habits: habits.length,
    completed_today: habits.filter((habit) => habit.done).length,
    pending_today: habits.filter((habit) => !habit.done).length,
    completion_rate: Math.round((habits.filter((habit) => habit.done).length / habits.length) * 100),
    warning_messages: [],
    ai_message: "A fresh start is always possible.",
  }

  const goToHabitLog = () => {
    navigate("/demo/habit_log")
  }

  return (
    <div className="min-h-full flex justify-center">
      <div className="w-full max-w-md p-4 space-y-5">

        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5">
              <img
                src="/icons/generated/m-mark-neutral-120.png"
                alt="Momentum M icon"
                className="w-8 h-8 object-contain"
              />
              <h1 className="text-3xl font-bold tracking-tight leading-none">omentum</h1>
            </div>
            <p className="mt-1 text-xs text-neutral-500">Build good habit - build good self</p>
          </div>
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

        {habits.map((habit) => (
          <div
            key={habit.name}
            onClick={goToHabitLog}
            className="bg-white rounded-xl p-4 shadow-sm border border-neutral-100 cursor-pointer hover:bg-neutral-50 transition"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-semibold text-lg">{habit.name}</h2>
                <p className="text-sm text-neutral-500">{habit.description}</p>
              </div>

              {habit.done ? (
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-green-500 text-white text-sm">
                  ✓
                </div>
              ) : (
                <div className="flex items-center justify-center w-7 h-7 rounded-full border border-neutral-300"></div>
              )}
            </div>

            <div className="mt-3 text-sm text-neutral-600">{habit.stats}</div>

            <div className="mt-3 text-sm italic text-neutral-500">{habit.note}</div>
          </div>
        ))}

      </div>
    </div>
  )
}
