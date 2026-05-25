export type UserRole = "candidate" | "coach" | "admin";
export type UserPlan = "free" | "pro" | "teams";

export type AppUser = {
  name: string;
  email: string;
  role: UserRole;
  plan: UserPlan;
};
