"use client";

import { useState } from "react";
import Link from "next/link";
import { useResumeHistory } from "@/app/(platform)/resume-analysis/use-resume-analysis";
import { useJobPreps } from "@/app/(platform)/job-prep/use-job-prep";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Search,
  ArrowRight,
  PlayCircle,
  Clock,
  LayoutGrid,
  List,
  Sparkles,
  CheckCircle2,
  Plus,
  ChevronRight,
  Layers,
} from "lucide-react";

export function ResumeHistoryGrid() {
  const { data: history, isLoading: isLoadingHistory } = useResumeHistory();
  const { data: jobPreps, isLoading: isLoadingPreps } = useJobPreps();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const isLoading = isLoadingHistory || isLoadingPreps;

  const filteredHistory = (history || []).filter((item) =>
    searchQuery
      ? item.resume_filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.extracted_details?.candidate_name || "").toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  return (
    <div className="space-y-4 pt-4 w-full">
      {/* Header Bar with Search & View Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <span>Recent Resume Analyses</span>
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Review past match scores, extracted skills, and track practice status.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {/* Search History Filter */}
          {history && history.length > 0 && (
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by filename or name..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-border/80 bg-card focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all"
              />
            </div>
          )}

          {/* View Mode Toggle Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-muted/50 border border-border/60 shrink-0">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                viewMode === "grid"
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
              className={`p-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                viewMode === "table"
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

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className={viewMode === "grid" ? "grid gap-4 sm:grid-cols-2" : "space-y-3"}>
          {[1, 2].map((i) => (
            <div key={i} className="h-36 rounded-2xl bg-card border border-border animate-pulse p-6" />
          ))}
        </div>
      ) : filteredHistory.length > 0 ? (
        viewMode === "grid" ? (
          /* GRID VIEW */
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredHistory.map((item) => {
              // Check if a preparation track already exists for this resume_analysis_id
              const existingPrep = jobPreps?.find(
                (prep) => prep.resume_analysis_id === item.id
              );

              return (
                <Card
                  key={item.id}
                  className="rounded-2xl border-border/70 hover:border-primary/50 transition-all shadow-2xs group flex flex-col justify-between"
                >
                  <CardHeader className="p-5 pb-3 flex flex-row items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <CardTitle className="text-sm font-bold text-foreground truncate">
                          {item.resume_filename}
                        </CardTitle>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          Analyzed{" "}
                          {new Date(item.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        {item.match_score}% Match
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="px-5 pb-5 pt-0 space-y-3.5 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      {/* Summary or Skills snippet */}
                      {item.extracted_details?.experience_match_summary ? (
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                          {item.extracted_details.experience_match_summary}
                        </p>
                      ) : null}

                      {/* Skills Tags Preview */}
                      {item.extracted_details?.skills?.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {item.extracted_details.skills.slice(0, 4).map((skill, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                          {item.extracted_details.skills.length > 4 && (
                            <span className="text-[10px] text-muted-foreground font-medium py-0.5 px-1">
                              +{item.extracted_details.skills.length - 4}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-3 border-t border-border/40 flex items-center justify-between gap-2 text-xs">
                      <Link
                        href={`/resume-analysis/${item.id}`}
                        className="font-medium text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                      >
                        <span>View Report</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>

                      {/* Smart Navigation Button */}
                      {existingPrep ? (
                        <Button
                          asChild
                          size="sm"
                          className="h-8 rounded-xl gap-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs"
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
                          className="h-8 rounded-xl gap-1.5 text-xs font-semibold shadow-2xs"
                        >
                          <Link
                            href={{
                              pathname: "/job-prep/create",
                              query: { analysis_id: item.id },
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
            })}
          </div>
        ) : (
          /* TABLE VIEW */
          <div className="rounded-2xl border border-border/70 overflow-hidden bg-card/60 backdrop-blur-xs shadow-2xs w-full">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border/50 bg-muted/40 text-muted-foreground font-semibold">
                    <th className="py-3.5 px-4">Resume Baseline</th>
                    <th className="py-3.5 px-4">Match Fit</th>
                    <th className="py-3.5 px-4 hidden md:table-cell">Extracted Skills</th>
                    <th className="py-3.5 px-4 hidden sm:table-cell">Practice Track</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {filteredHistory.map((item) => {
                    const existingPrep = jobPreps?.find(
                      (prep) => prep.resume_analysis_id === item.id
                    );

                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-muted/30 transition-colors group"
                      >
                        {/* Filename & Candidate Name */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                              <FileText className="h-4 w-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-foreground truncate max-w-[200px]">
                                {item.resume_filename}
                              </p>
                              {item.extracted_details?.candidate_name && (
                                <p className="text-[11px] text-muted-foreground truncate">
                                  {item.extracted_details.candidate_name}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Match Score */}
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                            <Sparkles className="h-3 w-3" />
                            {item.match_score}%
                          </span>
                        </td>

                        {/* Extracted Skills */}
                        <td className="py-3.5 px-4 hidden md:table-cell max-w-[240px]">
                          {item.extracted_details?.skills?.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {item.extracted_details.skills.slice(0, 3).map((skill, idx) => (
                                <span
                                  key={idx}
                                  className="text-[10px] px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground font-medium truncate max-w-[100px]"
                                >
                                  {skill}
                                </span>
                              ))}
                              {item.extracted_details.skills.length > 3 && (
                                <span className="text-[10px] text-muted-foreground font-medium py-0.5">
                                  +{item.extracted_details.skills.length - 3}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-[11px]">—</span>
                          )}
                        </td>

                        {/* Practice Track Status */}
                        <td className="py-3.5 px-4 hidden sm:table-cell">
                          {existingPrep ? (
                            <Badge
                              variant="outline"
                              className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[10px] font-semibold"
                            >
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Track Active ({existingPrep.rounds.length} Rounds)
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="text-[10px] font-medium">
                              Not Created
                            </Badge>
                          )}
                        </td>

                        {/* Date */}
                        <td className="py-3.5 px-4 text-muted-foreground text-[11px] whitespace-nowrap">
                          {new Date(item.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button asChild size="sm" variant="ghost" className="h-8 text-xs text-muted-foreground hover:text-foreground">
                              <Link href={`/resume-analysis/${item.id}`}>
                                <span>Report</span>
                              </Link>
                            </Button>

                            {existingPrep ? (
                              <Button
                                asChild
                                size="sm"
                                className="h-8 rounded-xl gap-1 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs"
                              >
                                <Link href={`/job-prep/${existingPrep.id}`}>
                                  <span>Continue</span>
                                  <ChevronRight className="h-3.5 w-3.5" />
                                </Link>
                              </Button>
                            ) : (
                              <Button
                                asChild
                                size="sm"
                                variant="default"
                                className="h-8 rounded-xl gap-1 text-xs font-semibold shadow-2xs"
                              >
                                <Link
                                  href={{
                                    pathname: "/job-prep/create",
                                    query: { analysis_id: item.id },
                                  }}
                                >
                                  <PlayCircle className="h-3.5 w-3.5" />
                                  <span>Start</span>
                                </Link>
                              </Button>
                            )}
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
        <div className="text-center py-12 p-6 rounded-2xl bg-card border border-border/70 w-full">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mx-auto mb-3">
            <FileText className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-bold text-foreground">No Resume Analyses Found</h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
            Upload a resume above to compare skills, identify gaps, and calculate match scores.
          </p>
        </div>
      )}
    </div>
  );
}
