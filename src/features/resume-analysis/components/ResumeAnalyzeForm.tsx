"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resumeAnalysisSchema, type ResumeAnalysisFormData } from "@/app/(platform)/resume-analysis/resume-analysis.schema";
import { useAnalyzeResume } from "@/app/(platform)/resume-analysis/use-resume-analysis";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileText, Wand2 } from "lucide-react";
import { ResumeDropzone } from "./ResumeDropzone";
import { ResumeScanningModal } from "./ResumeScanningModal";

const SAMPLE_JOB_DESCRIPTION = `Senior Full Stack Engineer (React & Python/FastAPI)

Responsibilities:
• Architect, build, and maintain scalable web applications using modern React, TypeScript, and FastAPI backend services.
• Design efficient REST/GraphQL APIs and optimize database queries across PostgreSQL and Redis caching layers.
• Implement real-time voice/AI interactive features, WebSockets, and asynchronous task queues.
• Collaborate with product and design teams to deliver high-fidelity candidate dashboard experiences.

Requirements:
• 4+ years of professional experience in frontend development (React, Next.js, Tailwind CSS).
• 3+ years of experience with Python APIs (FastAPI, Django, Async SQLAlchemy).
• Strong understanding of Web API contracts, state management, and CI/CD pipelines.
• Experience with cloud deployments (AWS, Docker, PostgreSQL).`;

export function ResumeAnalyzeForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);

  const { mutate: analyze, isPending } = useAnalyzeResume();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ResumeAnalysisFormData>({
    resolver: zodResolver(resumeAnalysisSchema),
    defaultValues: {
      job_description: "",
    },
  });

  useEffect(() => {
    if (!isPending) {
      setCurrentStepIndex(0);
      setScanProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setScanProgress((prev) => (prev >= 95 ? 95 : prev + 5));
    }, 200);

    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev < 4 ? prev + 1 : prev));
    }, 1200);

    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
    };
  }, [isPending]);

  const handleAutofillSample = () => {
    setValue("job_description", SAMPLE_JOB_DESCRIPTION, { shouldValidate: true });
  };

  const onSubmit = (data: ResumeAnalysisFormData) => {
    if (!selectedFile) {
      setFileError("Resume file is required");
      return;
    }
    analyze({ file: selectedFile, jobDescription: data.job_description });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 rounded-2xl border border-border/70 bg-card p-6 sm:p-8 shadow-2xs w-full"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/40">
          <div>
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <span>Resume Match Analyzer</span>
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Upload your resume and target job requirements to generate AI match scores & round prep.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAutofillSample}
            disabled={isPending}
            className="gap-1.5 text-xs rounded-full self-start sm:self-auto border-border/80 hover:bg-muted"
          >
            <Wand2 className="h-3.5 w-3.5 text-primary" />
            <span>Try Sample Job Description</span>
          </Button>
        </div>

        {/* File Dropzone Component */}
        <ResumeDropzone
          selectedFile={selectedFile}
          onFileSelect={setSelectedFile}
          fileError={fileError}
          setFileError={setFileError}
          disabled={isPending}
        />

        {/* Job Description Field */}
        <div className="space-y-2 w-full">
          <Label htmlFor="job_description" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Target Job Description
          </Label>
          <Textarea
            id="job_description"
            rows={7}
            placeholder="Paste the target job description requirements, responsibilities, and qualifications..."
            {...register("job_description")}
            disabled={isPending}
            className="rounded-2xl border-border/80 bg-background text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:border-transparent p-4 w-full"
          />
          {errors.job_description && (
            <p className="text-xs font-medium text-destructive">{errors.job_description.message}</p>
          )}
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full sm:w-auto px-8 rounded-full text-xs sm:text-sm font-bold bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 transition-all gap-2"
          disabled={isPending}
        >
          <FileText className="h-4 w-4" />
          <span>Analyze Match & Generate Insights</span>
        </Button>
      </form>

      {/* Animated Scanning Modal */}
      <ResumeScanningModal
        isOpen={isPending}
        scanProgress={scanProgress}
        currentStepIndex={currentStepIndex}
      />
    </>
  );
}
