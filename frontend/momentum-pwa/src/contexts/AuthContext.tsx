import { createContext, useContext, useEffect, useMemo, useState } from "react"

import { refreshAccessToken } from "@/api/auth"
import { getAccessToken, setAccessToken } from "@/lib/tokenStore"

type AuthContextValue = {
  isReady: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const DEFAULT_AUTH_VALUE: AuthContextValue = {
  isReady: false,
  isAuthenticated: false,
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(getAccessToken()))

  useEffect(() => {
    async function init() {
      if (!getAccessToken()) {
        try {
          const data = await refreshAccessToken()
          setAccessToken(data.access_token)
          setIsAuthenticated(true)
        } catch {
          setIsAuthenticated(false)
        }
      }

      setIsReady(true)
    }

    init()
  }, [])

  const value = useMemo(
    () => ({ isReady, isAuthenticated }),
    [isReady, isAuthenticated]
  )

  if (!isReady) return null

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext) ?? DEFAULT_AUTH_VALUE
}
