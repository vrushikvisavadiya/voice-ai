import type { UserPlan, UserRole } from "@/types/auth";
import { ROLE_ROUTE_RULES } from "@/lib/routes";

export function isPublicRoute(pathname: string) {
  return (
    pathname === "/" ||
    pathname === "/pricing" ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/icons")
  );
}

export function getRouteRule(pathname: string) {
  return ROLE_ROUTE_RULES.find((rule) => pathname.startsWith(rule.prefix));
}

export function hasRequiredRole(userRole: UserRole, allowedRoles: UserRole[]) {
  return allowedRoles.includes(userRole);
}

export function hasRequiredPlan(userPlan: UserPlan, allowedPlans?: UserPlan[]) {
  if (!allowedPlans || allowedPlans.length === 0) return true;
  return allowedPlans.includes(userPlan);
}

export function canAccessPath(params: {
  pathname: string;
  role: UserRole;
  plan: UserPlan;
}) {
  const rule = getRouteRule(params.pathname);

  if (!rule) return true;

  return (
    hasRequiredRole(params.role, rule.roles) &&
    hasRequiredPlan(params.plan, rule.plans)
  );
}
