"use client";

import { use } from "react";
import Link from "next/link";
import { useResumeAnalysisDetail } from "../use-resume-analysis";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle, Lightbulb, PlayCircle, ArrowLeft, Layers } from "lucide-react";

export default function ResumeAnalysisDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: analysis, isLoading, error } = useResumeAnalysisDetail(id);

  if (isLoading) {
    return <div className="p-8 text-center text-sm text-muted-foreground">Loading analysis details...</div>;
  }

  if (error || !analysis) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-sm text-destructive">Failed to load resume analysis.</p>
        <Button asChild variant="outline">
          <Link href="/resume-analysis">Back to Resume Analysis</Link>
        </Button>
      </div>
    );
  }

  const details = analysis.extracted_details;

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <Button asChild variant="ghost" size="sm">
          <Link href="/resume-analysis" className="flex items-center gap-2 text-muted-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Analyses
          </Link>
        </Button>

        {details.suggested_rounds && details.suggested_rounds.length > 0 && (
          <Button asChild className="gap-2">
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

      {/* Header Match Score Overview */}
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">{analysis.resume_filename}</h1>
            {details.seniority_fit && <Badge variant="secondary">{details.seniority_fit}</Badge>}
          </div>
          <p className="text-sm text-muted-foreground">{details.experience_match_summary}</p>
        </div>

        <div className="flex flex-col items-center justify-center rounded-xl bg-primary/5 p-4 border border-primary/20 min-w-[140px]">
          <span className="text-3xl font-extrabold text-primary">{analysis.match_score}%</span>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Match Score</span>
        </div>
      </div>

      {/* Experience & Skills summary */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Skills Identified</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {details.skills && details.skills.length > 0 ? (
              details.skills.map((skill, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))
            ) : (
              <p className="text-xs text-muted-foreground">No specific skills extracted.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Suggested Interview Rounds</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {details.suggested_rounds && details.suggested_rounds.length > 0 ? (
              details.suggested_rounds.map((round, idx) => (
                <Badge key={idx} className="bg-primary/10 text-primary border-primary/20 text-xs flex items-center gap-1">
                  <Layers className="h-3 w-3" /> {round}
                </Badge>
              ))
            ) : (
              <p className="text-xs text-muted-foreground">Technical, Behavioral</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Strengths & Gaps */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            <CardTitle className="text-base font-semibold">Key Strengths</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {details.strengths?.map((str, idx) => (
              <div key={idx} className="text-sm text-foreground flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span>{str}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <CardTitle className="text-base font-semibold">Identified Gaps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {details.gaps?.map((gap, idx) => (
              <div key={idx} className="text-sm text-foreground flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                <span>{gap}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Suggestions & Optimization Checklist */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          <CardTitle className="text-base font-semibold">Suggestions & Optimization Checklist</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {details.suggestions?.map((sug, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-muted/50 text-sm text-foreground">
              {sug}
            </div>
          ))}
          {details.optimization_checklist?.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>{item}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
