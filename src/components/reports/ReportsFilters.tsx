"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";

export type InterviewTypeFilter = "All" | "Technical" | "Behavioral" | "Mixed";
export type ScoreRangeFilter =
  | "All"
  | "90-100"
  | "70-89"
  | "50-69"
  | "Below 50";
export type DateRangeFilter =
  | "All Time"
  | "This Week"
  | "This Month"
  | "Last 3 Months";
export type SortFilter =
  | "Newest First"
  | "Oldest First"
  | "Highest Score"
  | "Lowest Score";

interface ReportsFiltersProps {
  search: string;
  type: InterviewTypeFilter;
  scoreRange: ScoreRangeFilter;
  dateRange: DateRangeFilter;
  sort: SortFilter;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: InterviewTypeFilter) => void;
  onScoreRangeChange: (value: ScoreRangeFilter) => void;
  onDateRangeChange: (value: DateRangeFilter) => void;
  onSortChange: (value: SortFilter) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export function ReportsFilters({
  search,
  type,
  scoreRange,
  dateRange,
  sort,
  onSearchChange,
  onTypeChange,
  onScoreRangeChange,
  onDateRangeChange,
  onSortChange,
  onClearFilters,
  hasActiveFilters,
}: ReportsFiltersProps) {
  return (
    <section className="rounded-[28px] border border-border bg-card p-4 sm:p-5">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <SlidersHorizontal className="size-4" />
        Filters & sorting
      </div>

      <div className="mt-4 grid gap-3 xl:grid-cols-[1.4fr_repeat(4,minmax(0,1fr))]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by role or company…"
            className="h-11 rounded-2xl pl-9"
          />
        </div>

        <Select
          value={type}
          onValueChange={(value) => onTypeChange(value as InterviewTypeFilter)}
        >
          <SelectTrigger className="h-11 rounded-2xl w-full">
            <SelectValue placeholder="Interview Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Technical">Technical</SelectItem>
            <SelectItem value="Behavioral">Behavioral</SelectItem>
            <SelectItem value="Mixed">Mixed</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={scoreRange}
          onValueChange={(value) =>
            onScoreRangeChange(value as ScoreRangeFilter)
          }
        >
          <SelectTrigger className="h-11 rounded-2xl  w-full">
            <SelectValue placeholder="Score Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="90-100">90–100</SelectItem>
            <SelectItem value="70-89">70–89</SelectItem>
            <SelectItem value="50-69">50–69</SelectItem>
            <SelectItem value="Below 50">Below 50</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={dateRange}
          onValueChange={(value) => onDateRangeChange(value as DateRangeFilter)}
        >
          <SelectTrigger className="h-11 rounded-2xl  w-full">
            <SelectValue placeholder="Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Time">All Time</SelectItem>
            <SelectItem value="This Week">This Week</SelectItem>
            <SelectItem value="This Month">This Month</SelectItem>
            <SelectItem value="Last 3 Months">Last 3 Months</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={sort}
          onValueChange={(value) => onSortChange(value as SortFilter)}
        >
          <SelectTrigger className="h-11 rounded-2xl  w-full">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Newest First">Newest First</SelectItem>
            <SelectItem value="Oldest First">Oldest First</SelectItem>
            <SelectItem value="Highest Score">Highest Score</SelectItem>
            <SelectItem value="Lowest Score">Lowest Score</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters ? (
        <div className="mt-4">
          <Button
            variant="ghost"
            className="h-auto rounded-full px-0 text-sm text-muted-foreground hover:bg-transparent hover:text-foreground"
            onClick={onClearFilters}
          >
            Clear filters
          </Button>
        </div>
      ) : null}
    </section>
  );
}
