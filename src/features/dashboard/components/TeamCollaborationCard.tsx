"use client";

import Link from "next/link";
import { Plus, Mic } from "lucide-react";
import { RealPrepTrack } from "../dashboard.types";

interface TeamCollaborationCardProps {
  prepTracks: RealPrepTrack[];
}

export function TeamCollaborationCard({ prepTracks }: TeamCollaborationCardProps) {
  const getBadgeClass = (status: RealPrepTrack["status"]) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case "In Progress":
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      case "Pending":
        return "bg-rose-500/10 text-rose-600 border-rose-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="rounded-2xl bg-card border border-border/70 p-5 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between pb-3">
        <h3 className="text-sm font-semibold text-foreground">
          Recent Interview Tracks
        </h3>
        <Link
          href="/job-prep/create"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border border-border/80 bg-background text-foreground/80 hover:bg-muted transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>New Track</span>
        </Link>
      </div>

      <div className="space-y-3.5 pt-1">
        {prepTracks.length > 0 ? (
          prepTracks.map((track) => (
            <div
              key={track.id}
              className="flex items-center justify-between gap-3 text-xs p-1.5 rounded-xl hover:bg-muted/40 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                  <Mic className="h-4 w-4" />
                </div>
                <div className="truncate">
                  <p className="font-semibold text-foreground truncate">
                    {track.jobTitle}
                  </p>
                  <p className="text-[11px] text-muted-foreground truncate">
                    {track.companyName} ·{" "}
                    <span className="font-medium text-foreground/80">
                      {track.completedRounds} of {track.totalRounds} rounds complete
                    </span>
                  </p>
                </div>
              </div>

              <span
                className={`shrink-0 px-2.5 py-0.5 text-[10px] font-semibold rounded-full border ${getBadgeClass(
                  track.status
                )}`}
              >
                {track.status}
              </span>
            </div>
          ))
        ) : (
          <p className="text-xs text-muted-foreground py-4 text-center">
            No interview tracks yet. Start your first mock interview prep!
          </p>
        )}
      </div>
    </div>
  );
}
