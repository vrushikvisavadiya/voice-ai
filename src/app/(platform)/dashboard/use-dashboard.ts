// src/app/(platform)/dashboard/use-dashboard.ts
import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "@/app/(auth)/login/auth.service";
import { getResumeHistory } from "@/app/(platform)/resume-analysis/resume-analysis.service";
import { getPreparations } from "@/app/(platform)/job-prep/job-prep.service";

export const useDashboardData = () => {
  const meQuery = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
  });

  const resumeHistoryQuery = useQuery({
    queryKey: ["resume-history"],
    queryFn: getResumeHistory,
  });

  const jobPrepsQuery = useQuery({
    queryKey: ["job-preparations"],
    queryFn: getPreparations,
  });

  return {
    user: meQuery.data,
    isLoadingUser: meQuery.isLoading,
    resumeHistory: resumeHistoryQuery.data || [],
    isLoadingResumes: resumeHistoryQuery.isLoading,
    jobPreps: jobPrepsQuery.data || [],
    isLoadingPreps: jobPrepsQuery.isLoading,
  };
};
