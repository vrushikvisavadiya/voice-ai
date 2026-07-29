"use client";

import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema, type OtpFormData } from "./auth.schema";
import { useVerifyOtp } from "./use-verify-otp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function VerifyOtpForm() {
  const searchParams = useSearchParams();
  const emailFromUrl = searchParams.get("email") || "";

  const { verifyOtp, isVerifying, resendOtp, isResending } = useVerifyOtp();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      email: emailFromUrl,
      otp_code: "",
    },
  });

  const currentEmail = watch("email");

  const onSubmit = (data: OtpFormData) => {
    verifyOtp({
      email: data.email,
      otp_code: data.otp_code,
      purpose: "registration",
    });
  };

  const handleResend = () => {
    if (!currentEmail) return;
    resendOtp({
      email: currentEmail,
      purpose: "registration",
    });
  };

  return (
    <div className="w-full max-w-md space-y-6 rounded-2xl border border-border bg-card p-8 shadow-sm">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Verify your email</h1>
        <p className="text-sm text-muted-foreground">
          Enter the 6-digit verification code sent to your email
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            disabled={isVerifying}
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="otp_code">6-Digit Code</Label>
          <Input
            id="otp_code"
            type="text"
            maxLength={6}
            placeholder="123456"
            className="text-center text-lg tracking-widest"
            {...register("otp_code")}
            disabled={isVerifying}
          />
          {errors.otp_code && <p className="text-xs text-destructive">{errors.otp_code.message}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={isVerifying}>
          {isVerifying ? "Verifying..." : "Verify OTP"}
        </Button>
      </form>

      <div className="flex justify-between items-center text-sm">
        <span className="text-muted-foreground">Didn&apos;t receive code?</span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleResend}
          disabled={isResending || !currentEmail}
        >
          {isResending ? "Resending..." : "Resend Code"}
        </Button>
      </div>
    </div>
  );
}
