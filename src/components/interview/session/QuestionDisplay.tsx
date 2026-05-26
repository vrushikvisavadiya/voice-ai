import { Badge } from "@/components/ui/badge";

interface QuestionDisplayProps {
  prompt: string;
  stateLabel: string;
}

export function QuestionDisplay({ prompt, stateLabel }: QuestionDisplayProps) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-4 py-10 text-center sm:px-8">
      <Badge
        variant="secondary"
        className="rounded-full px-3 py-1 text-xs uppercase tracking-[0.16em] text-muted-foreground"
      >
        {stateLabel}
      </Badge>

      <h1 className="mt-6 max-w-3xl text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-4xl sm:leading-tight">
        {prompt}
      </h1>

      <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
        Take a moment to structure your answer clearly. The transcript panel can
        stay open while you speak.
      </p>
    </div>
  );
}
