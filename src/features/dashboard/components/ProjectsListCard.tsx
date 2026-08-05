"use client";

import Link from "next/link";
import { Plus, FileText, CheckCircle2 } from "lucide-react";
import { RealResumeAnalysisItem } from "../dashboard.types";

interface ProjectsListCardProps {
  resumes: RealResumeAnalysisItem[];
}

export function ProjectsListCard({ resumes }: ProjectsListCardProps) {
  return (
    <div className="rounded-2xl bg-card border border-border/70 p-5 shadow-xs flex flex-col justify-between h-full min-h-[510px]">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-border/40">
          <div>
            <h3 className="text-base font-bold text-foreground">
              Recent Resume Analyses
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              AI match scoring & key feedback
            </p>
          </div>
          <Link
            href="/resume-analysis"
            className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-semibold border border-border/80 bg-background text-foreground/90 hover:bg-muted transition-colors shadow-2xs"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New</span>
          </Link>
        </div>

        <div className="space-y-3 pt-4">
          {resumes.length > 0 ? (
            resumes.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 text-xs p-3 rounded-2xl border border-border/50 bg-background hover:bg-muted/40 hover:border-border transition-all shadow-2xs group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <FileText className="h-4.5 w-4.5" />
                  </div>
                  <div className="truncate">
                    <p className="font-bold text-foreground truncate text-xs sm:text-sm">
                      {item.filename}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Analyzed {item.createdDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-[11px] font-bold">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>{item.matchScore}% Match</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 px-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mx-auto mb-3">
                <FileText className="h-6 w-6" />
              </div>
              <p className="text-xs font-semibold text-foreground">No resumes analyzed yet</p>
              <p className="text-[11px] text-muted-foreground mt-1 max-w-[200px] mx-auto">
                Upload your resume to compare against job descriptions.
              </p>
              <Link
                href="/resume-analysis"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-primary text-primary-foreground mt-4 shadow-2xs hover:bg-primary/90 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Upload Resume</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {resumes.length > 0 && (
        <div className="pt-4 border-t border-border/40 text-center">
          <Link
            href="/resume-analysis"
            className="text-xs font-bold text-primary hover:underline"
          >
            View all resume history →
          </Link>
        </div>
      )}
    </div>
  );
}
