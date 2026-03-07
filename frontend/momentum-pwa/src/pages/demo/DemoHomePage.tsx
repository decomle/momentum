import { Link } from "react-router-dom"
import JammyLoader from "@/components/JammyLoader"
import { DashboardHeading } from "@/components/headings"
import { AuthorCard } from "@/components/commons"

export default function DemoHomePage() {
  return (
    <div className="min-h-full flex justify-center">
      <div className="w-full max-w-md p-6 flex flex-col min-h-full">
        <div className="space-y-8">

          {/* Title */}
          <DashboardHeading />

          <div className="border-t border-neutral-200" />

          <JammyLoader/>

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
          <AuthorCard />
        </div>
      </div>
    </div>
  )
}
