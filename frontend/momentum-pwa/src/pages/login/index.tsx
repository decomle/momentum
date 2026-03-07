import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate, useLocation } from "react-router-dom"

import { CenterAlginedHeading } from '@/components/headings'
import { login } from '@/api/auth'
import { setAccessToken } from '@/lib/tokenStore'
import { JammyLoader, LoadingDots, AuthorCard } from '@/components/commons'


export default () => {
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || "/demo/dashboard"

  const mutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),

    onSuccess: (data) => {
      setAccessToken(data.access_token)
      navigate(from, { replace: true })
    },
  })

  function handleSubmit(formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    mutation.mutate({ email, password })
  }

  return (
    <div className="h-full flex px-6 pt-12 pb-6">
      <div className="w-full flex-1 flex flex-col">
        <div className="space-y-8">

          {/* Title */}
          <CenterAlginedHeading />

          <div className="pt-6 border-t border-neutral-200">
            <form className="space-y-4" action={handleSubmit}>

              {/* Email */}
              <div>
                <label className="block text-sm text-neutral-600 mb-1">
                  Email
                </label>

                <input type="email" placeholder="your_email@gmail.com"
                  className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-300"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm text-neutral-600 mb-1">
                  Password
                </label>

                <input type="password" placeholder="******"
                  className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-300"
                />
              </div>

              {/* Login Button */}
              <button type="submit" className="w-full py-2 btn-primary rounded-md transition">
                Log in
              </button>

            </form>
          </div>

          {/* Footer */}
          <p className="text-sm text-center text-neutral-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-neutral-900 hover:underline" >
              Create one
            </Link>
          </p>
        </div>

        <div className="mt-8">
          <JammyLoader desc={<LoadingDots prefix="Remember to install as app for easy access" />}/>
        </div>

        <div className="mt-auto pt-5 border-t border-neutral-200 text-center">
          <AuthorCard />
        </div>

      </div>
    </div>
  )
}