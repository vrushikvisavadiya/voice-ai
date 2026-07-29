"use client";

import { use } from "react";
import Link from "next/link";
import { useRoundReport } from "@/app/(platform)/job-prep/use-job-prep";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, AlertTriangle, MessageSquare, BarChart3 } from "lucide-react";

export default function RoundReportPage({
  params,
}: {
  params: Promise<{ id: string; roundId: string }>;
}) {
  const { id: prepId, roundId } = use(params);
  const { data: report, isLoading, error } = useRoundReport(roundId);

  if (isLoading) {
    return <div className="p-8 text-center text-sm text-muted-foreground">Loading round report...</div>;
  }

  if (error || !report) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-sm text-destructive">Failed to load round performance report.</p>
        <Button asChild variant="outline">
          <Link href={`/job-prep/${prepId}`}>Back to Track Overview</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <Button asChild variant="ghost" size="sm">
          <Link href={`/job-prep/${prepId}`} className="flex items-center gap-2 text-muted-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Track
          </Link>
        </Button>

        <Button asChild size="sm">
          <Link href={`/job-prep/${prepId}/report`}>
            <BarChart3 className="h-4 w-4 mr-1" /> View Track Overall Report
          </Link>
        </Button>
      </div>

      {/* Header Score Overview */}
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1">
          <Badge variant="outline">{report.round_type} Round</Badge>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">{report.name} Report</h1>
          <p className="text-xs text-muted-foreground">
            {report.answered_questions} of {report.total_questions} Questions Answered
          </p>
        </div>

        <div className="flex flex-col items-center justify-center rounded-xl bg-primary/5 p-4 border border-primary/20 min-w-[140px]">
          <span className="text-3xl font-extrabold text-primary">
            {report.overall_score ? Math.round(report.overall_score) : 0}%
          </span>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Overall Score</span>
        </div>
      </div>

      {/* Overall Feedback */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <CardTitle className="text-base font-semibold">AI Coaching Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground leading-relaxed">{report.overall_feedback}</p>
        </CardContent>
      </Card>

      {/* Strengths & Areas for Improvement */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            <CardTitle className="text-base font-semibold">Strengths</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {report.strengths?.map((str, idx) => (
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
            <CardTitle className="text-base font-semibold">Areas for Improvement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {report.areas_for_improvement?.map((area, idx) => (
              <div key={idx} className="text-sm text-foreground flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                <span>{area}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Question Breakdown */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Question-by-Question Analysis</h2>
        {report.questions?.map((q, idx) => (
          <Card key={q.id || idx}>
            <CardHeader className="flex flex-row items-start justify-between">
              <div className="space-y-1 pr-4">
                <span className="text-xs font-bold text-muted-foreground uppercase">Question {idx + 1}</span>
                <CardTitle className="text-base font-medium">{q.question_text}</CardTitle>
              </div>
              <Badge variant="secondary" className="shrink-0 font-bold text-xs">
                Score: {q.score ?? 0} / 100
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {q.user_answer && (
                <div className="rounded-lg bg-muted/40 p-3 text-xs text-foreground">
                  <span className="font-semibold block mb-1">Your Answer:</span>
                  {q.user_answer}
                </div>
              )}
              {q.feedback && (
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs text-foreground">
                  <span className="font-semibold block mb-1 text-primary">AI Evaluation & Feedback:</span>
                  {q.feedback}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
