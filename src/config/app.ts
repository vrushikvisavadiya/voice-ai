import type { UserPlan, UserRole } from "@/types/auth";

export const APP_NAME = "VoiceCoach AI";

export const USER_ROLES: UserRole[] = ["candidate", "coach", "admin"];
export const USER_PLANS: UserPlan[] = ["free", "pro", "teams"];

export const DEFAULT_ROLE: UserRole = "candidate";
export const DEFAULT_PLAN: UserPlan = "free";
