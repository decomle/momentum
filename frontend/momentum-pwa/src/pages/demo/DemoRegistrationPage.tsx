import { useState } from "react"

const TIMEZONES = [
  "Asia/Ho_Chi_Minh",
  "Asia/Bangkok",
]

export default function DemoRegisterPage() {
  const [query, setQuery] = useState("Asia/Ho_Chi_Minh")
  const [open, setOpen] = useState(false)

  const filtered = TIMEZONES.filter((tz) =>
    tz.toLowerCase().includes(query.toLowerCase())
  )

  function selectTimezone(tz: string) {
    setQuery(tz)
    setOpen(false)
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-start justify-center p-4">
      <div className="w-full max-w-md space-y-6">

        <h1 className="text-2xl font-semibold text-neutral-900">
          Create Account
        </h1>

        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-5 space-y-4">

          {/* FORM ERROR */}
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <p className="font-medium">
              We couldn't create your account
            </p>
            <p className="text-red-600 mt-1">
              This username is already taken. Please choose another one.
            </p>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm text-neutral-600 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="yourname"
              className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-300"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-neutral-600 mb-1">
              Email *
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-200"
            />
            <p className="mt-1 text-xs text-red-600">
              Email is required.
            </p>
          </div>

          {/* Name Row */}
          <div className="grid grid-cols-2 gap-3">

            {/* First Name */}
            <div>
              <label className="block text-sm text-neutral-600 mb-1">
                First name *
              </label>
              <input
                type="text"
                placeholder="Dat"
                className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-200"
              />
              <p className="mt-1 text-xs text-red-600">
                First name is required.
              </p>
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm text-neutral-600 mb-1">
                Last name
              </label>
              <input
                type="text"
                placeholder="Phung"
                className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-300"
              />
            </div>

          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-neutral-600 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-300"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm text-neutral-600 mb-1">
              Confirm password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-200"
            />
            <p className="mt-1 text-xs text-red-600">
              Passwords do not match.
            </p>
          </div>

          {/* Timezone Combobox */}
          <div className="relative">
            <label className="block text-sm text-neutral-600 mb-1">
              Timezone
            </label>

            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setOpen(true)
              }}
              onFocus={() => setOpen(true)}
              placeholder="Search timezone"
              className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-300"
            />

            <p className="mt-1 text-xs text-neutral-500">
              Your timezone determines when a new day begins for your habit streaks.
            </p>

            {open && (
              <div className="absolute mt-1 w-full bg-white border border-neutral-200 rounded-md shadow-sm max-h-40 overflow-y-auto z-10">
                {filtered.map((tz) => (
                  <button
                    key={tz}
                    type="button"
                    onClick={() => selectTimezone(tz)}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-neutral-100"
                  >
                    {tz}
                  </button>
                ))}

                {filtered.length === 0 && (
                  <div className="px-3 py-2 text-sm text-neutral-400">
                    No result
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm text-neutral-600 mb-1">
              Phone number (optional)
            </label>
            <input
              type="tel"
              placeholder="+84..."
              className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-300"
            />
          </div>

          {/* Self intro */}
          <div>
            <label className="block text-sm text-neutral-600 mb-1">
              Self introduction (optional)
            </label>
            <textarea
              rows={3}
              placeholder="A few words about yourself..."
              className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-300"
            />
          </div>

          {/* Submit */}
          <button
            type="button"
            className="w-full py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition"
          >
            Create Account
          </button>

        </div>
      </div>
    </div>
  )
}