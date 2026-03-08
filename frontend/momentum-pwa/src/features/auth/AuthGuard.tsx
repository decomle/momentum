import { Navigate, useLocation } from "react-router-dom"
import { getAccessToken } from "@/lib/tokenStore"

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const token = getAccessToken()
  const location = useLocation()

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}
