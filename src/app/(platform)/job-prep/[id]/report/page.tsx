"use client";

import { use } from "react";
import Link from "next/link";
import { usePrepReport } from "@/app/(platform)/job-prep/use-job-prep";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Award, CheckCircle2, Layers } from "lucide-react";

export default function PreparationReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: prepId } = use(params);
  const { data: report, isLoading, error } = usePrepReport(prepId);

  if (isLoading) {
    return <div className="p-8 text-center text-sm text-muted-foreground">Loading readiness report...</div>;
  }

  if (error || !report) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-sm text-destructive">Failed to load readiness report.</p>
        <Button asChild variant="outline">
          <Link href={`/job-prep/${prepId}`}>Back to Track</Link>
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
      </div>

      {/* Header Score & Verdict */}
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2">
          <Badge variant="outline">Comprehensive Candidate Report</Badge>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">{report.job_title}</h1>
          <p className="text-sm text-foreground font-medium flex items-center gap-2">
            <Award className="h-4 w-4 text-primary" /> Verdict: {report.overall_readiness_verdict}
          </p>
          <p className="text-xs text-muted-foreground">
            Completed {report.completed_rounds_count} of {report.total_rounds_count} interview rounds
          </p>
        </div>

        <div className="flex flex-col items-center justify-center rounded-xl bg-primary/5 p-4 border border-primary/20 min-w-[150px]">
          <span className="text-4xl font-extrabold text-primary">
            {report.overall_readiness_score ? Math.round(report.overall_readiness_score) : 0}%
          </span>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Overall Readiness
          </span>
        </div>
      </div>

      {/* Rounds Breakdown */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Rounds Summary</h2>
        <div className="grid gap-4">
          {report.rounds_summary?.map((r) => (
            <Card key={r.round_id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Layers className="h-4 w-4 text-primary" /> {r.name}
                </CardTitle>
                <Badge variant="secondary" className="font-bold text-xs">
                  Score: {r.overall_score ? Math.round(r.overall_score) : 0}%
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-xs text-muted-foreground line-clamp-2">{r.overall_feedback}</p>

                {r.strengths && r.strengths.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-emerald-600">Top Strengths:</span>
                    <div className="flex flex-wrap gap-1">
                      {r.strengths.map((str, idx) => (
                        <Badge key={idx} variant="outline" className="text-[11px] border-emerald-200">
                          <CheckCircle2 className="h-3 w-3 text-emerald-500 mr-1" /> {str}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <Button asChild size="sm" variant="ghost" className="mt-2">
                  <Link href={`/job-prep/${prepId}/rounds/${r.round_id}/report`}>
                    View Detailed Round Breakdown →
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
