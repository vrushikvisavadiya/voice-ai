"use client";

import { useDashboardData } from "../use-dashboard-data";
import { DashboardHeaderBar } from "./DashboardHeaderBar";
import { DashboardTitleRow } from "./DashboardTitleRow";
import { DashboardStatCards } from "./DashboardStatCards";
import { ProjectAnalyticsCard } from "./ProjectAnalyticsCard";
import { RemindersCard } from "./RemindersCard";
import { TeamCollaborationCard } from "./TeamCollaborationCard";
import { ProjectProgressCard } from "./ProjectProgressCard";
import { ProjectsListCard } from "./ProjectsListCard";

export function DashboardView() {
  const {
    user,
    searchQuery,
    setSearchQuery,
    statCards,
    analyticsBars,
    upcomingRound,
    prepTracks,
    recentResumes,
    completedRoundsCount,
    totalJobPrepsCount,
  } = useDashboardData();

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 p-4 sm:p-6 bg-[#f4f5f6] dark:bg-card/40 rounded-2xl border border-border/40 min-h-full">
      {/* Top Header Bar with Search & Profile */}
      <DashboardHeaderBar
        user={user}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Title Row */}
      <DashboardTitleRow />

      {/* Top Row Stat Cards (4 Cards) */}
      <DashboardStatCards cards={statCards} />

      {/* Grid Content: Left Section (~70%) and Right Section (~30%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left Section (8 cols on lg) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Subrow 1: Analytics & Reminders */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
            <div className="sm:col-span-7">
              <ProjectAnalyticsCard bars={analyticsBars} />
            </div>
            <div className="sm:col-span-5">
              <RemindersCard reminder={upcomingRound} />
            </div>
          </div>

          {/* Subrow 2: Interview Tracks & Round Completion Progress */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
            <div className="sm:col-span-7">
              <TeamCollaborationCard prepTracks={prepTracks} />
            </div>
            <div className="sm:col-span-5">
              <ProjectProgressCard
                completedRounds={completedRoundsCount}
                totalJobPreps={totalJobPrepsCount}
              />
            </div>
          </div>
        </div>

        {/* Right Section (4 cols on lg) - Recent Resume Analyses */}
        <div className="lg:col-span-4 flex flex-col">
          <ProjectsListCard resumes={recentResumes} />
        </div>
      </div>
    </div>
  );
}
