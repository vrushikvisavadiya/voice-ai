import {
  RiDashboardFill,
  RiMicFill,
  RiBarChartBoxFill,
  RiHistoryFill,
  RiVipCrown2Fill,
  RiBankCardFill,
  RiSettings4Fill,
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
        title: "New Interview",
        href: "/interview/new",
        icon: RiMicFill,
      },
      {
        title: "Reports",
        href: "/reports",
        icon: RiBarChartBoxFill,
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
      {
        title: "Settings",
        href: "/settings",
        icon: RiSettings4Fill,
      },
    ],
  },
];
