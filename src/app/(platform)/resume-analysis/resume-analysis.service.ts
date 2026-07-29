// src/app/(platform)/resume-analysis/resume-analysis.service.ts
import { api } from "@/lib/api/axios";
import type { ResumeAnalysisResponse } from "./resume-analysis.types";

export const analyzeResume = async (
  file: File,
  jobDescription: string
): Promise<ResumeAnalysisResponse> => {
  const formData = new FormData();
  formData.append("resume", file);
  formData.append("job_description", jobDescription);

  const { data } = await api.post<ResumeAnalysisResponse>(
    "/resume-analyses/analyze",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

export const getResumeHistory = async (): Promise<ResumeAnalysisResponse[]> => {
  const { data } = await api.get<ResumeAnalysisResponse[]>("/resume-analyses/history");
  return data;
};

export const getResumeAnalysisById = async (
  analysisId: string
): Promise<ResumeAnalysisResponse> => {
  const { data } = await api.get<ResumeAnalysisResponse>(`/resume-analyses/${analysisId}`);
  return data;
};
