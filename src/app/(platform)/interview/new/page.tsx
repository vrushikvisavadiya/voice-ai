"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ConfirmStep } from "@/components/interview/ConfirmStep";
import {
  ConfigureStep,
  type Difficulty,
  type InterviewType,
} from "@/components/interview/ConfigureStep";
import { JobDescriptionStep } from "@/components/interview/JobDescriptionStep";
import {
  FOCUS_AREA_OPTIONS,
  SAMPLE_DESCRIPTION,
  STEP_LABELS,
  detectFromJobDescription,
  type DetectionResult,
} from "@/components/interview/interview-utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, Loader2, WandSparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NewInterviewPage() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = React.useState(1);
  const [jobDescription, setJobDescription] =
    React.useState(SAMPLE_DESCRIPTION);
  const [interviewType, setInterviewType] =
    React.useState<InterviewType>("Mixed");
  const [difficulty, setDifficulty] = React.useState<Difficulty>("Medium");
  const [questionCount, setQuestionCount] = React.useState([8]);
  const [focusAreas, setFocusAreas] = React.useState<string[]>([
    "Problem Solving",
    "System Design",
    "Communication",
  ]);
  const [isDetecting, setIsDetecting] = React.useState(false);
  const [isStarting, setIsStarting] = React.useState(false);
  const [detection, setDetection] = React.useState<DetectionResult | null>(
    null,
  );

  const detectTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleJobDescriptionChange = (value: string) => {
    setJobDescription(value);
    setDetection(null);

    if (detectTimer.current) clearTimeout(detectTimer.current);

    if (!value.trim()) {
      setIsDetecting(false);
      return;
    }

    setIsDetecting(true);
    detectTimer.current = setTimeout(() => {
      setDetection(detectFromJobDescription(value));
      setIsDetecting(false);
    }, 900);
  };

  React.useEffect(() => {
    if (SAMPLE_DESCRIPTION.trim()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDetecting(true);
      const timer = setTimeout(() => {
        setDetection(detectFromJobDescription(SAMPLE_DESCRIPTION));
        setIsDetecting(false);
      }, 900);
      return () => clearTimeout(timer);
    }
  }, []);

  const toggleFocusArea = (value: string) => {
    setFocusAreas((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  };

  const nextStep = () => setCurrentStep((step) => Math.min(step + 1, 3));
  const previousStep = () => setCurrentStep((step) => Math.max(step - 1, 1));

  const handleStart = async () => {
    setIsStarting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    router.push("/interview/mock-session/session");
  };

  const canContinue =
    currentStep === 1 ? jobDescription.trim().length > 0 : true;

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <Badge
              variant="secondary"
              className="w-fit rounded-full px-3 py-1 text-xs uppercase tracking-[0.16em]"
            >
              Interview setup
            </Badge>
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Set up a tailored mock interview
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                Paste the job description, tune the interview, and start a
                focused session with a clean handoff.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-3xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
            {isDetecting ? (
              <>
                <Loader2 className="size-4 animate-spin text-primary" />
                <span>Analysing job description…</span>
              </>
            ) : detection ? (
              <>
                <span className="size-2 rounded-full bg-success inline-block" />
                <span>Role detected — ready to configure</span>
              </>
            ) : (
              <>
                <WandSparkles className="size-4" />
                <span>Paste a JD to auto-detect role and skills</span>
              </>
            )}
          </div>
        </div>

        {/* Step indicators */}
        <section className="rounded-[28px] border border-border bg-card p-4 sm:p-6">
          <div className="grid gap-3 md:grid-cols-3">
            {STEP_LABELS.map((label, index) => {
              const stepNumber = index + 1;
              const active = currentStep === stepNumber;
              const complete = currentStep > stepNumber;

              return (
                <div
                  key={label}
                  className={cn(
                    "rounded-2xl border px-4 py-4 transition-colors",
                    active && "border-primary bg-primary/5",
                    complete && "border-primary/20 bg-primary/5",
                    !active && !complete && "border-border bg-background",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex size-8 items-center justify-center rounded-full text-sm font-medium",
                        active || complete
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground",
                      )}
                    >
                      {complete ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="size-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        stepNumber
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {label}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {stepNumber === 1 && "Add context for the role."}
                        {stepNumber === 2 && "Choose interview settings."}
                        {stepNumber === 3 && "Review before launch."}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Main content */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-6">
            {currentStep === 1 ? (
              <JobDescriptionStep
                value={jobDescription}
                onChange={handleJobDescriptionChange}
                detection={detection}
                isDetecting={isDetecting}
              />
            ) : null}

            {currentStep === 2 ? (
              <ConfigureStep
                interviewType={interviewType}
                onInterviewTypeChange={setInterviewType}
                difficulty={difficulty}
                onDifficultyChange={setDifficulty}
                questionCount={questionCount}
                onQuestionCountChange={setQuestionCount}
                focusAreas={focusAreas}
                allFocusAreas={FOCUS_AREA_OPTIONS}
                onToggleFocusArea={toggleFocusArea}
              />
            ) : null}

            {currentStep === 3 ? (
              <ConfirmStep
                role={detection?.role ?? "Software Engineer"}
                company={detection?.company ?? "Acme Labs"}
                interviewType={interviewType}
                difficulty={difficulty}
                questionCount={questionCount[0]}
                focusAreas={focusAreas}
                onStart={handleStart}
                isStarting={isStarting}
              />
            ) : null}
          </div>

          {/* Live preview sidebar */}
          <aside className="space-y-4 rounded-[28px] border border-border bg-card p-5 lg:sticky lg:top-6 lg:h-fit">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <WandSparkles className="size-4" />
              Live setup preview
            </div>

            <div className="space-y-4">
              {/* Detected role */}
              <div className="rounded-2xl border border-border bg-background p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Detected role
                </p>
                {isDetecting ? (
                  <div className="mt-2 space-y-2">
                    <div className="h-4 w-3/4 animate-pulse rounded-lg bg-muted" />
                    <div className="h-3 w-1/2 animate-pulse rounded-lg bg-muted" />
                  </div>
                ) : detection ? (
                  <>
                    <p className="mt-2 text-base font-medium text-foreground">
                      {detection.role}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {detection.company}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Waiting for job description
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground/60">
                      Company will appear here
                    </p>
                  </>
                )}
              </div>

              {/* Config summary */}
              <div className="rounded-2xl border border-border bg-background p-4 text-sm">
                <div className="flex items-center justify-between py-2">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium text-foreground">
                    {interviewType}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-border py-2">
                  <span className="text-muted-foreground">Difficulty</span>
                  <span className="font-medium text-foreground">
                    {difficulty}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-border py-2">
                  <span className="text-muted-foreground">Questions</span>
                  <span className="font-medium tabular-nums text-foreground">
                    {questionCount[0]}
                  </span>
                </div>
              </div>

              {/* Detected skills */}
              {isDetecting ? (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Extracting skills…
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[80, 64, 96, 72].map((width) => (
                      <div
                        key={width}
                        className="h-7 animate-pulse rounded-full bg-muted"
                        style={{ width }}
                      />
                    ))}
                  </div>
                </div>
              ) : detection?.skills.length ? (
                <div>
                  <p className="mb-3 text-sm text-muted-foreground">
                    Detected skills
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {detection.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="rounded-full px-3 py-1"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Focus areas */}
              <div>
                <p className="mb-3 text-sm text-muted-foreground">
                  Focus areas
                </p>
                <div className="flex flex-wrap gap-2">
                  {focusAreas.map((area) => (
                    <Badge
                      key={area}
                      variant="secondary"
                      className="rounded-full px-3 py-1"
                    >
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-3 border-t border-border pt-2 sm:flex-row sm:justify-between">
          <Button
            variant="ghost"
            className="h-11 rounded-2xl px-4"
            onClick={previousStep}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="mr-2 size-4" />
            Back
          </Button>

          {currentStep < 3 ? (
            <Button
              className="h-11 rounded-2xl px-5"
              onClick={nextStep}
              disabled={!canContinue || isDetecting}
            >
              {isDetecting && currentStep === 1 ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Detecting…
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="ml-2 size-4" />
                </>
              )}
            </Button>
          ) : null}
        </div>
      </div>
    </main>
  );
}
