"use client";

import { use } from "react";
import Link from "next/link";
import { useJobPrepDetail } from "../use-job-prep";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  PlayCircle,
  BarChart3,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  Calendar,
  Briefcase,
} from "lucide-react";

export default function JobPrepDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: prep, isLoading, error } = useJobPrepDetail(id);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <Sparkles className="h-6 w-6 animate-spin text-primary" />
        <p className="text-sm font-medium text-muted-foreground">Loading track details...</p>
      </div>
    );
  }

  if (error || !prep) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 text-center space-y-4 rounded-2xl border bg-card shadow-sm">
        <p className="text-sm text-destructive font-medium">Failed to load preparation track.</p>
        <Button asChild variant="outline" className="rounded-xl">
          <Link href="/job-prep">Back to Job Preparations</Link>
        </Button>
      </div>
    );
  }

  const completedRounds = prep.rounds.filter((r) => r.status === "completed");
  const totalRounds = prep.rounds.length;
  const progressPercent = totalRounds > 0 ? Math.round((completedRounds.length / totalRounds) * 100) : 0;
  const allCompleted = totalRounds > 0 && completedRounds.length === totalRounds;

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4 md:p-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <Button asChild variant="ghost" size="sm" className="rounded-lg">
          <Link href="/job-prep" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Tracks
          </Link>
        </Button>

        {allCompleted && (
          <Button asChild className="gap-2 rounded-xl">
            <Link href={`/job-prep/${prep.id}/report`}>
              <BarChart3 className="h-4 w-4" /> View Full Track Report
            </Link>
          </Button>
        )}
      </div>

      {/* Header Banner */}
      <div className="rounded-2xl border border-border bg-gradient-to-br from-card via-card to-primary/5 p-6 md:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1 text-xs">
                <Briefcase className="h-3 w-3 text-primary" /> Target Role
              </Badge>
              {prep.company_name && (
                <Badge variant="secondary" className="text-xs">
                  {prep.company_name}
                </Badge>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              {prep.job_title}
            </h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5 pt-1">
              <Calendar className="h-3.5 w-3.5" /> Created on {new Date(prep.created_at).toLocaleDateString()}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center rounded-xl bg-background/80 backdrop-blur-sm p-4 border border-border min-w-[150px]">
            <span className="text-3xl font-black text-primary">{progressPercent}%</span>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Track Progress
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-muted-foreground font-medium">
            <span>Progress ({completedRounds.length} of {totalRounds} rounds completed)</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Rounds List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Interview Rounds</h2>
          <span className="text-xs text-muted-foreground">{totalRounds} Total Rounds</span>
        </div>

        <div className="grid gap-4">
          {prep.rounds.map((round, idx) => {
            const isCompleted = round.status === "completed";

            return (
              <Card
                key={round.id}
                className={`transition-all duration-200 ${
                  isCompleted ? "border-emerald-500/30 bg-emerald-500/5" : "border-border/80 bg-card hover:border-border"
                }`}
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-xs">
                      {idx + 1}
                    </div>
                    <div>
                      <CardTitle className="text-base font-semibold flex items-center gap-2">
                        <Layers className="h-4 w-4 text-primary" />
                        {round.name}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {round.questions?.length || 5} Questions included
                      </CardDescription>
                    </div>
                  </div>

                  <Badge
                    variant={isCompleted ? "default" : "secondary"}
                    className={`capitalize text-xs flex items-center gap-1 ${
                      isCompleted ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : ""
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Completed
                      </>
                    ) : (
                      <>
                        <Clock className="h-3.5 w-3.5" /> Pending Practice
                      </>
                    )}
                  </Badge>
                </CardHeader>

                <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <p className="text-xs text-muted-foreground">
                    {isCompleted
                      ? "Evaluated & scored. View report to see feedback."
                      : "Ready to practice. Click start to answer questions."}
                  </p>

                  <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <Button asChild size="sm" variant="outline" className="gap-1.5 rounded-xl border-border">
                        <Link href={`/job-prep/${prep.id}/rounds/${round.id}/report`}>
                          <BarChart3 className="h-3.5 w-3.5" /> View Round Report
                        </Link>
                      </Button>
                    ) : (
                      <Button asChild size="sm" className="gap-1.5 rounded-xl">
                        <Link href={`/job-prep/${prep.id}/rounds/${round.id}/session`}>
                          <PlayCircle className="h-3.5 w-3.5" /> Start Round Session
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
