"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Link2 } from "lucide-react";
import { toast } from "sonner";

interface ReportHeaderProps {
  role: string;
  company: string;
  date: string;
  duration: string;
  type: string;
  difficulty: string;
  overallScore: number;
}

function scoreBadgeTone(score: number) {
  if (score >= 90)
    return "border-emerald-500/20 bg-emerald-500/10 text-emerald-600";
  if (score >= 70) return "border-blue-500/20 bg-blue-500/10 text-blue-600";
  if (score >= 50) return "border-amber-500/20 bg-amber-500/10 text-amber-600";
  return "border-red-500/20 bg-red-500/10 text-red-600";
}

export function ReportHeader({
  role,
  company,
  date,
  duration,
  type,
  difficulty,
  overallScore,
}: ReportHeaderProps) {
  async function handleShare() {
    await navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied!");
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button asChild variant="ghost" className="w-fit rounded-2xl px-3">
          <Link href="/reports">
            <ArrowLeft className="mr-2 size-4" />
            Back to Reports
          </Link>
        </Button>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="rounded-2xl">
            <Download className="mr-2 size-4" />
            Export PDF
          </Button>

          <Button variant="ghost" className="rounded-2xl" onClick={handleShare}>
            <Link2 className="mr-2 size-4" />
            Share
          </Button>

          <Button asChild className="rounded-2xl">
            <Link href="/interview/new">Practice Again</Link>
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {role}
          </h1>
          <span className="text-base text-muted-foreground">{company}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>{date}</span>
          <span>·</span>
          <span>{duration}</span>
          <Badge variant="secondary" className="rounded-full px-3 py-1">
            {type}
          </Badge>
          <Badge variant="outline" className="rounded-full px-3 py-1">
            {difficulty}
          </Badge>
          <Badge
            className={`rounded-full px-3 py-1 ${scoreBadgeTone(overallScore)}`}
          >
            Score {overallScore}
          </Badge>
        </div>
      </div>
    </div>
  );
}
