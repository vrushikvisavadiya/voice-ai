"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { AppSidebar } from "@/components/layout/AppSidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[var(--background)] text-foreground">
      {/* Floating Main Container Canvas */}
      <div className="flex flex-1 w-full h-full bg-white dark:bg-card p-2.5 sm:p-3 shadow-xl dark:border-white/10 min-w-0 gap-2.5 sm:gap-3 overflow-hidden">
        {/* Floating Sidebar */}
        <AppSidebar />

        {/* Main Content Area */}
        <div className="flex min-w-0 flex-1 flex-col h-full overflow-hidden">
          <AppHeader />
          <main className="flex-1 overflow-y-auto">
            <div className="w-full mx-auto space-y-6 p-4 sm:p-6 bg-[#f4f5f6] dark:bg-card/40 rounded-2xl border border-border/40 min-h-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
