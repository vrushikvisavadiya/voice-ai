import { Mic, FileText, BarChart3 } from "lucide-react";
import { AnimatedSection } from "@/components/marketing/animated-section";

const steps = [
  {
    title: "Paste the job description",
    description:
      "Start with the exact role you want so the practice feels specific, not generic.",
    icon: FileText,
  },
  {
    title: "Take a voice interview",
    description:
      "Answer naturally in a guided voice session that feels closer to the real thing.",
    icon: Mic,
  },
  {
    title: "Review scores and coaching",
    description:
      "See what improved, where you hesitated, and how to tighten your next answer.",
    icon: BarChart3,
  },
];

export function HowItWorksSection() {
  return (
    <AnimatedSection id="how-it-works" className="px-4 py-10 md:px-6 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">How it works</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
            A cleaner way to prepare for the interview that matters
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">
            Train with a workflow that starts from the actual role, not a
            generic question bank.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="group rounded-[1.75rem] border border-border/60 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground md:text-base">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
