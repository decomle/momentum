import { Navigate } from "react-router-dom"
import { getAccessToken } from "@/lib/tokenStore"

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const token = getAccessToken()

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}