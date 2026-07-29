// src/app/(auth)/verify-otp/use-verify-otp.ts
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { verifyOtp, resendOtp } from "./auth.service";
import { toast } from "sonner";
import type { OTPVerifyPayload, OTPResendPayload } from "./auth.types";
import { AxiosError } from "axios";

export const useVerifyOtp = () => {
  const router = useRouter();

  const verifyMutation = useMutation({
    mutationFn: (payload: OTPVerifyPayload) => verifyOtp(payload),
    onSuccess: () => {
      toast.success("Account verified successfully! Please sign in.");
      router.push("/login");
    },
    onError: (error: AxiosError<{ detail?: string }>) => {
      const message = error.response?.data?.detail || "OTP verification failed";
      toast.error(message);
    },
  });

  const resendMutation = useMutation({
    mutationFn: (payload: OTPResendPayload) => resendOtp(payload),
    onSuccess: () => {
      toast.success("A new OTP has been sent to your email.");
    },
    onError: (error: AxiosError<{ detail?: string }>) => {
      const message = error.response?.data?.detail || "Failed to resend OTP";
      toast.error(message);
    },
  });

  return {
    verifyOtp: verifyMutation.mutate,
    isVerifying: verifyMutation.isPending,
    resendOtp: resendMutation.mutate,
    isResending: resendMutation.isPending,
  };
};
