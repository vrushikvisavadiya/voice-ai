import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { OnboardingGoal } from "@/components/onboarding/StepGoal";
import type { FocusArea } from "@/components/onboarding/StepTargetRole";

interface StepReadyProps {
  fullName: string;
  jobTitle: string;
  goal: OnboardingGoal | "";
  targetRole: string;
  targetCompany: string;
  selectedFocusAreas: FocusArea[];
  onBack: () => void;
}

export function StepReady({
  fullName,
  jobTitle,
  goal,
  targetRole,
  targetCompany,
  selectedFocusAreas,
  onBack,
}: StepReadyProps) {
  return (
    <div className="animate-in fade-in-0 slide-in-from-right-2 duration-300">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          You&apos;re all set!
        </h1>
        <p className="text-sm leading-6 text-muted-foreground sm:text-base">
          Here&apos;s a quick summary before you begin your first mock
          interview.
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <div className="rounded-[24px] border border-border bg-background p-4">
          <p className="text-sm text-muted-foreground">Name</p>
          <p className="mt-1 font-medium text-foreground">{fullName}</p>
        </div>

        <div className="rounded-[24px] border border-border bg-background p-4">
          <p className="text-sm text-muted-foreground">Current role</p>
          <p className="mt-1 font-medium text-foreground">{jobTitle}</p>
        </div>

        <div className="rounded-[24px] border border-border bg-background p-4">
          <p className="text-sm text-muted-foreground">Preparation goal</p>
          <p className="mt-1 font-medium text-foreground">{goal || "—"}</p>
        </div>

        <div className="rounded-[24px] border border-border bg-background p-4">
          <p className="text-sm text-muted-foreground">Target role</p>
          <p className="mt-1 font-medium text-foreground">
            {targetRole}
            {targetCompany ? ` · ${targetCompany}` : ""}
          </p>
        </div>

        <div className="rounded-[24px] border border-border bg-background p-4">
          <p className="text-sm text-muted-foreground">Focus areas</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedFocusAreas.length > 0 ? (
              selectedFocusAreas.map((area) => (
                <Badge
                  key={area}
                  variant="secondary"
                  className="rounded-full px-3 py-1"
                >
                  {area}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No specific focus selected
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button variant="outline" className="rounded-2xl px-5" onClick={onBack}>
          Back
        </Button>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="outline" className="rounded-2xl px-5">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button asChild className="rounded-2xl px-5">
            <Link href="/interview/new">Start Your First Interview</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
