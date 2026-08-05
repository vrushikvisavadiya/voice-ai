"use client";

import { useState, useEffect, Suspense, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCreateJobPrep, useJobPreps } from "@/app/(platform)/job-prep/use-job-prep";
import { useResumeHistory } from "@/app/(platform)/resume-analysis/use-resume-analysis";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Brain,
  Target,
  Briefcase,
  Loader2,
  Sparkles,
  CheckSquare,
  Square,
  Zap,
  Info,
  ChevronRight,
  Plus,
  AlertTriangle,
  User,
  Clock,
  Award,
} from "lucide-react";

interface RenderedRound {
  id: string;
  name: string;
  desc: string;
  focusPoints: string[];
  icon: React.ComponentType<{ className?: string }>;
  isAlreadyCreated: boolean;
}

// Presentation icon lookup mapping for dynamic rounds
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

function getRoundPresentationIcon(roundName: string) {
  const lower = roundName.toLowerCase();
  for (const [key, icon] of Object.entries(ROUND_ICONS)) {
    if (lower.includes(key)) return icon;
  }
  return Briefcase;
}

function getRoundDescription(roundName: string, filename?: string): string {
  const lower = roundName.toLowerCase();
  if (lower.includes("technical") || lower.includes("coding")) {
    return `Evaluates hands-on coding proficiency, algorithmic problem-solving, and tech stack experience relevant to ${filename || "the target role"}.`;
  }
  if (lower.includes("system") || lower.includes("architecture")) {
    return `Assesses your ability to design scalable distributed systems, database models, and robust software architectures.`;
  }
  if (lower.includes("behavioral")) {
    return `Tests situational judgment, teamwork, conflict resolution, and past achievements using real-world scenarios.`;
  }
  if (lower.includes("hr") || lower.includes("culture")) {
    return `Focuses on cultural alignment, work ethics, communication style, compensation expectations, and long-term goals.`;
  }
  if (lower.includes("manager") || lower.includes("leadership")) {
    return `Evaluates engineering leadership, cross-functional project management, stakeholder communication, and mentoring capabilities.`;
  }
  if (lower.includes("pitch") || lower.includes("sales") || lower.includes("roleplay")) {
    return `Interactive roleplay scenario evaluating client communication, value proposition delivery, and objection handling.`;
  }
  return `Customized AI mock interview round tailored specifically to candidate competencies for ${roundName}.`;
}

function getRoundFocusPoints(roundName: string, skills: string[] = []): string[] {
  const lower = roundName.toLowerCase();

  if (lower.includes("technical") || lower.includes("coding")) {
    const techSkills = skills.slice(0, 3).join(", ");
    return [
      `Hands-on coding & algorithm problem solving`,
      techSkills ? `Tech stack evaluation (${techSkills})` : `Data structures & edge case handling`,
      `Code quality, readability & complexity trade-offs`,
    ];
  }
  if (lower.includes("system") || lower.includes("architecture")) {
    return [
      `High-level system architecture & scalable design`,
      `API contracts, caching & database selection`,
      `Concurrency, trade-offs & bottleneck mitigation`,
    ];
  }
  if (lower.includes("behavioral") || lower.includes("culture") || lower.includes("hr")) {
    return [
      `STAR-method behavioral scenarios & project stories`,
      `Team collaboration & conflict resolution dynamics`,
      `Company values fit & career progression motivation`,
    ];
  }
  if (lower.includes("manager") || lower.includes("leadership")) {
    return [
      `Strategic decision making & project scope control`,
      `Cross-functional leadership & team mentoring`,
      `Risk mitigation, delivery execution & prioritization`,
    ];
  }
  if (lower.includes("pitch") || lower.includes("sales") || lower.includes("roleplay")) {
    return [
      `Interactive roleplay & objection handling`,
      `Value proposition presentation & product context`,
      `Persuasive communication & negotiation tactics`,
    ];
  }
  return [
    `Domain-specific competency assessment`,
    `Problem-solving methodology & scenario evaluation`,
    `Structured responses & requirements alignment`,
  ];
}

function CreateJobPrepForm() {
  const searchParams = useSearchParams();
  const initialAnalysisId = searchParams.get("analysis_id") || "";

  const [selectedAnalysisId, setSelectedAnalysisId] = useState<string>(initialAnalysisId);
  const [selectedRounds, setSelectedRounds] = useState<string[]>([]);

  const { data: resumeHistory, isLoading: isLoadingHistory } = useResumeHistory();
  const { data: jobPreps } = useJobPreps();
  const { mutate: createPrep, isPending } = useCreateJobPrep();

  const selectedAnalysis = useMemo(() => {
    return resumeHistory?.find((item) => item.id === selectedAnalysisId) || resumeHistory?.[0];
  }, [resumeHistory, selectedAnalysisId]);

  // Sync selectedAnalysisId if URL param or first item exists
  useEffect(() => {
    if (!selectedAnalysisId && selectedAnalysis?.id) {
      setSelectedAnalysisId(selectedAnalysis.id);
    }
  }, [selectedAnalysisId, selectedAnalysis]);

  // Directly consume backend-generated rounds without hardcoded frontend defaults
  const backendRounds: string[] = selectedAnalysis?.extracted_details?.suggested_rounds || [];

  // Compute rounds that have already been created in existing job preparation tracks for this analysis baseline
  const alreadyCreatedRoundNames = useMemo(() => {
    if (!selectedAnalysisId || !jobPreps) return new Set<string>();

    const existingPreps = jobPreps.filter(
      (prep) => prep.resume_analysis_id === selectedAnalysisId
    );

    const names = new Set<string>();
    existingPreps.forEach((prep) => {
      prep.rounds?.forEach((round) => {
        if (round.name) {
          names.add(round.name.toLowerCase().trim());
        }
      });
    });

    return names;
  }, [selectedAnalysisId, jobPreps]);

  // Automatically pre-select rounds that have NOT been created yet when baseline changes
  useEffect(() => {
    if (backendRounds.length > 0) {
      const availableUncreatedRounds = backendRounds.filter(
        (roundName) => !alreadyCreatedRoundNames.has(roundName.toLowerCase().trim())
      );
      // Pre-select uncreated rounds; if all are created, leave selection empty so user can explicitly pick
      setSelectedRounds(availableUncreatedRounds);
    } else {
      setSelectedRounds([]);
    }
  }, [selectedAnalysisId, backendRounds, alreadyCreatedRoundNames]);

  const renderedRounds: RenderedRound[] = backendRounds.map((roundName) => {
    const lowerName = roundName.toLowerCase().trim();
    const isAlreadyCreated = alreadyCreatedRoundNames.has(lowerName);

    return {
      id: roundName,
      name: roundName,
      desc: getRoundDescription(roundName, selectedAnalysis?.resume_filename),
      focusPoints: getRoundFocusPoints(roundName, selectedAnalysis?.extracted_details?.skills || []),
      icon: getRoundPresentationIcon(roundName),
      isAlreadyCreated,
    };
  });

  const handleRoundToggle = (roundId: string) => {
    setSelectedRounds((prev) =>
      prev.includes(roundId) ? prev.filter((r) => r !== roundId) : [...prev, roundId]
    );
  };

  const availableUncreatedRoundsCount = renderedRounds.filter((r) => !r.isAlreadyCreated).length;

  const handleSelectAllAvailable = () => {
    const uncreatedRounds = renderedRounds
      .filter((r) => !r.isAlreadyCreated)
      .map((r) => r.id);

    if (uncreatedRounds.length === 0) return;

    const allUncreatedSelected = uncreatedRounds.every((rId) => selectedRounds.includes(rId));
    if (allUncreatedSelected) {
      // Unselect uncreated rounds
      setSelectedRounds((prev) => prev.filter((id) => !uncreatedRounds.includes(id)));
    } else {
      // Select all uncreated rounds
      setSelectedRounds((prev) => Array.from(new Set([...prev, ...uncreatedRounds])));
    }
  };

  const handleSelectAllIncludingCreated = () => {
    if (selectedRounds.length === backendRounds.length) {
      setSelectedRounds([]);
    } else {
      setSelectedRounds([...backendRounds]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAnalysisId || selectedRounds.length === 0) return;
    createPrep({
      resume_analysis_id: selectedAnalysisId,
      selected_rounds: selectedRounds,
    });
  };

  const allSelected = backendRounds.length > 0 && selectedRounds.length === backendRounds.length;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full-Width Split Layout Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Resume Analysis Baseline Overview & Insights (5 cols on lg, 4 on xl) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6 lg:sticky lg:top-6">
          <Card className="border border-border/70 bg-card/60 backdrop-blur-xs shadow-2xs rounded-2xl overflow-hidden">
            <CardHeader className="p-5 pb-4 border-b border-border/40 bg-muted/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-xs shrink-0 border border-primary/20">
                    1
                  </div>
                  <div>
                    <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      Resume Analysis Baseline
                    </CardTitle>
                    <CardDescription className="text-xs text-muted-foreground">
                      Target role & candidate match profile
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-5 space-y-5">
              {/* Baseline Selector */}
              {isLoadingHistory ? (
                <div className="h-11 w-full animate-pulse rounded-xl bg-muted/60" />
              ) : !resumeHistory || resumeHistory.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border/80 p-6 text-center space-y-3 bg-muted/10">
                  <FileText className="h-8 w-8 text-muted-foreground mx-auto" />
                  <p className="text-xs text-muted-foreground">No baseline analysis available.</p>
                  <Button asChild size="sm" className="rounded-xl gap-2 text-xs">
                    <Link href="/resume-analysis">
                      <Plus className="h-3.5 w-3.5" /> Analyze Resume First
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Switch Active Baseline
                    </label>
                    <Select value={selectedAnalysisId} onValueChange={setSelectedAnalysisId}>
                      <SelectTrigger className="w-full h-11 border-border/80 bg-background rounded-xl text-xs focus:ring-1 focus:ring-primary/30">
                        <SelectValue placeholder="Select Resume Analysis..." />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-border">
                        {resumeHistory.map((item) => (
                          <SelectItem key={item.id} value={item.id} className="py-2.5 cursor-pointer text-xs">
                            <div className="flex items-center justify-between w-full gap-3">
                              <span className="font-medium text-foreground truncate max-w-[200px]">
                                {item.resume_filename}
                              </span>
                              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                                {item.match_score}% Match
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Selected Analysis Full Details View */}
                  {selectedAnalysis && (
                    <div className="space-y-4 pt-1">
                      {/* Top Match Metric Card */}
                      <div className="rounded-xl border border-border/80 bg-muted/30 p-4 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                              {selectedAnalysis.extracted_details?.candidate_name ? (
                                <>
                                  <User className="h-3.5 w-3.5 text-primary" />
                                  <span>{selectedAnalysis.extracted_details.candidate_name}</span>
                                </>
                              ) : (
                                <span>{selectedAnalysis.resume_filename}</span>
                              )}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-[220px]">
                              {selectedAnalysis.resume_filename}
                            </p>
                          </div>

                          <div className="flex flex-col items-end shrink-0">
                            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                              <Sparkles className="h-3.5 w-3.5" />
                              <span>{selectedAnalysis.match_score}% Fit</span>
                            </div>
                          </div>
                        </div>

                        {/* Experience & Seniority Badges */}
                        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-border/40">
                          {selectedAnalysis.extracted_details?.seniority_fit && (
                            <Badge variant="secondary" className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md">
                              <Award className="h-3 w-3 mr-1 text-primary" />
                              {selectedAnalysis.extracted_details.seniority_fit}
                            </Badge>
                          )}
                          {selectedAnalysis.extracted_details?.total_years_experience !== undefined &&
                            selectedAnalysis.extracted_details?.total_years_experience !== null && (
                              <Badge variant="outline" className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-background">
                                <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                                {selectedAnalysis.extracted_details.total_years_experience} Yrs Exp
                              </Badge>
                            )}
                        </div>
                      </div>

                      {/* Match Summary */}
                      {selectedAnalysis.extracted_details?.experience_match_summary && (
                        <div className="space-y-1.5">
                          <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                            <Info className="h-3.5 w-3.5 text-primary" /> Role Match Analysis
                          </span>
                          <p className="text-xs text-muted-foreground leading-relaxed bg-background/60 p-3 rounded-xl border border-border/60">
                            {selectedAnalysis.extracted_details.experience_match_summary}
                          </p>
                        </div>
                      )}

                      {/* Key Strengths */}
                      {selectedAnalysis.extracted_details?.strengths?.length > 0 && (
                        <div className="space-y-2">
                          <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Key Match Strengths
                          </span>
                          <ul className="space-y-1.5 text-xs text-muted-foreground">
                            {selectedAnalysis.extracted_details.strengths.slice(0, 3).map((strength, idx) => (
                              <li key={idx} className="flex items-start gap-2 bg-emerald-500/5 p-2 rounded-lg border border-emerald-500/10">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                                <span className="text-foreground text-[11px] leading-tight">{strength}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Target Focus Areas / Gaps */}
                      {selectedAnalysis.extracted_details?.gaps?.length > 0 && (
                        <div className="space-y-2">
                          <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                            <AlertTriangle className="h-3.5 w-3.5 text-amber-500" /> Target Focus Areas
                          </span>
                          <ul className="space-y-1.5 text-xs text-muted-foreground">
                            {selectedAnalysis.extracted_details.gaps.slice(0, 2).map((gap, idx) => (
                              <li key={idx} className="flex items-start gap-2 bg-amber-500/5 p-2 rounded-lg border border-amber-500/10">
                                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                                <span className="text-foreground text-[11px] leading-tight">{gap}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Identified Skills Pills */}
                      {selectedAnalysis.extracted_details?.skills?.length > 0 && (
                        <div className="space-y-1.5">
                          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                            Extracted Skills ({selectedAnalysis.extracted_details.skills.length})
                          </span>
                          <div className="flex flex-wrap items-center gap-1.5 max-h-36 overflow-y-auto pr-1">
                            {selectedAnalysis.extracted_details.skills.map((skill, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center text-[11px] px-2 py-0.5 rounded-md bg-background border border-border/70 text-foreground font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: Tailored Practice Rounds & Details (7 cols on lg, 8 on xl) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          <Card className="border border-border/70 bg-card/60 backdrop-blur-xs shadow-2xs rounded-2xl overflow-hidden">
            <CardHeader className="p-5 sm:p-6 pb-4 border-b border-border/40 bg-muted/20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-sm shrink-0 border border-primary/20">
                    2
                  </div>
                  <div>
                    <CardTitle className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2">
                      <Layers className="h-4.5 w-4.5 text-primary" />
                      Configure Interview Practice Rounds
                    </CardTitle>
                    <CardDescription className="text-xs text-muted-foreground mt-0.5">
                      {selectedAnalysis
                        ? "Select rounds to practice. Rounds already created in existing tracks are flagged below."
                        : "Select a Resume Baseline to generate AI-recommended interview rounds"}
                    </CardDescription>
                  </div>
                </div>

                {selectedAnalysis && backendRounds.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleSelectAllAvailable}
                      className="h-8 text-xs text-muted-foreground hover:text-foreground rounded-lg gap-1.5 px-2.5"
                    >
                      <CheckSquare className="h-3.5 w-3.5 text-primary" /> Select Uncreated ({availableUncreatedRoundsCount})
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleSelectAllIncludingCreated}
                      className="h-8 text-xs text-muted-foreground hover:text-foreground rounded-lg gap-1.5 px-2"
                    >
                      {allSelected ? <Square className="h-3.5 w-3.5" /> : <CheckSquare className="h-3.5 w-3.5" />}
                      {allSelected ? "Clear All" : "Select All"}
                    </Button>
                    <Badge variant="secondary" className="text-xs font-semibold px-2.5 py-1 rounded-md">
                      {selectedRounds.length} Active
                    </Badge>
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="p-5 sm:p-6 space-y-4">
              {!selectedAnalysis ? (
                <div className="p-8 sm:p-12 text-center rounded-xl border border-dashed border-border/70 bg-muted/10 space-y-2">
                  <Layers className="h-8 w-8 text-muted-foreground mx-auto" />
                  <p className="text-sm font-medium text-foreground">No Baseline Selected</p>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                    Select a baseline analysis on the left to load role-tailored interview rounds.
                  </p>
                </div>
              ) : renderedRounds.length > 0 ? (
                <div className="space-y-4">
                  {renderedRounds.map((round) => {
                    const checked = selectedRounds.includes(round.id);
                    const Icon = round.icon;

                    return (
                      <div
                        key={round.id}
                        onClick={() => handleRoundToggle(round.id)}
                        className={`group relative p-5 rounded-xl border cursor-pointer transition-all duration-200 space-y-3.5 ${checked
                            ? "border-primary bg-primary/[0.04] ring-1 ring-primary/20 shadow-2xs"
                            : round.isAlreadyCreated
                              ? "border-border/60 bg-muted/20 opacity-80 hover:opacity-100 hover:border-border"
                              : "border-border/70 bg-background/60 hover:border-border hover:bg-muted/30"
                          }`}
                      >
                        {/* Top Header Row */}
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${checked
                                  ? "bg-primary text-primary-foreground shadow-xs"
                                  : "bg-muted text-muted-foreground group-hover:text-foreground"
                                }`}
                            >
                              <Icon className="h-5 w-5" />
                            </div>

                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-semibold text-sm sm:text-base text-foreground">
                                  {round.name}
                                </h4>
                                {round.isAlreadyCreated ? (
                                  <Badge
                                    variant="outline"
                                    className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                                  >
                                    Already Created in Track
                                  </Badge>
                                ) : (
                                  <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                                    AI Recommended
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                Tailored based on target requirements & resume baseline
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 pt-1">
                            {checked ? (
                              <CheckCircle2 className="h-5 w-5 text-primary" />
                            ) : (
                              <div className="h-5 w-5 rounded-full border border-border group-hover:border-primary/50 transition-colors" />
                            )}
                          </div>
                        </div>

                        {/* Round Detailed Description */}
                        <p className="text-xs text-foreground/80 leading-relaxed bg-background/50 p-3 rounded-lg border border-border/50">
                          {round.desc}
                        </p>

                        {/* Round Focus Areas Bullet Points */}
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                            Key Evaluation Topics:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {round.focusPoints.map((point, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-2 bg-background p-2.5 rounded-lg border border-border/60 text-xs"
                              >
                                <Zap className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                                <span className="text-[11px] text-muted-foreground leading-snug">{point}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-muted-foreground rounded-xl border border-dashed border-border/70">
                  No specific interview rounds returned for this analysis baseline.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Form Submission Footer Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-xs shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                <Info className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">
                  {selectedRounds.length} {selectedRounds.length === 1 ? "Round" : "Rounds"} Configured
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {selectedRounds.length > 0
                    ? `Selected: ${selectedRounds.join(", ")}`
                    : "Please select at least one round to generate questions"}
                </p>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full sm:w-auto h-11 px-6 text-xs sm:text-sm font-semibold rounded-xl bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 transition-all gap-2"
              disabled={isPending || !selectedAnalysisId || selectedRounds.length === 0}
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Preparing Track...</span>
                </>
              ) : (
                <>
                  <PlayCircle className="h-4.5 w-4.5" />
                  <span>Launch Mock Preparation Track</span>
                  <ChevronRight className="h-4 w-4 opacity-70" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default function CreateJobPrepPage() {
  return (
    <div className="w-full max-w-[1700px] mx-auto space-y-6 ">
      {/* Top Header Navigation */}
      <div className="space-y-3">
        <div>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="h-8 text-xs text-muted-foreground hover:text-foreground rounded-lg -ml-2 gap-1.5"
          >
            <Link href="/job-prep">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Job Preparations</span>
            </Link>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/40 pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
              <span>Create Mock Interview Track</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Select practice rounds to generate dynamic AI questions based on your resume baseline.
            </p>
          </div>
        </div>
      </div>

      <Suspense fallback={<div className="text-sm text-muted-foreground p-8 text-center">Loading interview track setup...</div>}>
        <CreateJobPrepForm />
      </Suspense>
    </div>
  );
}
