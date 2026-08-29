// src/services/user-service.ts
import { api } from "@/lib/api/axios";
import type { UserProfileResponse, UserProfileUpdatePayload } from "@/types/auth";

export const getMyProfile = async (): Promise<UserProfileResponse> => {
  const { data } = await api.get<UserProfileResponse>("/users/me");
  return data;
};

export const updateMyProfile = async (
  payload: UserProfileUpdatePayload
): Promise<UserProfileResponse> => {
  const { data } = await api.put<UserProfileResponse>("/users/me", payload);
  return data;
};

export const changePassword = async (payload: {
  current_password: string;
  new_password: string;
}): Promise<{ success: boolean; detail: string }> => {
  const { data } = await api.post<{ success: boolean; detail: string }>(
    "/auth/change-password",
    payload
  );
  return data;
};

