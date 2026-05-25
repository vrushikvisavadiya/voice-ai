"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { sidebarGroups } from "@/config/navigation";
import { SidebarAccountMenu } from "@/components/layout/SidebarAccountMenu";
import { useSidebar } from "@/components/layout/SidebarContext";
import { useSettingsDialog } from "@/components/layout/SettingsDialogContext";

const recents = [
  "Frontend interview prep",
  "React Native role practice",
  "STAR answer improvement",
  "Full stack mock session",
  "System design warmup",
];

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
        "hidden h-screen shrink-0 border-r border-border/60 bg-background/70 backdrop-blur-xl transition-all duration-200 md:flex md:flex-col",
        collapsed ? "w-[76px]" : "w-[260px]",
      )}
    >
      <div className="flex h-14 items-center px-4">
        <Link
          href="/dashboard"
          className="text-[15px] font-medium tracking-tight"
        >
          {collapsed ? "VC" : "VoiceCoach"}
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-4">
        <nav className="space-y-5">
          {sidebarGroups.map((group) => (
            <div key={group.label} className="space-y-1">
              {!collapsed && (
                <p className="px-3 pb-1 text-xs text-muted-foreground">
                  {group.label}
                </p>
              )}

              {group.items.map((item) => {
                const Icon = item.icon;
                const isSettings = item.title === "Settings";

                if (isSettings) {
                  return (
                    <button
                      key={item.title}
                      onClick={openSettings}
                      title={collapsed ? item.title : undefined}
                      className={cn(
                        "flex w-full items-center rounded-xl text-sm text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground",
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
                      "flex items-center rounded-xl text-sm transition-colors",
                      collapsed
                        ? "justify-center px-2 py-2.5"
                        : "gap-3 px-3 py-2.5",
                      isActive(item.href)
                        ? "bg-accent/30 text-foreground"
                        : "text-muted-foreground hover:bg-accent/40 hover:text-foreground",
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
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {!collapsed && (
          <>
            <div className="my-4 border-t border-border/60" />

            <div className="space-y-3 px-1">
              <p className="px-2 text-xs text-muted-foreground">Recents</p>

              <div className="space-y-1">
                {recents.map((item) => (
                  <button
                    key={item}
                    className="block w-full truncate rounded-lg px-2 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-accent/30 hover:text-foreground"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="border-t border-border/60 p-3">
        <SidebarAccountMenu collapsed={collapsed} />
      </div>
    </aside>
  );
}
