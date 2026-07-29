"use client";

import Link from "next/link";
import { useDashboardData } from "./use-dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Mic,
  Plus,
  Sparkles,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

export function DashboardView() {
  const { user, resumeHistory, jobPreps, isLoadingResumes, isLoadingPreps } = useDashboardData();

  const totalResumes = resumeHistory.length;
  const totalJobPreps = jobPreps.length;
  const totalCompletedRounds = jobPreps.reduce(
    (acc, prep) => acc + prep.rounds.filter((r) => r.status === "completed").length,
    0
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4 md:p-6">
      {/* Welcome Banner */}
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Welcome back{user?.full_name ? `, ${user.full_name}` : ""}!
          </h1>
          <p className="text-sm text-muted-foreground">
            Analyze your target job descriptions and practice role-specific mock interview rounds.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button asChild variant="outline" className="gap-2">
            <Link href="/resume-analysis">
              <FileText className="h-4 w-4" /> Analyze Resume
            </Link>
          </Button>
          <Button asChild className="gap-2">
            <Link href="/job-prep/create">
              <Plus className="h-4 w-4" /> Start Mock Interview
            </Link>
          </Button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Resumes Analyzed
            </CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalResumes}</div>
            <p className="text-xs text-muted-foreground mt-1">Matched against job descriptions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Interview Tracks
            </CardTitle>
            <Mic className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalJobPreps}</div>
            <p className="text-xs text-muted-foreground mt-1">Active role preparations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Rounds Completed
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalCompletedRounds}</div>
            <p className="text-xs text-muted-foreground mt-1">AI-evaluated sessions</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Sections */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Resumes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Recent Resume Analyses</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link href="/resume-analysis" className="text-xs flex items-center gap-1">
                View All <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {isLoadingResumes ? (
              <div className="text-xs text-muted-foreground py-4">Loading...</div>
            ) : resumeHistory.length > 0 ? (
              resumeHistory.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30"
                >
                  <div className="space-y-0.5">
                    <p className="text-xs font-semibold text-foreground">{item.resume_filename}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs font-bold">
                    {item.match_score}% Match
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground py-4 text-center">No resume analyses yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Job Preps */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Recent Interview Tracks</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link href="/job-prep" className="text-xs flex items-center gap-1">
                View All <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {isLoadingPreps ? (
              <div className="text-xs text-muted-foreground py-4">Loading...</div>
            ) : jobPreps.length > 0 ? (
              jobPreps.slice(0, 3).map((prep) => (
                <div
                  key={prep.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30"
                >
                  <div className="space-y-0.5">
                    <p className="text-xs font-semibold text-foreground">{prep.job_title}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {prep.rounds.filter((r) => r.status === "completed").length} of {prep.rounds.length} rounds complete
                    </p>
                  </div>
                  <Button asChild size="sm" variant="ghost">
                    <Link href={`/job-prep/${prep.id}`} className="text-xs">
                      Open →
                    </Link>
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground py-4 text-center">No interview tracks yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
