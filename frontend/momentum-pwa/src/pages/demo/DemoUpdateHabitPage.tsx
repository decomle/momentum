import { useState } from "react"

export default function DemoUpdateHabitPage() {
  const [name, setName] = useState("Drink Water")
  const [description, setDescription] = useState("Drink at least 2L per day")
  const [frequency, setFrequency] = useState("DAILY")
  const [target, setTarget] = useState(1)

  const formError = "Unable to update habit. Please try again."
  const nameError = "Habit name is required."

  return (
    <div className="min-h-full flex justify-center">
      <div className="w-full max-w-md p-4 space-y-6">
        {/* Title */}
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            <img
              src="/icons/generated/m-mark-neutral-120.png"
              alt="Momentum M icon"
              className="w-10 h-10 object-contain"
            />
            <h1 className="text-2xl font-semibold tracking-tight">Update Habit</h1>
          </div>

          <p className="text-sm text-neutral-500">
            Modify the habit details.
          </p>
        </div>

        <div className="pt-6 border-t border-neutral-200 space-y-6">
          {/* Form Error */}
          {formError && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-md px-4 py-3 text-sm">
              {formError}
            </div>
          )}

          {/* Form */}
          <div className="space-y-4">

            {/* Habit Name */}
            <div className="space-y-1">
              <label className="text-sm text-neutral-600">
                Habit name
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-neutral-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
              />

              {nameError && (
                <p className="text-xs text-red-600">
                  {nameError}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-sm text-neutral-600">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full border border-neutral-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
              />

              <p className="text-xs text-neutral-500">
                Optional short explanation of the habit.
              </p>
            </div>

            {/* Frequency */}
            <div className="space-y-1">
              <label className="text-sm text-neutral-600">
                Frequency
              </label>

              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full border border-neutral-200 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-neutral-300"
              >
                <option value="DAILY">Daily</option>
                <option value="WEEKLY">Weekly</option>
              </select>

              <p className="text-xs text-neutral-500">
                How often this habit should be completed.
              </p>
            </div>

            {/* Target per Period */}
            <div className="space-y-1">
              <label className="text-sm text-neutral-600">
                Target per period
              </label>

              <input
                type="number"
                min={1}
                value={target}
                onChange={(e) => setTarget(Number(e.target.value))}
                className="w-full border border-neutral-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
              />

              <p className="text-xs text-neutral-500">
                Example: 1 time per day.
              </p>
            </div>

          </div>

          {/* Actions */}
          <div className="flex gap-2">

            <button className="flex-1 py-3 border border-neutral-300 rounded-md text-sm hover:bg-neutral-100">
              Cancel
            </button>

            <button className="flex-1 py-3 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition">
              Update Habit
            </button>

          </div>
        </div>

      </div>
    </div>
  )
}
