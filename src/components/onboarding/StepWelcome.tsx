import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface StepWelcomeProps {
  fullName: string;
  jobTitle: string;
  onFullNameChange: (value: string) => void;
  onJobTitleChange: (value: string) => void;
  onNext: () => void;
}

export function StepWelcome({
  fullName,
  jobTitle,
  onFullNameChange,
  onJobTitleChange,
  onNext,
}: StepWelcomeProps) {
  const canContinue = fullName.trim().length > 0 && jobTitle.trim().length > 0;

  return (
    <div className="animate-in fade-in-0 slide-in-from-right-2 duration-300">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Welcome to Interview Coach
        </h1>
        <p className="text-sm leading-6 text-muted-foreground sm:text-base">
          Let&apos;s get you set up in under 2 minutes.
        </p>
      </div>

      <div className="mt-8 space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Full name
          </label>
          <Input
            value={fullName}
            onChange={(event) => onFullNameChange(event.target.value)}
            placeholder="Enter your full name"
            className="h-11 rounded-2xl"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Current job title
          </label>
          <Input
            value={jobTitle}
            onChange={(event) => onJobTitleChange(event.target.value)}
            placeholder='e.g. Frontend Engineer or "I&apos;m a student"'
            className="h-11 rounded-2xl"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
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
