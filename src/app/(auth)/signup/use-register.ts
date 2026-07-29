// src/app/(auth)/signup/use-register.ts
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { registerUser } from "./auth.service";
import { toast } from "sonner";
import type { UserRegisterPayload } from "./auth.types";
import { AxiosError } from "axios";

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: UserRegisterPayload) => registerUser(payload),
    onSuccess: (_, variables) => {
      toast.success("Account created successfully! Check your email for OTP verification.");
      router.push(`/verify-otp?email=${encodeURIComponent(variables.email)}`);
    },
    onError: (error: AxiosError<{ detail?: string }>) => {
      const message = error.response?.data?.detail || "Registration failed";
      toast.error(message);
    },
  });
};
