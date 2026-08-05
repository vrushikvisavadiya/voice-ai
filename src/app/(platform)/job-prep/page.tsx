"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useJobPreps } from "./use-job-prep";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Mic,
  ArrowRight,
  Layers,
  CheckCircle2,
  Clock,
  Search,
  LayoutGrid,
  List,
  Sparkles,
  Briefcase,
  Calendar,
  ChevronRight,
  BarChart3,
  Zap,
  PlayCircle,
  Award,
} from "lucide-react";

export default function JobPrepListPage() {
  const { data: preps, isLoading } = useJobPreps();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "in_progress" | "completed">("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Calculate summary metrics
  const totalTracks = preps?.length || 0;
  const completedTracksCount = preps?.filter(
    (p) => p.rounds.length > 0 && p.rounds.every((r) => r.status === "completed")
  ).length || 0;
  const totalRoundsCompleted = preps?.reduce(
    (acc, p) => acc + p.rounds.filter((r) => r.status === "completed").length,
    0
  ) || 0;
  const totalRoundsConfigured = preps?.reduce(
    (acc, p) => acc + p.rounds.length,
    0
  ) || 0;

  // Filter tracks by search query and status tab
  const filteredPreps = useMemo(() => {
    if (!preps) return [];

    return preps.filter((prep) => {
      const matchesSearch = searchQuery
        ? prep.job_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (prep.company_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        prep.rounds.some((r) => r.name.toLowerCase().includes(searchQuery.toLowerCase()))
        : true;

      const isCompleted = prep.rounds.length > 0 && prep.rounds.every((r) => r.status === "completed");

      if (statusFilter === "completed") return matchesSearch && isCompleted;
      if (statusFilter === "in_progress") return matchesSearch && !isCompleted;
      return matchesSearch;
    });
  }, [preps, searchQuery, statusFilter]);

  return (
    <div className="w-full max-w-[1700px] mx-auto space-y-6 ">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2.5">
            <span>Mock Interview Tracks</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Manage your AI-evaluated practice tracks, launch voice sessions, and review performance reports.
          </p>
        </div>

        <Button asChild size="lg" className="rounded-xl gap-2 font-semibold bg-primary text-primary-foreground shadow-2xs">
          <Link href="/job-prep/create">
            <Plus className="h-4.5 w-4.5" />
            <span>New Mock Interview</span>
          </Link>
        </Button>
      </div>

      {/* Summary Metrics Banner */}
      {preps && preps.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4.5 rounded-2xl bg-card/60 border border-border/70 backdrop-blur-xs shadow-2xs space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
              Total Tracks
            </span>
            <p className="text-2xl font-extrabold text-foreground">{totalTracks}</p>
            <p className="text-[11px] text-muted-foreground">Configured Roles</p>
          </div>

          <div className="p-4.5 rounded-2xl bg-card/60 border border-border/70 backdrop-blur-xs shadow-2xs space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
              Rounds Practiced
            </span>
            <p className="text-2xl font-extrabold text-foreground">
              {totalRoundsCompleted} <span className="text-xs font-normal text-muted-foreground">/ {totalRoundsConfigured}</span>
            </p>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
              {totalRoundsConfigured - totalRoundsCompleted} Pending
            </p>
          </div>

          <div className="p-4.5 rounded-2xl bg-card/60 border border-border/70 backdrop-blur-xs shadow-2xs space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
              Completed Tracks
            </span>
            <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {completedTracksCount}
            </p>
            <p className="text-[11px] text-muted-foreground">Fully Evaluated</p>
          </div>

          <div className="p-4.5 rounded-2xl bg-card/60 border border-border/70 backdrop-blur-xs shadow-2xs space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
              AI Voice Evaluator
            </span>
            <p className="text-2xl font-extrabold text-primary flex items-center gap-1.5">
              <Zap className="h-5 w-5 text-amber-500" /> Active
            </p>
            <p className="text-[11px] text-muted-foreground">Real-time Feedback</p>
          </div>
        </div>
      )}

      {/* Filter & View Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Filter Tabs */}
        <div className="flex items-center p-1 rounded-xl bg-muted/50 border border-border/60 shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${statusFilter === "all"
                ? "bg-background text-foreground shadow-2xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
              }`}
          >
            All Tracks ({totalTracks})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("in_progress")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${statusFilter === "in_progress"
                ? "bg-background text-foreground shadow-2xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
              }`}
          >
            In Progress ({totalTracks - completedTracksCount})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("completed")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${statusFilter === "completed"
                ? "bg-background text-foreground shadow-2xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
              }`}
          >
            Completed ({completedTracksCount})
          </button>
        </div>

        {/* Search & Grid/Table Toggle */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {preps && preps.length > 0 && (
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tracks or roles..."
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
        <div className={viewMode === "grid" ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3" : "space-y-3"}>
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-44 rounded-2xl bg-card border border-border animate-pulse p-6" />
          ))}
        </div>
      ) : filteredPreps.length > 0 ? (
        viewMode === "grid" ? (
          /* GRID VIEW */
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPreps.map((prep) => {
              const completedCount = prep.rounds.filter((r) => r.status === "completed").length;
              const totalCount = prep.rounds.length;
              const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
              const allDone = totalCount > 0 && completedCount === totalCount;

              return (
                <Card
                  key={prep.id}
                  className="rounded-2xl border-border/70 bg-card/60 backdrop-blur-xs hover:border-primary/50 transition-all shadow-2xs group flex flex-col justify-between overflow-hidden py-0 gap-0"
                >
                  <CardHeader className="p-5 pb-3 space-y-2.5">
                    {/* Top Row: Icon, Date, Company & Status Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <Mic className="h-4 w-4" />
                        </div>
                        <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(prep.created_at).toLocaleDateString(undefined, {
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
                        className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full shrink-0 ${
                          allDone
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                            : "bg-primary/10 text-primary border border-primary/20"
                        }`}
                      >
                        {allDone ? "Completed" : `${completedCount}/${totalCount} Rounds`}
                      </Badge>
                    </div>

                    {/* Prominent Job Title (allows up to 2 full lines without cutting off) */}
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
                            className="h-full bg-primary rounded-full transition-all duration-300"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>

                      {/* Rounds Pills Cloud */}
                      {prep.rounds.length > 0 && (
                        <div className="space-y-1">
                          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block">
                            Included Rounds ({prep.rounds.length}):
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
                            <span>View Full Report</span>
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
            })}
          </div>
        ) : (
          /* TABLE VIEW */
          <div className="rounded-2xl border border-border/70 overflow-hidden bg-card/60 backdrop-blur-xs shadow-2xs w-full">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border/50 bg-muted/40 text-muted-foreground font-semibold">
                    <th className="py-3.5 px-4">Target Role & Company</th>
                    <th className="py-3.5 px-4">Track Progress</th>
                    <th className="py-3.5 px-4 hidden md:table-cell">Configured Rounds</th>
                    <th className="py-3.5 px-4">Created Date</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {filteredPreps.map((prep) => {
                    const completedCount = prep.rounds.filter((r) => r.status === "completed").length;
                    const totalCount = prep.rounds.length;
                    const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
                    const allDone = totalCount > 0 && completedCount === totalCount;

                    return (
                      <tr key={prep.id} className="hover:bg-muted/30 transition-colors group">
                        {/* Target Role & Company */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                              <Mic className="h-4 w-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-foreground truncate max-w-[220px]">
                                {prep.job_title || "Mock Interview Track"}
                              </p>
                              {prep.company_name && (
                                <p className="text-[11px] text-muted-foreground truncate">
                                  {prep.company_name}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Progress */}
                        <td className="py-3.5 px-4 min-w-[140px]">
                          <div className="space-y-1">
                            <div className="flex justify-between text-[11px]">
                              <span className="font-medium text-foreground">{completedCount}/{totalCount} Rounds</span>
                              <span className="text-muted-foreground">{progressPercent}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: `${progressPercent}%` }} />
                            </div>
                          </div>
                        </td>

                        {/* Configured Rounds */}
                        <td className="py-3.5 px-4 hidden md:table-cell max-w-[280px]">
                          <div className="flex flex-wrap gap-1">
                            {prep.rounds.map((round) => (
                              <span
                                key={round.id}
                                className={`text-[10px] px-2 py-0.5 rounded-md font-medium border ${round.status === "completed"
                                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                                    : "bg-background border-border/70 text-muted-foreground"
                                  }`}
                              >
                                {round.name}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Created Date */}
                        <td className="py-3.5 px-4 text-muted-foreground text-[11px] whitespace-nowrap">
                          {new Date(prep.created_at).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {allDone && (
                              <Button asChild size="sm" variant="ghost" className="h-8 text-xs text-muted-foreground hover:text-foreground">
                                <Link href={`/job-prep/${prep.id}/report`}>
                                  <span>Report</span>
                                </Link>
                              </Button>
                            )}

                            <Button
                              asChild
                              size="sm"
                              className="h-8 rounded-xl gap-1 text-xs font-semibold bg-primary text-primary-foreground shadow-2xs"
                            >
                              <Link href={`/job-prep/${prep.id}`}>
                                <span>{allDone ? "View Track" : "Open Track"}</span>
                                <ChevronRight className="h-3.5 w-3.5" />
                              </Link>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
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
            <Mic className="h-6 w-6" />
          </div>
          <div className="space-y-1 max-w-sm mx-auto">
            <h3 className="font-bold text-base text-foreground">No interview tracks found</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Create a new mock interview track tailored to your resume and target job description.
            </p>
          </div>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="sm" className="rounded-xl px-5 gap-2 text-xs font-semibold shadow-2xs">
              <Link href="/job-prep/create">
                <Plus className="h-4 w-4" /> Create Mock Interview Track
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="rounded-xl px-5 text-xs font-semibold border-border">
              <Link href="/resume-analysis">Analyze Resume First</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
