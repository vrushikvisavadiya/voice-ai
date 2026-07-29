// src/app/(auth)/verify-otp/auth.service.ts
import { api } from "@/lib/api/axios";
import type { OTPVerifyPayload, OTPResendPayload, GenericResponse } from "./auth.types";

export const verifyOtp = async (payload: OTPVerifyPayload): Promise<GenericResponse> => {
  const { data } = await api.post<GenericResponse>("/auth/verify-otp", payload);
  return data;
};

export const resendOtp = async (payload: OTPResendPayload): Promise<GenericResponse> => {
  const { data } = await api.post<GenericResponse>("/auth/resend-otp", payload);
  return data;
};
