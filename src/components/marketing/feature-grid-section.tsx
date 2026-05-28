import { BrainCircuit, Radar, Sparkles, WandSparkles } from "lucide-react";
import { AnimatedSection } from "@/components/marketing/animated-section";

const items = [
  {
    title: "Role-specific question generation",
    description:
      "Turn each job description into a more relevant mock interview with sharper prompts.",
    icon: BrainCircuit,
  },
  {
    title: "Voice-first interview flow",
    description:
      "Practice out loud so timing, tone, structure, and confidence all improve together.",
    icon: Sparkles,
  },
  {
    title: "Structured score breakdowns",
    description:
      "Measure clarity, confidence, structure, and role readiness after every session.",
    icon: Radar,
  },
  {
    title: "Actionable coaching notes",
    description:
      "Get concise guidance you can apply immediately before the next attempt.",
    icon: WandSparkles,
  },
];

export function FeatureGridSection() {
  return (
    <AnimatedSection
      id="features"
      className="px-4 py-10 md:px-6 md:py-16"
      delay={0.08}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-[1.8rem] border border-border/60 bg-card/80 p-7 shadow-sm backdrop-blur"
              >
                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
