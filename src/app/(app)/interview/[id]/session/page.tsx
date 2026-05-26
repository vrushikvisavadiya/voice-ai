"use client";

import * as React from "react";
import { QuestionDisplay } from "@/components/interview/session/QuestionDisplay";
import { MicButton } from "@/components/interview/session/MicButton";
import { SessionHeader } from "@/components/interview/session/SessionHeader";
import { WaveformVisualizer } from "@/components/interview/session/WaveformVisualizer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  const [transcriptOpen, setTranscriptOpen] = React.useState(true);
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [stateIndex, setStateIndex] = React.useState(0);
  const [micActive, setMicActive] = React.useState(false);
  const [seconds, setSeconds] = React.useState(7 * 60 + 24);

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

  return (
    <main className="flex min-h-screen bg-background">
      <div className="flex min-h-screen flex-1 flex-col">
        <SessionHeader
          role="Senior Frontend Engineer"
          company="Acme Labs"
          currentQuestion={questionIndex + 1}
          totalQuestions={8}
          timer={timerLabel}
        />

        <div className="flex flex-1 overflow-hidden">
          <section className="flex flex-1 flex-col items-center justify-between px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
            <QuestionDisplay
              prompt={prompts[questionIndex]}
              stateLabel={currentState.label}
            />

            <div className="flex flex-col items-center gap-8 pb-4">
              <WaveformVisualizer mode={currentState.mode} />

              <div className="flex flex-wrap items-center justify-center gap-3">
                <MicButton active={micActive} onClick={handleMicToggle} />

                <Button
                  variant="outline"
                  className="h-12 rounded-2xl px-4"
                  onClick={handleSkip}
                >
                  <SkipForward className="mr-2 size-4" />
                  Skip Question
                </Button>

                <Button
                  variant="ghost"
                  className="h-12 rounded-2xl px-4"
                  onClick={() => setTranscriptOpen((current) => !current)}
                >
                  {transcriptOpen ? (
                    <PanelRightClose className="mr-2 size-4" />
                  ) : (
                    <PanelRightOpen className="mr-2 size-4" />
                  )}
                  Transcript
                </Button>
              </div>
            </div>
          </section>

          {transcriptOpen ? (
            <aside className="hidden w-[360px] shrink-0 border-l border-border bg-card lg:flex lg:flex-col">
              <div className="border-b border-border px-5 py-4">
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

              <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
                {transcriptItems.map((item, index) => (
                  <div
                    key={`${item.speaker}-${index}`}
                    className="rounded-2xl border border-border bg-background p-4"
                  >
                    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      {item.speaker}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-foreground">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </aside>
          ) : null}
        </div>
      </div>
    </main>
  );
}
