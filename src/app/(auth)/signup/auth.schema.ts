// src/app/(auth)/signup/auth.schema.ts
import { z } from "zod";

export const signupSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters long"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type SignupFormData = z.infer<typeof signupSchema>;
