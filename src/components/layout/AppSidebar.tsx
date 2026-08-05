"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { sidebarGroups } from "@/config/navigation";
import { SidebarAccountMenu } from "@/components/layout/SidebarAccountMenu";
import { useSidebar } from "@/components/layout/SidebarContext";
import { useSettingsDialog } from "@/components/layout/SettingsDialogContext";
import { Sparkles } from "lucide-react";

export function AppSidebar() {
  const pathname = usePathname();
  const { collapsed } = useSidebar();
  const { openSettings } = useSettingsDialog();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <aside
      className={cn(
        "hidden h-full shrink-0 rounded-2xl border border-border/40 bg-[var(--sidebar)] transition-all duration-200 md:flex md:flex-col justify-between overflow-hidden",
        collapsed ? "w-[76px]" : "w-[260px]",
      )}
    >
      {/* Top Logo & Navigation */}
      <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
        <div className="flex py-6 items-center px-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-2xs">
              <Sparkles className="h-4 w-4" />
            </div>
            {!collapsed && <span>VoiceCoach</span>}
          </Link>
        </div>

        <div className="flex-1 px-4 pb-4">
          <nav className="space-y-6">
            {sidebarGroups.map((group) => (
              <div key={group.label} className="space-y-1.5">
                {!collapsed && (
                  <p className="px-3 pb-1 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    {group.label}
                  </p>
                )}

                {group.items.map((item) => {
                  const Icon = item.icon as React.ComponentType<{ className?: string }>;
                  const isSettings = item.title === "Settings";
                  const active = isActive(item.href);

                  if (isSettings) {
                    return (
                      <button
                        key={item.title}
                        onClick={openSettings}
                        title={collapsed ? item.title : undefined}
                        className={cn(
                          "relative flex w-full items-center rounded-xl text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5 text-muted-foreground hover:text-foreground",
                          collapsed
                            ? "justify-center px-2 py-2.5"
                            : "gap-3 px-3 py-2.5",
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        {!collapsed && (
                          <>
                            <span>{item.title}</span>
                            {item.badge && (
                              <span className="ml-auto rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                                {item.badge}
                              </span>
                            )}
                          </>
                        )}
                      </button>
                    );
                  }

                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      title={collapsed ? item.title : undefined}
                      className={cn(
                        "relative flex items-center rounded-xl text-sm font-semibold transition-all duration-200",
                        collapsed
                          ? "justify-center px-2 py-2.5"
                          : "gap-3 px-3 py-2.5",
                        active
                          ? "text-foreground bg-white dark:bg-card shadow-2xs"
                          : "text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground",
                      )}
                    >
                      {/* Left vertical green indicator pill */}
                      {active && (
                        <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-r-full bg-primary" />
                      )}

                      <Icon className={cn("h-4 w-4 shrink-0", active ? "text-primary" : "text-muted-foreground")} />
                      {!collapsed && (
                        <>
                          <span>{item.title}</span>
                          {item.badge && (
                            <span className="ml-auto rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom Area: Promo Card & User Account Menu */}
      <div className="p-3 space-y-3 shrink-0">
        {!collapsed && (
          <div className="relative overflow-hidden rounded-2xl bg-primary p-4 text-primary-foreground shadow-sm flex flex-col justify-between">
            {/* Background Wave Art */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <svg className="w-full h-full" viewBox="0 0 200 120" fill="none">
                <path d="M -20 60 Q 50 120 120 40 T 220 80" stroke="white" strokeWidth="8" />
              </svg>
            </div>

            <div className="relative z-10 space-y-1">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                <Sparkles className="h-3.5 w-3.5 text-white" />
              </div>
              <h4 className="text-xs font-bold text-white pt-1">
                Upgrade to Pro
              </h4>
              <p className="text-[11px] text-emerald-100/90 leading-tight">
                Unlock unlimited AI mock rounds & detailed reporting.
              </p>
            </div>

            <div className="relative z-10 pt-3">
              <Link
                href="/upgrade"
                className="w-full inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-bold bg-white text-primary hover:bg-emerald-50 transition-colors shadow-xs"
              >
                Upgrade
              </Link>
            </div>
          </div>
        )}

        <div className="border-t border-border/50 pt-2">
          <SidebarAccountMenu collapsed={collapsed} />
        </div>
      </div>
    </aside>
  );
}
