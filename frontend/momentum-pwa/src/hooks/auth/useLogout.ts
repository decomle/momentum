import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

import { logout as logoutApi } from "@/api/auth"
import { clearAccessToken } from "@/lib/tokenStore"
import { queryClient } from "@/lib/queryClient"

export default function useLogout() {
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      clearAccessToken()
      queryClient.clear()
      navigate("/", { replace: true })
    },
    onError: () => {
      clearAccessToken()
      queryClient.clear()
      navigate("/", { replace: true })
    },
  })

  return {
    logoutUser: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error.message : null,
    isError: mutation.isError,
  }
}
