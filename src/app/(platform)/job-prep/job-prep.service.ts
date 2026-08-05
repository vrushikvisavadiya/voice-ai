// src/app/(platform)/job-prep/job-prep.service.ts
import { api } from "@/lib/api/axios";
import type {
  JobPreparationResponse,
  InterviewQuestionResponse,
  InterviewRoundResponse,
  RoundAnswersPayload,
  RoundReportResponse,
  JobPreparationReportResponse,
  GenerateNextQuestionPayload,
  NextQuestionResponse,
} from "./job-prep.types";

export const createPreparation = async (payload: {
  resume_analysis_id: string;
  selected_rounds: string[];
}): Promise<JobPreparationResponse> => {
  const { data } = await api.post<JobPreparationResponse>("/job-preparations", payload);
  return data;
};

export const getPreparations = async (): Promise<JobPreparationResponse[]> => {
  const { data } = await api.get<JobPreparationResponse[]>("/job-preparations");
  return data;
};

export const getPreparationById = async (prepId: string): Promise<JobPreparationResponse> => {
  const { data } = await api.get<JobPreparationResponse>(`/job-preparations/${prepId}`);
  return data;
};

export const generateQuestions = async (
  roundId: string
): Promise<InterviewQuestionResponse[]> => {
  const { data } = await api.post<InterviewQuestionResponse[]>(
    `/job-preparations/rounds/${roundId}/generate-questions`
  );
  return data;
};

export const submitAnswers = async (
  roundId: string,
  payload: RoundAnswersPayload
): Promise<InterviewRoundResponse> => {
  const { data } = await api.post<InterviewRoundResponse>(
    `/job-preparations/rounds/${roundId}/submit-answers`,
    payload
  );
  return data;
};

export const getRoundReport = async (roundId: string): Promise<RoundReportResponse> => {
  const { data } = await api.get<RoundReportResponse>(
    `/job-preparations/rounds/${roundId}/report`
  );
  return data;
};

export const getPreparationReport = async (
  prepId: string
): Promise<JobPreparationReportResponse> => {
  const { data } = await api.get<JobPreparationReportResponse>(
    `/job-preparations/${prepId}/report`
  );
  return data;
};

export const generateNextQuestion = async (
  roundId: string,
  payload: GenerateNextQuestionPayload
): Promise<NextQuestionResponse> => {
  const { data } = await api.post<NextQuestionResponse>(
    `/job-preparations/rounds/${roundId}/generate-next-question`,
    payload
  );
  return data;
};

