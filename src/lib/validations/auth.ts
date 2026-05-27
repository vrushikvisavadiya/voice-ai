import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required.")
    .min(2, "Full name must be at least 2 characters."),
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .regex(/[A-Z]/, "Include at least one uppercase letter.")
    .regex(/[0-9]/, "Include at least one number."),
});

export type SignupSchema = z.infer<typeof signupSchema>;

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Enter a valid email address."),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export const otpSchema = z.object({
  otp: z
    .string()
    .min(6, "Enter the 6-digit code.")
    .max(6, "Enter the 6-digit code.")
    .regex(/^\d{6}$/, "OTP must be 6 digits."),
});

export type OtpSchema = z.infer<typeof otpSchema>;
