"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ExternalLink,
  FileText,
  MoreHorizontal,
  Play,
  Trash2,
} from "lucide-react";

export interface SessionHistoryItem {
  id: string;
  role: string;
  company: string;
  startedAt: string;
  startedAtValue: string;
  duration: string;
  type: "Technical" | "Behavioral" | "Mixed";
  difficulty: "Easy" | "Medium" | "Hard";
  status: "Completed" | "In Progress" | "Analyzing" | "Abandoned";
  score: number | null;
}

interface SessionHistoryCardProps {
  session: SessionHistoryItem;
  onDelete: (session: SessionHistoryItem) => void;
}

function statusTone(status: SessionHistoryItem["status"]) {
  if (status === "Completed") {
    return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
  }

  if (status === "In Progress") {
    return "bg-blue-500/10 text-blue-600 border-blue-500/20";
  }

  if (status === "Analyzing") {
    return "bg-amber-500/10 text-amber-600 border-amber-500/20";
  }

  return "bg-muted text-muted-foreground border-border";
}

function scoreTone(score: number | null) {
  if (score === null) return "text-muted-foreground";
  if (score >= 90) return "text-emerald-600";
  if (score >= 70) return "text-blue-600";
  if (score >= 50) return "text-amber-600";
  return "text-red-600";
}

export function SessionHistoryCard({
  session,
  onDelete,
}: SessionHistoryCardProps) {
  const primaryAction =
    session.status === "Completed"
      ? {
          href: `/reports/${session.id}`,
          label: "View Report",
          icon: ExternalLink,
        }
      : session.status === "In Progress"
        ? {
            href: `/interview/${session.id}/session`,
            label: "Resume",
            icon: Play,
          }
        : session.status === "Analyzing"
          ? {
              href: `/interview/${session.id}/analyzing`,
              label: "View Status",
              icon: FileText,
            }
          : {
              href: `/interview/new`,
              label: "Start Again",
              icon: Play,
            };

  const PrimaryIcon = primaryAction.icon;

  return (
    <div className="rounded-[28px] border border-border bg-card p-4 sm:p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="min-w-0 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-foreground sm:text-lg">
              {session.role}
            </h3>
            <span className="text-sm text-muted-foreground">
              {session.company}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span>{session.startedAt}</span>
            <span>·</span>
            <span>{session.duration}</span>
            <Badge variant="secondary" className="rounded-full px-3 py-1">
              {session.type}
            </Badge>
            <Badge variant="outline" className="rounded-full px-3 py-1">
              {session.difficulty}
            </Badge>
            <Badge
              className={`rounded-full border px-3 py-1 ${statusTone(session.status)}`}
            >
              {session.status}
            </Badge>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center xl:justify-end">
          <div className="rounded-2xl border border-border bg-background px-4 py-3">
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Score
            </p>
            <p
              className={`mt-1 text-lg font-semibold tabular-nums ${scoreTone(session.score)}`}
            >
              {session.score !== null ? `${session.score}/100` : "—"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button asChild variant="outline" className="rounded-2xl">
              <Link href={primaryAction.href}>
                <PrimaryIcon className="mr-2 size-4" />
                {primaryAction.label}
              </Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-2xl"
                  aria-label={`Open actions for ${session.role} at ${session.company}`}
                >
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-44 rounded-2xl">
                <DropdownMenuItem asChild>
                  <Link href={primaryAction.href}>
                    <PrimaryIcon className="mr-2 size-4" />
                    {primaryAction.label}
                  </Link>
                </DropdownMenuItem>

                {session.status === "Completed" ? (
                  <DropdownMenuItem asChild>
                    <Link href={`/reports/${session.id}`}>
                      <FileText className="mr-2 size-4" />
                      View Report
                    </Link>
                  </DropdownMenuItem>
                ) : null}

                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={() => onDelete(session)}
                >
                  <Trash2 className="mr-2 size-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
