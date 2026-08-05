"use client";

import { FileText } from "lucide-react";

export function ResumeAnalysisHeader() {
  return (
    <div className="rounded-2xl bg-card border border-border/70 p-6 sm:p-8 shadow-2xs space-y-5 w-full">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
          <FileText className="h-4 w-4" />
          <span>Resume Matching & Insights</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Resume Analysis & Job Fit
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Compare candidate resumes against job descriptions to calculate match scores, skill gaps, and interview recommendations.
        </p>
      </div>

      {/* 3 Step Guidance Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-border/40">
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-muted/40 border border-border/40">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xs shrink-0">
            1
          </div>
          <div>
            <p className="text-xs font-bold text-foreground">Upload Resume</p>
            <p className="text-[11px] text-muted-foreground">PDF, DOCX, or TXT</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-muted/40 border border-border/40">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xs shrink-0">
            2
          </div>
          <div>
            <p className="text-xs font-bold text-foreground">Paste Job Specs</p>
            <p className="text-[11px] text-muted-foreground">Target requirements</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-muted/40 border border-border/40">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xs shrink-0">
            3
          </div>
          <div>
            <p className="text-xs font-bold text-foreground">Get AI Report</p>
            <p className="text-[11px] text-muted-foreground">Match score & prep</p>
          </div>
        </div>
      </div>
    </div>
  );
}
