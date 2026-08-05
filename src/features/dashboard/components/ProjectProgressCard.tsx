"use client";

interface ProjectProgressCardProps {
  completedRounds: number;
  totalJobPreps: number;
}

export function ProjectProgressCard({
  completedRounds,
  totalJobPreps,
}: ProjectProgressCardProps) {
  const estimatedTotalRounds = Math.max(totalJobPreps * 3, completedRounds || 1);
  const completionRate = Math.min(
    100,
    Math.round((completedRounds / estimatedTotalRounds) * 100)
  );

  return (
    <div className="rounded-2xl bg-card border border-border/70 p-5 shadow-xs flex flex-col justify-between">
      <h3 className="text-sm font-semibold text-foreground">
        Round Completion Progress
      </h3>

      {/* Semi-circle Gauge Graphic */}
      <div className="relative flex flex-col items-center justify-center my-3">
        <svg viewBox="0 0 200 110" className="w-48 h-28 overflow-visible">
          {/* Background Arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="var(--muted)"
            strokeWidth="24"
            strokeLinecap="round"
          />

          {/* Completed Arc (Primary Color) */}
          <path
            d="M 20 100 A 80 80 0 0 1 135 28"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="24"
            strokeLinecap="round"
          />
        </svg>

        {/* Center Percentage Display */}
        <div className="absolute bottom-1 text-center">
          <span className="text-3xl font-bold tracking-tight text-foreground block leading-none">
            {completionRate}%
          </span>
          <span className="text-[11px] font-medium text-muted-foreground mt-1 block">
            Rounds Completed
          </span>
        </div>
      </div>

      {/* Legend Footer */}
      <div className="flex items-center justify-center gap-4 text-[11px] font-medium text-muted-foreground pt-2 border-t border-border/40">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
          <span>Completed</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-primary/40" />
          <span>In Progress</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-muted border border-border" />
          <span>Pending</span>
        </div>
      </div>
    </div>
  );
}
