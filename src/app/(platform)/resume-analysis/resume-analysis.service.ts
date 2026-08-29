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

export const getResumeDownloadUrl = (analysisId: string): string => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
  return `${baseURL}/resume-analyses/${analysisId}/download`;
};

export const downloadResumeFile = async (analysisId: string, filename: string) => {
  const response = await api.get(`/resume-analyses/${analysisId}/download`, {
    responseType: "blob",
  });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

