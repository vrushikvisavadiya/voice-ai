import Link from "next/link";
import { Button } from "@/components/ui/button";
import { History, SearchX } from "lucide-react";

interface EmptyHistoryProps {
  mode: "empty" | "filtered";
  onClearFilters?: () => void;
}

export function EmptyHistory({ mode, onClearFilters }: EmptyHistoryProps) {
  if (mode === "empty") {
    return (
      <div className="flex flex-col items-center justify-center rounded-[32px] border border-dashed border-border bg-card px-6 py-14 text-center">
        <div className="flex size-14 items-center justify-center rounded-full border border-border bg-background">
          <History className="size-6 text-muted-foreground" />
        </div>
        <h3 className="mt-5 text-lg font-semibold text-foreground">
          No interview history yet
        </h3>
        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          Once you start practicing, your interview attempts will appear here so
          you can resume, review, or revisit them later.
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
        No sessions match your filters
      </h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        Try changing the search, interview type, or session status to find a
        matching attempt.
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
