import { CenterAlginedHeading } from "@/components/headings"
import { Link } from "react-router-dom"

export default function DemoNotFoundPage() {
  return (
    <div className="min-h-full flex items-center justify-center">
      <div className="w-full max-w-md p-6 text-center space-y-6">

        <CenterAlginedHeading desc="A calm place to keep your habits moving forward."/>
        <div className="border-t border-neutral-200" />

        <div>
          <h2 className="text-4xl font-semibold text-neutral-900">404</h2>
          <p className="text-sm text-neutral-500 mt-2">
            The page you are looking for does not exist.
          </p>
        </div>


        <Link to="/demo/dashboard"
          className="block text-center py-2.5 btn-primary rounded-md transition"
        >
          Go to Dashboard
        </Link>

      </div>
    </div>
  )
}
