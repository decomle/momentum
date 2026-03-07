import { useState } from "react"
import { LeftAlginedHeading } from "@/components/headings"
import { AuthorCard } from "@/components/commons"

export default function DemoUpdateHabitPage() {
  const [name, setName] = useState("Drink Water")
  const [description, setDescription] = useState("Drink at least 2L per day")
  const [frequency, setFrequency] = useState("DAILY")
  const [target, setTarget] = useState(1)

  const formError = "Unable to update habit. Please try again."
  const nameError = "Habit name is required."

  return (
    <div className="h-full flex flex-col p-4">
      <div className="w-full flex-1 flex flex-col">
        {/* Title */}
        <LeftAlginedHeading heading="Update Habit" desc="Modify the habit details." />

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

              <div className="flex gap-4">
                <label className="inline-flex items-center gap-2 text-sm text-neutral-700">
                  <input
                    type="radio"
                    name="frequency"
                    value="DAILY"
                    checked={frequency === "DAILY"}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-4 h-4"
                  />
                  Daily
                </label>
                <label className="inline-flex items-center gap-2 text-sm text-neutral-700">
                  <input
                    type="radio"
                    name="frequency"
                    value="WEEKLY"
                    checked={frequency === "WEEKLY"}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-4 h-4"
                  />
                  Weekly
                </label>
              </div>

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

            <button className="flex-1 py-3 btn-primary rounded-md transition">
              Update Habit
            </button>

          </div>
        </div>

        <div className="mt-auto pt-5 border-t border-neutral-200 text-center">
          <AuthorCard />
        </div>

      </div>
      
    </div>
  )
}
