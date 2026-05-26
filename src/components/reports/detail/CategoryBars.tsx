"use client";

import * as React from "react";

interface CategoryBarsProps {
  categories: {
    communication: number;
    technical: number;
    confidence: number;
    relevance: number;
  };
}

const items = [
  { key: "communication", label: "Communication Clarity" },
  { key: "technical", label: "Technical Accuracy" },
  { key: "confidence", label: "Confidence & Tone" },
  { key: "relevance", label: "Answer Relevance" },
] as const;

export function CategoryBars({ categories }: CategoryBarsProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 80);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-5">
      {items.map((item) => {
        const value = categories[item.key];
        return (
          <div key={item.key} className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-foreground">{item.label}</p>
              <span className="text-sm font-medium tabular-nums text-muted-foreground">
                {value}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary/70 transition-all duration-700 ease-out"
                style={{ width: mounted ? `${value}%` : "0%" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
