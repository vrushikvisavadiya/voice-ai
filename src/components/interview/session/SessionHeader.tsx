import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock3, Loader2, PhoneOff } from "lucide-react";

interface SessionHeaderProps {
  role: string;
  company: string;
  currentQuestion: number;
  totalQuestions: number;
  timer: string;
  onEndSession: () => void;
  isEnding?: boolean;
}

export function SessionHeader({
  role,
  company,
  currentQuestion,
  totalQuestions,
  timer,
  onEndSession,
  isEnding = false,
}: SessionHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate text-lg font-semibold tracking-tight text-foreground">
              {role}
            </h2>
            <span className="text-sm text-muted-foreground">at {company}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="secondary" className="rounded-full px-3 py-1">
              Question {currentQuestion} of {totalQuestions}
            </Badge>

            <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3 py-1.5">
              <Clock3 className="size-4" />
              <span className="tabular-nums">{timer}</span>
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          className="h-11 shrink-0 rounded-2xl px-4"
          onClick={onEndSession}
          disabled={isEnding}
        >
          {isEnding ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Ending...
            </>
          ) : (
            <>
              <PhoneOff className="mr-2 size-4" />
              End Session
            </>
          )}
        </Button>
      </div>
    </header>
  );
}
