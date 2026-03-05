import { Link } from "react-router-dom"

export default function DemoLoginPage() {
  return (
    <div className="min-h-screen bg-neutral-50 flex justify-center items-center">
      <div className="w-full max-w-md p-4 space-y-6">

        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Momentum</h1>
          <p className="text-sm text-neutral-500">
            Log in to continue your habits
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100">

          <form className="space-y-4">

            {/* Email */}
            <div>
              <label className="block text-sm text-neutral-600 mb-1">
                Email
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-300"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-neutral-600 mb-1">
                Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-300"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition"
            >
              Log in
            </button>

          </form>
        </div>

        {/* Footer */}
        <p className="text-sm text-center text-neutral-500">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-neutral-900 hover:underline"
          >
            Create one
          </Link>
        </p>

      </div>
    </div>
  )
}