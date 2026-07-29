// src/hooks/use-login.ts
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api/auth";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";
import type { LoginPayload } from "@/types/auth";
import { AxiosError } from "axios";

export const useLogin = () => {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: (payload: LoginPayload) => loginUser(payload),
    onSuccess: (data) => {
      setAuth(data);
      toast.success("Logged in successfully");
      router.push("/dashboard");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message ?? "Login failed");
    },
  });
};
