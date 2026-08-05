"use client";

import Link from "next/link";
import { Plus, FileText } from "lucide-react";

export function DashboardTitleRow() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1 pb-2">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
          Track your role-specific interview preparations, AI resume analyses, and mock rounds.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/job-prep/create"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Start Mock Interview</span>
        </Link>

        <Link
          href="/resume-analysis"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold border border-border/80 bg-background text-foreground/90 hover:bg-muted transition-colors"
        >
          <FileText className="h-4 w-4" />
          <span>Analyze Resume</span>
        </Link>
      </div>
    </div>
  );
}
