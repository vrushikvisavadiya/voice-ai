"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/axios";
import { fetchMe } from "@/app/(auth)/login/auth.service";
import { getResumeHistory } from "@/app/(platform)/resume-analysis/resume-analysis.service";
import { getPreparations } from "@/app/(platform)/job-prep/job-prep.service";
import {
  StatCardData,
  AnalyticsBarData,
  RealPrepTrack,
  RealResumeAnalysisItem,
  UpcomingRoundReminder,
  DashboardBackendStats,
} from "./dashboard.types";

export function useDashboardData() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [seconds, setSeconds] = useState(5048); // Practice timer

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  const toggleTimer = () => setIsTimerRunning((prev) => !prev);
  const stopTimer = () => {
    setIsTimerRunning(false);
    setSeconds(0);
  };

  const formatTimer = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Queries for real app data
  const userQuery = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
  });

  const dashboardStatsQuery = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      try {
        const res = await api.get<DashboardBackendStats>("/dashboard");
        return res.data;
      } catch {
        return null;
      }
    },
  });

  const resumeHistoryQuery = useQuery({
    queryKey: ["resume-history"],
    queryFn: getResumeHistory,
  });

  const jobPrepsQuery = useQuery({
    queryKey: ["job-preparations"],
    queryFn: getPreparations,
  });

  const user = userQuery.data;
  const backendStats = dashboardStatsQuery.data;
  const resumeHistory = resumeHistoryQuery.data || [];
  const jobPreps = jobPrepsQuery.data || [];

  // Calculate stats from real data
  const totalResumes = backendStats?.total_resumes_analyzed ?? resumeHistory.length;
  const totalJobPreps = backendStats?.total_job_preparations ?? jobPreps.length;
  const totalCompletedRounds =
    backendStats?.total_rounds_completed ??
    jobPreps.reduce(
      (acc, prep) =>
        acc + (prep.rounds ? prep.rounds.filter((r) => r.status === "completed").length : 0),
      0
    );
  const avgScore = backendStats?.overall_average_score ?? 84;

  const statCards: StatCardData[] = [
    {
      id: "total_preps",
      title: "Job Preparations",
      value: totalJobPreps,
      badgeText: "Active role tracks",
      isIncrease: true,
      isFilled: true,
    },
    {
      id: "resumes",
      title: "Resumes Analyzed",
      value: totalResumes,
      badgeText: "Matched to job descriptions",
      isIncrease: true,
      isFilled: false,
    },
    {
      id: "rounds",
      title: "Rounds Completed",
      value: totalCompletedRounds,
      badgeText: "AI evaluated sessions",
      isIncrease: true,
      isFilled: false,
    },
    {
      id: "score",
      title: "Overall Average Score",
      value: `${avgScore}%`,
      badgeText: "Performance rating",
      isIncrease: false,
      isFilled: false,
    },
  ];

  // Map real job preps into track items
  const prepTracks: RealPrepTrack[] = jobPreps.slice(0, 4).map((prep) => {
    const completed = prep.rounds
      ? prep.rounds.filter((r) => r.status === "completed").length
      : 0;
    const total = prep.rounds ? prep.rounds.length : 3;
    let status: "Completed" | "In Progress" | "Pending" = "In Progress";
    if (completed === total && total > 0) status = "Completed";
    else if (completed === 0) status = "Pending";

    return {
      id: prep.id,
      jobTitle: prep.job_title,
      companyName: prep.company_name || "Target Role",
      completedRounds: completed,
      totalRounds: total,
      status,
    };
  });

  // Map real resume history items
  const recentResumes: RealResumeAnalysisItem[] = resumeHistory.slice(0, 5).map((item) => ({
    id: item.id,
    filename: item.resume_filename,
    matchScore: item.match_score,
    createdDate: new Date(item.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  }));

  // Find upcoming next round session
  const upcomingPrep = jobPreps.find((p) =>
    p.rounds?.some((r) => r.status === "pending" || r.status === "in_progress")
  );
  const pendingRound = upcomingPrep?.rounds?.find(
    (r) => r.status === "pending" || r.status === "in_progress"
  );

  const upcomingRound: UpcomingRoundReminder = {
    prepId: upcomingPrep?.id,
    roundId: pendingRound?.id,
    roleTitle: upcomingPrep ? upcomingPrep.job_title : "Full Stack Software Engineer",
    companyName: upcomingPrep?.company_name || "Target Company",
    roundTitle: pendingRound
      ? pendingRound.name || `Round: ${pendingRound.round_type.replace(/_/g, " ")}`
      : "Round 1: Technical Screening",
    scheduledTime: "Ready to start",
  };

  // Analytics practice activity bars
  const analyticsBars: AnalyticsBarData[] = [
    { day: "S", fullDay: "Sunday", val1: 45, isHatched: true },
    { day: "M", fullDay: "Monday", val1: 70, isSolidDark: false },
    { day: "T", fullDay: "Tuesday", val1: avgScore, isHighlighted: true, percentage: Math.round(avgScore) },
    { day: "W", fullDay: "Wednesday", val1: 90, isSolidDark: true },
    { day: "T", fullDay: "Thursday", val1: 65, isHatched: true },
    { day: "F", fullDay: "Friday", val1: 55, isHatched: true },
    { day: "S", fullDay: "Saturday", val1: 60, isHatched: true },
  ];

  // Filter prep tracks by search query if user types in search bar
  const filteredPrepTracks = prepTracks.filter((track) =>
    searchQuery
      ? track.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.companyName.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  return {
    user,
    isLoadingUser: userQuery.isLoading,
    searchQuery,
    setSearchQuery,
    statCards,
    analyticsBars,
    upcomingRound,
    prepTracks: filteredPrepTracks,
    recentResumes,
    timerString: formatTimer(seconds),
    isTimerRunning,
    toggleTimer,
    stopTimer,
    completedRoundsCount: totalCompletedRounds,
    totalJobPrepsCount: totalJobPreps,
  };
}
