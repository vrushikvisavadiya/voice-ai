// src/lib/api/auth.ts
import { api } from "./axios";
import type { LoginPayload, TokenResponse } from "@/types/auth";

export const loginUser = async (payload: LoginPayload) => {
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
