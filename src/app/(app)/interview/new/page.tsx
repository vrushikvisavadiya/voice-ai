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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, WandSparkles } from "lucide-react";

const sampleDescription = `We are looking for a Senior Frontend Engineer to join Acme Labs and build performant product experiences using React, TypeScript, and modern design systems. You will collaborate with product, design, and backend teams, drive frontend architecture decisions, and mentor other engineers. Experience with system design, performance optimization, testing, and communication across teams is important.`;

const focusAreaOptions = [
  "Leadership",
  "Problem Solving",
  "System Design",
  "Communication",
  "Frontend Architecture",
  "Debugging",
  "Product Thinking",
];

const steps = ["Paste JD", "Configure", "Start"];

function detectFromJobDescription(value: string) {
  if (!value.trim()) return null;

  const lowerValue = value.toLowerCase();

  const role = lowerValue.includes("senior frontend")
    ? "Senior Frontend Engineer"
    : lowerValue.includes("product designer")
      ? "Product Designer"
      : "Software Engineer";

  const company =
    value
      .match(/join\s+([A-Z][A-Za-z0-9&\s.-]+?)(?:\s+and|\.|,)/)?.[1]
      ?.trim() ?? "Acme Labs";

  const skills = [
    ["React", /react/i],
    ["TypeScript", /typescript/i],
    ["System Design", /system design/i],
    ["Performance", /performance/i],
    ["Communication", /communication/i],
  ]
    .filter(([, pattern]) => pattern?.test(value))
    .map(([skill]) => skill as string);

  return {
    role,
    company,
    skills: skills.length
      ? skills
      : ["Problem Solving", "Communication", "Collaboration"],
  };
}

export default function NewInterviewPage() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = React.useState(1);
  const [jobDescription, setJobDescription] = React.useState(sampleDescription);
  const [interviewType, setInterviewType] =
    React.useState<InterviewType>("Mixed");
  const [difficulty, setDifficulty] = React.useState<Difficulty>("Medium");
  const [questionCount, setQuestionCount] = React.useState([8]);
  const [focusAreas, setFocusAreas] = React.useState<string[]>([
    "Problem Solving",
    "System Design",
    "Communication",
  ]);

  const detection = React.useMemo(
    () => detectFromJobDescription(jobDescription),
    [jobDescription],
  );

  const toggleFocusArea = (value: string) => {
    setFocusAreas((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  };

  const nextStep = () => setCurrentStep((step) => Math.min(step + 1, 3));
  const previousStep = () => setCurrentStep((step) => Math.max(step - 1, 1));

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
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

          <div className="rounded-3xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
            Mock parsing, mocked routing, and voice-ready UI for the first
            product pass.
          </div>
        </div>

        <section className="rounded-[28px] border border-border bg-card p-4 sm:p-6">
          <div className="grid gap-3 md:grid-cols-3">
            {steps.map((label, index) => {
              const stepNumber = index + 1;
              const active = currentStep === stepNumber;
              const complete = currentStep > stepNumber;

              return (
                <div
                  key={label}
                  className={`rounded-2xl border px-4 py-4 transition-colors ${
                    active
                      ? "border-primary bg-primary/5"
                      : complete
                        ? "border-primary/20 bg-primary/5"
                        : "border-border bg-background"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex size-8 items-center justify-center rounded-full text-sm font-medium ${
                        active || complete
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {stepNumber}
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

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-6">
            {currentStep === 1 ? (
              <JobDescriptionStep
                value={jobDescription}
                onChange={setJobDescription}
                detection={detection}
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
                allFocusAreas={focusAreaOptions}
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
                onStart={() => router.push("/interview/mock-session/session")}
              />
            ) : null}
          </div>

          <aside className="space-y-4 rounded-[28px] border border-border bg-card p-5 lg:sticky lg:top-6 lg:h-fit">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <WandSparkles className="size-4" />
              Live setup preview
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-border bg-background p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Detected role
                </p>
                <p className="mt-2 text-base font-medium text-foreground">
                  {detection?.role ?? "Waiting for job description"}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {detection?.company ?? "Company will appear here"}
                </p>
              </div>

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
            <Button className="h-11 rounded-2xl px-5" onClick={nextStep}>
              Continue
              <ArrowRight className="ml-2 size-4" />
            </Button>
          ) : null}
        </div>
      </div>
    </main>
  );
}
