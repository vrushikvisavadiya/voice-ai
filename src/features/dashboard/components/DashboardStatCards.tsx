"use client";

import { ArrowUpRight } from "lucide-react";
import { StatCardData } from "../dashboard.types";

interface DashboardStatCardsProps {
  cards: StatCardData[];
}

export function DashboardStatCards({ cards }: DashboardStatCardsProps) {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        if (card.isFilled) {
          return (
            <div
              key={card.id}
              className="relative overflow-hidden rounded-2xl bg-primary p-5 text-primary-foreground shadow-xs flex flex-col justify-between h-36"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium opacity-90">
                  {card.title}
                </span>
                <button
                  type="button"
                  aria-label="View details"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-background text-primary shadow-xs transition-transform hover:scale-105"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-2">
                <span className="text-3xl font-bold tracking-tight">{card.value}</span>
              </div>

              <div className="mt-2 flex items-center gap-1.5 text-[11px] font-medium opacity-90">
                <span className="inline-flex items-center gap-0.5 rounded-sm bg-black/20 px-1 py-0.2 text-[10px] font-semibold">
                  Active
                </span>
                <span>{card.badgeText}</span>
              </div>
            </div>
          );
        }

        return (
          <div
            key={card.id}
            className="relative overflow-hidden rounded-2xl bg-card border border-border/70 p-5 text-foreground shadow-xs flex flex-col justify-between h-36 hover:border-border transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground">
                {card.title}
              </span>
              <button
                type="button"
                aria-label="View details"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-border/80 text-foreground/80 hover:bg-muted transition-colors"
              >
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-2">
              <span className="text-3xl font-bold tracking-tight text-foreground">
                {card.value}
              </span>
            </div>

            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-0.5 rounded-sm bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                AI Powered
              </span>
              <span>{card.badgeText}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
