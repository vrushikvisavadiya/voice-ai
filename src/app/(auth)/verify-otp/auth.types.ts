// src/app/(auth)/verify-otp/auth.types.ts
export type OTPPurpose = "registration" | "password_reset";

export interface OTPVerifyPayload {
  email: string;
  otp_code: string;
  purpose: OTPPurpose;
}

export interface OTPResendPayload {
  email: string;
  purpose: OTPPurpose;
}

export interface GenericResponse {
  success: boolean;
  detail: string;
}
