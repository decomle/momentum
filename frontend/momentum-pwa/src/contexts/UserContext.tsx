import { createContext, useContext, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { getCurrentUser, type CurrentUser } from "@/api/user"
import { getAccessToken } from "@/lib/tokenStore"
import { useAuth } from "@/hooks"

type UserContextValue = {
  user: CurrentUser | null
  displayName: string
  isLoading: boolean
}

const UserContext = createContext<UserContextValue | undefined>(undefined)

const DEFAULT_USER_VALUE: UserContextValue = {
  user: null,
  displayName: "there",
  isLoading: false,
}

function toDisplayName(user: CurrentUser | null) {
  if (!user) return "there"

  const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ").trim()
  if (fullName) return fullName
  if (user.username) return user.username

  return user.email
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { isReady } = useAuth()
  const query = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      if (!getAccessToken()) return null
      return getCurrentUser()
    },
    staleTime: 1000 * 60 * 5,
    enabled: isReady,
  })

  const value = useMemo(() => {
    const user = query.data ?? null

    return {
      user,
      displayName: toDisplayName(user),
      isLoading: Boolean(getAccessToken()) && query.isPending,
    }
  }, [query.data, query.isPending])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
  return useContext(UserContext) ?? DEFAULT_USER_VALUE
}
