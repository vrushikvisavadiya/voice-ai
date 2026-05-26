// src/components/interview/ConfirmStep.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  ListChecks,
} from "lucide-react";

interface ConfirmStepProps {
  role: string;
  company: string;
  interviewType: string;
  difficulty: string;
  questionCount: number;
  focusAreas: string[];
  onStart: () => void;
}

export function ConfirmStep({
  role,
  company,
  interviewType,
  difficulty,
  questionCount,
  focusAreas,
  onStart,
}: ConfirmStepProps) {
  return (
    <Card className="rounded-3xl border-border shadow-none">
      <CardHeader className="space-y-2">
        <p className="text-sm text-muted-foreground">Step 3</p>
        <CardTitle className="text-xl font-semibold tracking-tight">
          Confirm before starting
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="grid gap-3 rounded-2xl border border-border bg-muted/40 p-4 text-sm sm:grid-cols-2">
          <div className="space-y-1">
            <p className="text-muted-foreground">Role</p>
            <div className="flex items-center gap-2 font-medium text-foreground">
              <BriefcaseBusiness className="size-4 text-muted-foreground" />
              {role}
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-muted-foreground">Company</p>
            <div className="flex items-center gap-2 font-medium text-foreground">
              <Building2 className="size-4 text-muted-foreground" />
              {company}
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-muted-foreground">Interview Type</p>
            <p className="font-medium text-foreground">{interviewType}</p>
          </div>

          <div className="space-y-1">
            <p className="text-muted-foreground">Difficulty</p>
            <p className="font-medium text-foreground">{difficulty}</p>
          </div>

          <div className="space-y-1 sm:col-span-2">
            <p className="text-muted-foreground">Questions</p>
            <div className="flex items-center gap-2 font-medium text-foreground">
              <ListChecks className="size-4 text-muted-foreground" />
              {questionCount} questions
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Focus areas</p>
          <div className="flex flex-wrap gap-2">
            {focusAreas.map((area) => (
              <Badge
                key={area}
                variant="secondary"
                className="rounded-full px-3 py-1"
              >
                {area}
              </Badge>
            ))}
          </div>
        </div>

        <Button onClick={onStart} size="lg" className="h-12 rounded-2xl px-5">
          Start Interview
          <ArrowRight className="ml-2 size-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
