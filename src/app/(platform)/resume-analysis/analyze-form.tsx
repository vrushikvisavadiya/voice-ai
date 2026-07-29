"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resumeAnalysisSchema, type ResumeAnalysisFormData } from "./resume-analysis.schema";
import { useAnalyzeResume } from "./use-resume-analysis";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, FileText, CheckCircle2 } from "lucide-react";

export function AnalyzeForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const { mutate: analyze, isPending } = useAnalyzeResume();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResumeAnalysisFormData>({
    resolver: zodResolver(resumeAnalysisSchema),
    defaultValues: {
      job_description: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
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
    }
  };

  const onSubmit = (data: ResumeAnalysisFormData) => {
    if (!selectedFile) {
      setFileError("Resume file is required");
      return;
    }
    analyze({ file: selectedFile, jobDescription: data.job_description });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-foreground">Upload Resume & Job Description</h2>
        <p className="text-sm text-muted-foreground">
          Our AI will analyze your resume fit, extract key strengths/gaps, and suggest interview rounds.
        </p>
      </div>

      <div className="space-y-2">
        <Label>Resume File (PDF, DOCX, TXT)</Label>
        <div className="relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border p-6 hover:bg-muted/50 transition-colors">
          <input
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={handleFileChange}
            disabled={isPending}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
          {selectedFile ? (
            <div className="flex items-center gap-3 text-sm font-medium text-foreground">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              <span>{selectedFile.name}</span>
              <span className="text-xs text-muted-foreground">
                ({(selectedFile.size / 1024).toFixed(1)} KB)
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-center text-sm text-muted-foreground">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <span>Click or drag and drop your resume file here</span>
              <span className="text-xs text-muted-foreground">Supports PDF, DOCX, TXT</span>
            </div>
          )}
        </div>
        {fileError && <p className="text-xs text-destructive">{fileError}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="job_description">Target Job Description</Label>
        <Textarea
          id="job_description"
          rows={6}
          placeholder="Paste the target job description requirements, responsibilities, and qualifications..."
          {...register("job_description")}
          disabled={isPending}
        />
        {errors.job_description && (
          <p className="text-xs text-destructive">{errors.job_description.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full sm:w-auto" disabled={isPending}>
        {isPending ? (
          <span className="flex items-center gap-2">
            <FileText className="h-4 w-4 animate-spin" /> Analyzing Resume...
          </span>
        ) : (
          "Analyze Match & Generate Insights"
        )}
      </Button>
    </form>
  );
}
