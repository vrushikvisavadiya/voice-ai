// src/app/(auth)/login/use-login.ts
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginUser, fetchMe } from "./auth.service";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";
import type { LoginPayload } from "./auth.types";
import { AxiosError } from "axios";

export const useLogin = () => {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: (payload: LoginPayload) => loginUser(payload),
    onSuccess: async (tokenData) => {
      setAuth(tokenData);
      try {
        const userData = await fetchMe();
        setUser(userData);
      } catch {
        // me fetch error handled silently or fallback
      }
      toast.success("Logged in successfully!");
      router.push("/dashboard");
    },
    onError: (error: AxiosError<{ detail?: string }>) => {
      const message = error.response?.data?.detail || "Invalid credentials or login failed";
      toast.error(message);
    },
  });
};
