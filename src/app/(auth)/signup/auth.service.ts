// src/app/(auth)/signup/auth.service.ts
import { api } from "@/lib/api/axios";
import type { UserRegisterPayload, UserResponse } from "./auth.types";

export const registerUser = async (payload: UserRegisterPayload): Promise<UserResponse> => {
  const { data } = await api.post<UserResponse>("/auth/register", payload);
  return data;
};
