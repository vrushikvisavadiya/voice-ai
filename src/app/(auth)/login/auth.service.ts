// src/app/(auth)/login/auth.service.ts
import { api } from "@/lib/api/axios";
import type { LoginPayload, TokenResponse } from "./auth.types";
import type { UserResponse } from "@/types/auth";

export const loginUser = async (payload: LoginPayload): Promise<TokenResponse> => {
  const params = new URLSearchParams();
  params.append("username", payload.email);
  params.append("password", payload.password);

  const { data } = await api.post<TokenResponse>("/auth/login", params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return data;
};

export const fetchMe = async (): Promise<UserResponse> => {
  const { data } = await api.get<UserResponse>("/users/me");
  return data;
};

