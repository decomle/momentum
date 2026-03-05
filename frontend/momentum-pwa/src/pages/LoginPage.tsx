export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-sm">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Momentum
        </h1>

        <form className="space-y-4">
          <div>
            <label className="block text-sm text-neutral-600 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-300"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-600 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-300"
              placeholder="••••••••"
            />
          </div>

          <button
            type="button"
            className="w-full py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  )
}