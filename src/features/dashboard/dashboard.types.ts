export interface StatCardData {
  id: string;
  title: string;
  value: number | string;
  badgeText: string;
  isIncrease?: boolean;
  isFilled?: boolean;
}

export interface AnalyticsBarData {
  day: string;
  fullDay: string;
  val1: number;
  isHatched?: boolean;
  isSolidDark?: boolean;
  isHighlighted?: boolean;
  percentage?: number;
}

export interface RealPrepTrack {
  id: string;
  jobTitle: string;
  companyName: string;
  completedRounds: number;
  totalRounds: number;
  status: "Completed" | "In Progress" | "Pending";
}

export interface RealResumeAnalysisItem {
  id: string;
  filename: string;
  matchScore: number;
  createdDate: string;
}

export interface UpcomingRoundReminder {
  roundId?: string;
  prepId?: string;
  roleTitle: string;
  companyName: string;
  roundTitle: string;
  scheduledTime?: string;
}

export interface DashboardBackendStats {
  total_resumes_analyzed: number;
  total_job_preparations: number;
  total_rounds_completed: number;
  total_rounds_pending: number;
  total_rounds_in_progress: number;
  overall_average_score: number;
}
