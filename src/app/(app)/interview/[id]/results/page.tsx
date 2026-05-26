import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

const skills = [
  {
    label: "Communication",
    value: 88,
    description: "Clear, steady delivery with good pacing and explanation.",
  },
  {
    label: "Technical depth",
    value: 82,
    description:
      "Strong implementation thinking with room for deeper trade-off framing.",
  },
  {
    label: "Problem solving",
    value: 85,
    description: "Good reasoning and solid decision-making under ambiguity.",
  },
  {
    label: "Structure",
    value: 76,
    description: "Examples were relevant, but storytelling can be tighter.",
  },
];

const strengths = [
  "Explained frontend performance decisions clearly and tied them to user impact.",
  "Showed strong familiarity with React, TypeScript, and architecture trade-offs.",
  "Used concrete examples instead of generic interview language.",
];

const improvements = [
  "Make outcomes more measurable by including before-and-after impact where possible.",
  "Use a tighter Situation → Action → Result structure in behavioral responses.",
  "Go one layer deeper when explaining technical trade-offs and constraints.",
];

const questionBreakdown = [
  {
    question:
      "Tell me about a frontend project where you improved performance for real users.",
    score: 89,
    feedback:
      "Strong example with clear ownership and practical reasoning. It would be even stronger with a quantified result.",
  },
  {
    question:
      "How do you decide when a component should stay generic versus product-specific?",
    score: 84,
    feedback:
      "Good product sense and technical judgment. A clearer decision framework would improve confidence.",
  },
  {
    question:
      "Describe a time you had to explain a technical trade-off to a non-technical stakeholder.",
    score: 78,
    feedback:
      "Solid communication overall, but the answer could connect more strongly to business context and stakeholder needs.",
  },
];

function getScoreTone(score: number) {
  if (score >= 85) return "text-success";
  if (score >= 75) return "text-warning-foreground";
  return "text-destructive";
}

function getScoreBadge(score: number) {
  if (score >= 85) return "Excellent";
  if (score >= 75) return "Strong";
  return "Needs work";
}

function getScoreSurface(score: number) {
  if (score >= 85) return "border-success/20 bg-success/10";
  if (score >= 75) return "border-warning/20 bg-warning/10";
  return "border-destructive/20 bg-destructive/10";
}

export default function InterviewResultsPage() {
  const overallScore = 84;

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <Badge
              variant="secondary"
              className="w-fit rounded-full px-3 py-1 text-xs uppercase tracking-[0.16em]"
            >
              Interview results
            </Badge>

            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Senior Frontend Engineer · Acme Labs
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                Your interview report highlights readiness, skill-level signals,
                and the most important coaching areas for the next round.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline" className="h-11 rounded-2xl px-4">
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 size-4" />
                Back to dashboard
              </Link>
            </Button>

            <Button asChild className="h-11 rounded-2xl px-5">
              <Link href="/interview/new">
                Start another interview
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[32px] border border-border bg-card p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Overall readiness
                </p>
                <div className="flex items-end gap-4">
                  <div className="text-6xl font-semibold tracking-tight text-foreground tabular-nums">
                    {overallScore}
                  </div>
                  <div
                    className={`mb-2 rounded-full border px-3 py-1 text-sm font-medium ${getScoreSurface(
                      overallScore,
                    )} ${getScoreTone(overallScore)}`}
                  >
                    {getScoreBadge(overallScore)}
                  </div>
                </div>
                <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                  You showed strong frontend reasoning, clear communication, and
                  practical product awareness. Your answers were credible and
                  relevant, with the biggest improvement opportunity in answer
                  structure and measurable impact.
                </p>
              </div>

              <div className="flex size-28 items-center justify-center rounded-full border border-primary/20 bg-primary/5">
                <TrendingUp className="size-10 text-primary" />
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-border bg-card p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              <h2 className="text-lg font-semibold tracking-tight text-foreground">
                AI recommendation
              </h2>
            </div>

            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4">
                <p className="text-sm font-medium text-foreground">
                  Best next practice focus
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Do one more mock session focused only on behavioral and
                  communication prompts, and aim to answer with a tighter
                  Situation, Action, and Result flow.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background p-4">
                <p className="text-sm font-medium text-foreground">
                  Hiring signal
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  You are trending toward a strong pass for frontend-focused
                  roles, especially where product thinking and implementation
                  clarity matter.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {skills.map((skill) => (
            <div
              key={skill.label}
              className="rounded-3xl border border-border bg-card p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm text-muted-foreground">{skill.label}</p>
                <div
                  className={`rounded-full border px-3 py-1 text-xs font-medium ${getScoreSurface(
                    skill.value,
                  )} ${getScoreTone(skill.value)}`}
                >
                  {skill.value}
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {skill.description}
              </p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-[32px] border border-border bg-card p-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-success" />
              <h2 className="text-lg font-semibold tracking-tight text-foreground">
                What went well
              </h2>
            </div>

            <div className="mt-5 space-y-3">
              {strengths.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-border bg-background p-4 text-sm leading-6 text-muted-foreground"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-border bg-card p-6">
            <div className="flex items-center gap-2">
              <CircleAlert className="size-4 text-warning-foreground" />
              <h2 className="text-lg font-semibold tracking-tight text-foreground">
                What to improve
              </h2>
            </div>

            <div className="mt-5 space-y-3">
              {improvements.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-border bg-background p-4 text-sm leading-6 text-muted-foreground"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-border bg-card p-6">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Question breakdown
          </h2>

          <div className="mt-5 space-y-4">
            {questionBreakdown.map((item, index) => (
              <div
                key={item.question}
                className="rounded-2xl border border-border bg-background p-4 sm:p-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      Question {index + 1}
                    </p>
                    <h3 className="text-sm font-medium leading-6 text-foreground sm:text-base">
                      {item.question}
                    </h3>
                  </div>

                  <div
                    className={`w-fit rounded-full border px-3 py-1 text-sm font-medium tabular-nums ${getScoreSurface(
                      item.score,
                    )} ${getScoreTone(item.score)}`}
                  >
                    {item.score}/100
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {item.feedback}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
