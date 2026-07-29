// src/app/(platform)/job-prep/job-prep.schema.ts
import { z } from "zod";

export const createPrepSchema = z.object({
  resume_analysis_id: z.string().uuid("Invalid Resume Analysis ID"),
  selected_rounds: z.array(z.string()).min(1, "Please select at least one interview round"),
});

export type CreatePrepFormData = z.infer<typeof createPrepSchema>;
