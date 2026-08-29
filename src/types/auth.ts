// src/types/auth.ts

export type UserRole = "candidate" | "coach" | "admin";
export type UserPlan = "free" | "pro" | "teams";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  plan: UserPlan;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export type LoginResponse = TokenResponse;

export interface UserResponse {
  id: string;
  full_name: string;
  email: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
}

export interface UserProfileResponse {
  id: string;
  full_name: string;
  email: string;
  is_active: boolean;
  is_verified: boolean;
  is_onboarded: boolean;
  target_role?: string | null;
  experience_level?: string | null;
  primary_skills?: string[] | null;
  target_industry?: string | null;
  bio?: string | null;
  roles: string[];
  total_resumes_analyzed: number;
  total_job_preparations: number;
  total_rounds_completed: number;
  overall_average_score: number;
  created_at: string;
}

export interface UserProfileUpdatePayload {
  full_name?: string;
  target_role?: string;
  experience_level?: string;
  primary_skills?: string[];
  target_industry?: string;
  bio?: string;
}

export interface UserOnboardingRequestPayload {
  target_role: string;
  experience_level: string;
  primary_skills: string[];
  target_industry?: string;
  bio?: string;
}


export interface UserRegisterPayload {
  email: string;
  password: string;
  full_name: string;
}


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
