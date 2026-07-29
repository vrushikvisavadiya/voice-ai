// src/app/(platform)/resume-analysis/resume-analysis.types.ts

export interface RelevantProject {
  project_name: string;
  relevance_reason: string;
}

export interface ExtractedResumeDetails {
  candidate_name?: string | null;
  email?: string | null;
  phone?: string | null;
  skills: string[];
  match_score: number;
  experience_match_summary: string;
  strengths: string[];
  gaps: string[];
  suggestions: string[];
  total_years_experience?: number | null;
  tech_stack_years_experience?: number | null;
  relevant_projects: RelevantProject[];
  seniority_fit?: string | null;
  optimization_checklist: string[];
  suggested_rounds: string[];
}

export interface ResumeAnalysisResponse {
  id: string;
  user_id: string;
  resume_filename: string;
  match_score: number;
  extracted_details: ExtractedResumeDetails;
  created_at: string;
  updated_at: string;
}
