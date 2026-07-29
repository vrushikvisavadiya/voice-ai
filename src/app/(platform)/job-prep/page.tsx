"use client";

import Link from "next/link";
import { useJobPreps } from "./use-job-prep";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Mic, ArrowRight, Layers, CheckCircle2, Clock } from "lucide-react";

export default function JobPrepListPage() {
  const { data: preps, isLoading } = useJobPreps();

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Mock Interview Tracks</h1>
          <p className="text-sm text-muted-foreground">
            Practice AI-evaluated interview rounds tailored to your target job role.
          </p>
        </div>

        <Button asChild className="gap-2">
          <Link href="/job-prep/create">
            <Plus className="h-4 w-4" /> New Mock Interview
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="text-sm text-muted-foreground py-8 text-center">Loading interview tracks...</div>
      ) : preps && preps.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {preps.map((prep) => {
            const completedCount = prep.rounds.filter((r) => r.status === "completed").length;
            const totalCount = prep.rounds.length;

            return (
              <Card key={prep.id} className="hover:border-primary/50 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Mic className="h-4 w-4 text-primary" />
                    {prep.job_title || "Mock Interview"}
                  </CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {completedCount} / {totalCount} Rounds
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {prep.rounds.map((round) => (
                      <Badge
                        key={round.id}
                        variant="secondary"
                        className="text-[11px] flex items-center gap-1"
                      >
                        {round.status === "completed" ? (
                          <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                        ) : (
                          <Clock className="h-3 w-3 text-muted-foreground" />
                        )}
                        {round.name}
                      </Badge>
                    ))}
                  </div>

                  <Button asChild size="sm" variant="outline" className="w-full">
                    <Link href={`/job-prep/${prep.id}`} className="flex items-center justify-center gap-1">
                      Open Track <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed p-8 text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Mic className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-foreground">No interview tracks created yet</h3>
            <p className="text-sm text-muted-foreground">
              Run a resume analysis first, then start practicing interview rounds tailored to the job description!
            </p>
          </div>
          <Button asChild>
            <Link href="/resume-analysis">Upload Resume to Start</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
