import type { UserPlan, UserRole } from "@/types/auth";

export const PUBLIC_ROUTES = [
  "/",
  "/pricing",
  "/login",
  "/signup",
  "/forgot-password",
] as const;

export const AUTH_ROUTES = ["/login", "/signup"] as const;

export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
export const DEFAULT_UNAUTHORIZED_REDIRECT = "/dashboard";
export const DEFAULT_LOGOUT_REDIRECT = "/login";

export const ROLE_ROUTE_RULES: Array<{
  prefix: string;
  roles: UserRole[];
  plans?: UserPlan[];
}> = [
  {
    prefix: "/dashboard",
    roles: ["candidate", "coach", "admin"],
  },
  {
    prefix: "/interview",
    roles: ["candidate", "admin"],
  },
  {
    prefix: "/reports",
    roles: ["candidate", "coach", "admin"],
  },
  {
    prefix: "/progress",
    roles: ["candidate", "coach", "admin"],
    plans: ["pro", "teams"],
  },
  {
    prefix: "/team",
    roles: ["coach", "admin"],
    plans: ["teams"],
  },
  {
    prefix: "/admin",
    roles: ["admin"],
  },
  {
    prefix: "/billing",
    roles: ["candidate", "coach", "admin"],
  },
  {
    prefix: "/settings",
    roles: ["candidate", "coach", "admin"],
  },
];
