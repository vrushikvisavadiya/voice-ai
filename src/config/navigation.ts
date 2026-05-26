import {
  LayoutDashboard,
  Mic,
  FileText,
  Sparkles,
  CreditCard,
  Settings,
  History,
} from "lucide-react";

export const sidebarGroups = [
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
      { title: "Upgrade", href: "/billing", icon: Sparkles, badge: "Pro" },
      { title: "Billing", href: "/billing", icon: CreditCard },
      { title: "Settings", href: "/settings", icon: Settings },
    ],
  },
];
