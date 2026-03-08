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
  id: string,
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