// src/components/interview/JobDescriptionStep.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { BriefcaseBusiness, Building2, Sparkles } from "lucide-react";

interface DetectionPreview {
  role: string;
  company: string;
  skills: string[];
}

interface JobDescriptionStepProps {
  value: string;
  onChange: (value: string) => void;
  detection: DetectionPreview | null;
}

export function JobDescriptionStep({
  value,
  onChange,
  detection,
}: JobDescriptionStepProps) {
  return (
    <Card className="rounded-3xl border-border shadow-none">
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="size-4" />
          Step 1
        </div>
        <CardTitle className="text-xl font-semibold tracking-tight">
          Paste the Job Description
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          We&apos;ll extract the role, company, and required skills
          automatically.
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <Textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Paste the full job description here..."
          className="min-h-[260px] resize-y rounded-2xl border-border bg-background px-4 py-3 text-sm leading-6"
        />

        {detection ? (
          <div className="rounded-2xl border border-border bg-muted/40 p-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <BriefcaseBusiness className="size-4 text-muted-foreground" />
                {detection.role}
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="size-4" />
                {detection.company}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {detection.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="rounded-full px-3 py-1"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
