"use client";

import { AnalyticsBarData } from "../dashboard.types";

interface ProjectAnalyticsCardProps {
  bars: AnalyticsBarData[];
}

export function ProjectAnalyticsCard({ bars }: ProjectAnalyticsCardProps) {
  const highlightedBar = bars.find((b) => b.isHighlighted);
  const currentScore = highlightedBar?.percentage || 65;

  return (
    <div className="rounded-2xl bg-card border border-border/70 p-5 shadow-xs flex flex-col justify-between h-[270px]">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-foreground">
          Interview Practice & Performance
        </h3>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary text-primary-foreground">
          {currentScore}%
        </span>
      </div>

      {/* Bar Chart Graphics */}
      <div className="relative pt-4 pb-1">
        <div className="flex items-end justify-between gap-2.5 h-36 px-2">
          {bars.map((bar, idx) => {
            const isHighlight = bar.isHighlighted;

            return (
              <div
                key={`${bar.day}-${idx}`}
                className="flex flex-col items-center flex-1 h-full justify-end relative group"
              >
                {/* Tooltip Badge on Hover / Highlight */}
                {isHighlight && (
                  <div className="absolute -top-7 z-10">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-primary text-primary-foreground shadow-xs">
                      {bar.percentage}%
                    </span>
                  </div>
                )}

                {/* Column Bar */}
                <div
                  className={`w-full max-w-[28px] rounded-full transition-all duration-300 ${
                    isHighlight
                      ? "bg-primary shadow-xs"
                      : bar.isSolidDark
                      ? "bg-primary/75"
                      : "bg-primary/20 hover:bg-primary/40"
                  }`}
                  style={{ height: `${bar.val1}%` }}
                />
              </div>
            );
          })}
        </div>

        {/* Day X-Axis Labels */}
        <div className="flex items-center justify-between text-center px-2 mt-4 pt-2 border-t border-border/40">
          {bars.map((bar, idx) => (
            <span
              key={`label-${bar.day}-${idx}`}
              className="flex-1 text-xs font-bold text-muted-foreground"
            >
              {bar.day}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
