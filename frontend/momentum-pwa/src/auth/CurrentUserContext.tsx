import { createContext, useContext, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { getCurrentUser, type CurrentUser } from "@/api/user"
import { getAccessToken } from "@/lib/tokenStore"

type CurrentUserContextValue = {
  user: CurrentUser | null
  displayName: string
  isLoading: boolean
}

const CurrentUserContext = createContext<CurrentUserContextValue | undefined>(undefined)

const DEFAULT_VALUE: CurrentUserContextValue = {
  user: null,
  displayName: "there",
  isLoading: false,
}

function toDisplayName(user: CurrentUser | null) {
  if (!user) return "there"

  const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ").trim()
  if (fullName) return fullName
  if (user.username) return user.username

  return user.email.split("@")[0] || "there"
}

export function CurrentUserProvider({ children }: { children: React.ReactNode }) {
  const query = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      if (!getAccessToken()) return null
      return getCurrentUser()
    },
    staleTime: 1000 * 60 * 5,
  })

  const value = useMemo(() => {
    const user = query.data ?? null

    return {
      user,
      displayName: toDisplayName(user),
      isLoading: Boolean(getAccessToken()) && query.isPending,
    }
  }, [query.data, query.isPending])

  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  )
}

export function useCurrentUserContext() {
  return useContext(CurrentUserContext) ?? DEFAULT_VALUE
}
