"use client";

import { useState } from "react";
import { Upload, FileCheck, X } from "lucide-react";
import { Label } from "@/components/ui/label";

interface ResumeDropzoneProps {
  selectedFile: File | null;
  onFileSelect: (file: File | null) => void;
  fileError: string | null;
  setFileError: (err: string | null) => void;
  disabled?: boolean;
}

export function ResumeDropzone({
  selectedFile,
  onFileSelect,
  fileError,
  setFileError,
  disabled,
}: ResumeDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const validateAndSelect = (file: File) => {
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|docx|txt)$/i)) {
      setFileError("Please upload a PDF, DOCX, or TXT file");
      onFileSelect(null);
      return;
    }
    setFileError(null);
    onFileSelect(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSelect(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSelect(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2 w-full">
      <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Resume File (PDF, DOCX, TXT)
      </Label>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragOver(false);
        }}
        className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 sm:p-8 text-center transition-all ${
          isDragOver
            ? "border-primary bg-primary/5 scale-[1.005]"
            : selectedFile
            ? "border-emerald-500/50 bg-emerald-500/5"
            : "border-border/80 bg-muted/20 hover:bg-muted/40 hover:border-border"
        }`}
      >
        <input
          type="file"
          accept=".pdf,.docx,.txt"
          onChange={handleFileChange}
          disabled={disabled}
          className="absolute inset-0 cursor-pointer opacity-0 z-10"
        />

        {selectedFile ? (
          <div className="flex items-center justify-between w-full max-w-xl p-3.5 rounded-xl bg-background border border-emerald-500/30 shadow-2xs z-20">
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
                onFileSelect(null);
              }}
              className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Upload className="h-5 w-5" />
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
  );
}
