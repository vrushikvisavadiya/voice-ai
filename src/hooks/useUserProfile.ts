// src/hooks/useUserProfile.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyProfile, updateMyProfile, changePassword, completeOnboarding } from "@/services/user-service";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";
import type { UserProfileUpdatePayload, UserOnboardingRequestPayload } from "@/types/auth";

import { AxiosError } from "axios";

export const useUserProfile = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((s) => s.setUser);
  const accessToken = useAuthStore((s) => s.accessToken);

  const profileQuery = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const data = await getMyProfile();
      setUser(data);
      return data;
    },
    enabled: !!accessToken,
  });

  const updateMutation = useMutation({
    mutationFn: (payload: UserProfileUpdatePayload) => updateMyProfile(payload),
    onSuccess: (updatedProfile) => {
      setUser(updatedProfile);
      queryClient.setQueryData(["user-profile"], updatedProfile);
      toast.success("Profile updated successfully!");
    },
    onError: (error: AxiosError<{ detail?: string }>) => {
      const message = error.response?.data?.detail || "Failed to update profile";
      toast.error(message);
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: (payload: { current_password: string; new_password: string }) =>
      changePassword(payload),
    onSuccess: (res) => {
      toast.success(res.detail || "Password changed successfully!");
    },
    onError: (error: AxiosError<{ detail?: string }>) => {
      const message = error.response?.data?.detail || "Failed to change password";
      toast.error(message);
    },
  });

  const completeOnboardingMutation = useMutation({
    mutationFn: (payload: UserOnboardingRequestPayload) =>
      completeOnboarding(payload),
    onSuccess: (updatedProfile) => {
      setUser(updatedProfile);
      queryClient.setQueryData(["user-profile"], updatedProfile);
      toast.success("Welcome aboard! Profile preferences saved.");
    },
    onError: (error: AxiosError<{ detail?: string }>) => {
      const message = error.response?.data?.detail || "Failed to complete onboarding";
      toast.error(message);
    },
  });

  return {
    profile: profileQuery.data ?? useAuthStore.getState().user,
    isLoading: profileQuery.isLoading,
    isError: profileQuery.isError,
    refetchProfile: profileQuery.refetch,
    updateProfile: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    changePasswordAsync: changePasswordMutation.mutateAsync,
    isChangingPassword: changePasswordMutation.isPending,
    submitOnboardingAsync: completeOnboardingMutation.mutateAsync,
    isSubmittingOnboarding: completeOnboardingMutation.isPending,
  };
};


