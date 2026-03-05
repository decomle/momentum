import { useEffect, useState } from "react"
import { setAccessToken, getAccessToken } from "@/lib/tokenStore"

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    async function init() {
      if (!getAccessToken()) {
        try {
          const res = await fetch("/api/auth/refresh", {
            method: "POST",
            credentials: "include",
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