"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mic } from "lucide-react";
import { sidebarGroups } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSidebar } from "@/components/layout/SidebarContext";

export function AppSidebar() {
  const pathname = usePathname();
  const { collapsed } = useSidebar();

  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-screen shrink-0 border-r bg-sidebar transition-all duration-300 ease-in-out lg:flex lg:flex-col",
        collapsed ? "w-14" : "w-60",
      )}
    >
      <div
        className={cn(
          "flex h-16 items-center border-b",
          collapsed ? "justify-center px-2" : "justify-between px-4",
        )}
      >
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-3",
            collapsed && "justify-center",
          )}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <Mic className="h-5 w-5" />
          </div>

          {!collapsed ? (
            <div>
              <p className="text-sm font-semibold leading-none">
                VoiceCoach AI
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Interview platform
              </p>
            </div>
          ) : null}
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-5">
        <div className="space-y-6">
          {sidebarGroups.map((group) => (
            <div key={group.label} className="space-y-2">
              {!collapsed ? (
                <p className="px-3 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
                  {group.label}
                </p>
              ) : null}

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  const linkContent = (
                    <Link
                      key={item.title}
                      href={item.href}
                      className={cn(
                        "flex rounded-2xl text-sm transition-all",
                        collapsed
                          ? "justify-center px-2 py-2.5"
                          : "items-center justify-between px-3 py-2.5",
                        isActive
                          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      )}
                    >
                      <span
                        className={cn(
                          "flex items-center",
                          collapsed ? "justify-center" : "gap-3",
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        {!collapsed ? item.title : null}
                      </span>

                      {!collapsed && "badge" in item && item.badge ? (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                          {item.badge}
                        </span>
                      ) : null}
                    </Link>
                  );

                  if (!collapsed) return linkContent;

                  return (
                    <Tooltip key={item.title}>
                      <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                      <TooltipContent side="right">{item.title}</TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t p-3">
        <div
          className={cn(
            "rounded-2xl border bg-card",
            collapsed ? "flex justify-center p-2" : "p-3",
          )}
        >
          <div
            className={cn(
              "flex items-center",
              collapsed ? "justify-center" : "gap-3",
            )}
          >
            <Avatar className="h-10 w-10">
              <AvatarImage
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43d?auto=format&fit=crop&w=120&q=80"
                alt="User"
              />
              <AvatarFallback>VV</AvatarFallback>
            </Avatar>

            {!collapsed ? (
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  Vrushik Visavadiya
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  Free plan
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </aside>
  );
}
