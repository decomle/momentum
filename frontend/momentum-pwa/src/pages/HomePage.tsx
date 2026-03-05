import { Link } from "react-router-dom"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
      <div className="w-full max-w-md p-6 space-y-8">

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Momentum
          </h1>

          <p className="text-neutral-600 text-sm">
            A calm place to keep your habits moving forward.
          </p>
        </div>

        {/* Description Card */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-neutral-100 space-y-3">
          <p className="text-sm text-neutral-600">
            Build consistency through small daily actions.
          </p>

          <p className="text-sm text-neutral-600">
            No pressure. No gamification. Just quiet progress.
          </p>
        </div>

        {/* Action */}
        <div className="space-y-3">

          <Link
            to="/login"
            className="block w-full text-center py-2.5 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition"
          >
            Log in
          </Link>

          <p className="text-xs text-neutral-500 text-center">
            Track habits. Maintain streaks. Build momentum.
          </p>

        </div>

      </div>
    </div>
  )
}