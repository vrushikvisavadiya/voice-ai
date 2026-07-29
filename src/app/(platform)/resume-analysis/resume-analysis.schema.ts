// src/app/(platform)/resume-analysis/resume-analysis.schema.ts
import { z } from "zod";

export const resumeAnalysisSchema = z.object({
  job_description: z
    .string()
    .min(20, "Job description must be at least 20 characters long"),
});

export type ResumeAnalysisFormData = z.infer<typeof resumeAnalysisSchema>;
