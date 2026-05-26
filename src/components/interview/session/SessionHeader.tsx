import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock3, PhoneOff } from "lucide-react";

interface SessionHeaderProps {
  role: string;
  company: string;
  currentQuestion: number;
  totalQuestions: number;
  timer: string;
}

export function SessionHeader({
  role,
  company,
  currentQuestion,
  totalQuestions,
  timer,
}: SessionHeaderProps) {
  return (
    <header className="flex flex-col gap-4 border-b border-border px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            {role}
          </h2>
          <span className="text-sm text-muted-foreground">at {company}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Badge variant="secondary" className="rounded-full px-3 py-1">
            Question {currentQuestion} of {totalQuestions}
          </Badge>

          <span className="inline-flex items-center gap-2">
            <Clock3 className="size-4" />
            {timer}
          </span>
        </div>
      </div>

      <Button variant="outline" className="h-11 rounded-2xl px-4">
        <PhoneOff className="mr-2 size-4" />
        End Session
      </Button>
    </header>
  );
}
