"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useResumeHistory } from "../resume-analysis/use-resume-analysis";
import { useJobPreps } from "../job-prep/use-job-prep";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Mic,
  ArrowRight,
  CheckCircle2,
  Clock,
  Search,
  LayoutGrid,
  List,
  Sparkles,
  Calendar,
  Briefcase,
  PlayCircle,
  BarChart3,
  ChevronRight,
  Activity,
  Plus,
  Zap,
} from "lucide-react";

export default function HistoryPage() {
  const { data: resumeHistory, isLoading: isLoadingResumes } = useResumeHistory();
  const { data: jobPreps, isLoading: isLoadingPreps } = useJobPreps();

  const [activeTab, setActiveTab] = useState<"all" | "tracks" | "resumes">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const isLoading = isLoadingResumes || isLoadingPreps;

  // Calculate summary metrics
  const totalResumes = resumeHistory?.length || 0;
  const totalTracks = jobPreps?.length || 0;
  const totalRoundsCompleted = jobPreps?.reduce(
    (acc, p) => acc + p.rounds.filter((r) => r.status === "completed").length,
    0
  ) || 0;

  const highestFitScore = useMemo(() => {
    if (!resumeHistory || resumeHistory.length === 0) return 0;
    return Math.max(...resumeHistory.map((r) => r.match_score || 0));
  }, [resumeHistory]);

  // Combine and sort history items by creation date
  type CombinedItem =
    | { type: "track"; data: NonNullable<typeof jobPreps>[number]; date: Date }
    | { type: "resume"; data: NonNullable<typeof resumeHistory>[number]; date: Date };

  const combinedHistory = useMemo(() => {
    const items: CombinedItem[] = [];

    if (activeTab === "all" || activeTab === "tracks") {
      jobPreps?.forEach((prep) => {
        items.push({ type: "track", data: prep, date: new Date(prep.created_at) });
      });
    }

    if (activeTab === "all" || activeTab === "resumes") {
      resumeHistory?.forEach((res) => {
        items.push({ type: "resume", data: res, date: new Date(res.created_at) });
      });
    }

    // Sort newest first
    return items.sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [jobPreps, resumeHistory, activeTab]);

  // Filter items by search query
  const filteredHistory = useMemo(() => {
    if (!searchQuery) return combinedHistory;

    const lowerQuery = searchQuery.toLowerCase();
    return combinedHistory.filter((item) => {
      if (item.type === "track") {
        return (
          item.data.job_title.toLowerCase().includes(lowerQuery) ||
          (item.data.company_name || "").toLowerCase().includes(lowerQuery) ||
          item.data.rounds.some((r) => r.name.toLowerCase().includes(lowerQuery))
        );
      } else {
        return (
          item.data.resume_filename.toLowerCase().includes(lowerQuery) ||
          (item.data.extracted_details?.candidate_name || "").toLowerCase().includes(lowerQuery) ||
          (item.data.extracted_details?.skills || []).some((s) => s.toLowerCase().includes(lowerQuery))
        );
      }
    });
  }, [combinedHistory, searchQuery]);

  return (
    <div className="w-full max-w-[1700px] mx-auto space-y-6 ">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2.5">
            <span>History & Activity Log</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Comprehensive log of all your AI-analyzed resumes, mock interview practice tracks, and performance reports.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="outline" className="rounded-xl gap-2 font-semibold text-xs border-border">
            <Link href="/resume-analysis">
              <FileText className="h-4 w-4" />
              <span>Analyze Resume</span>
            </Link>
          </Button>
          <Button asChild size="sm" className="rounded-xl gap-2 font-semibold text-xs bg-primary text-primary-foreground shadow-2xs">
            <Link href="/job-prep/create">
              <Plus className="h-4 w-4" />
              <span>New Mock Interview</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Activity Summary Metrics Banner */}
      {!isLoading && (totalResumes > 0 || totalTracks > 0) && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4.5 rounded-2xl bg-card/60 border border-border/70 backdrop-blur-xs shadow-2xs space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
              Total Activity
            </span>
            <p className="text-2xl font-extrabold text-foreground">{totalResumes + totalTracks}</p>
            <p className="text-[11px] text-muted-foreground">Analyses & Tracks</p>
          </div>

          <div className="p-4.5 rounded-2xl bg-card/60 border border-border/70 backdrop-blur-xs shadow-2xs space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
              Resume Baseline Runs
            </span>
            <p className="text-2xl font-extrabold text-foreground">{totalResumes}</p>
            <p className="text-[11px] text-muted-foreground">Uploaded Resumes</p>
          </div>

          <div className="p-4.5 rounded-2xl bg-card/60 border border-border/70 backdrop-blur-xs shadow-2xs space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
              Interview Practice Tracks
            </span>
            <p className="text-2xl font-extrabold text-foreground">{totalTracks}</p>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
              {totalRoundsCompleted} Rounds Completed
            </p>
          </div>

          <div className="p-4.5 rounded-2xl bg-card/60 border border-border/70 backdrop-blur-xs shadow-2xs space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
              Peak Match Fit Score
            </span>
            <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <Sparkles className="h-5 w-5" />
              {highestFitScore}%
            </p>
            <p className="text-[11px] text-muted-foreground">Role Match Peak</p>
          </div>
        </div>
      )}

      {/* Filter Tabs & Search Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center p-1 rounded-xl bg-muted/50 border border-border/60 shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === "all"
                ? "bg-background text-foreground shadow-2xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
              }`}
          >
            All Activity ({totalResumes + totalTracks})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("tracks")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === "tracks"
                ? "bg-background text-foreground shadow-2xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
              }`}
          >
            Interview Tracks ({totalTracks})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("resumes")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === "resumes"
                ? "bg-background text-foreground shadow-2xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
              }`}
          >
            Resume Analyses ({totalResumes})
          </button>
        </div>

        {/* Search & Grid/Table Toggle */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {(totalResumes > 0 || totalTracks > 0) && (
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search history..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-border/80 bg-card focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all"
              />
            </div>
          )}

          <div className="flex items-center p-1 rounded-xl bg-muted/50 border border-border/60 shrink-0">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${viewMode === "grid"
                  ? "bg-background text-foreground shadow-2xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
                }`}
              title="Grid View"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span className="hidden sm:inline text-[11px]">Grid</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${viewMode === "table"
                  ? "bg-background text-foreground shadow-2xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
                }`}
              title="Table View"
            >
              <List className="h-3.5 w-3.5" />
              <span className="hidden sm:inline text-[11px]">Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        <div className={viewMode === "grid" ? "grid gap-5 sm:grid-cols-2 lg:grid-cols-3" : "space-y-3"}>
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-44 rounded-2xl bg-card border border-border animate-pulse p-6" />
          ))}
        </div>
      ) : filteredHistory.length > 0 ? (
        viewMode === "grid" ? (
          /* GRID VIEW */
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredHistory.map((item) => {
              if (item.type === "track") {
                const prep = item.data;
                const completedCount = prep.rounds.filter((r) => r.status === "completed").length;
                const totalCount = prep.rounds.length;
                const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
                const allDone = totalCount > 0 && completedCount === totalCount;

                return (
                  <Card
                    key={`track-${prep.id}`}
                    className="rounded-2xl border-border/70 bg-card/60 backdrop-blur-xs hover:border-primary/50 transition-all shadow-2xs group flex flex-col justify-between overflow-hidden py-0 gap-0"
                  >
                    <CardHeader className="p-5 pb-3 space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <Mic className="h-4 w-4" />
                          </div>
                          <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {item.date.toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                          {prep.company_name && (
                            <Badge variant="secondary" className="text-[10px] font-semibold">
                              <Briefcase className="h-3 w-3 mr-1" /> {prep.company_name}
                            </Badge>
                          )}
                        </div>

                        <Badge
                          variant={allDone ? "default" : "outline"}
                          className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full shrink-0 ${allDone
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                              : "bg-primary/10 text-primary border border-primary/20"
                            }`}
                        >
                          {allDone ? "Completed Track" : `${completedCount}/${totalCount} Rounds`}
                        </Badge>
                      </div>

                      <CardTitle className="text-base font-bold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                        {prep.job_title || "Mock Interview Track"}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="px-5 pb-5 pt-1 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-3">
                        {/* Progress Bar */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px] text-muted-foreground font-medium">
                            <span>Track Completion</span>
                            <span className="font-semibold text-foreground">{progressPercent}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full transition-all"
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                        </div>

                        {/* Rounds Pills Cloud */}
                        {prep.rounds.length > 0 && (
                          <div className="space-y-1">
                            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block">
                              Configured Practice Rounds ({prep.rounds.length}):
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {prep.rounds.map((round) => {
                                const isCompleted = round.status === "completed";
                                return (
                                  <span
                                    key={round.id}
                                    className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md font-medium border ${isCompleted
                                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                                        : "bg-background border-border/70 text-muted-foreground"
                                      }`}
                                  >
                                    {isCompleted ? (
                                      <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                                    ) : (
                                      <Clock className="h-3 w-3 text-muted-foreground shrink-0" />
                                    )}
                                    <span className="truncate max-w-[120px]">{round.name}</span>
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action Bar */}
                      <div className="pt-3 border-t border-border/40 flex items-center justify-between gap-2">
                        {allDone ? (
                          <Button
                            asChild
                            size="sm"
                            variant="outline"
                            className="w-full rounded-xl h-8.5 gap-1.5 text-xs font-semibold border-border"
                          >
                            <Link href={`/job-prep/${prep.id}/report`}>
                              <BarChart3 className="h-3.5 w-3.5 text-primary" />
                              <span>View Full Track Report</span>
                            </Link>
                          </Button>
                        ) : (
                          <Button
                            asChild
                            size="sm"
                            className="w-full rounded-xl h-8.5 gap-1.5 text-xs font-semibold bg-primary text-primary-foreground shadow-2xs"
                          >
                            <Link href={`/job-prep/${prep.id}`}>
                              <PlayCircle className="h-3.5 w-3.5" />
                              <span>Open Track & Practice</span>
                              <ChevronRight className="h-3.5 w-3.5 opacity-70 ml-auto" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              } else {
                const res = item.data;
                const existingPrep = jobPreps?.find((p) => p.resume_analysis_id === res.id);

                return (
                  <Card
                    key={`resume-${res.id}`}
                    className="rounded-2xl border-border/70 bg-card/60 backdrop-blur-xs hover:border-primary/50 transition-all shadow-2xs group flex flex-col justify-between overflow-hidden py-0 gap-0"
                  >
                    <CardHeader className="p-5 pb-3 space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                            <FileText className="h-4 w-4" />
                          </div>
                          <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {item.date.toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>

                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold flex items-center gap-1">
                          <Sparkles className="h-3 w-3" />
                          {res.match_score}% Match
                        </span>
                      </div>

                      <CardTitle className="text-base font-bold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                        {res.resume_filename}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="px-5 pb-5 pt-1 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-3">
                        {res.extracted_details?.experience_match_summary && (
                          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 bg-background/50 p-2.5 rounded-xl border border-border/50">
                            {res.extracted_details.experience_match_summary}
                          </p>
                        )}

                        {res.extracted_details?.skills?.length > 0 && (
                          <div className="space-y-1">
                            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block">
                              Extracted Skills Preview:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {res.extracted_details.skills.slice(0, 4).map((skill, idx) => (
                                <span
                                  key={idx}
                                  className="text-[10px] px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground font-medium"
                                >
                                  {skill}
                                </span>
                              ))}
                              {res.extracted_details.skills.length > 4 && (
                                <span className="text-[10px] text-muted-foreground font-medium py-0.5">
                                  +{res.extracted_details.skills.length - 4}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action Bar */}
                      <div className="pt-3 border-t border-border/40 flex items-center justify-between gap-2 text-xs">
                        <Link
                          href={`/resume-analysis/${res.id}`}
                          className="font-medium text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                        >
                          <span>View Report</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>

                        {existingPrep ? (
                          <Button
                            asChild
                            size="sm"
                            className="h-8.5 rounded-xl gap-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs"
                          >
                            <Link href={`/job-prep/${existingPrep.id}`}>
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              <span>Continue Track</span>
                            </Link>
                          </Button>
                        ) : (
                          <Button
                            asChild
                            size="sm"
                            variant="default"
                            className="h-8.5 rounded-xl gap-1.5 text-xs font-semibold shadow-2xs"
                          >
                            <Link
                              href={{
                                pathname: "/job-prep/create",
                                query: { analysis_id: res.id },
                              }}
                            >
                              <PlayCircle className="h-3.5 w-3.5" />
                              <span>Start Practice</span>
                            </Link>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              }
            })}
          </div>
        ) : (
          /* TABLE VIEW */
          <div className="rounded-2xl border border-border/70 overflow-hidden bg-card/60 backdrop-blur-xs shadow-2xs w-full">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border/50 bg-muted/40 text-muted-foreground font-semibold">
                    <th className="py-3.5 px-4">Activity Type & Name</th>
                    <th className="py-3.5 px-4">Metrics / Fit Score</th>
                    <th className="py-3.5 px-4 hidden md:table-cell">Key Details / Rounds</th>
                    <th className="py-3.5 px-4">Date Logged</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {filteredHistory.map((item) => {
                    if (item.type === "track") {
                      const prep = item.data;
                      const completedCount = prep.rounds.filter((r) => r.status === "completed").length;
                      const totalCount = prep.rounds.length;

                      return (
                        <tr key={`tbl-track-${prep.id}`} className="hover:bg-muted/30 transition-colors group">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                <Mic className="h-4 w-4" />
                              </div>
                              <div className="min-w-0">
                                <p className="font-semibold text-foreground truncate max-w-[220px]">
                                  {prep.job_title || "Mock Interview Track"}
                                </p>
                                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                                  Mock Interview Track
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <Badge variant="outline" className="text-xs font-semibold bg-background">
                              {completedCount}/{totalCount} Rounds
                            </Badge>
                          </td>

                          <td className="py-3.5 px-4 hidden md:table-cell max-w-[280px]">
                            <div className="flex flex-wrap gap-1">
                              {prep.rounds.map((r) => (
                                <span
                                  key={r.id}
                                  className={`text-[10px] px-2 py-0.5 rounded-md font-medium border ${r.status === "completed"
                                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                                      : "bg-background border-border/70 text-muted-foreground"
                                    }`}
                                >
                                  {r.name}
                                </span>
                              ))}
                            </div>
                          </td>

                          <td className="py-3.5 px-4 text-muted-foreground text-[11px] whitespace-nowrap">
                            {item.date.toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <Button asChild size="sm" className="h-8 rounded-xl gap-1 text-xs font-semibold bg-primary text-primary-foreground shadow-2xs">
                              <Link href={`/job-prep/${prep.id}`}>
                                <span>Open Track</span>
                                <ChevronRight className="h-3.5 w-3.5" />
                              </Link>
                            </Button>
                          </td>
                        </tr>
                      );
                    } else {
                      const res = item.data;
                      const existingPrep = jobPreps?.find((p) => p.resume_analysis_id === res.id);

                      return (
                        <tr key={`tbl-res-${res.id}`} className="hover:bg-muted/30 transition-colors group">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                <FileText className="h-4 w-4" />
                              </div>
                              <div className="min-w-0">
                                <p className="font-semibold text-foreground truncate max-w-[220px]">
                                  {res.resume_filename}
                                </p>
                                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                                  Resume Analysis
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                              <Sparkles className="h-3 w-3" />
                              {res.match_score}%
                            </span>
                          </td>

                          <td className="py-3.5 px-4 hidden md:table-cell max-w-[280px]">
                            {res.extracted_details?.skills?.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {res.extracted_details.skills.slice(0, 3).map((skill, idx) => (
                                  <span
                                    key={idx}
                                    className="text-[10px] px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground font-medium truncate max-w-[100px]"
                                  >
                                    {skill}
                                  </span>
                                ))}
                                {res.extracted_details.skills.length > 3 && (
                                  <span className="text-[10px] text-muted-foreground font-medium py-0.5">
                                    +{res.extracted_details.skills.length - 3}
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="text-muted-foreground text-[11px]">—</span>
                            )}
                          </td>

                          <td className="py-3.5 px-4 text-muted-foreground text-[11px] whitespace-nowrap">
                            {item.date.toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button asChild size="sm" variant="ghost" className="h-8 text-xs text-muted-foreground hover:text-foreground">
                                <Link href={`/resume-analysis/${res.id}`}>
                                  <span>Report</span>
                                </Link>
                              </Button>

                              {existingPrep ? (
                                <Button asChild size="sm" className="h-8 rounded-xl gap-1 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs">
                                  <Link href={`/job-prep/${existingPrep.id}`}>
                                    <span>Continue</span>
                                    <ChevronRight className="h-3.5 w-3.5" />
                                  </Link>
                                </Button>
                              ) : (
                                <Button asChild size="sm" variant="default" className="h-8 rounded-xl gap-1 text-xs font-semibold shadow-2xs">
                                  <Link href={{ pathname: "/job-prep/create", query: { analysis_id: res.id } }}>
                                    <span>Start</span>
                                    <ChevronRight className="h-3.5 w-3.5" />
                                  </Link>
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )
      ) : (
        /* EMPTY STATE */
        <div className="rounded-2xl border border-dashed border-border/70 p-8 sm:p-12 text-center space-y-4 bg-card/40">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Activity className="h-6 w-6" />
          </div>
          <div className="space-y-1 max-w-sm mx-auto">
            <h3 className="font-bold text-base text-foreground">No activity history found</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Start by uploading your resume or creating a new mock interview track.
            </p>
          </div>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="sm" className="rounded-xl px-5 gap-2 text-xs font-semibold shadow-2xs">
              <Link href="/resume-analysis">
                <FileText className="h-4 w-4" /> Run Resume Analysis
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="rounded-xl px-5 gap-2 text-xs font-semibold border-border">
              <Link href="/job-prep/create">
                <Plus className="h-4 w-4" /> New Mock Interview
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
