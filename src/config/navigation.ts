import {
  RiDashboardFill,
  RiFileTextFill,
  RiMicFill,
  RiHistoryFill,
  RiVipCrown2Fill,
  RiBankCardFill,
  RiUser3Fill,
} from "react-icons/ri";

import type { UserRole, UserPlan } from "@/types/auth";

export interface NavItem {
  title: string;
  href: string;
  icon?: unknown;
  badge?: string;
  roles?: UserRole[];
  plans?: UserPlan[];
}

export const sidebarGroups = [
  {
    label: "Platform",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: RiDashboardFill,
      },
      {
        title: "Resume Analysis",
        href: "/resume-analysis",
        icon: RiFileTextFill,
      },
      {
        title: "Mock Interview",
        href: "/job-prep",
        icon: RiMicFill,
      },
      {
        title: "History",
        href: "/history",
        icon: RiHistoryFill,
      },
    ],
  },
  {
    label: "Workspace",
    items: [
      {
        title: "Profile",
        href: "/profile",
        icon: RiUser3Fill,
      },
      {
        title: "Upgrade",
        href: "/upgrade",
        icon: RiVipCrown2Fill,
        badge: "Pro",
      },
      {
        title: "Billing",
        href: "/billing",
        icon: RiBankCardFill,
      },
    ],
  },
];

