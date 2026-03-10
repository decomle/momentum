import { Link } from "react-router-dom"

import { type HabitSummary } from "@/api/habit"

type HabitInfoSectionProps = {
  habit: HabitSummary
}

export default function HabitInfoSection({ habit }: HabitInfoSectionProps) {
  return (
    <div className="space-y-4 rounded-xl border border-neutral-100 bg-white p-4 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold">{habit.name}</h2>
        <p className="text-sm text-neutral-500">{habit.description}</p>
      </div>

      <div className="text-sm text-neutral-600">
        {habit.frequency} • 🔥 {habit.currentStreak ?? 0} days • 🏆 {habit.longestStreak ?? 0} days
      </div>

      <div className="flex gap-2 pt-1">
        <Link to={`/habits/${habit.id}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-md border border-neutral-300 py-2 text-sm hover:bg-neutral-100"
        >
          <span>👁</span>
          <span>View</span>
        </Link>

        <Link to={`/habits/${habit.id}/update`}
          className="flex flex-1 items-center justify-center gap-2 rounded-md border border-neutral-300 py-2 text-sm hover:bg-neutral-100"
        >
          <span>✏️</span>
          <span>Edit</span>
        </Link>
      </div>
    </div>
  )
}
