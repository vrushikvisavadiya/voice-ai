"use client";

import * as React from "react";
import { HistoryFilters } from "@/components/history/HistoryFilters";
import {
  SessionHistoryCard,
  type SessionHistoryItem,
} from "@/components/history/SessionHistoryCard";
import { EmptyHistory } from "@/components/history/EmptyHistory";
import { DeleteSessionDialog } from "@/components/history/DeleteSessionDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";

type StatusFilter =
  | "All"
  | "Completed"
  | "In Progress"
  | "Analyzing"
  | "Abandoned";
type TypeFilter = "All" | "Technical" | "Behavioral" | "Mixed";
type SortFilter = "Newest First" | "Oldest First";

const initialSessions: SessionHistoryItem[] = [
  {
    id: "s1",
    role: "Senior Frontend Engineer",
    company: "Stripe",
    startedAt: "Today · 8:15 PM",
    startedAtValue: "2026-05-26T20:15:00",
    duration: "24 mins",
    type: "Mixed",
    difficulty: "Hard",
    status: "Completed",
    score: 78,
  },
  {
    id: "s2",
    role: "Product Manager",
    company: "Linear",
    startedAt: "Today · 5:40 PM",
    startedAtValue: "2026-05-26T17:40:00",
    duration: "18 mins",
    type: "Behavioral",
    difficulty: "Medium",
    status: "Completed",
    score: 91,
  },
  {
    id: "s3",
    role: "Frontend Engineer",
    company: "Vercel",
    startedAt: "Yesterday · 9:10 PM",
    startedAtValue: "2026-05-25T21:10:00",
    duration: "13 mins",
    type: "Technical",
    difficulty: "Hard",
    status: "Abandoned",
    score: null,
  },
  {
    id: "s4",
    role: "Engineering Manager",
    company: "Atlassian",
    startedAt: "Yesterday · 7:25 PM",
    startedAtValue: "2026-05-25T19:25:00",
    duration: "Analyzing",
    type: "Behavioral",
    difficulty: "Hard",
    status: "Analyzing",
    score: null,
  },
  {
    id: "s5",
    role: "Frontend Engineer",
    company: "Airbnb",
    startedAt: "May 24 · 10:05 AM",
    startedAtValue: "2026-05-24T10:05:00",
    duration: "20 mins",
    type: "Technical",
    difficulty: "Medium",
    status: "Completed",
    score: 75,
  },
  {
    id: "s6",
    role: "Data Analyst",
    company: "Figma",
    startedAt: "May 22 · 3:30 PM",
    startedAtValue: "2026-05-22T15:30:00",
    duration: "17 mins",
    type: "Mixed",
    difficulty: "Easy",
    status: "Completed",
    score: 62,
  },
  {
    id: "s7",
    role: "Frontend Engineer",
    company: "Framer",
    startedAt: "May 20 · 11:00 AM",
    startedAtValue: "2026-05-20T11:00:00",
    duration: "In progress",
    type: "Mixed",
    difficulty: "Medium",
    status: "In Progress",
    score: null,
  },
  {
    id: "s8",
    role: "Software Engineer",
    company: "Ramp",
    startedAt: "May 18 · 8:50 PM",
    startedAtValue: "2026-05-18T20:50:00",
    duration: "25 mins",
    type: "Technical",
    difficulty: "Hard",
    status: "Completed",
    score: 68,
  },
  {
    id: "s9",
    role: "Product Designer",
    company: "Canva",
    startedAt: "May 15 · 6:15 PM",
    startedAtValue: "2026-05-15T18:15:00",
    duration: "16 mins",
    type: "Behavioral",
    difficulty: "Easy",
    status: "Completed",
    score: 71,
  },
  {
    id: "s10",
    role: "Senior Frontend Engineer",
    company: "Shopify",
    startedAt: "May 12 · 9:00 PM",
    startedAtValue: "2026-05-12T21:00:00",
    duration: "27 mins",
    type: "Mixed",
    difficulty: "Hard",
    status: "Completed",
    score: 94,
  },
];

function groupLabel(dateString: string) {
  const date = new Date(dateString);
  const now = new Date("2026-05-26T23:00:00");
  const diffMs = now.getTime() - date.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (diffDays < 1) return "Today";
  if (diffDays < 2) return "Yesterday";
  if (diffDays <= 7) return "This Week";
  return "Earlier";
}

export default function HistoryPage() {
  const [sessions, setSessions] = React.useState(initialSessions);
  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState<StatusFilter>("All");
  const [type, setType] = React.useState<TypeFilter>("All");
  const [sort, setSort] = React.useState<SortFilter>("Newest First");
  const [sessionToDelete, setSessionToDelete] =
    React.useState<SessionHistoryItem | null>(null);

  const hasActiveFilters =
    search.trim() !== "" ||
    status !== "All" ||
    type !== "All" ||
    sort !== "Newest First";

  const filteredSessions = React.useMemo(() => {
    const lowered = search.trim().toLowerCase();

    const next = sessions.filter((session) => {
      const matchesSearch =
        lowered.length === 0 ||
        session.role.toLowerCase().includes(lowered) ||
        session.company.toLowerCase().includes(lowered);

      const matchesStatus = status === "All" || session.status === status;
      const matchesType = type === "All" || session.type === type;

      return matchesSearch && matchesStatus && matchesType;
    });

    next.sort((a, b) => {
      const aTime = new Date(a.startedAtValue).getTime();
      const bTime = new Date(b.startedAtValue).getTime();
      return sort === "Newest First" ? bTime - aTime : aTime - bTime;
    });

    return next;
  }, [sessions, search, status, type, sort]);

  const groupedSessions = React.useMemo(() => {
    return filteredSessions.reduce<Record<string, SessionHistoryItem[]>>(
      (acc, session) => {
        const label = groupLabel(session.startedAtValue);
        acc[label] = [...(acc[label] ?? []), session];
        return acc;
      },
      {},
    );
  }, [filteredSessions]);

  function clearFilters() {
    setSearch("");
    setStatus("All");
    setType("All");
    setSort("Newest First");
  }

  function handleDeleteConfirm() {
    if (!sessionToDelete) return;
    setSessions((current) =>
      current.filter((item) => item.id !== sessionToDelete.id),
    );
    setSessionToDelete(null);
  }

  const groupOrder = ["Today", "Yesterday", "This Week", "Earlier"];
  const noSessions = sessions.length === 0;
  const noMatches = sessions.length > 0 && filteredSessions.length === 0;

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <header className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm text-muted-foreground">
            <History className="size-4" />
            Session archive
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            History
          </h1>
          <p className="text-sm leading-6 text-muted-foreground sm:text-base">
            Browse every interview attempt, including completed, in-progress,
            and analyzing sessions.
          </p>
        </header>

        <HistoryFilters
          search={search}
          status={status}
          type={type}
          sort={sort}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onTypeChange={setType}
          onSortChange={setSort}
          onClearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {noSessions ? <EmptyHistory mode="empty" /> : null}
        {noMatches ? (
          <EmptyHistory mode="filtered" onClearFilters={clearFilters} />
        ) : null}

        {!noSessions && !noMatches ? (
          <>
            <div className="space-y-8">
              {groupOrder.map((group) => {
                const items = groupedSessions[group];
                if (!items?.length) return null;

                return (
                  <section key={group} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        {group}
                      </h2>
                      <div className="h-px flex-1 bg-border" />
                    </div>

                    <div className="space-y-3">
                      {items.map((session) => (
                        <SessionHistoryCard
                          key={session.id}
                          session={session}
                          onDelete={setSessionToDelete}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>

            <Card className="rounded-[28px] border-border shadow-none">
              <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  {filteredSessions.length} sessions found
                </p>
                {hasActiveFilters ? (
                  <Button
                    variant="ghost"
                    className="h-auto w-fit rounded-full px-0 text-sm text-muted-foreground hover:bg-transparent hover:text-foreground"
                    onClick={clearFilters}
                  >
                    Clear filters
                  </Button>
                ) : null}
              </CardContent>
            </Card>
          </>
        ) : null}
      </div>

      <DeleteSessionDialog
        open={Boolean(sessionToDelete)}
        onOpenChange={(open: any) => {
          if (!open) setSessionToDelete(null);
        }}
        role={sessionToDelete?.role}
        company={sessionToDelete?.company}
        onConfirm={handleDeleteConfirm}
      />
    </main>
  );
}
