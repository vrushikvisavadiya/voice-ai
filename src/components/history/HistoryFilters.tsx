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

type StatusFilter =
  | "All"
  | "Completed"
  | "In Progress"
  | "Analyzing"
  | "Abandoned";
type TypeFilter = "All" | "Technical" | "Behavioral" | "Mixed";
type SortFilter = "Newest First" | "Oldest First";

interface HistoryFiltersProps {
  search: string;
  status: StatusFilter;
  type: TypeFilter;
  sort: SortFilter;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: StatusFilter) => void;
  onTypeChange: (value: TypeFilter) => void;
  onSortChange: (value: SortFilter) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export function HistoryFilters({
  search,
  status,
  type,
  sort,
  onSearchChange,
  onStatusChange,
  onTypeChange,
  onSortChange,
  onClearFilters,
  hasActiveFilters,
}: HistoryFiltersProps) {
  return (
    <section className="rounded-[28px] border border-border bg-card p-4 sm:p-5">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <SlidersHorizontal className="size-4" />
        Filters
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-[1.5fr_repeat(3,minmax(0,1fr))]">
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
          value={status}
          onValueChange={(value) => onStatusChange(value as StatusFilter)}
        >
          <SelectTrigger className="h-11 rounded-2xl">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All statuses</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Analyzing">Analyzing</SelectItem>
            <SelectItem value="Abandoned">Abandoned</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={type}
          onValueChange={(value) => onTypeChange(value as TypeFilter)}
        >
          <SelectTrigger className="h-11 rounded-2xl">
            <SelectValue placeholder="Interview type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All types</SelectItem>
            <SelectItem value="Technical">Technical</SelectItem>
            <SelectItem value="Behavioral">Behavioral</SelectItem>
            <SelectItem value="Mixed">Mixed</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={sort}
          onValueChange={(value) => onSortChange(value as SortFilter)}
        >
          <SelectTrigger className="h-11 rounded-2xl">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Newest First">Newest First</SelectItem>
            <SelectItem value="Oldest First">Oldest First</SelectItem>
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
