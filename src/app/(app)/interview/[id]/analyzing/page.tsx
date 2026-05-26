"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";

const statusMessages = [
  "Analyzing your responses…",
  "Evaluating communication & clarity…",
  "Generating personalized feedback…",
  "Almost ready…",
];

export default function InterviewAnalyzingPage() {
  const router = useRouter();
  const params = useParams();
  const interviewId = String(params.id);

  const [messageIndex, setMessageIndex] = React.useState(0);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const messageTimer = window.setInterval(() => {
      setMessageIndex((current) =>
        current < statusMessages.length - 1 ? current + 1 : current,
      );
    }, 1000);

    const progressTimer = window.setInterval(() => {
      setProgress((current) => Math.min(current + 25, 100));
    }, 1000);

    const redirectTimer = window.setTimeout(() => {
      router.push(`/interview/${interviewId}/results`);
    }, 4000);

    return () => {
      window.clearInterval(messageTimer);
      window.clearInterval(progressTimer);
      window.clearTimeout(redirectTimer);
    };
  }, [interviewId, router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="flex w-full max-w-2xl flex-col items-center text-center">
        <div className="relative flex h-28 w-28 items-center justify-center">
          <div className="absolute size-24 rounded-full border border-border animate-pulse" />
          <div className="absolute size-16 rounded-full border border-primary/30" />
          <div className="relative flex size-10 items-center justify-center rounded-full bg-primary" />
        </div>

        <div className="mt-10 space-y-3">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Interview analysis
          </p>

          <h1 className="text-2xl font-semibold tracking-tight text-foreground transition-all duration-500 sm:text-3xl">
            {statusMessages[messageIndex]}
          </h1>

          <p className="mx-auto max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            We&apos;re reviewing delivery, clarity, structure, and technical
            depth to prepare your personalized report.
          </p>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-1 bg-border/60">
        <div
          className="h-full bg-primary transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </main>
  );
}
