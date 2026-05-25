import {
  LayoutDashboard,
  Mic,
  FileText,
  CreditCard,
  Settings,
  Sparkles,
} from "lucide-react";

export const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "New Interview",
    href: "/interview/new",
    icon: Mic,
  },
  {
    title: "Reports",
    href: "/reports/demo-session",
    icon: FileText,
  },
  {
    title: "Upgrade",
    href: "/billing",
    icon: Sparkles,
    badge: "Pro",
  },
  {
    title: "Billing",
    href: "/billing",
    icon: CreditCard,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];
