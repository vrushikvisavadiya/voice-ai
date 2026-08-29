"use client";

import { useRouter } from "next/navigation";
import {
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useSettingsDialog } from "@/components/layout/SettingsDialogContext";
import type { UserProfileResponse } from "@/types/auth";

export function SidebarAccountMenu({
  collapsed = false,
}: {
  collapsed?: boolean;
}) {
  const router = useRouter();
  const { profile } = useUserProfile();
  const logout = useAuthStore((s) => s.logout);
  const { openSettings } = useSettingsDialog();

  const userProfile = profile as UserProfileResponse | null;
  const displayName = userProfile?.full_name || "Account";
  const displayEmail = userProfile?.email || "Signed in";
  const initial = displayName[0]?.toUpperCase() || "U";

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "flex w-full rounded-xl text-left transition-colors hover:bg-accent/40",
            collapsed
              ? "items-center justify-center px-2 py-2"
              : "items-center justify-between px-3 py-2",
          )}
        >
          <div className="flex min-w-0 items-center gap-3">
            <Avatar className="h-9 w-9 border border-border/60">
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                {initial}
              </AvatarFallback>
            </Avatar>

            {!collapsed && (
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{displayName}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {userProfile?.roles?.join(", ") || "Candidate"}
                </p>
              </div>
            )}
          </div>

          {!collapsed && (
            <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        side="top"
        align="start"
        className="w-64 rounded-2xl border border-border/60 bg-background/95 p-2 backdrop-blur-xl"
      >
        <div className="px-2 py-2 border-b border-border/40 mb-1">
          <p className="text-sm font-medium truncate">{displayName}</p>
          <p className="text-xs text-muted-foreground truncate">{displayEmail}</p>
        </div>

        <div className="space-y-0.5">
          <button
            onClick={() => router.push("/profile")}
            className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-sm hover:bg-accent transition-colors"
          >
            <User className="h-4 w-4 text-muted-foreground" />
            Profile
          </button>

          <button
            onClick={openSettings}
            className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-sm hover:bg-accent transition-colors"
          >
            <Settings className="h-4 w-4 text-muted-foreground" />
            Settings
          </button>
          <button
            onClick={() => router.push("/billing")}
            className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-sm hover:bg-accent transition-colors"
          >
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            Billing
          </button>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-sm text-destructive hover:bg-accent transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

