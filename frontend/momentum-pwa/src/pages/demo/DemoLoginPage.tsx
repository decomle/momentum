import { Link } from "react-router-dom"

export default function DemoLoginPage() {
  return (
    <div className="min-h-full flex items-start px-6 pt-12 pb-6">
      <div className="w-full space-y-8">

        {/* Title */}
        <Link to="/demo/dashboard" className="block text-center">
          <div className="flex items-center justify-center gap-1">
            <img
              src="/icons/generated/m-mark-neutral-120.png"
              alt="Momentum M icon"
              className="w-11 h-11 object-contain"
            />
            <h1 className="-ml-1 text-3xl font-bold tracking-tight leading-none">omentum</h1>
          </div>
          <p className="text-sm text-neutral-500">
            Log in to continue your habits
          </p>
        </Link>

        <div className="pt-6 border-t border-neutral-200">
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
            className="w-full py-2 btn-primary rounded-md transition"
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
