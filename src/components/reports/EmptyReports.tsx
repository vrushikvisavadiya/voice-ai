import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, SearchX } from "lucide-react";

interface EmptyReportsProps {
  mode: "empty" | "filtered";
  onClearFilters?: () => void;
}

export function EmptyReports({ mode, onClearFilters }: EmptyReportsProps) {
  if (mode === "empty") {
    return (
      <div className="flex flex-col items-center justify-center rounded-[32px] border border-dashed border-border bg-card px-6 py-14 text-center">
        <div className="flex size-14 items-center justify-center rounded-full border border-border bg-background">
          <FileText className="size-6 text-muted-foreground" />
        </div>
        <h3 className="mt-5 text-lg font-semibold text-foreground">
          You haven&apos;t completed any interviews yet
        </h3>
        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          Start your first mock interview to generate a report with scores,
          feedback, and coaching insights.
        </p>
        <Button asChild className="mt-6 rounded-2xl px-5">
          <Link href="/interview/new">Start your first interview</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center rounded-[32px] border border-dashed border-border bg-card px-6 py-14 text-center">
      <div className="flex size-14 items-center justify-center rounded-full border border-border bg-background">
        <SearchX className="size-6 text-muted-foreground" />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-foreground">
        No reports match your filters
      </h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        Try adjusting your search, score range, or date filters to find a saved
        interview report.
      </p>
      <Button
        variant="outline"
        className="mt-6 rounded-2xl px-5"
        onClick={onClearFilters}
      >
        Clear filters
      </Button>
    </div>
  );
}
