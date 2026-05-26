"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { BriefcaseBusiness, Building2, Loader2, Sparkles } from "lucide-react";

interface DetectionPreview {
  role: string;
  company: string;
  skills: string[];
}

interface JobDescriptionStepProps {
  value: string;
  onChange: (value: string) => void;
  detection: DetectionPreview | null;
  isDetecting?: boolean;
}

export function JobDescriptionStep({
  value,
  onChange,
  detection,
  isDetecting = false,
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
        <div className="relative">
          <Textarea
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Paste the full job description here..."
            className="min-h-[260px] resize-y rounded-2xl border-border bg-background px-4 py-3 pr-10 text-sm leading-6"
          />
          {isDetecting ? (
            <div className="absolute right-3 top-3">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            </div>
          ) : null}
        </div>

        {/* Detecting skeleton */}
        {isDetecting ? (
          <div className="rounded-2xl border border-border bg-muted/40 p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              Detecting role, company and skills…
            </div>
            <div className="space-y-2">
              <div className="h-4 w-2/3 animate-pulse rounded-lg bg-muted" />
              <div className="h-3 w-2/5 animate-pulse rounded-lg bg-muted" />
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {[72, 88, 64, 96, 80].map((width) => (
                <div
                  key={width}
                  className="h-7 animate-pulse rounded-full bg-muted"
                  style={{ width }}
                />
              ))}
            </div>
          </div>
        ) : null}

        {/* Detection result */}
        {!isDetecting && detection ? (
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

        {/* Empty state */}
        {!isDetecting && !detection ? (
          <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Start typing or paste a job description above to auto-detect role,
              company, and skills.
            </p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
