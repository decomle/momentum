import { useEffect, useState } from "react"
import { setAccessToken, getAccessToken } from "@/lib/tokenStore"
import { apiFetch } from "@/api/apiFetch"

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    async function init() {
      if (!getAccessToken()) {
        try {
          const res = await apiFetch("/api/auth/refresh", {
            method: "POST",
            requireAuth: false,
          })

          if (res.ok) {
            const data = await res.json()
            setAccessToken(data.access_token)
          }
        } catch(e) {
          console.log({"Error": e})
        }
      }

      setReady(true)
    }

    init()
  }, [])

  if (!ready) {
    return null
  }

  return children
}
