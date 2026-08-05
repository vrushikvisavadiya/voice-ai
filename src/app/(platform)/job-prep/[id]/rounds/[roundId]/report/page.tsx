"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRoundReport } from "@/app/(platform)/job-prep/use-job-prep";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from "recharts";
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  BarChart3,
  Sparkles,
  Zap,
  Target,
  Lightbulb,
  Copy,
  Check,
  Award,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Share2,
  FileCheck,
  TrendingUp,
} from "lucide-react";

// Helper for score badge styling
function getScoreBadgeVariant(score: number) {
  if (score >= 80) return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
  if (score >= 60) return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
  if (score >= 40) return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
  return "bg-destructive/10 text-destructive border-destructive/20";
}

function getScoreTierLabel(score: number) {
  if (score >= 85) return { label: "Exceptional", color: "text-emerald-500" };
  if (score >= 70) return { label: "Proficient", color: "text-blue-500" };
  if (score >= 50) return { label: "Developing", color: "text-amber-500" };
  return { label: "Needs Practice", color: "text-destructive" };
}

export default function RoundReportPage({
  params,
}: {
  params: Promise<{ id: string; roundId: string }>;
}) {
  const { id: prepId, roundId } = use(params);
  const { data: report, isLoading, error } = useRoundReport(roundId);

  const [copiedQuestionId, setCopiedQuestionId] = useState<string | null>(null);
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({});
  const [filterMode, setFilterMode] = useState<"all" | "high" | "low">("all");

  const toggleExpand = (qId: string) => {
    setExpandedQuestions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleCopy = (text: string, qId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedQuestionId(qId);
    toast.success("Answer copied to clipboard!");
    setTimeout(() => setCopiedQuestionId(null), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary animate-pulse">
          <Sparkles className="h-6 w-6" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">Analyzing performance metrics...</p>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center rounded-3xl border border-border bg-card shadow-sm space-y-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive mx-auto">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <h3 className="font-bold text-base text-foreground">Report Unavailable</h3>
          <p className="text-xs text-muted-foreground">Failed to load performance report for this round.</p>
        </div>
        <Button asChild variant="outline" className="w-full rounded-xl">
          <Link href={`/job-prep/${prepId}`}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Track Overview
          </Link>
        </Button>
      </div>
    );
  }

  const overallScore = Math.round(report.overall_score || 0);
  const tier = getScoreTierLabel(overallScore);

  // Calculate average confidence & accuracy across questions
  const validConfidenceList = report.questions?.map((q) => q.confidence).filter((c): c is number => c != null) || [];
  const avgConfidence = validConfidenceList.length
    ? Math.round(validConfidenceList.reduce((a, b) => a + b, 0) / validConfidenceList.length)
    : null;

  const validAccuracyList = report.questions?.map((q) => q.accuracy).filter((a): a is number => a != null) || [];
  const avgAccuracy = validAccuracyList.length
    ? Math.round(validAccuracyList.reduce((a, b) => a + b, 0) / validAccuracyList.length)
    : null;

  // Chart data for Radar view
  const chartData = report.questions?.map((q, idx) => ({
    question: `Q${idx + 1}`,
    Score: q.score || 0,
    Confidence: q.confidence || 0,
    Accuracy: q.accuracy || 0,
  })) || [];

  // Filtered questions
  const filteredQuestions = report.questions?.filter((q) => {
    if (filterMode === "high") return (q.score || 0) >= 75;
    if (filterMode === "low") return (q.score || 0) < 75;
    return true;
  }) || [];

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-4 md:p-8">
      {/* ── Top Navigation Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <Button asChild variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground self-start">
          <Link href={`/job-prep/${prepId}`}>
            <ArrowLeft className="h-4 w-4" /> Back to Track Overview
          </Link>
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl text-xs gap-1.5 border-border"
            onClick={() => {
              toast.info("Share feature copied report link!");
              navigator.clipboard.writeText(window.location.href);
            }}
          >
            <Share2 className="h-3.5 w-3.5" /> Share
          </Button>

          <Button asChild size="sm" className="rounded-xl text-xs gap-1.5 shadow-sm">
            <Link href={`/job-prep/${prepId}/report`}>
              <BarChart3 className="h-3.5 w-3.5" /> View Track Report
            </Link>
          </Button>
        </div>
      </div>

      {/* ── Executive Performance Hero Card ── */}
      <div className="rounded-3xl border border-border/80 bg-card p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Left Info */}
          <div className="space-y-3 max-w-lg">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="text-xs font-semibold px-3 py-1 rounded-full border-primary/30 text-primary bg-primary/5">
                {report.round_type} Round
              </Badge>
              <Badge variant="secondary" className="text-xs font-medium px-2.5 py-0.5 rounded-full">
                <FileCheck className="h-3 w-3 mr-1 text-emerald-500" />
                {report.answered_questions} / {report.total_questions} Questions Evaluated
              </Badge>
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
                {report.name} Performance Report
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Detailed AI-driven feedback breakdown, key strengths, and actionable coaching recommendations.
              </p>
            </div>
          </div>

          {/* Right Circular Gauge */}
          <div className="flex items-center gap-6 shrink-0 bg-muted/30 p-5 rounded-2xl border border-border/60">
            <div className="relative flex items-center justify-center">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-muted/40"
                  fill="transparent"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 40}
                  strokeDashoffset={2 * Math.PI * 40 * (1 - overallScore / 100)}
                  strokeLinecap="round"
                  className={`${tier.color} transition-all duration-1000 ease-out`}
                  fill="transparent"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-foreground">{overallScore}%</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block">
                Verdict Grade
              </span>
              <p className={`text-lg font-bold ${tier.color}`}>{tier.label}</p>
              <span className="text-xs text-muted-foreground block">Overall Round Score</span>
            </div>
          </div>
        </div>

        {/* Metric Badges Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="rounded-2xl border border-border/60 bg-background/60 p-3.5 space-y-1">
            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              <Award className="h-3.5 w-3.5 text-primary" /> Overall Score
            </span>
            <p className="text-lg font-bold text-foreground">{overallScore}%</p>
          </div>

          <div className="rounded-2xl border border-border/60 bg-background/60 p-3.5 space-y-1">
            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              <Zap className="h-3.5 w-3.5 text-amber-500" /> Avg. Confidence
            </span>
            <p className="text-lg font-bold text-foreground">
              {avgConfidence !== null ? `${avgConfidence}%` : "N/A"}
            </p>
          </div>

          <div className="rounded-2xl border border-border/60 bg-background/60 p-3.5 space-y-1">
            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              <Target className="h-3.5 w-3.5 text-blue-500" /> Avg. Accuracy
            </span>
            <p className="text-lg font-bold text-foreground">
              {avgAccuracy !== null ? `${avgAccuracy}%` : "N/A"}
            </p>
          </div>

          <div className="rounded-2xl border border-border/60 bg-background/60 p-3.5 space-y-1">
            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-500" /> Completion Rate
            </span>
            <p className="text-lg font-bold text-foreground">
              {Math.round((report.answered_questions / report.total_questions) * 100)}%
            </p>
          </div>
        </div>
      </div>

      {/* ── AI Executive Coaching Overview + Radar Chart Grid ── */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Overall AI Feedback (2 cols) */}
        <div className="lg:col-span-2 rounded-3xl border border-border/80 bg-card p-6 md:p-7 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MessageSquare className="h-4 w-4" />
              </div>
              <h2 className="text-base font-bold text-foreground">AI Executive Summary & Coaching Advice</h2>
            </div>
            <p className="text-sm text-foreground leading-relaxed bg-muted/30 p-4 rounded-2xl border border-border/50">
              {report.overall_feedback || "No overall feedback provided for this round."}
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>Evaluated by Claude AI Engine</span>
            <Button asChild variant="ghost" size="sm" className="h-7 text-xs gap-1 text-primary">
              <Link href={`/job-prep/${prepId}/rounds/${roundId}/session`}>
                <RotateCcw className="h-3 w-3" /> Re-take Round
              </Link>
            </Button>
          </div>
        </div>

        {/* Radar Performance Chart (1 col) */}
        <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm flex flex-col items-center justify-center min-h-[260px]">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 self-start">
            Skill & Score Radar
          </span>
          {chartData.length > 0 ? (
            <div className="w-full h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={chartData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                  <PolarGrid stroke="currentColor" strokeOpacity={0.15} />
                  <PolarAngleAxis dataKey="question" stroke="currentColor" strokeOpacity={0.6} tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} stroke="currentColor" strokeOpacity={0.3} />
                  <Radar name="Score" dataKey="Score" stroke="var(--color-primary, #3b82f6)" fill="var(--color-primary, #3b82f6)" fillOpacity={0.3} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card, #ffffff)",
                      borderColor: "var(--color-border, #e5e7eb)",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground py-10">No metric data available for radar.</p>
          )}
        </div>
      </div>

      {/* ── Key Strengths & Growth Areas Grid ── */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Strengths */}
        <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <h2 className="text-base font-bold text-foreground">Key Round Strengths</h2>
          </div>
          <div className="space-y-2">
            {report.strengths && report.strengths.length > 0 ? (
              report.strengths.map((str, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-foreground bg-background/60 p-3 rounded-xl border border-emerald-500/10">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 font-bold text-[10px] mt-0.5">
                    ✓
                  </span>
                  <span className="leading-relaxed">{str}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground">No specific strengths highlighted.</p>
            )}
          </div>
        </div>

        {/* Growth Areas */}
        <div className="rounded-3xl border border-amber-500/20 bg-amber-500/5 p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <h2 className="text-base font-bold text-foreground">Areas for Growth</h2>
          </div>
          <div className="space-y-2">
            {report.areas_for_improvement && report.areas_for_improvement.length > 0 ? (
              report.areas_for_improvement.map((area, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-foreground bg-background/60 p-3 rounded-xl border border-amber-500/10">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-600 font-bold text-[10px] mt-0.5">
                    !
                  </span>
                  <span className="leading-relaxed">{area}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground">No areas flagged for improvement.</p>
            )}
          </div>
        </div>
      </div>

      {/* ── Question-by-Question Evaluation Header & Filter Bar ── */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">Question-by-Question Breakdown</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Detailed transcript, metric breakdown, and tailored suggestions for every question.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-muted/40 p-1 rounded-2xl border border-border/60 self-start sm:self-auto">
            <button
              onClick={() => setFilterMode("all")}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                filterMode === "all" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All ({report.questions?.length || 0})
            </button>
            <button
              onClick={() => setFilterMode("high")}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                filterMode === "high" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Strong (≥75)
            </button>
            <button
              onClick={() => setFilterMode("low")}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                filterMode === "low" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Needs Work (&lt;75)
            </button>
          </div>
        </div>

        {/* Question Cards Stack */}
        <div className="space-y-4">
          {filteredQuestions.map((q, idx) => {
            const score = q.score || 0;
            const isExpanded = expandedQuestions[q.id] ?? true; // default expanded

            return (
              <div
                key={q.id || idx}
                className="rounded-3xl border border-border/70 bg-card shadow-sm transition-all overflow-hidden"
              >
                {/* Question Card Header */}
                <div
                  className="p-5 md:p-6 flex items-start justify-between gap-4 cursor-pointer hover:bg-muted/20 transition-colors"
                  onClick={() => toggleExpand(q.id)}
                >
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="flex h-5 px-2 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-[11px]">
                        Q{idx + 1}
                      </span>
                      <Badge variant="outline" className={`text-xs font-bold border ${getScoreBadgeVariant(score)}`}>
                        Score: {score} / 100
                      </Badge>
                      {q.confidence != null && (
                        <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <Zap className="h-3 w-3 text-amber-500" /> Conf: {q.confidence}%
                        </span>
                      )}
                      {q.accuracy != null && (
                        <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <Target className="h-3 w-3 text-blue-500" /> Acc: {q.accuracy}%
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-foreground leading-snug">
                      {q.question_text}
                    </h3>
                  </div>

                  <button type="button" className="text-muted-foreground hover:text-foreground p-1 shrink-0">
                    {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                </div>

                {/* Collapsible Content Body */}
                {isExpanded && (
                  <div className="px-5 pb-6 md:px-6 space-y-4 border-t border-border/40 pt-4">
                    {/* User Answer Block */}
                    {q.user_answer && (
                      <div className="rounded-2xl bg-muted/30 p-4 border border-border/50 space-y-2 relative group">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                            Your Transcribed Answer
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(q.user_answer || "", q.id);
                            }}
                            className="text-[11px] text-muted-foreground hover:text-foreground flex items-center gap-1"
                          >
                            {copiedQuestionId === q.id ? (
                              <>
                                <Check className="h-3 w-3 text-emerald-500" /> Copied
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" /> Copy Answer
                              </>
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-foreground leading-relaxed italic">
                          &quot;{q.user_answer}&quot;
                        </p>
                      </div>
                    )}

                    {/* AI Feedback Callout */}
                    {q.feedback && (
                      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-xs text-foreground space-y-1.5">
                        <span className="font-bold flex items-center gap-1.5 text-primary">
                          <Sparkles className="h-3.5 w-3.5" /> AI Evaluation Feedback:
                        </span>
                        <p className="leading-relaxed text-muted-foreground">{q.feedback}</p>
                      </div>
                    )}

                    {/* Expected Guidance Benchmark */}
                    {q.expected_answer_guidance && (
                      <div className="rounded-2xl bg-muted/40 p-4 border border-border/40 text-xs space-y-1">
                        <span className="font-semibold text-foreground flex items-center gap-1.5">
                          💡 Expected Answer Guidance:
                        </span>
                        <p className="text-muted-foreground leading-relaxed">{q.expected_answer_guidance}</p>
                      </div>
                    )}

                    {/* Strengths, Weaknesses & Suggestions Grid */}
                    <div className="grid gap-3 sm:grid-cols-3 text-xs pt-1">
                      {q.strengths && (
                        <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-3.5 space-y-1">
                          <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5" /> What Went Well:
                          </span>
                          <p className="text-muted-foreground leading-relaxed">{q.strengths}</p>
                        </div>
                      )}

                      {q.weaknesses && (
                        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-3.5 space-y-1">
                          <span className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                            <AlertTriangle className="h-3.5 w-3.5" /> Missing Elements:
                          </span>
                          <p className="text-muted-foreground leading-relaxed">{q.weaknesses}</p>
                        </div>
                      )}

                      {q.suggestions && (
                        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-3.5 space-y-1 sm:col-span-1">
                          <span className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                            <Lightbulb className="h-3.5 w-3.5" /> Coaching Suggestion:
                          </span>
                          <p className="text-muted-foreground leading-relaxed">{q.suggestions}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
