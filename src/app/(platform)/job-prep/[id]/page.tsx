"use client";

import { use } from "react";
import Link from "next/link";
import { useJobPrepDetail } from "../use-job-prep";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, PlayCircle, BarChart3, CheckCircle2, Clock, Layers } from "lucide-react";

export default function JobPrepDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: prep, isLoading, error } = useJobPrepDetail(id);

  if (isLoading) {
    return <div className="p-8 text-center text-sm text-muted-foreground">Loading track details...</div>;
  }

  if (error || !prep) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-sm text-destructive">Failed to load preparation track.</p>
        <Button asChild variant="outline">
          <Link href="/job-prep">Back to Job Preparations</Link>
        </Button>
      </div>
    );
  }

  const allCompleted = prep.rounds.every((r) => r.status === "completed");

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <Button asChild variant="ghost" size="sm">
          <Link href="/job-prep" className="flex items-center gap-2 text-muted-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Tracks
          </Link>
        </Button>

        {allCompleted && (
          <Button asChild className="gap-2">
            <Link href={`/job-prep/${prep.id}/report`}>
              <BarChart3 className="h-4 w-4" /> View Full Track Report
            </Link>
          </Button>
        )}
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-2 shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{prep.job_title}</h1>
        {prep.company_name && <p className="text-sm text-muted-foreground">Company: {prep.company_name}</p>}
        <p className="text-xs text-muted-foreground">
          Created on {new Date(prep.created_at).toLocaleDateString()} • {prep.rounds.length} Interview Rounds
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Interview Rounds</h2>
        <div className="grid gap-4">
          {prep.rounds.map((round) => (
            <Card key={round.id} className="hover:border-primary/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Layers className="h-4 w-4 text-primary" />
                  {round.name}
                </CardTitle>
                <Badge
                  variant={round.status === "completed" ? "default" : "secondary"}
                  className="capitalize text-xs flex items-center gap-1"
                >
                  {round.status === "completed" ? (
                    <>
                      <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Completed
                    </>
                  ) : (
                    <>
                      <Clock className="h-3 w-3" /> {round.status}
                    </>
                  )}
                </Badge>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground">
                  {round.questions?.length || 0} Questions generated
                </p>
                <div className="flex items-center gap-2">
                  {round.status === "completed" ? (
                    <Button asChild size="sm" variant="outline" className="gap-1">
                      <Link href={`/job-prep/${prep.id}/rounds/${round.id}/report`}>
                        <BarChart3 className="h-3.5 w-3.5" /> View Round Report
                      </Link>
                    </Button>
                  ) : (
                    <Button asChild size="sm" className="gap-1">
                      <Link href={`/job-prep/${prep.id}/rounds/${round.id}/session`}>
                        <PlayCircle className="h-3.5 w-3.5" /> Start Round Session
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
