import { Link } from "react-router-dom"

export default function DemoNotFoundPage() {
  return (
    <div className="min-h-full flex items-center justify-center">
      <div className="w-full max-w-md p-6 text-center space-y-6">

        <Link to="/demo/dashboard" className="block space-y-2">
          <div className="flex items-center justify-center gap-1">
            <img
              src="/icons/generated/m-mark-neutral-120.png"
              alt="Momentum M icon"
              className="w-11 h-11 object-contain"
            />
            <h1 className="-ml-1 text-3xl font-bold tracking-tight leading-none">omentum</h1>
          </div>
          <p className="text-neutral-600 text-sm">
            A calm place to keep your habits moving forward.
          </p>
        </Link>

        <div className="border-t border-neutral-200" />

        <div>
          <h2 className="text-4xl font-semibold text-neutral-900">404</h2>
          <p className="text-sm text-neutral-500 mt-2">
            The page you are looking for does not exist.
          </p>
        </div>

        <button
          className="w-full py-3 btn-primary rounded-md transition"
        >
          Go to Dashboard
        </button>

      </div>
    </div>
  )
}
