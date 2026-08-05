"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Target,
  Brain,
  Wand2,
  Rocket,
  CheckCircle2,
  Loader2,
} from "lucide-react";

const SCANNING_STEPS = [
  { id: 1, text: "Extracting resume text, work experience & technical skills...", icon: FileText },
  { id: 2, text: "Parsing target job requirements & core qualifications...", icon: Target },
  { id: 3, text: "Computing AI match score & seniority alignment...", icon: Brain },
  { id: 4, text: "Identifying key strengths & candidate skill gaps...", icon: Wand2 },
  { id: 5, text: "Generating tailored mock interview round recommendations...", icon: Rocket },
];

interface ResumeScanningModalProps {
  isOpen: boolean;
  scanProgress: number;
  currentStepIndex: number;
}

export function ResumeScanningModal({
  isOpen,
  scanProgress,
  currentStepIndex,
}: ResumeScanningModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-lg rounded-3xl bg-card border border-border p-6 sm:p-8 shadow-2xl space-y-6 text-center"
          >
            {/* Laser Scanner Visual Effect */}
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
                Analyzing Resume & Job Fit...
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Comparing candidate experience against target role requirements.
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-bold text-muted-foreground">
                <span>Progress</span>
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
                    className={`flex items-center gap-3 text-xs p-2.5 rounded-xl transition-all ${
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
  );
}
