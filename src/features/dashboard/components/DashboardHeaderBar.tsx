"use client";

import * as React from "react";
import { Search, Mail, Bell, PanelLeft, SunMedium, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { UserResponse } from "@/types/auth";

interface DashboardHeaderBarProps {
  user?: UserResponse | null | undefined;
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
  onToggleSidebar?: () => void;
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="p-2.5 rounded-full border border-border/70 bg-background/80 text-foreground/80 transition-all duration-300 hover:bg-muted hover:text-foreground"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "sun" : "moon"}
          initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 20, scale: 0.8 }}
          transition={{ duration: 0.18 }}
          className="inline-flex"
        >
          {isDark ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export function DashboardHeaderBar({
  user,
  searchQuery = "",
  onSearchChange,
  onToggleSidebar,
}: DashboardHeaderBarProps) {
  const fullName = user?.full_name || "Candidate User";
  const email = user?.email || "candidate@voiceai.com";
  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-3.5 rounded-2xl bg-[#f4f5f6] dark:bg-card/40 border border-border/40 mb-4">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            aria-label="Toggle Sidebar"
            className="p-2 rounded-xl border border-border/70 bg-background/80 text-foreground/80 hover:bg-muted transition-colors shrink-0"
          >
            <PanelLeft className="h-4 w-4" />
          </button>
        )}

        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search job preparations or target roles..."
            className="w-full pl-10 pr-12 py-2 text-sm rounded-full border border-border/60 bg-background/80 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-[11px] font-medium text-muted-foreground bg-background px-1.5 py-0.5 rounded border border-border/60">
              ⌘F
            </span>
          </div>
        </div>
      </div>

      {/* Right User & Actions */}
      <div className="flex items-center gap-3 self-end sm:self-auto">
        <button
          type="button"
          aria-label="Mail"
          className="p-2.5 rounded-full border border-border/70 bg-background/80 text-foreground/80 hover:bg-muted transition-colors"
        >
          <Mail className="h-4 w-4" />
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="relative p-2.5 rounded-full border border-border/70 bg-background/80 text-foreground/80 hover:bg-muted transition-colors"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
        </button>

        <ThemeToggle />

        {/* User Info Pill */}
        <div className="flex items-center gap-2.5 pl-1">
          <Avatar className="h-9 w-9 border border-border/80 shadow-xs">
            <AvatarImage src={undefined} alt={fullName} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="hidden xs:flex flex-col text-left">
            <span className="text-xs font-bold text-foreground leading-snug">
              {fullName}
            </span>
            <span className="text-[11px] text-muted-foreground leading-none">
              {email}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
