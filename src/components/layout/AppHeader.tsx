"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "@/app/(auth)/login/auth.service";
import { useSidebar } from "@/components/layout/SidebarContext";
import { DashboardHeaderBar } from "@/features/dashboard/components/DashboardHeaderBar";

export function AppHeader() {
  const { toggleSidebar } = useSidebar();
  const meQuery = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
  });

  return (
    <DashboardHeaderBar
      user={meQuery.data}
      onToggleSidebar={toggleSidebar}
    />
  );
}
