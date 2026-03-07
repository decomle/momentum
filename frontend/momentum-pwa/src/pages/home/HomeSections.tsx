import { Link } from "react-router-dom"

export const HomeDescriptions = () => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-neutral-100 space-y-3">
      <p className="text-sm text-neutral-600">
        Our site can be installed as app, you can continue using it as it or installing it for your convenience
      </p>

      <p className="text-sm text-neutral-600">
        No pressure. No gamification. Just quietly progressing...
      </p>
    </div>
  )
}

export const HomeActions = ({ isLoggedIn = false }: { isLoggedIn: boolean }) => {
  return !isLoggedIn && (
    <div className="space-y-3">
      <Link
        to="/login"
        className="block w-full text-center py-2.5 btn-primary rounded-md transition"
      >
        Login/Create account
      </Link>

      <p className="text-xs text-neutral-500 text-center">
        Track habits. Maintain streaks. Build momentum.
      </p>
    </div>
  )
}