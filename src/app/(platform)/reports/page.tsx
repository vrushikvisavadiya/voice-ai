"use client";

import Link from "next/link";
import { useJobPreps } from "../job-prep/use-job-prep";
import { useResumeHistory } from "../resume-analysis/use-resume-analysis";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Mic, ArrowRight, BarChart3, Layers } from "lucide-react";

export default function ReportsPage() {
  const { data: preps, isLoading: isLoadingPreps } = useJobPreps();
  const { data: resumes, isLoading: isLoadingResumes } = useResumeHistory();

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Interview Reports</h1>
        <p className="text-sm text-muted-foreground">
          Detailed performance summaries, question breakdowns, and readiness scores across all your practice sessions.
        </p>
      </div>

      <div className="space-y-6">
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Mic className="h-5 w-5 text-primary" /> Mock Interview Reports
          </h2>
          {isLoadingPreps ? (
            <div className="text-sm text-muted-foreground">Loading reports...</div>
          ) : preps && preps.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {preps.map((prep) => (
                <Card key={prep.id} className="hover:border-primary/50 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-base font-semibold">{prep.job_title}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {prep.rounds.length} Rounds
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {prep.rounds.map((r) => (
                        <Badge key={r.id} variant="secondary" className="text-[11px]">
                          {r.name}: {r.status}
                        </Badge>
                      ))}
                    </div>
                    <Button asChild size="sm" className="w-full gap-1">
                      <Link href={`/job-prep/${prep.id}/report`}>
                        <BarChart3 className="h-3.5 w-3.5" /> View Readiness Report
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No interview reports available yet.</p>
          )}
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" /> Resume Match Reports
          </h2>
          {isLoadingResumes ? (
            <div className="text-sm text-muted-foreground">Loading resume reports...</div>
          ) : resumes && resumes.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {resumes.map((item) => (
                <Card key={item.id} className="hover:border-primary/50 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-base font-medium">{item.resume_filename}</CardTitle>
                    <Badge variant="secondary" className="font-bold text-xs">
                      {item.match_score}% Match
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {item.extracted_details?.experience_match_summary}
                    </p>
                    <Button asChild size="sm" variant="outline" className="w-full gap-1">
                      <Link href={`/resume-analysis/${item.id}`}>
                        <FileText className="h-3.5 w-3.5" /> View Detailed Analysis
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No resume reports available yet.</p>
          )}
        </section>
      </div>
    </div>
  );
}
