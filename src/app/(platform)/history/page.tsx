"use client";

import Link from "next/link";
import { useResumeHistory } from "../resume-analysis/use-resume-analysis";
import { useJobPreps } from "../job-prep/use-job-prep";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Mic, ArrowRight, CheckCircle2, Clock } from "lucide-react";

export default function HistoryPage() {
  const { data: resumeHistory, isLoading: isLoadingResumes } = useResumeHistory();
  const { data: jobPreps, isLoading: isLoadingPreps } = useJobPreps();

  const isLoading = isLoadingResumes || isLoadingPreps;

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">History & Activity</h1>
        <p className="text-sm text-muted-foreground">
          View all your previous resume analyses and mock interview tracks.
        </p>
      </div>

      <div className="space-y-6">
        {/* Job Preparations History */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Mic className="h-5 w-5 text-primary" /> Mock Interview Tracks
          </h2>
          {isLoadingPreps ? (
            <div className="text-sm text-muted-foreground">Loading tracks...</div>
          ) : jobPreps && jobPreps.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {jobPreps.map((prep) => (
                <Card key={prep.id} className="hover:border-primary/50 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-base font-semibold">{prep.job_title}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {prep.rounds.filter((r) => r.status === "completed").length} / {prep.rounds.length} Rounds
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-xs text-muted-foreground">
                      Created on {new Date(prep.created_at).toLocaleDateString()}
                    </p>
                    <Button asChild size="sm" variant="outline" className="w-full">
                      <Link href={`/job-prep/${prep.id}`} className="flex items-center justify-center gap-1">
                        View Track Details <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No interview tracks created yet.</p>
          )}
        </section>

        {/* Resume Analyses History */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" /> Resume Analyses
          </h2>
          {isLoadingResumes ? (
            <div className="text-sm text-muted-foreground">Loading analyses...</div>
          ) : resumeHistory && resumeHistory.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {resumeHistory.map((item) => (
                <Card key={item.id} className="hover:border-primary/50 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-base font-medium">{item.resume_filename}</CardTitle>
                    <Badge variant="secondary" className="font-bold text-xs">
                      {item.match_score}% Match
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-xs text-muted-foreground">
                      Analyzed on {new Date(item.created_at).toLocaleDateString()}
                    </p>
                    <Button asChild size="sm" variant="outline" className="w-full">
                      <Link href={`/resume-analysis/${item.id}`} className="flex items-center justify-center gap-1">
                        View Insights <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No resume analyses run yet.</p>
          )}
        </section>
      </div>
    </div>
  );
}
