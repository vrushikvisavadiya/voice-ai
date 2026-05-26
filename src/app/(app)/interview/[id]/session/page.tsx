"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { QuestionDisplay } from "@/components/interview/session/QuestionDisplay";
import { MicButton } from "@/components/interview/session/MicButton";
import { SessionHeader } from "@/components/interview/session/SessionHeader";
import { WaveformVisualizer } from "@/components/interview/session/WaveformVisualizer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PanelRightClose, PanelRightOpen, SkipForward } from "lucide-react";

const transcriptItems = [
  {
    speaker: "AI",
    text: "Tell me about a frontend project where you improved perceived performance for end users.",
  },
  {
    speaker: "You",
    text: "I led a homepage optimization effort by reducing render-blocking assets and restructuring the above-the-fold component tree.",
  },
  {
    speaker: "AI",
    text: "What trade-offs did you make while balancing developer experience and runtime performance?",
  },
  {
    speaker: "You",
    text: "I tried to keep the developer workflow simple, so instead of over-abstracting everything, I focused on the high-impact bottlenecks first.",
  },
  {
    speaker: "AI",
    text: "How did you measure success after the changes shipped?",
  },
];

const prompts = [
  "Tell me about a frontend project where you improved performance for real users.",
  "How do you decide when a component should stay generic versus product-specific?",
  "Describe a time you had to explain a technical trade-off to a non-technical stakeholder.",
];

const stateCycle = [
  { mode: "speaking", label: "AI Speaking…" },
  { mode: "listening", label: "Your Turn" },
  { mode: "processing", label: "Processing…" },
] as const;

export default function InterviewSessionPage() {
  const router = useRouter();
  const params = useParams();
  const interviewId = String(params.id);

  const [transcriptOpen, setTranscriptOpen] = React.useState(true);
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [stateIndex, setStateIndex] = React.useState(0);
  const [micActive, setMicActive] = React.useState(false);
  const [seconds, setSeconds] = React.useState(7 * 60 + 24);
  const [isEnding, setIsEnding] = React.useState(false);

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setSeconds((value) => value + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const currentState = stateCycle[stateIndex];

  const timerLabel = `${String(Math.floor(seconds / 60)).padStart(
    2,
    "0",
  )}:${String(seconds % 60).padStart(2, "0")}`;

  const handleMicToggle = () => {
    setMicActive((current) => !current);
    setStateIndex((current) => (current === 1 ? 2 : 1));
  };

  const handleSkip = () => {
    setQuestionIndex((current) => (current + 1) % prompts.length);
    setStateIndex(0);
    setMicActive(false);
  };

  const handleEndSession = async () => {
    setIsEnding(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    router.push(`/interview/${interviewId}/analyzing`);
  };

  return (
    <main className="h-screen overflow-hidden bg-background">
      <div className="flex h-screen flex-col overflow-hidden">
        <SessionHeader
          role="Senior Frontend Engineer"
          company="Acme Labs"
          currentQuestion={questionIndex + 1}
          totalQuestions={8}
          timer={timerLabel}
          onEndSession={handleEndSession}
          isEnding={isEnding}
        />

        <div className="flex min-h-0 flex-1 overflow-hidden">
          <section className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
            <div className="mx-auto flex h-full w-full max-w-5xl flex-1 flex-col">
              <div className="shrink-0">
                <QuestionDisplay
                  prompt={prompts[questionIndex]}
                  stateLabel={currentState.label}
                />
              </div>

              <div className="flex min-h-0 flex-1 items-center justify-center">
                <div className="flex w-full max-w-2xl flex-col items-center">
                  <WaveformVisualizer mode={currentState.mode} />

                  <div className="mt-5 flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
                    <span
                      className={cn(
                        "size-2 rounded-full",
                        currentState.mode === "speaking" &&
                          "bg-primary animate-pulse",
                        currentState.mode === "listening" &&
                          "bg-chart-2 animate-pulse",
                        currentState.mode === "processing" &&
                          "bg-muted-foreground",
                      )}
                    />
                    {currentState.label}
                  </div>
                </div>
              </div>

              <div className="shrink-0 pt-4">
                <div className="flex flex-col items-center gap-4">
                  <p className="max-w-xl text-center text-sm leading-6 text-muted-foreground">
                    Answer naturally. The AI will evaluate clarity, structure,
                    and technical depth.
                  </p>

                  <div className="w-full max-w-xl rounded-[28px] border border-border bg-card/70 p-3">
                    <div className="grid grid-cols-3 items-center gap-3">
                      <div className="flex justify-start">
                        <Button
                          variant="ghost"
                          className="h-12 rounded-2xl px-4 text-muted-foreground"
                          onClick={handleSkip}
                        >
                          <SkipForward className="mr-2 size-4" />
                          Skip
                        </Button>
                      </div>

                      <div className="flex justify-center">
                        <MicButton
                          active={micActive}
                          onClick={handleMicToggle}
                        />
                      </div>

                      <div className="flex justify-end">
                        <Button
                          variant="ghost"
                          className="h-12 rounded-2xl px-4 text-muted-foreground"
                          onClick={() =>
                            setTranscriptOpen((current) => !current)
                          }
                        >
                          {transcriptOpen ? (
                            <PanelRightClose className="mr-2 size-4" />
                          ) : (
                            <PanelRightOpen className="mr-2 size-4" />
                          )}
                          {transcriptOpen ? "Hide" : "Transcript"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {transcriptOpen ? (
            <aside className="hidden h-full w-[360px] shrink-0 border-l border-border bg-card/60 backdrop-blur-sm lg:flex lg:flex-col">
              <div className="shrink-0 border-b border-border px-5 py-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-medium text-foreground">
                      Live transcript
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Mocked transcript updates appear here during the session.
                    </p>
                  </div>

                  <Badge variant="secondary" className="rounded-full px-3 py-1">
                    Live
                  </Badge>
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
                <div className="space-y-3">
                  {transcriptItems.map((item, index) => (
                    <div
                      key={`${item.speaker}-${index}`}
                      className={cn(
                        "rounded-2xl border p-4",
                        item.speaker === "AI"
                          ? "border-primary/10 bg-primary/5"
                          : "border-border bg-background",
                      )}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                          {item.speaker}
                        </p>
                        <span className="text-[11px] text-muted-foreground">
                          just now
                        </span>
                      </div>

                      <p className="mt-2 text-sm leading-6 text-foreground">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          ) : null}
        </div>
      </div>
    </main>
  );
}
