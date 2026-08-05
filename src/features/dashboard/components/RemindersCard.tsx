"use client";

import Link from "next/link";
import { Mic } from "lucide-react";
import { UpcomingRoundReminder } from "../dashboard.types";

interface RemindersCardProps {
  reminder: UpcomingRoundReminder;
}

export function RemindersCard({ reminder }: RemindersCardProps) {
  const targetHref = reminder.prepId ? `/job-prep/${reminder.prepId}` : "/job-prep/create";

  return (
    <div className="rounded-2xl bg-card border border-border/70 p-5 shadow-xs flex flex-col justify-between h-64">
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Next Upcoming Round
        </h3>
        <div className="mt-4 space-y-1">
          <h4 className="text-base sm:text-lg font-bold tracking-tight text-foreground leading-snug">
            {reminder.roleTitle}
          </h4>
          <p className="text-xs text-primary font-medium">
            {reminder.companyName} · {reminder.roundTitle}
          </p>
        </div>
      </div>

      <div className="pt-4">
        <Link
          href={targetHref}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs font-semibold bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 transition-colors"
        >
          <Mic className="h-4 w-4" />
          <span>Start Practice Session</span>
        </Link>
      </div>
    </div>
  );
}
