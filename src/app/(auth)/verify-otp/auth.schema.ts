// src/app/(auth)/verify-otp/auth.schema.ts
import { z } from "zod";

export const otpSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  otp_code: z.string().length(6, "OTP must be exactly 6 characters"),
});

export type OtpFormData = z.infer<typeof otpSchema>;
