import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { login as loginApi } from "@/api/auth";
import { setAccessToken } from "@/lib/tokenStore";
import { type LoginFormValues } from "@/lib/schemas";

export default function useLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine where the user was trying to go before being redirected to login
  const from = location.state?.from?.pathname || '/';

  const mutation = useMutation({
    mutationFn: (data: LoginFormValues) => loginApi(data.email, data.password),
    onSuccess: (data) => {
      setAccessToken(data.access_token);
      // Use replace: true so the "Login" page isn't in the back-stack
      navigate(from, { replace: true });
    },
  });

  const clearMessageState = () => {
    if (location.state?.message) {
      navigate(location.pathname, {
        replace: true,
        state: location.state?.from ? { from: location.state.from } : {},
      });
    }
  };

  return {
    loginUser: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error.message : null,
    isError: mutation.isError,
    successMessage: location.state?.message as string | undefined,
    clearMessageState,
  };
}