// src/components/interview/ConfigureStep.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type InterviewType = "Technical" | "Behavioral" | "Mixed";
export type Difficulty = "Easy" | "Medium" | "Hard";

interface ConfigureStepProps {
  interviewType: InterviewType;
  onInterviewTypeChange: (value: InterviewType) => void;
  difficulty: Difficulty;
  onDifficultyChange: (value: Difficulty) => void;
  questionCount: number[];
  onQuestionCountChange: (value: number[]) => void;
  focusAreas: string[];
  allFocusAreas: string[];
  onToggleFocusArea: (value: string) => void;
}

export function ConfigureStep({
  interviewType,
  onInterviewTypeChange,
  difficulty,
  onDifficultyChange,
  questionCount,
  onQuestionCountChange,
  focusAreas,
  allFocusAreas,
  onToggleFocusArea,
}: ConfigureStepProps) {
  return (
    <Card className="rounded-3xl border-border shadow-none">
      <CardHeader className="space-y-2">
        <p className="text-sm text-muted-foreground">Step 2</p>
        <CardTitle className="text-xl font-semibold tracking-tight">
          Configure the interview
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Interview Type</Label>
            <Select
              value={interviewType}
              onValueChange={(value) =>
                onInterviewTypeChange(value as InterviewType)
              }
            >
              <SelectTrigger className="h-11 rounded-2xl border-border bg-background">
                <SelectValue placeholder="Choose interview type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Technical">Technical</SelectItem>
                <SelectItem value="Behavioral">Behavioral</SelectItem>
                <SelectItem value="Mixed">Mixed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Difficulty</Label>
            <div className="grid grid-cols-3 gap-2 rounded-2xl border border-border bg-muted/40 p-1">
              {(["Easy", "Medium", "Hard"] as Difficulty[]).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => onDifficultyChange(level)}
                  className={cn(
                    "rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                    difficulty === level
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <Label>Number of Questions</Label>
            <span className="text-sm font-medium tabular-nums text-foreground">
              {questionCount[0]}
            </span>
          </div>

          <Slider
            value={questionCount}
            min={5}
            max={15}
            step={1}
            onValueChange={onQuestionCountChange}
          />

          <p className="text-xs text-muted-foreground">
            Choose between 5 and 15 questions.
          </p>
        </div>

        <div className="space-y-3">
          <Label>Focus Areas</Label>
          <div className="flex flex-wrap gap-2">
            {allFocusAreas.map((area) => {
              const active = focusAreas.includes(area);

              return (
                <button
                  key={area}
                  type="button"
                  onClick={() => onToggleFocusArea(area)}
                >
                  <Badge
                    variant="secondary"
                    className={cn(
                      "rounded-full px-3 py-1.5 text-sm transition-colors",
                      active
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                    )}
                  >
                    {area}
                  </Badge>
                </button>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
