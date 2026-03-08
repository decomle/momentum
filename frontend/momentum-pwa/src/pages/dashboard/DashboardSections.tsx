import { useNavigate } from "react-router-dom"

export type DashboardMetadata = {
  totalHabits: number,
  completedToday: number,
  pendingToday: number,
  completionRate: number
}

export const MetadataCard = function ({ totalHabits, completedToday, pendingToday, completionRate }: DashboardMetadata) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-100">
      <div className="flex justify-between text-sm text-neutral-600">
        <div>
          <p className="font-medium">{totalHabits}</p>
          <p className="text-xs text-neutral-500">Habits</p>
        </div>

        <div>
          <p className="font-medium">{completedToday}</p>
          <p className="text-xs text-neutral-500">Done</p>
        </div>

        <div>
          <p className="font-medium">{pendingToday}</p>
          <p className="text-xs text-neutral-500">Pending</p>
        </div>

        <div>
          <p className="font-medium">{completionRate}%</p>
          <p className="text-xs text-neutral-500">Completion</p>
        </div>
      </div>
    </div>
  )
}

export type DashboardHabit = {
  // id: string,
  name: string,
  description?: string,
  done: boolean,
  stats: string,
  note: string
}

export const HabitCard = function ({ habit }: { habit: DashboardHabit }) {
  const navigate = useNavigate();
  const goToHabitLog = () => {
    navigate("/demo/habit_log")
  }
  return (
    <div key={habit.name} onClick={goToHabitLog}
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
  )
}

export const CreateHabitCard = function () {
  const navigate = useNavigate()
  const goToCreateHabit = () => {
    navigate('/demo/create_habit')
  }
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100 text-center">
      <h2 className="text-lg font-semibold">No habits yet</h2>
      <p className="mt-1 text-sm text-neutral-500">
        Start with one small habit and build your momentum.
      </p>
      <button
        onClick={goToCreateHabit}
        className="mt-4 inline-flex items-center justify-center px-4 py-2 rounded-md btn-primary text-sm transition"
      >
        Create your first habit
      </button>
    </div>
  )
}

export const CreateHabitButtons = function ({isAtBottom}: {isAtBottom: boolean}) {
  const navigate = useNavigate()
  const goToCreateHabit = () => {
    navigate('/demo/create_habit')
  }
  return <div className="sticky bottom-[calc(env(safe-area-inset-bottom)+12px)] pointer-events-none">
    <div className="relative h-14 w-full">
      <button
        onClick={goToCreateHabit}
        aria-label="Add habit"
        className={`absolute right-0 bottom-0 w-14 h-14 rounded-full btn-primary text-3xl leading-none shadow-lg flex items-center justify-center transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${isAtBottom
          ? "opacity-0 scale-75 translate-y-1 pointer-events-none"
          : "opacity-100 scale-100 translate-y-0 pointer-events-auto"
          }`}
      >
        +
      </button>

      <button
        onClick={goToCreateHabit}
        aria-label="Add new habit"
        className={`absolute left-0 right-0 bottom-0 h-12 rounded-md btn-primary text-sm font-medium shadow-lg transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${isAtBottom
          ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
          : "opacity-0 scale-95 translate-y-1 pointer-events-none"
          }`}
      >
        Add new Habit
      </button>
    </div>
  </div>
}