import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function DemoDashboardPage() {
  const navigate = useNavigate()
  const [isAtBottom, setIsAtBottom] = useState(false)

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

  const completedToday = habits.filter((habit) => habit.done).length
  const pendingToday = habits.length - completedToday
  const completionRate = habits.length > 0
    ? Math.round((completedToday / habits.length) * 100)
    : 0

  const meta = {
    date: "2026-03-05",
    lunar: "03/12",
    total_habits: habits.length,
    completed_today: completedToday,
    pending_today: pendingToday,
    completion_rate: completionRate,
    warning_messages: [],
    ai_message: "A fresh start is always possible.",
  }

  const goToHabitLog = () => {
    navigate("/demo/habit_log")
  }

  const goToCreateHabit = () => {
    navigate("/demo/create_habit")
  }

  useEffect(() => {
    const scrollContainer = document.getElementById("app-scroll-container")
    if (!scrollContainer) return

    const updateBottomState = () => {
      const distanceToBottom =
        scrollContainer.scrollHeight - scrollContainer.scrollTop - scrollContainer.clientHeight
      setIsAtBottom(distanceToBottom <= 16)
    }

    updateBottomState()
    scrollContainer.addEventListener("scroll", updateBottomState, { passive: true })
    window.addEventListener("resize", updateBottomState)

    return () => {
      scrollContainer.removeEventListener("scroll", updateBottomState)
      window.removeEventListener("resize", updateBottomState)
    }
  }, [])

  return (
    <div className="min-h-full flex justify-center">
      <div className="w-full max-w-md p-4 pb-24 space-y-5">

        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-1">
              <img
                src="/icons/generated/m-mark-neutral-120.png"
                alt="Momentum M icon"
                className="w-12 h-12 object-contain"
              />
              <h1 className="-ml-1 text-4xl font-bold tracking-tight leading-none">omentum</h1>
            </div>
            <p className="mt-1 text-xs text-neutral-500">Build good habits - good life - good self</p>
          </div>
          <div className="self-end text-right leading-tight">
            <p className="text-sm text-neutral-500">{meta.date}</p>
            <p className="mt-0.5 text-xs text-neutral-500">Lunar: {meta.lunar}</p>
          </div>
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

        {habits.length === 0 ? (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100 text-center">
            <h2 className="text-lg font-semibold">No habits yet</h2>
            <p className="mt-1 text-sm text-neutral-500">
              Start with one small habit and build your momentum.
            </p>
            <button
              onClick={goToCreateHabit}
              className="mt-4 inline-flex items-center justify-center px-4 py-2 rounded-md bg-neutral-900 text-white text-sm hover:bg-neutral-800 transition"
            >
              Create your first habit
            </button>
          </div>
        ) : (
          habits.map((habit) => (
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
          ))
        )}

        {habits.length > 0 && (
          <div className="sticky bottom-4 pointer-events-none">
            <div className="relative h-14 w-full">
              <button
                onClick={goToCreateHabit}
                aria-label="Add habit"
                className={`absolute right-0 bottom-0 w-14 h-14 rounded-full bg-neutral-900 text-white text-3xl leading-none shadow-lg hover:bg-neutral-800 flex items-center justify-center transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
                  isAtBottom
                    ? "opacity-0 scale-75 translate-y-1 pointer-events-none"
                    : "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                }`}
              >
                +
              </button>

              <button
                onClick={goToCreateHabit}
                aria-label="Add new habit"
                className={`absolute left-0 right-0 bottom-0 h-12 rounded-md bg-neutral-900 text-white text-sm font-medium shadow-lg hover:bg-neutral-800 transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
                  isAtBottom
                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 scale-95 translate-y-1 pointer-events-none"
                }`}
              >
                Add new Habit
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
