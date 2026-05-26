"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScoreRingSmall } from "@/components/reports/ScoreRingSmall";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExternalLink, FileText, MoreHorizontal, Trash2 } from "lucide-react";

export interface ReportItem {
  id: string;
  role: string;
  company: string;
  date: string;
  dateValue: string;
  duration: string;
  type: "Technical" | "Behavioral" | "Mixed";
  difficulty: "Easy" | "Medium" | "Hard";
  overallScore: number;
  categories: {
    communication: number;
    technical: number;
    confidence: number;
    relevance: number;
  };
}

interface ReportCardProps {
  report: ReportItem;
  onDelete: (report: ReportItem) => void;
}

function dotTone(value: number) {
  if (value >= 90) return "bg-emerald-500";
  if (value >= 70) return "bg-blue-500";
  if (value >= 50) return "bg-amber-500";
  return "bg-red-500";
}

export function ReportCard({ report, onDelete }: ReportCardProps) {
  const categoryEntries = [
    { label: "Communication", value: report.categories.communication },
    { label: "Technical", value: report.categories.technical },
    { label: "Confidence", value: report.categories.confidence },
    { label: "Relevance", value: report.categories.relevance },
  ];

  return (
    <div className="rounded-[28px] border border-border bg-card p-4 sm:p-5">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="shrink-0">
            <ScoreRingSmall score={report.overallScore} />
          </div>

          <div className="min-w-0">
            <h3 className="text-base font-semibold text-foreground sm:text-lg">
              {report.role}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {report.company}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span>{report.date}</span>
              <span>·</span>
              <span>{report.duration}</span>
              <Badge variant="secondary" className="rounded-full px-3 py-1">
                {report.type}
              </Badge>
              <Badge variant="outline" className="rounded-full px-3 py-1">
                {report.difficulty}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 xl:items-end">
          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
            {categoryEntries.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2"
              >
                <span
                  className={`size-2 rounded-full ${dotTone(item.value)}`}
                />
                <span className="text-xs text-muted-foreground">
                  {item.label}
                </span>
                <span className="ml-auto text-xs font-medium tabular-nums text-foreground">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 self-start xl:self-end">
            <Button asChild variant="outline" className="rounded-2xl">
              <Link href={`/reports/${report.id}`}>
                <ExternalLink className="mr-2 size-4" />
                View Report
              </Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-2xl"
                  aria-label={`Open actions for ${report.role} at ${report.company}`}
                >
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-44 rounded-2xl">
                <DropdownMenuItem asChild>
                  <Link href={`/reports/${report.id}`}>
                    <FileText className="mr-2 size-4" />
                    View Report
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="mr-2 size-4" />
                  Export PDF
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={() => onDelete(report)}
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
