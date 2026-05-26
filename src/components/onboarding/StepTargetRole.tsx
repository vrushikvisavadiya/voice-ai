import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type FocusArea =
  | "Leadership"
  | "System Design"
  | "Behavioral"
  | "Communication"
  | "Technical";

interface StepTargetRoleProps {
  targetRole: string;
  targetCompany: string;
  selectedFocusAreas: FocusArea[];
  onTargetRoleChange: (value: string) => void;
  onTargetCompanyChange: (value: string) => void;
  onToggleFocusArea: (value: FocusArea) => void;
  onBack: () => void;
  onNext: () => void;
}

const focusAreas: FocusArea[] = [
  "Leadership",
  "System Design",
  "Behavioral",
  "Communication",
  "Technical",
];

export function StepTargetRole({
  targetRole,
  targetCompany,
  selectedFocusAreas,
  onTargetRoleChange,
  onTargetCompanyChange,
  onToggleFocusArea,
  onBack,
  onNext,
}: StepTargetRoleProps) {
  const canContinue = targetRole.trim().length > 0;

  return (
    <div className="animate-in fade-in-0 slide-in-from-right-2 duration-300">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          What role are you targeting?
        </h1>
        <p className="text-sm leading-6 text-muted-foreground sm:text-base">
          Tell us the role and focus areas so we can tailor your first session.
        </p>
      </div>

      <div className="mt-8 space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Job title
          </label>
          <Input
            value={targetRole}
            onChange={(event) => onTargetRoleChange(event.target.value)}
            placeholder="e.g. Senior Product Manager"
            className="h-11 rounded-2xl"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Target company
          </label>
          <Input
            value={targetCompany}
            onChange={(event) => onTargetCompanyChange(event.target.value)}
            placeholder="Optional"
            className="h-11 rounded-2xl"
          />
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">Focus areas</p>
          <div className="flex flex-wrap gap-2">
            {focusAreas.map((area) => {
              const selected = selectedFocusAreas.includes(area);

              return (
                <button
                  key={area}
                  type="button"
                  onClick={() => onToggleFocusArea(area)}
                  className="rounded-full"
                >
                  <Badge
                    variant={selected ? "default" : "secondary"}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm transition-colors",
                      selected
                        ? "bg-foreground text-background hover:bg-foreground"
                        : "bg-muted text-foreground hover:bg-muted",
                    )}
                  >
                    {area}
                  </Badge>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <Button variant="outline" className="rounded-2xl px-5" onClick={onBack}>
          Back
        </Button>
        <Button
          className="rounded-2xl px-5"
          onClick={onNext}
          disabled={!canContinue}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
