"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { sidebarGroups } from "@/config/navigation";
import { SidebarAccountMenu } from "@/components/layout/SidebarAccountMenu";
import { useSidebar } from "@/components/layout/SidebarContext";
import { useSettingsDialog } from "@/components/layout/SettingsDialogContext";

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
      <div className="flex py-9 items-center px-4">
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
                <p className="px-3 pb-1 text-sm text-muted-foreground">
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
                    // className={cn(
                    //   "flex items-center rounded-xl text-md transition-colors",
                    //   collapsed
                    //     ? "justify-center px-2 py-2.5"
                    //     : "gap-3 px-3 py-2.5 ",
                    //   isActive(item.href)
                    //     ? "bg-gradient-to-r from-transparent to-primary/30 text-primary"
                    //     : "text-gray-700 hover:bg-accent/40 hover:text-foreground",
                    // )}

                    // className={cn(
                    //   "group relative flex items-center rounded-xl text-md transition-all duration-200",
                    //   collapsed
                    //     ? "justify-center px-2 py-2.5"
                    //     : "gap-3 px-3 py-2.5",
                    //   isActive(item.href)
                    //     ? [
                    //         "text-primary",
                    //         "bg-gradient-to-r",
                    //         "from-primary/5",
                    //         "via-primary/10",
                    //         "to-primary/20",
                    //       ]
                    //     : [
                    //         "text-muted-foreground",
                    //         "hover:bg-accent/60",
                    //         "hover:text-foreground",
                    //       ],
                    // )}

                    className={cn(
                      "group relative flex items-center rounded-xl text-md transition-all duration-200 ",
                      collapsed
                        ? "justify-center px-2 py-2.5"
                        : "gap-3 px-3 py-2.5",
                      isActive(item.href)
                        ? "bg-gradient-to-r from-primary/5 via-primary/10 to-primary/15 text-primary "
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground ",
                    )}
                  >
                    {/* {isActive(item.href) && (
                      <span className="absolute right-0 top-2 bottom-2 w-1 rounded-r-full bg-primary" />
                    )} */}
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
      </div>

      <div className="border-t border-border/60 p-3">
        <SidebarAccountMenu collapsed={collapsed} />
      </div>
    </aside>
  );
}
