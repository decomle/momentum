import { Link } from "react-router-dom"
import JammyLoader from "@/components/JammyLoader"

export default function DemoHomePage() {
  return (
    <div className="min-h-full flex justify-center">
      <div className="w-full max-w-md p-6 flex flex-col min-h-full">
        <div className="space-y-8">

          {/* Title */}
          <div className="text-center space-y-2">
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
          </div>

          <JammyLoader/>

          <div className="border-t border-neutral-200" />

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
              className="block w-full text-center py-2.5 btn-primary rounded-md transition"
            >
              Login/Create account
            </Link>

            <p className="text-xs text-neutral-500 text-center">
              Track habits. Maintain streaks. Build momentum.
            </p>
          </div>
        </div>

        <div className="mt-auto pt-5 border-t border-neutral-200 text-center">
          <Link target="_blank"
            to="/author"
            className="text-sm text-neutral-600 underline underline-offset-2 hover:text-neutral-900"
          >
            Wanna know more about the author?
          </Link>
        </div>
      </div>
    </div>
  )
}
