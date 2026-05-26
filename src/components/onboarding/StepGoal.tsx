import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type OnboardingGoal =
  | "Job switch"
  | "Promotion interview"
  | "Big Tech FAANG"
  | "Startup role"
  | "General practice";

interface StepGoalProps {
  value: OnboardingGoal | "";
  onChange: (value: OnboardingGoal) => void;
  onBack: () => void;
  onNext: () => void;
}

const goalOptions: OnboardingGoal[] = [
  "Job switch",
  "Promotion interview",
  "Big Tech FAANG",
  "Startup role",
  "General practice",
];

export function StepGoal({ value, onChange, onBack, onNext }: StepGoalProps) {
  return (
    <div className="animate-in fade-in-0 slide-in-from-right-2 duration-300">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          What are you preparing for?
        </h1>
        <p className="text-sm leading-6 text-muted-foreground sm:text-base">
          Choose the interview goal that best matches your current focus.
        </p>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {goalOptions.map((option) => {
          const selected = value === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={cn(
                "rounded-[24px] border p-4 text-left transition-colors",
                selected
                  ? "border-foreground bg-muted"
                  : "border-border bg-card hover:bg-muted/50",
              )}
            >
              <p className="text-sm font-medium text-foreground">{option}</p>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <Button variant="outline" className="rounded-2xl px-5" onClick={onBack}>
          Back
        </Button>
        <Button className="rounded-2xl px-5" onClick={onNext} disabled={!value}>
          Next
        </Button>
      </div>
    </div>
  );
}
