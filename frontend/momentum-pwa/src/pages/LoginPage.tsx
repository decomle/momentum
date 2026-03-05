import { useMutation } from '@tanstack/react-query'
import { login } from '@/api/auth'
import { setAccessToken } from '@/lib/tokenStore'
import { useNavigate, useLocation } from "react-router-dom"

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || "/dashboard"

  const mutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),

    onSuccess: (data) => {
      setAccessToken(data.access_token)
      console.log('logged in')
      navigate(from, { replace: true })
    },
  })

  function handleSubmit(formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    console.log({email, password})

    mutation.mutate({
      email,
      password,
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-sm">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Momentum
        </h1>

        <form className="space-y-4" action={handleSubmit}>
          <div>
            <label className="block text-sm text-neutral-600 mb-1">
              Email
            </label>
            <input type="email" placeholder="you@example.com" name="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-300" />
          </div>

          <div>
            <label className="block text-sm text-neutral-600 mb-1">
              Password
            </label>
            <input type="password" placeholder="••••••••" name="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-300"/>
          </div>

          <button type="submit"
            className="w-full py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition">
            Log in
          </button>
        </form>
      </div>
    </div>
  )
}
