"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, FileText } from "lucide-react";
import type { ResumeAnalysisResponse } from "@/app/(platform)/resume-analysis/resume-analysis.types";

interface ResumeRecommendationsCardProps {
  analysis: ResumeAnalysisResponse;
}

export function ResumeRecommendationsCard({ analysis }: ResumeRecommendationsCardProps) {
  const details = analysis.extracted_details;

  return (
    <Card className="rounded-2xl border-border/70 shadow-2xs w-full">
      <CardHeader className="flex flex-row items-center gap-2 pb-3">
        <FileText className="h-5 w-5 text-primary" />
        <CardTitle className="text-sm font-bold text-foreground">
          Recommendations & Resume Optimization Checklist
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        {details.suggestions?.map((sug: string, idx: number) => (
          <div key={idx} className="p-3.5 rounded-xl bg-muted/40 text-xs sm:text-sm text-foreground border border-border/40">
            {sug}
          </div>
        ))}
        {details.optimization_checklist?.map((item: string, idx: number) => (
          <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground pt-1">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
            <span>{item}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
