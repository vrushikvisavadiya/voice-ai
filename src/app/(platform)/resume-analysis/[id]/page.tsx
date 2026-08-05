"use client";

import { use } from "react";
import Link from "next/link";
import { useResumeAnalysisDetail } from "../use-resume-analysis";
import { ResumeDetailView } from "@/features/resume-analysis/components/ResumeDetailView";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export default function ResumeAnalysisDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: analysis, isLoading, error } = useResumeAnalysisDetail(id);

  if (isLoading) {
    return (
      <div className="w-full p-12 text-center space-y-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mx-auto animate-pulse">
          <FileText className="h-6 w-6" />
        </div>
        <p className="text-sm font-semibold text-muted-foreground">Loading AI match report...</p>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="w-full p-12 text-center space-y-4 rounded-3xl bg-card border border-border">
        <p className="text-sm font-semibold text-destructive">Failed to load resume analysis report.</p>
        <Button asChild variant="outline" className="rounded-full text-xs">
          <Link href="/resume-analysis">Back to Resume Analysis</Link>
        </Button>
      </div>
    );
  }

  return <ResumeDetailView analysis={analysis} />;
}
