"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCreateJobPrep } from "@/app/(platform)/job-prep/use-job-prep";
import { useResumeHistory } from "@/app/(platform)/resume-analysis/use-resume-analysis";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ArrowLeft,
  PlayCircle,
  Layers,
  FileText,
  CheckCircle2,
  Code2,
  Users2,
  Cpu,
  UserCheck2,
  Sparkles,
} from "lucide-react";

interface RoundOption {
  id: string;
  name: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

const AVAILABLE_ROUNDS: RoundOption[] = [
  {
    id: "Technical",
    name: "Technical Interview",
    desc: "Algorithms, system fundamentals & domain technical concepts",
    icon: Code2,
  },
  {
    id: "Behavioral",
    name: "Behavioral & STAR",
    desc: "Past experience, teamwork, problem solving & leadership",
    icon: Users2,
  },
  {
    id: "System Design",
    name: "System Design",
    desc: "Architecture, scalability, trade-offs & data modeling",
    icon: Cpu,
  },
  {
    id: "HR & Culture",
    name: "HR & Culture Fit",
    desc: "Career goals, soft skills, communication & company alignment",
    icon: UserCheck2,
  },
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

  const selectedAnalysis = resumeHistory?.find((item) => item.id === selectedAnalysisId);

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* 1. Baseline Selection */}
      <Card className="border border-border/80 bg-card shadow-sm hover:border-border transition-all">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold">
              1
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" /> Select Resume Analysis Baseline
              </CardTitle>
              <CardDescription>
                Choose the analyzed job description & resume to tailor your questions
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-2">
          {isLoadingHistory ? (
            <div className="h-10 w-full animate-pulse rounded-lg bg-muted" />
          ) : (
            <Select value={selectedAnalysisId} onValueChange={setSelectedAnalysisId}>
              <SelectTrigger className="w-full h-11 border-border bg-background">
                <SelectValue placeholder="Select a previous Resume Analysis..." />
              </SelectTrigger>
              <SelectContent>
                {resumeHistory?.map((item) => (
                  <SelectItem key={item.id} value={item.id} className="py-2.5 cursor-pointer">
                    <div className="flex items-center justify-between w-full gap-4">
                      <span className="font-medium text-foreground">{item.resume_filename}</span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        {item.match_score}% Match
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {selectedAnalysis && (
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-semibold text-foreground block">
                  {selectedAnalysis.resume_filename}
                </span>
                <span className="text-muted-foreground line-clamp-1">
                  {selectedAnalysis.extracted_details?.experience_match_summary}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-bold text-primary text-sm">{selectedAnalysis.match_score}% Fit</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 2. Select Interview Rounds */}
      <Card className="border border-border/80 bg-card shadow-sm hover:border-border transition-all">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold">
                2
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Layers className="h-4 w-4 text-primary" /> Select Interview Rounds
                </CardTitle>
                <CardDescription>
                  Select the practice rounds you want to simulate
                </CardDescription>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">
              {selectedRounds.length} Selected
            </span>
          </div>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="grid gap-4 sm:grid-cols-2">
            {AVAILABLE_ROUNDS.map((round) => {
              const checked = selectedRounds.includes(round.id);
              const Icon = round.icon;

              return (
                <div
                  key={round.id}
                  onClick={() => handleRoundToggle(round.id)}
                  className={`group relative flex items-start gap-3.5 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    checked
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border/60 bg-background/50 hover:border-border hover:bg-muted/40"
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                      checked
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <Label className="font-semibold text-sm text-foreground cursor-pointer">
                        {round.name}
                      </Label>
                      {checked && <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{round.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <p className="text-xs text-muted-foreground">
          Each round generates 5 AI-evaluated role questions with detailed feedback.
        </p>

        <Button
          type="submit"
          size="lg"
          className="w-full sm:w-auto gap-2 px-6 h-12 text-sm font-semibold rounded-xl"
          disabled={isPending || !selectedAnalysisId || selectedRounds.length === 0}
        >
          {isPending ? (
            <>
              <Sparkles className="h-4 w-4 animate-spin" /> Generating Prep Track...
            </>
          ) : (
            <>
              <PlayCircle className="h-4 w-4" /> Launch Mock Preparation Track
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

export default function CreateJobPrepPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <Button asChild variant="ghost" size="sm" className="rounded-lg">
          <Link href="/job-prep" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Job Preparations
          </Link>
        </Button>
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Create Mock Interview Track</h1>
        <p className="text-sm text-muted-foreground">
          Configure role-specific interview rounds based on your target job description.
        </p>
      </div>

      <Suspense fallback={<div className="text-sm text-muted-foreground p-8 text-center">Loading form...</div>}>
        <CreateJobPrepForm />
      </Suspense>
    </div>
  );
}
