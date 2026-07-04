import {
  LayoutDashboard,
  Mic,
  FileText,
  Sparkles,
  CreditCard,
  Settings,
  History,
} from "lucide-react";
import type { UserRole, UserPlan } from "@/types/auth";

export interface NavItem {
  title: string;
  href: string;
  icon: any;
  badge?: string;
  roles?: UserRole[];
  plans?: UserPlan[];
}

export const sidebarGroups: {
  label: string;
  items: NavItem[];
}[] = [
  {
    label: "Platform",
    items: [
      { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { title: "New Interview", href: "/interview/new", icon: Mic },
      { title: "Reports", href: "/reports", icon: FileText },
      { title: "History", href: "/history", icon: History },
    ],
  },
  {
    label: "Workspace",
    items: [
      { title: "Upgrade", href: "/upgrade", icon: Sparkles, badge: "Pro" },
      { title: "Billing", href: "/billing", icon: CreditCard },
      { title: "Settings", href: "/settings", icon: Settings },
    ],
  },
];
