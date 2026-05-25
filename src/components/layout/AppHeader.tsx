"use client";

import { PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/layout/SidebarContext";

export function AppHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-20 bg-transparent">
      <div className="flex h-14 items-center justify-between px-4 md:px-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="h-9 w-9 rounded-lg text-muted-foreground hover:bg-accent/40"
        >
          <PanelLeft className="h-4 w-4" />
        </Button>

        <div className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-background/60 px-3 py-1.5 text-sm text-muted-foreground backdrop-blur-sm">
          <span>Free plan</span>
          <span className="text-border">·</span>
          <button className="font-medium text-foreground/90 underline-offset-4 hover:underline">
            Upgrade
          </button>
        </div>
      </div>
    </header>
  );
}
