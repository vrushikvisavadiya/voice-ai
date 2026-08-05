"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import type { ResumeAnalysisResponse } from "@/app/(platform)/resume-analysis/resume-analysis.types";

interface ResumeStrengthsGapsCardProps {
  analysis: ResumeAnalysisResponse;
}

export function ResumeStrengthsGapsCard({ analysis }: ResumeStrengthsGapsCardProps) {
  const details = analysis.extracted_details;

  return (
    <div className="grid gap-6 md:grid-cols-2 w-full">
      <Card className="rounded-2xl border-border/70 shadow-2xs">
        <CardHeader className="flex flex-row items-center gap-2 pb-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          <CardTitle className="text-sm font-bold text-foreground">Key Strengths</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2.5 pt-0">
          {details.strengths?.map((str: string, idx: number) => (
            <div key={idx} className="text-xs sm:text-sm text-foreground flex items-start gap-2.5 p-2.5 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
              <span className="text-emerald-600 font-bold">•</span>
              <span>{str}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 shadow-2xs">
        <CardHeader className="flex flex-row items-center gap-2 pb-3">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <CardTitle className="text-sm font-bold text-foreground">Identified Skill Gaps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2.5 pt-0">
          {details.gaps?.map((gap: string, idx: number) => (
            <div key={idx} className="text-xs sm:text-sm text-foreground flex items-start gap-2.5 p-2.5 rounded-xl bg-amber-500/5 border border-amber-500/10">
              <span className="text-amber-600 font-bold">•</span>
              <span>{gap}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
