// src/app/(platform)/resume-analysis/use-resume-analysis.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { analyzeResume, getResumeHistory, getResumeAnalysisById } from "./resume-analysis.service";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useAnalyzeResume = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ file, jobDescription }: { file: File; jobDescription: string }) =>
      analyzeResume(file, jobDescription),
    onSuccess: (data) => {
      toast.success("Resume analysis complete!");
      queryClient.invalidateQueries({ queryKey: ["resume-history"] });
      router.push(`/resume-analysis/${data.id}`);
    },
    onError: (error: AxiosError<{ detail?: string }>) => {
      const message = error.response?.data?.detail || "Failed to analyze resume";
      toast.error(message);
    },
  });
};

export const useResumeHistory = () => {
  return useQuery({
    queryKey: ["resume-history"],
    queryFn: getResumeHistory,
  });
};

export const useResumeAnalysisDetail = (analysisId: string) => {
  return useQuery({
    queryKey: ["resume-analysis", analysisId],
    queryFn: () => getResumeAnalysisById(analysisId),
    enabled: Boolean(analysisId),
  });
};
