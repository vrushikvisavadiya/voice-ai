"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ReportCard, type ReportItem } from "@/components/reports/ReportCard";
import {
  ReportsFilters,
  type DateRangeFilter,
  type InterviewTypeFilter,
  type ScoreRangeFilter,
  type SortFilter,
} from "@/components/reports/ReportsFilters";
import { ReportsSummaryStats } from "@/components/reports/ReportsSummaryStats";
import { DeleteReportDialog } from "@/components/reports/DeleteReportDialog";
import { EmptyReports } from "@/components/reports/EmptyReports";
import { FileText, Plus } from "lucide-react";

const REPORTS_PER_PAGE = 8;

const initialReports: ReportItem[] = [
  {
    id: "1",
    role: "Senior Frontend Engineer",
    company: "Stripe",
    date: "May 26, 2026",
    dateValue: "2026-05-26",
    duration: "24 mins",
    type: "Mixed",
    difficulty: "Hard",
    overallScore: 78,
    categories: {
      communication: 82,
      technical: 74,
      confidence: 80,
      relevance: 76,
    },
  },
  {
    id: "2",
    role: "Product Manager",
    company: "Linear",
    date: "May 22, 2026",
    dateValue: "2026-05-22",
    duration: "18 mins",
    type: "Behavioral",
    difficulty: "Medium",
    overallScore: 91,
    categories: {
      communication: 94,
      technical: 85,
      confidence: 93,
      relevance: 90,
    },
  },
  {
    id: "3",
    role: "Frontend Engineer",
    company: "Vercel",
    date: "May 19, 2026",
    dateValue: "2026-05-19",
    duration: "21 mins",
    type: "Technical",
    difficulty: "Hard",
    overallScore: 84,
    categories: {
      communication: 80,
      technical: 88,
      confidence: 82,
      relevance: 85,
    },
  },
  {
    id: "4",
    role: "UX Designer",
    company: "Notion",
    date: "May 14, 2026",
    dateValue: "2026-05-14",
    duration: "16 mins",
    type: "Behavioral",
    difficulty: "Medium",
    overallScore: 73,
    categories: {
      communication: 79,
      technical: 68,
      confidence: 72,
      relevance: 74,
    },
  },
  {
    id: "5",
    role: "Frontend Engineer",
    company: "Shopify",
    date: "May 11, 2026",
    dateValue: "2026-05-11",
    duration: "27 mins",
    type: "Mixed",
    difficulty: "Hard",
    overallScore: 94,
    categories: {
      communication: 92,
      technical: 95,
      confidence: 93,
      relevance: 96,
    },
  },
  {
    id: "6",
    role: "Software Engineer",
    company: "Ramp",
    date: "May 03, 2026",
    dateValue: "2026-05-03",
    duration: "25 mins",
    type: "Technical",
    difficulty: "Hard",
    overallScore: 68,
    categories: {
      communication: 70,
      technical: 66,
      confidence: 67,
      relevance: 69,
    },
  },
  {
    id: "7",
    role: "Engineering Manager",
    company: "Atlassian",
    date: "Apr 27, 2026",
    dateValue: "2026-04-27",
    duration: "22 mins",
    type: "Behavioral",
    difficulty: "Hard",
    overallScore: 88,
    categories: {
      communication: 90,
      technical: 79,
      confidence: 89,
      relevance: 88,
    },
  },
  {
    id: "8",
    role: "Frontend Engineer",
    company: "Airbnb",
    date: "Apr 15, 2026",
    dateValue: "2026-04-15",
    duration: "20 mins",
    type: "Technical",
    difficulty: "Medium",
    overallScore: 75,
    categories: {
      communication: 74,
      technical: 79,
      confidence: 73,
      relevance: 76,
    },
  },
  {
    id: "9",
    role: "Data Analyst",
    company: "Figma",
    date: "Mar 28, 2026",
    dateValue: "2026-03-28",
    duration: "17 mins",
    type: "Mixed",
    difficulty: "Easy",
    overallScore: 62,
    categories: {
      communication: 65,
      technical: 60,
      confidence: 61,
      relevance: 63,
    },
  },
  {
    id: "10",
    role: "Frontend Engineer",
    company: "Framer",
    date: "Mar 10, 2026",
    dateValue: "2026-03-10",
    duration: "19 mins",
    type: "Mixed",
    difficulty: "Medium",
    overallScore: 47,
    categories: {
      communication: 50,
      technical: 42,
      confidence: 46,
      relevance: 49,
    },
  },
  {
    id: "11",
    role: "Product Designer",
    company: "Canva",
    date: "Feb 21, 2026",
    dateValue: "2026-02-21",
    duration: "15 mins",
    type: "Behavioral",
    difficulty: "Easy",
    overallScore: 71,
    categories: {
      communication: 76,
      technical: 61,
      confidence: 70,
      relevance: 75,
    },
  },
  {
    id: "12",
    role: "Frontend Engineer",
    company: "Plaid",
    date: "Jan 30, 2026",
    dateValue: "2026-01-30",
    duration: "23 mins",
    type: "Technical",
    difficulty: "Hard",
    overallScore: 79,
    categories: {
      communication: 77,
      technical: 83,
      confidence: 78,
      relevance: 80,
    },
  },
];

function matchesScoreRange(score: number, range: ScoreRangeFilter) {
  if (range === "All") return true;
  if (range === "90-100") return score >= 90;
  if (range === "70-89") return score >= 70 && score <= 89;
  if (range === "50-69") return score >= 50 && score <= 69;
  return score < 50;
}

function matchesDateRange(dateValue: string, range: DateRangeFilter) {
  if (range === "All Time") return true;

  const now = new Date("2026-05-26T12:00:00Z");
  const itemDate = new Date(dateValue);

  const diffMs = now.getTime() - itemDate.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (range === "This Week") return diffDays <= 7;
  if (range === "This Month") return diffDays <= 31;
  return diffDays <= 92;
}

function sortReports(reports: ReportItem[], sort: SortFilter) {
  const sorted = [...reports];

  if (sort === "Newest First") {
    sorted.sort(
      (a, b) =>
        new Date(b.dateValue).getTime() - new Date(a.dateValue).getTime(),
    );
  } else if (sort === "Oldest First") {
    sorted.sort(
      (a, b) =>
        new Date(a.dateValue).getTime() - new Date(b.dateValue).getTime(),
    );
  } else if (sort === "Highest Score") {
    sorted.sort((a, b) => b.overallScore - a.overallScore);
  } else {
    sorted.sort((a, b) => a.overallScore - b.overallScore);
  }

  return sorted;
}

export default function ReportsPage() {
  const [reports, setReports] = React.useState(initialReports);
  const [search, setSearch] = React.useState("");
  const [type, setType] = React.useState<InterviewTypeFilter>("All");
  const [scoreRange, setScoreRange] = React.useState<ScoreRangeFilter>("All");
  const [dateRange, setDateRange] = React.useState<DateRangeFilter>("All Time");
  const [sort, setSort] = React.useState<SortFilter>("Newest First");
  const [page, setPage] = React.useState(1);
  const [reportToDelete, setReportToDelete] = React.useState<ReportItem | null>(
    null,
  );

  const hasActiveFilters =
    search.trim() !== "" ||
    type !== "All" ||
    scoreRange !== "All" ||
    dateRange !== "All Time" ||
    sort !== "Newest First";

  const filteredReports = React.useMemo(() => {
    const lowered = search.trim().toLowerCase();

    const next = reports.filter((report) => {
      const matchesSearch =
        lowered.length === 0 ||
        report.role.toLowerCase().includes(lowered) ||
        report.company.toLowerCase().includes(lowered);

      const matchesType = type === "All" || report.type === type;
      const scoreMatch = matchesScoreRange(report.overallScore, scoreRange);
      const dateMatch = matchesDateRange(report.dateValue, dateRange);

      return matchesSearch && matchesType && scoreMatch && dateMatch;
    });

    return sortReports(next, sort);
  }, [reports, search, type, scoreRange, dateRange, sort]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredReports.length / REPORTS_PER_PAGE),
  );
  const currentPage = Math.min(page, totalPages);
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * REPORTS_PER_PAGE,
    currentPage * REPORTS_PER_PAGE,
  );

  React.useEffect(() => {
    setPage(1);
  }, [search, type, scoreRange, dateRange, sort]);

  React.useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const totalReports = reports.length;
  const averageScore =
    reports.length > 0
      ? Math.round(
          reports.reduce((sum, report) => sum + report.overallScore, 0) /
            reports.length,
        )
      : 0;

  const bestReport =
    reports.length > 0
      ? reports.reduce((best, current) =>
          current.overallScore > best.overallScore ? current : best,
        )
      : null;

  const roleCounts = reports.reduce<Record<string, number>>((acc, report) => {
    acc[report.role] = (acc[report.role] ?? 0) + 1;
    return acc;
  }, {});

  const mostPracticedRole =
    Object.entries(roleCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";

  const showingFrom =
    filteredReports.length === 0 ? 0 : (currentPage - 1) * REPORTS_PER_PAGE + 1;
  const showingTo = Math.min(
    currentPage * REPORTS_PER_PAGE,
    filteredReports.length,
  );

  function clearFilters() {
    setSearch("");
    setType("All");
    setScoreRange("All");
    setDateRange("All Time");
    setSort("Newest First");
  }

  function handleDeleteConfirm() {
    if (!reportToDelete) return;
    setReports((current) =>
      current.filter((item) => item.id !== reportToDelete.id),
    );
    setReportToDelete(null);
  }

  const noReportsAtAll = reports.length === 0;
  const noMatches = reports.length > 0 && filteredReports.length === 0;

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm text-muted-foreground">
              <FileText className="size-4" />
              Reports
            </div>
            <div className="space-y-1">
              <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                Reports
              </h1>
              <p className="text-sm leading-6 text-muted-foreground sm:text-base">
                Your complete interview history and performance records
              </p>
            </div>
          </div>

          <Button asChild className="h-11 rounded-2xl px-5">
            <Link href="/interview/new">
              <Plus className="mr-2 size-4" />
              Start New Interview
            </Link>
          </Button>
        </header>

        <ReportsSummaryStats
          totalReports={totalReports}
          averageScore={averageScore}
          bestScore={
            bestReport
              ? {
                  score: bestReport.overallScore,
                  role: bestReport.role,
                  company: bestReport.company,
                }
              : null
          }
          mostPracticedRole={mostPracticedRole}
        />

        <ReportsFilters
          search={search}
          type={type}
          scoreRange={scoreRange}
          dateRange={dateRange}
          sort={sort}
          onSearchChange={setSearch}
          onTypeChange={setType}
          onScoreRangeChange={setScoreRange}
          onDateRangeChange={setDateRange}
          onSortChange={setSort}
          onClearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {noReportsAtAll ? <EmptyReports mode="empty" /> : null}

        {noMatches ? (
          <EmptyReports mode="filtered" onClearFilters={clearFilters} />
        ) : null}

        {!noReportsAtAll && !noMatches ? (
          <>
            <section className="space-y-4">
              {paginatedReports.map((report) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  onDelete={setReportToDelete}
                />
              ))}
            </section>

            <Card className="rounded-[28px] border-border shadow-none">
              <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {showingFrom}–{showingTo} of {filteredReports.length}{" "}
                  reports
                </p>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="rounded-2xl"
                    onClick={() =>
                      setPage((current) => Math.max(1, current - 1))
                    }
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <div className="rounded-full border border-border px-3 py-2 text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </div>
                  <Button
                    variant="outline"
                    className="rounded-2xl"
                    onClick={() =>
                      setPage((current) => Math.min(totalPages, current + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        ) : null}
      </div>

      <DeleteReportDialog
        open={Boolean(reportToDelete)}
        onOpenChange={(open) => {
          if (!open) setReportToDelete(null);
        }}
        role={reportToDelete?.role}
        company={reportToDelete?.company}
        onConfirm={handleDeleteConfirm}
      />
    </main>
  );
}
