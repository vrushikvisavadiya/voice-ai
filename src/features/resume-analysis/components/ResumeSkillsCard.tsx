"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Layers } from "lucide-react";
import type { ResumeAnalysisResponse } from "@/app/(platform)/resume-analysis/resume-analysis.types";

interface ResumeSkillsCardProps {
  analysis: ResumeAnalysisResponse;
}

export function ResumeSkillsCard({ analysis }: ResumeSkillsCardProps) {
  const details = analysis.extracted_details;

  return (
    <div className="grid gap-6 md:grid-cols-2 w-full">
      <Card className="rounded-2xl border-border/70 shadow-2xs">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            <span>Extracted Technical Skills</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2 pt-0">
          {details.skills && details.skills.length > 0 ? (
            details.skills.map((skill: string, idx: number) => (
              <Badge key={idx} variant="outline" className="text-xs rounded-full px-3 py-1 bg-muted/30">
                {skill}
              </Badge>
            ))
          ) : (
            <p className="text-xs text-muted-foreground">No specific skills extracted.</p>
          )}
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/70 shadow-2xs">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
            <Layers className="h-4 w-4 text-primary" />
            <span>Suggested Interview Rounds</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2 pt-0">
          {details.suggested_rounds && details.suggested_rounds.length > 0 ? (
            details.suggested_rounds.map((round: string, idx: number) => (
              <Badge key={idx} className="bg-primary/10 text-primary border-primary/20 text-xs rounded-full px-3 py-1 font-bold flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5" /> {round}
              </Badge>
            ))
          ) : (
            <p className="text-xs text-muted-foreground">Technical, Behavioral</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
