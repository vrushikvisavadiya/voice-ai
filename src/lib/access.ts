import type { AppUser, UserPlan, UserRole } from "@/types/auth";
import type { NavItem } from "@/config/navigation";

export function hasRole(userRole: UserRole, allowedRoles: UserRole[]) {
  return allowedRoles.includes(userRole);
}

export function hasPlan(userPlan: UserPlan, allowedPlans?: UserPlan[]) {
  if (!allowedPlans || allowedPlans.length === 0) return true;
  return allowedPlans.includes(userPlan);
}

export function canAccessNavItem(user: AppUser, item: NavItem) {
  const rolesAllowed = !item.roles || item.roles.length === 0 || hasRole(user.role, item.roles);
  return rolesAllowed && hasPlan(user.plan, item.plans);
}

export function getVisibleNavItems(user: AppUser, items: NavItem[]) {
  return items.filter((item) => canAccessNavItem(user, item));
}
