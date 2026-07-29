"use client";

import Link from "next/link";
import { AnalyzeForm } from "./analyze-form";
import { useResumeHistory } from "./use-resume-analysis";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Sparkles } from "lucide-react";

export default function ResumeAnalysisPage() {
  const { data: history, isLoading } = useResumeHistory();

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Resume Analysis</h1>
        <p className="text-sm text-muted-foreground">
          Compare your resume against any job description to uncover skills match, gaps, and tailored interview recommendations.
        </p>
      </div>

      <AnalyzeForm />

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Recent Analyses</h2>
        {isLoading ? (
          <div className="text-sm text-muted-foreground py-4">Loading history...</div>
        ) : history && history.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {history.map((item) => (
              <Card key={item.id} className="hover:border-primary/50 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    {item.resume_filename}
                  </CardTitle>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                    <Sparkles className="h-3 w-3" />
                    {item.match_score}% Match
                  </span>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {item.extracted_details?.experience_match_summary || "Analysis details available"}
                  </p>
                  <Button asChild size="sm" variant="outline" className="w-full">
                    <Link href={`/resume-analysis/${item.id}`} className="flex items-center justify-center gap-1">
                      View Insights <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
            No previous resume analyses found. Upload your first resume above to get started!
          </div>
        )}
      </div>
    </div>
  );
}
