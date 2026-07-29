"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCreateJobPrep } from "@/app/(platform)/job-prep/use-job-prep";
import { useResumeHistory } from "@/app/(platform)/resume-analysis/use-resume-analysis";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, PlayCircle, Layers, FileText } from "lucide-react";
import { Suspense } from "react";

const AVAILABLE_ROUNDS = [
  { id: "Technical", name: "Technical Interview", desc: "Data structures, algorithms, domain technical concepts" },
  { id: "Behavioral", name: "Behavioral & STAR Method", desc: "Past experiences, teamwork, problem solving, leadership" },
  { id: "System Design", name: "System Design & Architecture", desc: "Scalability, API design, data storage, trade-offs" },
  { id: "HR & Culture", name: "HR & Culture Fit", desc: "Career goals, company values, salary expectations" },
];

function CreateJobPrepForm() {
  const searchParams = useSearchParams();
  const initialAnalysisId = searchParams.get("analysis_id") || "";

  const [selectedAnalysisId, setSelectedAnalysisId] = useState<string>(initialAnalysisId);
  const [selectedRounds, setSelectedRounds] = useState<string[]>(["Technical", "Behavioral"]);

  const { data: resumeHistory, isLoading: isLoadingHistory } = useResumeHistory();
  const { mutate: createPrep, isPending } = useCreateJobPrep();

  const handleRoundToggle = (roundId: string) => {
    setSelectedRounds((prev) =>
      prev.includes(roundId) ? prev.filter((r) => r !== roundId) : [...prev, roundId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAnalysisId) return;
    createPrep({
      resume_analysis_id: selectedAnalysisId,
      selected_rounds: selectedRounds,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" /> Select Resume Analysis Baseline
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Choose the analyzed resume & job description to ground your mock interview questions on.
          </p>
          {isLoadingHistory ? (
            <div className="text-sm text-muted-foreground">Loading analyses...</div>
          ) : (
            <Select value={selectedAnalysisId} onValueChange={setSelectedAnalysisId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Resume Analysis..." />
              </SelectTrigger>
              <SelectContent>
                {resumeHistory?.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.resume_filename} ({item.match_score}% Match) - {new Date(item.created_at).toLocaleDateString()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" /> Select Interview Rounds
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Choose one or more interview rounds to include in your mock preparation track.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {AVAILABLE_ROUNDS.map((round) => {
              const checked = selectedRounds.includes(round.id);
              return (
                <div
                  key={round.id}
                  onClick={() => handleRoundToggle(round.id)}
                  className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                    checked ? "border-primary bg-primary/5" : "border-border bg-card hover:bg-muted/50"
                  }`}
                >
                  <Checkbox id={round.id} checked={checked} onCheckedChange={() => handleRoundToggle(round.id)} />
                  <div className="space-y-1">
                    <Label htmlFor={round.id} className="font-medium cursor-pointer">
                      {round.name}
                    </Label>
                    <p className="text-xs text-muted-foreground">{round.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Button
        type="submit"
        className="w-full sm:w-auto gap-2"
        disabled={isPending || !selectedAnalysisId || selectedRounds.length === 0}
      >
        <PlayCircle className="h-4 w-4" />
        {isPending ? "Creating Preparation Track..." : "Launch Mock Preparation Track"}
      </Button>
    </form>
  );
}

export default function CreateJobPrepPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <Button asChild variant="ghost" size="sm">
          <Link href="/job-prep" className="flex items-center gap-2 text-muted-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Job Preparations
          </Link>
        </Button>
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Create Mock Interview Track</h1>
        <p className="text-sm text-muted-foreground">
          Generate role-specific interview questions and practice answers based on your resume analysis.
        </p>
      </div>

      <Suspense fallback={<div className="text-sm text-muted-foreground">Loading...</div>}>
        <CreateJobPrepForm />
      </Suspense>
    </div>
  );
}
