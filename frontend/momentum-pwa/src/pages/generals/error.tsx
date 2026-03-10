import { CenterAlginedHeading } from "@/components/headings"
import { Link } from "react-router-dom"

export default function GlobalErrorPage() {
  return (
    <div className="min-h-screen bg-neutral-100 flex items-start justify-center pt-[15px] px-2">
      <div className="w-full max-w-[375px] h-[min(calc(100dvh-15px),844px)] bg-white shadow-xl ring-1 ring-neutral-300 overflow-hidden rounded-[16px] sm:rounded-[24px]">
        <div id="app-scroll-container" className="h-full overflow-y-auto overflow-x-hidden no-scrollbar">
          <div className="min-h-full flex items-center justify-center">
            <div className="w-full max-w-md p-6 text-center space-y-6">

              <CenterAlginedHeading desc="A calm place to keep your habits moving forward." />
              <div className="border-t border-neutral-200" />

              <div>
                <h2 className="text-4xl font-semibold text-neutral-900">Error</h2>
                <p className="text-sm text-neutral-500 mt-2">
                  I'm sorry for this inconvinience, but something went wrong, please try again later
                </p>
              </div>


              <Link to="/dashboard"
                className="block text-center py-2.5 btn-primary rounded-md transition"
              >
                Go to Dashboard
              </Link>

            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
