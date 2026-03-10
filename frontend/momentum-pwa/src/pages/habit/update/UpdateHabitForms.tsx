import { useHabitSummary } from "@/hooks";
import { Link } from "react-router-dom";
import { LoadingDots, ErrorSection } from "@/components/commons";

const inputClass = (hasError: boolean) =>
  `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${hasError ? "border-red-300 focus:ring-red-200" : "border-neutral-200 focus:ring-neutral-300"
  }`

export default function UpdateHabitForms({ habitId }: { habitId: string }) {
  const { summary: habit, isLoading, isError, error: formError } = useHabitSummary(habitId)

  if (isLoading) {
    return <LoadingDots prefix="Loading habit..." />
  }
  if (isError || !habit) {
    return <ErrorSection title="Unable to update habit" error={formError || "There is a techinical error, please try again later"} />
  }
  return (
    <>
      {/* Form */}
      <form className="space-y-4" noValidate>

        {/* Habit name */}
        <div className="space-y-1">
          <label className="mb-1 block text-sm text-neutral-600">Habit name</label>
          <input type="text" name="habitName" className={inputClass(true)} />
          <p className="text-xs text-red-600">Some error</p>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="mb-1 block text-sm text-neutral-600">Description</label>
          <textarea
            rows={3}
            className={inputClass(true)}
          />
          <p className="text-xs text-red-600">Some error</p>

          <p className="text-xs text-neutral-500">
            Optional short explanation of the habit.
          </p>
        </div>

        {/* Frequency */}
        <div className="space-y-1">
          <div className="flex gap-4">
            <label className="inline-flex items-center gap-2 text-sm text-neutral-700">
                    <input
                type="radio"
                name="frequency"
                value="DAILY"
                defaultChecked
                className="w-4 h-4"
              />
              Daily
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-neutral-700">
              <input
                type="radio"
                name="frequency"
                value="WEEKLY"
                className="w-4 h-4"
              />
              Weekly
            </label>
          </div>
          <p className="text-xs text-neutral-500">
            How often this habit should be completed.
          </p>
        </div>

        {/* Target per period */}
        <div className="space-y-1">
          <label className="text-sm text-neutral-600">Target per period</label>
          <input type="number"
              min={1}
              className={inputClass(true)}
            />
          <p className="text-xs text-red-600">Some error</p>
          <p className="text-xs text-neutral-500">
            Example: 1 time per day.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link to="/" className="text-center flex-1 py-3 border border-neutral-300 rounded-md text-sm hover:bg-neutral-100">
            Cancel
          </Link>

          <Link  to="/" className="text-center flex-1 py-3 btn-primary rounded-md transition">
            Update Habit
          </Link>
        </div>
      </form>
    </>
  )
}