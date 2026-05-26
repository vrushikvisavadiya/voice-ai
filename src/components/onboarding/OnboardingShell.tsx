import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface OnboardingShellProps {
  step: number;
  totalSteps: number;
  children: ReactNode;
}

export function OnboardingShell({
  step,
  totalSteps,
  children,
}: OnboardingShellProps) {
  const progress = (step / totalSteps) * 100;

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex size-12 items-center justify-center rounded-2xl border border-border bg-card text-sm font-semibold text-foreground">
            VC
          </div>

          <p className="text-sm font-medium text-muted-foreground">
            Step {step} of {totalSteps}
          </p>

          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-foreground/80 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Card className="rounded-[32px] border-border shadow-none">
          <CardContent className="p-6 sm:p-8">{children}</CardContent>
        </Card>
      </div>
    </main>
  );
}
