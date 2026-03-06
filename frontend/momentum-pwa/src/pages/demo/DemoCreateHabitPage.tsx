import { LeftAlginedHeading } from "@/components/Heading"

export default function DemoCreateHabitPage() {
  return (
    <div className="min-h-full p-4">
      <div className="w-full space-y-8">

        {/* Header */}
        <LeftAlginedHeading heading="Create Habit"/>

        <div className="pt-6 border-t border-neutral-200">
          {/* Form */}
          <form className="space-y-5">

            {/* Habit Name */}
            <div>
              <label className="block text-sm text-neutral-600 mb-1">
                Habit Name
              </label>
              <input
                type="text"
                placeholder="Drink Water"
                className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-300"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm text-neutral-600 mb-1">
                Description
              </label>
              <textarea
                placeholder="Drink 2L of water daily"
                rows={3}
                className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-300"
              />
            </div>

            {/* Frequency */}
            <div>
              <label className="block text-sm text-neutral-600 mb-1">
                Frequency
              </label>
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
            </div>

            {/* Target per Period */}
            <div>
              <label className="block text-sm text-neutral-600 mb-1">
                Target per Period
              </label>
              <input
                type="number"
                min={1}
                defaultValue={1}
                className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-300"
              />
              <p className="text-xs text-neutral-400 mt-1">
                Example: 3 times per week
              </p>
            </div>

            {/* Active Toggle */}
            <div className="flex items-center justify-between border border-neutral-200 rounded-md px-3 py-2">
              <div>
                <p className="text-sm font-medium">Active</p>
                <p className="text-xs text-neutral-400">
                  Disable if you want to pause this habit
                </p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full mt-8 py-2 btn-primary rounded-md transition"
            >
              Create Habit
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}
