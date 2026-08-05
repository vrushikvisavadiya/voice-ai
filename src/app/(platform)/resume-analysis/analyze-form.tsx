"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { resumeAnalysisSchema, type ResumeAnalysisFormData } from "./resume-analysis.schema";
import { useAnalyzeResume } from "./use-resume-analysis";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Upload,
  FileText,
  CheckCircle2,
  Sparkles,
  X,
  Wand2,
  FileCheck,
  Brain,
  Target,
  Rocket,
  Loader2,
} from "lucide-react";

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

const SCANNING_STEPS = [
  { id: 1, text: "Extracting resume text, work experience & technical skills...", icon: FileText },
  { id: 2, text: "Parsing target job requirements & core qualifications...", icon: Target },
  { id: 3, text: "Computing AI match score & seniority alignment...", icon: Brain },
  { id: 4, text: "Identifying key strengths & candidate skill gaps...", icon: Wand2 },
  { id: 5, text: "Generating tailored mock interview round recommendations...", icon: Rocket },
];

export function AnalyzeForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
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

  // Animated progress step counter when pending
  useEffect(() => {
    if (!isPending) {
      setCurrentStepIndex(0);
      setScanProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 95) return 95;
        return prev + 5;
      });
    }, 200);

    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev < SCANNING_STEPS.length - 1 ? prev + 1 : prev));
    }, 1200);

    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
    };
  }, [isPending]);

  const handleFile = (file: File) => {
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|docx|txt)$/i)) {
      setFileError("Please upload a PDF, DOCX, or TXT file");
      setSelectedFile(null);
      return;
    }
    setFileError(null);
    setSelectedFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

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
        className="space-y-6 rounded-3xl border border-border/70 bg-card p-6 md:p-8 shadow-xs"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/40">
          <div>
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
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

        {/* File Dropzone */}
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Resume File (PDF, DOCX, TXT)
          </Label>

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 sm:p-8 text-center transition-all ${
              isDragOver
                ? "border-primary bg-primary/5 scale-[1.01]"
                : selectedFile
                ? "border-emerald-500/50 bg-emerald-500/5"
                : "border-border/80 bg-muted/20 hover:bg-muted/40 hover:border-border"
            }`}
          >
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={handleFileChange}
              disabled={isPending}
              className="absolute inset-0 cursor-pointer opacity-0 z-10"
            />

            {selectedFile ? (
              <div className="flex items-center justify-between w-full max-w-md p-3.5 rounded-xl bg-background border border-emerald-500/30 shadow-xs z-20">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 shrink-0">
                    <FileCheck className="h-5 w-5" />
                  </div>
                  <div className="text-left truncate">
                    <p className="text-xs font-bold text-foreground truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {(selectedFile.size / 1024).toFixed(1)} KB · Ready to analyze
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                  }}
                  className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Upload className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-foreground">
                    Click or drag & drop your resume file here
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Supports PDF, DOCX, or TXT (Max size 10MB)
                  </p>
                </div>
              </div>
            )}
          </div>
          {fileError && <p className="text-xs font-medium text-destructive mt-1">{fileError}</p>}
        </div>

        {/* Job Description Field */}
        <div className="space-y-2">
          <Label htmlFor="job_description" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Target Job Description
          </Label>
          <Textarea
            id="job_description"
            rows={7}
            placeholder="Paste the target job description requirements, responsibilities, and qualifications..."
            {...register("job_description")}
            disabled={isPending}
            className="rounded-2xl border-border/80 bg-background text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:border-transparent p-4"
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
          <Sparkles className="h-4 w-4" />
          <span>Analyze Match & Generate Insights</span>
        </Button>
      </form>

      {/* AI Scanning & Analysis Progress Modal */}
      <AnimatePresence>
        {isPending && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg rounded-3xl bg-card border border-border p-6 sm:p-8 shadow-2xl space-y-6 text-center"
            >
              {/* Document Scanner Laser Effect Visual */}
              <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary overflow-hidden">
                <FileText className="h-10 w-10" />
                <motion.div
                  animate={{ y: [-40, 40, -40] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                  className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_12px_var(--primary)]"
                />
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground">
                  AI Analyzing Resume & Job Fit...
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Comparing candidate experience against target role requirements.
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-bold text-muted-foreground">
                  <span>Scanning Progress</span>
                  <span>{scanProgress}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${scanProgress}%` }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </div>

              {/* Live Steps Checklist */}
              <div className="space-y-2.5 text-left pt-2 border-t border-border/40">
                {SCANNING_STEPS.map((step, idx) => {
                  const Icon = step.icon;
                  const isDone = idx < currentStepIndex;
                  const isCurrent = idx === currentStepIndex;

                  return (
                    <div
                      key={step.id}
                      className={`flex items-center gap-3 text-xs p-2 rounded-xl transition-all ${
                        isCurrent
                          ? "bg-primary/10 font-bold text-primary"
                          : isDone
                          ? "text-muted-foreground opacity-80"
                          : "text-muted-foreground/40"
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      ) : isCurrent ? (
                        <Loader2 className="h-4 w-4 text-primary animate-spin shrink-0" />
                      ) : (
                        <Icon className="h-4 w-4 text-muted-foreground/40 shrink-0" />
                      )}
                      <span className="truncate">{step.text}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
