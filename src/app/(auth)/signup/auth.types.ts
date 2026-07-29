// src/app/(auth)/signup/auth.types.ts
export interface UserRegisterPayload {
  email: string;
  password: string;
  full_name: string;
}

export interface UserResponse {
  id: string;
  full_name: string;
  email: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
}
