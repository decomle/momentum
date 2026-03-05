import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-semibold tracking-tight">
        Hello, This is Momentum
      </h1>

      <Link
        to="/login"
        className="px-4 py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition"
      >
        Go to Login
      </Link>
    </div>
  )
}

export default Home