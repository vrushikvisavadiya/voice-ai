"use client";

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

export function SidebarAccountMenu({
  collapsed = false,
}: {
  collapsed?: boolean;
}) {
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
            <Avatar className="h-9 w-9">
              <AvatarFallback>D</AvatarFallback>
            </Avatar>

            {!collapsed && (
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">Vrushik</p>
                <p className="truncate text-xs text-muted-foreground">
                  Free plan
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
        <div className="px-2 py-2">
          <p className="text-sm font-medium">Vrushik</p>
          <p className="text-xs text-muted-foreground">Vrushik@example.com</p>
        </div>

        <div className="mt-1 space-y-1">
          <button className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-accent">
            <User className="h-4 w-4" />
            Profile
          </button>
          <button className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-accent">
            <Settings className="h-4 w-4" />
            Settings
          </button>
          <button className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-accent">
            <CreditCard className="h-4 w-4" />
            Billing
          </button>
          <button className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-destructive hover:bg-accent">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
