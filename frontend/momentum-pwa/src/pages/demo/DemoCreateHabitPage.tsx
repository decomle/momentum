export default function DemoCreateHabitPage() {
  return (
    <div className="min-h-full flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6 space-y-6">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-xl font-semibold">Create Habit</h1>
          <p className="text-sm text-neutral-500">
            Start building a better routine today.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">

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
            <select className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-300">
              <option value="DAILY">Daily</option>
              <option value="WEEKLY">Weekly</option>
              <option value="MONTHLY">Monthly</option>
            </select>
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
            className="w-full py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition"
          >
            Create Habit
          </button>
        </form>

      </div>
    </div>
  )
}
