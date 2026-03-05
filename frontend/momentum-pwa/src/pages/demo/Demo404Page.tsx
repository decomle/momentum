export default function DemoNotFoundPage() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
      <div className="w-full max-w-md p-6 text-center space-y-6">

        <div>
          <h1 className="text-4xl font-semibold text-neutral-900">404</h1>
          <p className="text-sm text-neutral-500 mt-2">
            The page you are looking for does not exist.
          </p>
        </div>

        <button
          className="w-full py-3 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition"
        >
          Go to Dashboard
        </button>

      </div>
    </div>
  )
}