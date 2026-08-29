// src/services/user-service.ts
import { api } from "@/lib/api/axios";
import type {
  UserProfileResponse,
  UserProfileUpdatePayload,
  UserOnboardingRequestPayload,
} from "@/types/auth";


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

export const completeOnboarding = async (
  payload: UserOnboardingRequestPayload
): Promise<UserProfileResponse> => {
  const { data } = await api.post<UserProfileResponse>(
    "/users/onboarding",
    payload
  );
  return data;
};

export const getOnboardingStatus = async (): Promise<{
  is_onboarded: boolean;
  target_role: string | null;
  experience_level: string | null;
}> => {
  const { data } = await api.get("/users/onboarding/status");
  return data;
};


