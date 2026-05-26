"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type BillingPeriod = "monthly" | "annual";

interface BillingToggleProps {
  value: BillingPeriod;
  onChange: (value: BillingPeriod) => void;
}

export function BillingToggle({ value, onChange }: BillingToggleProps) {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card p-1">
      <Button
        type="button"
        variant={value === "monthly" ? "secondary" : "ghost"}
        className={cn(
          "rounded-full px-4",
          value === "monthly" ? "text-foreground" : "text-muted-foreground",
        )}
        onClick={() => onChange("monthly")}
      >
        Monthly
      </Button>

      <Button
        type="button"
        variant={value === "annual" ? "secondary" : "ghost"}
        className={cn(
          "rounded-full px-4",
          value === "annual" ? "text-foreground" : "text-muted-foreground",
        )}
        onClick={() => onChange("annual")}
      >
        Annual
      </Button>

      <Badge
        variant="secondary"
        className="rounded-full px-3 py-1 text-xs font-medium"
      >
        Save 20%
      </Badge>
    </div>
  );
}
