"use client";

import { motion, type Variants } from "framer-motion";
import { BriefcaseBusiness, FileText, Mic, Sparkles } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(8px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: smoothEase,
    },
  },
};

const steps = [
  {
    step: "Step 1",
    title: "Paste the job description",
    description:
      "Start with the exact role you are preparing for so the interview feels relevant from the first question.",
    icon: FileText,
  },
  {
    step: "Step 2",
    title: "Choose your interview style",
    description:
      "Pick the role focus, difficulty, and coaching direction that matches your interview goals.",
    icon: BriefcaseBusiness,
  },
  {
    step: "Step 3",
    title: "Practice with voice",
    description:
      "Answer out loud in a realistic mock session designed to feel closer to a real interview conversation.",
    icon: Mic,
  },
  {
    step: "Step 4",
    title: "Review your feedback",
    description:
      "See where your clarity, structure, and confidence improved, and what to sharpen next.",
    icon: Sparkles,
  },
];

function StepCard({
  step,
  title,
  description,
  icon: Icon,
  className = "",
}: {
  step: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
}) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{
        y: -6,
        transition: {
          duration: 0.25,
          ease: smoothEase,
        },
      }}
      className={`rounded-[1.75rem] border border-border/60 bg-background/90 p-5 shadow-[0_18px_50px_-28px_rgba(0,0,0,0.16)] backdrop-blur-sm ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-400 text-white shadow-[0_14px_30px_-14px_rgba(124,58,237,0.45)]">
          <Icon className="size-5" />
        </div>
        <span className="text-sm text-muted-foreground">{step}</span>
      </div>

      <h3 className="mt-8 max-w-[14ch] font-display text-2xl font-semibold leading-tight tracking-[-0.03em] text-foreground">
        {title}
      </h3>

      <p className="mt-3 max-w-[28ch] text-sm leading-6 text-muted-foreground md:text-[15px]">
        {description}
      </p>
    </motion.div>
  );
}

export function HowItWorksSection() {
  return (
    <section className="px-4 pb-12 pt-8 md:px-6 md:pb-20 md:pt-12">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.4rem] md:px-10 md:py-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="relative grid items-start gap-10 xl:grid-cols-[1.05fr_0.95fr]"
          >
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] xl:grid-cols-1">
              <div>
                <motion.p
                  variants={itemVariants}
                  className="text-sm font-medium uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400"
                >
                  How it works
                </motion.p>

                <motion.h2
                  variants={itemVariants}
                  className="mt-4 max-w-[12ch] font-display text-4xl font-semibold leading-[1] tracking-[-0.04em] text-foreground sm:text-5xl md:text-6xl"
                >
                  Simple process. Powerful results.
                </motion.h2>

                <motion.p
                  variants={itemVariants}
                  className="mt-5 max-w-xl text-base leading-7 text-muted-foreground md:text-lg"
                >
                  Get interview-ready in a focused step-by-step flow — from
                  adding a job description to practicing live and reviewing your
                  personalized feedback.
                </motion.p>
              </div>

              <motion.div
                variants={itemVariants}
                className="relative flex min-h-[320px] items-end overflow-hidden rounded-[2rem] border border-border/50 bg-background/70 p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.14)]"
              >
                {/* <div className="pointer-events-none absolute -left-12 bottom-10 h-48 w-48 rounded-full border-[18px] border-emerald-300/60" />
                <div className="pointer-events-none absolute -left-4 bottom-16 h-32 w-32 rounded-full border-[14px] border-emerald-200/70" />

                <div className="relative z-10 flex h-full w-full items-center justify-center rounded-[1.5rem] border border-dashed border-border/60 bg-muted/30">
                  <div className="px-6 text-center">
                    <p className="font-display text-2xl font-semibold tracking-tight text-foreground">
                      Add your image here
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Replace this placeholder with your custom visual, product
                      illustration, or candidate image.
                    </p>
                  </div>
                </div> */}
              </motion.div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <StepCard {...steps[0]} />
              <StepCard {...steps[2]} className="md:mt-14" />
              <StepCard {...steps[1]} />
              <StepCard {...steps[3]} className="md:mt-6" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
