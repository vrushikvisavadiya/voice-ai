"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useJobPrepDetail } from "../use-job-prep";
import { useResumeAnalysisDetail } from "@/app/(platform)/resume-analysis/use-resume-analysis";
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
  Code2,
  Users2,
  Cpu,
  UserCheck2,
  Brain,
  Target,
  FileText,
  ChevronRight,
  HelpCircle,
  RotateCcw,
  Zap,
  Award,
  User,
  Info,
  Lightbulb,
  Mic,
  ArrowUpRight,
} from "lucide-react";

// Presentation icon mapper for round types
const ROUND_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  technical: Code2,
  coding: Code2,
  behavioral: Users2,
  "system-design": Cpu,
  architecture: Cpu,
  "hr-culture": UserCheck2,
  hr: UserCheck2,
  culture: UserCheck2,
  managerial: UserCheck2,
  manager: UserCheck2,
  leadership: Brain,
  pitching: Target,
  sales: Target,
  roleplay: Target,
};

function getRoundIcon(roundName: string) {
  const lower = roundName.toLowerCase();
  for (const [key, icon] of Object.entries(ROUND_ICONS)) {
    if (lower.includes(key)) return icon;
  }
  return Briefcase;
}

export default function JobPrepDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: prep, isLoading, error } = useJobPrepDetail(id);

  // Filter state for round list (All / Pending / Completed)
  const [filterMode, setFilterMode] = useState<"all" | "pending" | "completed">("all");

  // Optionally fetch baseline resume analysis if linked
  const analysisId = prep?.resume_analysis_id || "";
  const { data: analysis } = useResumeAnalysisDetail(analysisId);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <Sparkles className="h-6 w-6 animate-spin text-primary" />
        <p className="text-sm font-medium text-muted-foreground">Loading interview track details...</p>
      </div>
    );
  }

  if (error || !prep) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 text-center space-y-4 rounded-2xl border border-border bg-card shadow-2xs">
        <p className="text-sm text-destructive font-semibold">Failed to load preparation track.</p>
        <p className="text-xs text-muted-foreground">
          The requested track may have been removed or is unavailable.
        </p>
        <Button asChild variant="outline" className="rounded-xl">
          <Link href="/job-prep">Back to Job Preparations</Link>
        </Button>
      </div>
    );
  }

  const completedRounds = prep.rounds.filter((r) => r.status === "completed");
  const pendingRounds = prep.rounds.filter((r) => r.status !== "completed");
  const totalRounds = prep.rounds.length;
  const progressPercent = totalRounds > 0 ? Math.round((completedRounds.length / totalRounds) * 100) : 0;
  const allCompleted = totalRounds > 0 && completedRounds.length === totalRounds;
  const totalQuestions = prep.rounds.reduce((acc, r) => acc + (r.questions?.length || 0), 0);

  // Find the next round ready for practice
  const nextUpRound = pendingRounds[0] || prep.rounds[0];

  // Filter rounds according to filter tab
  const displayedRounds = prep.rounds.filter((r) => {
    if (filterMode === "pending") return r.status !== "completed";
    if (filterMode === "completed") return r.status === "completed";
    return true;
  });

  return (
    <div className="w-full max-w-[1700px] mx-auto space-y-6 ">
      {/* Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="h-8 text-xs text-muted-foreground hover:text-foreground rounded-lg -ml-2 gap-1.5 self-start"
        >
          <Link href="/job-prep">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Job Preparations</span>
          </Link>
        </Button>

        <div className="flex items-center gap-2">
          {completedRounds.length > 0 && (
            <Button asChild size="sm" variant="outline" className="h-9 rounded-xl gap-2 text-xs font-semibold border-border">
              <Link href={`/job-prep/${prep.id}/report`}>
                <BarChart3 className="h-4 w-4 text-primary" />
                <span>Full Readiness Report</span>
              </Link>
            </Button>
          )}

          {nextUpRound && !allCompleted && (
            <Button asChild size="sm" className="h-9 rounded-xl gap-2 text-xs font-semibold bg-primary text-primary-foreground shadow-2xs">
              <Link href={`/job-prep/${prep.id}/rounds/${nextUpRound.id}/session`}>
                <PlayCircle className="h-4 w-4" />
                <span>Continue Next Round ({nextUpRound.name})</span>
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Hero Command Banner across full width */}
      <Card className="border border-border/80 bg-card/80 backdrop-blur-md shadow-2xs rounded-2xl overflow-hidden py-0 gap-0">
        <CardContent className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-border/40">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="gap-1 text-[11px] font-semibold bg-background">
                  <Briefcase className="h-3 w-3 text-primary" /> Target Role
                </Badge>
                {prep.company_name && (
                  <Badge variant="secondary" className="text-[11px] font-semibold">
                    {prep.company_name}
                  </Badge>
                )}
                <Badge
                  variant={allCompleted ? "default" : "outline"}
                  className={`text-[11px] font-semibold ${allCompleted
                      ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                      : "bg-primary/10 text-primary border-primary/20"
                    }`}
                >
                  {allCompleted ? (
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Track Completed
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-primary" /> Practice In Progress
                    </span>
                  )}
                </Badge>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                {prep.job_title}
              </h1>
              <p className="text-xs text-muted-foreground flex items-center gap-2">
                <span>Created {new Date(prep.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span>
                <span>•</span>
                <span>Tailored AI Practice Track</span>
              </p>
            </div>

            {/* Quick Action Widget */}
            <div className="flex items-center gap-3 self-start lg:self-auto">
              <div className="text-right">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Readiness Score
                </p>
                <p className="text-3xl font-black text-primary">{progressPercent}%</p>
              </div>
              <div className="h-10 w-[1px] bg-border/60" />
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Status
                </p>
                <p className="text-sm font-bold text-foreground">
                  {completedRounds.length} of {totalRounds} Rounds
                </p>
              </div>
            </div>
          </div>

          {/* 4 Stat Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-1">
              <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider block">
                Completion Rate
              </span>
              <p className="text-xl font-bold text-foreground">{progressPercent}%</p>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden mt-1">
                <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-1">
              <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider block">
                Completed Rounds
              </span>
              <p className="text-xl font-bold text-foreground">{completedRounds.length} <span className="text-xs font-normal text-muted-foreground">/ {totalRounds}</span></p>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                {totalRounds - completedRounds.length} Remaining
              </p>
            </div>

            <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-1">
              <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider block">
                Question Bank
              </span>
              <p className="text-xl font-bold text-foreground">{totalQuestions}</p>
              <p className="text-[11px] text-muted-foreground font-medium">AI Tailored</p>
            </div>

            <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-1">
              <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider block">
                Resume Fit Match
              </span>
              <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                {analysis?.match_score ? `${analysis.match_score}%` : "Baseline Loaded"}
              </p>
              <p className="text-[11px] text-muted-foreground font-medium truncate">
                {analysis?.resume_filename || "Role Aligned"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Layout: Practice Rounds (Left 8 Cols) & Sidebar Context (Right 4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT MAIN AREA: Interactive Practice Rounds Launcher (8 cols on lg) */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="border border-border/70 bg-card/60 backdrop-blur-xs shadow-2xs rounded-2xl overflow-hidden py-0 gap-0">
            <CardHeader className="p-5 sm:p-6 pb-4 border-b border-border/40 bg-muted/20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2">
                    <Layers className="h-4.5 w-4.5 text-primary" />
                    Interview Practice Rounds
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground mt-0.5">
                    Launch voice AI mock sessions and review performance breakdowns
                  </CardDescription>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center p-1 rounded-xl bg-muted/50 border border-border/60 shrink-0 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setFilterMode("all")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${filterMode === "all"
                        ? "bg-background text-foreground shadow-2xs font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    All ({totalRounds})
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterMode("pending")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${filterMode === "pending"
                        ? "bg-background text-foreground shadow-2xs font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    Pending ({pendingRounds.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterMode("completed")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${filterMode === "completed"
                        ? "bg-background text-foreground shadow-2xs font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    Completed ({completedRounds.length})
                  </button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-5 sm:p-6 space-y-4">
              {displayedRounds.length === 0 ? (
                <div className="p-8 text-center text-xs text-muted-foreground rounded-xl border border-dashed border-border/70">
                  No rounds found for the selected filter.
                </div>
              ) : (
                displayedRounds.map((round, idx) => {
                  const isCompleted = round.status === "completed";
                  const isNextUp = nextUpRound?.id === round.id && !isCompleted;
                  const Icon = getRoundIcon(round.name);
                  const questionCount = round.questions?.length || 5;

                  return (
                    <div
                      key={round.id}
                      className={`group relative p-5 rounded-2xl border transition-all duration-200 space-y-4 ${isNextUp
                          ? "border-primary bg-primary/[0.04] ring-1 ring-primary/30 shadow-2xs"
                          : isCompleted
                            ? "border-emerald-500/30 bg-emerald-500/[0.03]"
                            : "border-border/70 bg-background/60 hover:border-border hover:bg-muted/30"
                        }`}
                    >
                      {/* Top Bar inside Card */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${isCompleted
                                ? "bg-emerald-500 text-white shadow-xs"
                                : isNextUp
                                  ? "bg-primary text-primary-foreground shadow-xs"
                                  : "bg-muted text-muted-foreground group-hover:text-foreground"
                              }`}
                          >
                            <Icon className="h-5.5 w-5.5" />
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-bold text-muted-foreground">Round {idx + 1}</span>
                              <h3 className="font-bold text-base text-foreground truncate">
                                {round.name}
                              </h3>

                              {isNextUp && (
                                <Badge className="bg-primary text-primary-foreground text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                  UP NEXT
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-2">
                              <span>{questionCount} Dynamic Questions</span>
                              <span>•</span>
                              <span>Voice & Text Evaluation</span>
                            </p>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <Badge
                          variant={isCompleted ? "default" : "secondary"}
                          className={`capitalize text-xs font-semibold flex items-center gap-1.5 px-2.5 py-1 rounded-full shrink-0 ${isCompleted
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                              : "bg-muted text-muted-foreground"
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
                      </div>

                      {/* Question Preview List if available */}
                      {round.questions && round.questions.length > 0 ? (
                        <div className="space-y-2 bg-background/60 p-3.5 rounded-xl border border-border/50">
                          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                            Question Highlights ({round.questions.length}):
                          </span>
                          <div className="space-y-2">
                            {round.questions.slice(0, 2).map((q, qIdx) => (
                              <div
                                key={q.id || qIdx}
                                className="flex items-start gap-2 bg-background p-2.5 rounded-lg border border-border/60 text-xs"
                              >
                                <HelpCircle className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                                <div className="space-y-0.5 min-w-0">
                                  <p className="text-xs font-medium text-foreground leading-snug">
                                    {q.question_text}
                                  </p>
                                  {q.expected_answer_guidance && (
                                    <p className="text-[11px] text-muted-foreground line-clamp-1">
                                      Guidance: {q.expected_answer_guidance}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground leading-relaxed bg-background/50 p-3 rounded-xl border border-border/50">
                          {isCompleted
                            ? "This practice round is finished. View your detailed scoring breakdown below."
                            : "Click start below to generate and answer AI questions tailored to your profile."}
                        </p>
                      )}

                      {/* Action Bar inside Card */}
                      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border/40">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Mic className="h-3.5 w-3.5 text-primary" />
                          <span>Interactive AI Voice Session</span>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          {isCompleted ? (
                            <>
                              <Button
                                asChild
                                size="sm"
                                variant="outline"
                                className="h-9 rounded-xl gap-1.5 text-xs font-semibold border-border flex-1 sm:flex-initial"
                              >
                                <Link href={`/job-prep/${prep.id}/rounds/${round.id}/report`}>
                                  <BarChart3 className="h-3.5 w-3.5 text-primary" /> View Report
                                </Link>
                              </Button>
                              <Button
                                asChild
                                size="sm"
                                variant="secondary"
                                className="h-9 rounded-xl gap-1.5 text-xs font-semibold flex-1 sm:flex-initial"
                              >
                                <Link href={`/job-prep/${prep.id}/rounds/${round.id}/session`}>
                                  <RotateCcw className="h-3.5 w-3.5" /> Re-practice
                                </Link>
                              </Button>
                            </>
                          ) : (
                            <Button
                              asChild
                              size="sm"
                              className={`h-9.5 px-5 rounded-xl gap-2 text-xs font-bold shadow-2xs w-full sm:w-auto ${isNextUp
                                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                  : "bg-muted text-foreground hover:bg-muted/80"
                                }`}
                            >
                              <Link href={`/job-prep/${prep.id}/rounds/${round.id}/session`}>
                                <PlayCircle className="h-4 w-4" /> Start AI Practice Session
                                <ChevronRight className="h-3.5 w-3.5 opacity-70" />
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>

          {/* Voice AI Practice Guidelines Widget */}
          <Card className="border border-border/70 bg-card/60 backdrop-blur-xs shadow-2xs rounded-2xl overflow-hidden py-0 gap-0">
            <CardContent className="p-5 sm:p-6 flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Lightbulb className="h-5 w-5" />
              </div>
              <div className="space-y-1 text-xs">
                <h4 className="font-bold text-sm text-foreground">Pro Tip for AI Voice Sessions</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Use the STAR method (Situation, Task, Action, Result) when answering behavioral and technical questions. Speak clearly into your microphone—our AI evaluator scores both response accuracy and communication confidence.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDEBAR: Baseline Resume Profile & Insights (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Baseline Resume Info Card */}
          {analysis ? (
            <Card className="border border-border/70 bg-card/60 backdrop-blur-xs shadow-2xs rounded-2xl overflow-hidden py-0 gap-0">
              <CardHeader className="p-5 pb-4 border-b border-border/40 bg-muted/20">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    Resume Baseline Profile
                  </CardTitle>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    {analysis.match_score}% Fit
                  </span>
                </div>
              </CardHeader>

              <CardContent className="p-5 space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-foreground truncate max-w-[200px]">
                      {analysis.resume_filename}
                    </span>
                    {analysis.extracted_details?.seniority_fit && (
                      <Badge variant="secondary" className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md">
                        {analysis.extracted_details.seniority_fit}
                      </Badge>
                    )}
                  </div>
                  {analysis.extracted_details?.candidate_name && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <User className="h-3 w-3" /> {analysis.extracted_details.candidate_name}
                    </p>
                  )}
                </div>

                {analysis.extracted_details?.experience_match_summary && (
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                      Role Match Summary
                    </span>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 bg-background/50 p-3 rounded-xl border border-border/60">
                      {analysis.extracted_details.experience_match_summary}
                    </p>
                  </div>
                )}

                {/* Identified Skills Cloud */}
                {analysis.extracted_details?.skills?.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                      Extracted Target Skills ({analysis.extracted_details.skills.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                      {analysis.extracted_details.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-background border border-border/70 text-foreground font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-2 border-t border-border/40">
                  <Button asChild variant="ghost" size="sm" className="w-full text-xs text-muted-foreground hover:text-foreground justify-between">
                    <Link href={`/resume-analysis/${analysis.id}`}>
                      <span>View Full Resume Analysis</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border border-border/70 bg-card/60 backdrop-blur-xs shadow-2xs rounded-2xl p-5 text-center space-y-2 py-0 gap-0">
              <CardContent className="p-5">
                <FileText className="h-8 w-8 text-muted-foreground mx-auto" />
                <p className="text-xs text-muted-foreground mt-2">No baseline analysis linked to this track.</p>
              </CardContent>
            </Card>
          )}

          {/* Quick Track Info Card */}
          <Card className="border border-border/70 bg-card/60 backdrop-blur-xs shadow-2xs rounded-2xl overflow-hidden py-0 gap-0">
            <CardHeader className="p-5 pb-3 border-b border-border/40 bg-muted/20">
              <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" />
                Track Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-border/30">
                <span className="text-muted-foreground">Target Role</span>
                <span className="font-semibold text-foreground">{prep.job_title}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/30">
                <span className="text-muted-foreground">Configured Rounds</span>
                <span className="font-semibold text-foreground">{totalRounds} Rounds</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/30">
                <span className="text-muted-foreground">Completed Rounds</span>
                <span className="font-semibold text-foreground">{completedRounds.length} Completed</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Questions Prepared</span>
                <span className="font-semibold text-foreground">{totalQuestions} Questions</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
