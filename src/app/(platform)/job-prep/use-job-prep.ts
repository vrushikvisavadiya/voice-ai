// src/app/(platform)/job-prep/use-job-prep.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  createPreparation,
  getPreparations,
  getPreparationById,
  generateQuestions,
  submitAnswers,
  getRoundReport,
  getPreparationReport,
  generateNextQuestion,
} from "./job-prep.service";
import { toast } from "sonner";
import type { RoundAnswersPayload, GenerateNextQuestionPayload } from "./job-prep.types";
import { AxiosError } from "axios";

export const useCreateJobPrep = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { resume_analysis_id: string; selected_rounds: string[] }) =>
      createPreparation(payload),
    onSuccess: (data) => {
      toast.success("Job Preparation track created!");
      queryClient.invalidateQueries({ queryKey: ["job-preparations"] });
      router.push(`/job-prep/${data.id}`);
    },
    onError: (error: AxiosError<{ detail?: string }>) => {
      const message = error.response?.data?.detail || "Failed to create preparation track";
      toast.error(message);
    },
  });
};

export const useJobPreps = () => {
  return useQuery({
    queryKey: ["job-preparations"],
    queryFn: getPreparations,
  });
};

export const useJobPrepDetail = (prepId: string) => {
  return useQuery({
    queryKey: ["job-prep", prepId],
    queryFn: () => getPreparationById(prepId),
    enabled: Boolean(prepId),
  });
};

export const useGenerateQuestions = (roundId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => generateQuestions(roundId),
    onSuccess: () => {
      toast.success("Questions generated!");
      queryClient.invalidateQueries({ queryKey: ["job-prep"] });
    },
    onError: (error: AxiosError<{ detail?: string }>) => {
      const message = error.response?.data?.detail || "Failed to generate questions";
      toast.error(message);
    },
  });
};

export const useSubmitAnswers = (prepId: string, roundId: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RoundAnswersPayload) => submitAnswers(roundId, payload),
    onSuccess: () => {
      toast.success("Round submitted & evaluated successfully!");
      queryClient.invalidateQueries({ queryKey: ["job-prep", prepId] });
      queryClient.invalidateQueries({ queryKey: ["round-report", roundId] });
      router.push(`/job-prep/${prepId}/rounds/${roundId}/report`);
    },
    onError: (error: AxiosError<{ detail?: string }>) => {
      const message = error.response?.data?.detail || "Failed to submit answers";
      toast.error(message);
    },
  });
};

export const useRoundReport = (roundId: string) => {
  return useQuery({
    queryKey: ["round-report", roundId],
    queryFn: () => getRoundReport(roundId),
    enabled: Boolean(roundId),
  });
};

export const usePrepReport = (prepId: string) => {
  return useQuery({
    queryKey: ["prep-report", prepId],
    queryFn: () => getPreparationReport(prepId),
    enabled: Boolean(prepId),
  });
};

export const useGenerateNextQuestion = (roundId: string) => {
  return useMutation({
    mutationFn: (payload: GenerateNextQuestionPayload) =>
      generateNextQuestion(roundId, payload),
    onError: (error: AxiosError<{ detail?: string }>) => {
      const message = error.response?.data?.detail || "Failed to generate next question";
      toast.error(message);
    },
  });
};
