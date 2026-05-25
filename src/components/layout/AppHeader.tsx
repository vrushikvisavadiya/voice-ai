"use client";

import { Bell, PanelLeft, Search, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserNav } from "@/components/shared/UserNav";
import { useSidebar } from "@/components/layout/SidebarContext";

export function AppHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="hidden rounded-xl lg:inline-flex"
            onClick={toggleSidebar}
          >
            <PanelLeft className="h-4 w-4" />
          </Button>

          <div>
            <h1 className="text-base font-semibold">Dashboard</h1>
            <p className="text-xs text-muted-foreground">
              Practice smarter with AI-led interview sessions
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="relative hidden w-72 lg:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search sessions, reports..."
              className="rounded-xl pl-9"
            />
          </div>

          <Button
            variant="outline"
            className="hidden rounded-xl md:inline-flex"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Upgrade
          </Button>

          <Button variant="ghost" size="icon" className="rounded-xl">
            <Bell className="h-4 w-4" />
          </Button>

          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
