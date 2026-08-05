"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlayCircle } from "lucide-react";
import type { ResumeAnalysisResponse } from "@/app/(platform)/resume-analysis/resume-analysis.types";

interface ResumeDetailHeaderProps {
  analysis: ResumeAnalysisResponse;
}

export function ResumeDetailHeader({ analysis }: ResumeDetailHeaderProps) {
  const details = analysis.extracted_details;
  const hasRounds = details.suggested_rounds && details.suggested_rounds.length > 0;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="sm" className="rounded-full text-xs text-muted-foreground hover:text-foreground">
          <Link href="/resume-analysis" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Analyses
          </Link>
        </Button>
      </div>

      {hasRounds && (
        <Button asChild className="rounded-full gap-2 text-xs font-bold bg-primary text-primary-foreground shadow-xs hover:bg-primary/90">
          <Link
            href={{
              pathname: "/job-prep/create",
              query: { analysis_id: analysis.id },
            }}
          >
            <PlayCircle className="h-4 w-4" /> Start Mock Interview
          </Link>
        </Button>
      )}
    </div>
  );
}
