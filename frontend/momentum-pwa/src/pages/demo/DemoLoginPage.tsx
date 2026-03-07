import { Link } from "react-router-dom"
import { CenterAlginedHeading } from "@/components/headings"
import JammyLoader from "@/components/JammyLoader"

export default function DemoLoginPage() {
  return (
    <div className="h-full flex px-6 pt-12 pb-6">
      <div className="w-full flex-1 flex flex-col">
        <div className="space-y-8">

          {/* Title */}
          <CenterAlginedHeading />

          <div className="pt-6 border-t border-neutral-200">
            <form className="space-y-4">

            {/* Email */}
            <div>
              <label className="block text-sm text-neutral-600 mb-1">
                Email
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-300"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-neutral-600 mb-1">
                Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-300"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-2 btn-primary rounded-md transition"
            >
              Log in
            </button>

            </form>
          </div>

          {/* Footer */}
          <p className="text-sm text-center text-neutral-500">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-neutral-900 hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>

        <div className="mt-8">
          <JammyLoader />
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
