"use client";

import { ResumeDetailHeader } from "./ResumeDetailHeader";
import { ResumeMatchGaugeCard } from "./ResumeMatchGaugeCard";
import { ResumeSkillsCard } from "./ResumeSkillsCard";
import { ResumeStrengthsGapsCard } from "./ResumeStrengthsGapsCard";
import { ResumeRecommendationsCard } from "./ResumeRecommendationsCard";
import type { ResumeAnalysisResponse } from "@/app/(platform)/resume-analysis/resume-analysis.types";

interface ResumeDetailViewProps {
  analysis: ResumeAnalysisResponse;
}

export function ResumeDetailView({ analysis }: ResumeDetailViewProps) {
  return (
    <div className="w-full space-y-6">
      <ResumeDetailHeader analysis={analysis} />
      <ResumeMatchGaugeCard analysis={analysis} />
      <ResumeSkillsCard analysis={analysis} />
      <ResumeStrengthsGapsCard analysis={analysis} />
      <ResumeRecommendationsCard analysis={analysis} />
    </div>
  );
}
