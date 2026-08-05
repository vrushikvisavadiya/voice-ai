"use client";

import { ResumeAnalysisHeader } from "./ResumeAnalysisHeader";
import { ResumeAnalyzeForm } from "./ResumeAnalyzeForm";
import { ResumeHistoryGrid } from "./ResumeHistoryGrid";

export function ResumeAnalysisView() {
  return (
    <div className="w-full space-y-6">
      <ResumeAnalysisHeader />
      <ResumeAnalyzeForm />
      <ResumeHistoryGrid />
    </div>
  );
}
