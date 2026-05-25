"use client";

import { Bell } from "lucide-react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { UserNav } from "@/components/shared/UserNav";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur md:px-6">
      <div />
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-xl">
          <Bell className="h-4 w-4" />
        </Button>
        <ThemeToggle />
        <UserNav />
      </div>
    </header>
  );
}
