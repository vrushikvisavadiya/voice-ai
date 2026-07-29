// src/app/(platform)/job-prep/job-prep.types.ts

export interface InterviewQuestionResponse {
  id: string;
  round_id: string;
  question_text: string;
  expected_answer_guidance?: string | null;
  user_answer?: string | null;
  feedback?: string | null;
  score?: number | null;
  created_at: string;
  updated_at: string;
}

export interface InterviewRoundResponse {
  id: string;
  job_preparation_id: string;
  round_type: string;
  name: string;
  status: string; // 'pending' | 'in_progress' | 'completed'
  questions: InterviewQuestionResponse[];
  created_at: string;
  updated_at: string;
}

export interface JobPreparationResponse {
  id: string;
  user_id: string;
  resume_analysis_id?: string | null;
  job_title: string;
  company_name?: string | null;
  rounds: InterviewRoundResponse[];
  created_at: string;
  updated_at: string;
}

export interface AnswerSubmit {
  question_id: string;
  user_answer: string;
}

export interface RoundAnswersPayload {
  answers: AnswerSubmit[];
}

export interface QuestionEvaluationDetail {
  id: string;
  question_text: string;
  expected_answer_guidance?: string | null;
  user_answer?: string | null;
  feedback?: string | null;
  score?: number | null;
}

export interface RoundReportResponse {
  round_id: string;
  job_preparation_id: string;
  round_type: string;
  name: string;
  status: string;
  overall_score: number;
  total_questions: number;
  answered_questions: number;
  strengths: string[];
  areas_for_improvement: string[];
  overall_feedback: string;
  questions: QuestionEvaluationDetail[];
  created_at: string;
  updated_at: string;
}

export interface JobPreparationReportResponse {
  job_preparation_id: string;
  job_title: string;
  company_name?: string | null;
  overall_readiness_score: number;
  completed_rounds_count: number;
  total_rounds_count: number;
  overall_readiness_verdict: string;
  rounds_summary: RoundReportResponse[];
  created_at: string;
  updated_at: string;
}
