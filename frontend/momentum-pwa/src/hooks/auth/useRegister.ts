import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { register as registerApi } from "@/api/auth";
import { type RegisterFormValues } from "@/lib/schemas";

export default function useRegister() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: RegisterFormValues) => registerApi(data),
    onSuccess: () => {
      navigate("/login", {
        replace: true,
        state: { message: "Account created successfully. Please log in." },
      });
    },
  });

  return {
    registerUser: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error.message : "An error occurred",
    isError: mutation.isError,
  };
}