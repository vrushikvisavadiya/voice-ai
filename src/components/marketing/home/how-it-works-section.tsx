"use client";

import { motion, type Variants } from "framer-motion";
import { BriefcaseBusiness, FileText, Mic, Sparkles } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: smoothEase },
  },
};

const steps = [
  {
    step: "01",
    title: "Paste the job description",
    description:
      "Start with the exact role you are preparing for. The AI reads the description and generates highly relevant questions matched to the company, role, and seniority level.",
    icon: FileText,
  },
  {
    step: "02",
    title: "Choose your interview style",
    description:
      "Pick the interview type — behavioral, technical, case, or culture fit. Set difficulty, number of rounds, and coaching focus to match your preparation goals.",
    icon: BriefcaseBusiness,
  },
  {
    step: "03",
    title: "Practice with voice",
    description:
      "Answer out loud in a realistic mock session. The AI listens, transcribes, and analyzes your delivery in real time, just like a real interviewer would.",
    icon: Mic,
  },
  {
    step: "04",
    title: "Review your feedback",
    description:
      "Get scored on clarity, structure, and confidence. See exactly where your answers improved and receive specific coaching notes to sharpen every response.",
    icon: Sparkles,
  },
];

function StepCard({
  step,
  title,
  description,
  icon: Icon,
  className = "",
}: (typeof steps)[0] & { className?: string }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -6, transition: { duration: 0.22, ease: smoothEase } }}
      className={`group relative overflow-hidden rounded-[1.75rem] border border-border/60 bg-card p-6 shadow-[0_18px_50px_-28px_rgba(0,0,0,0.12)] transition-shadow hover:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.18)] ${className}`}
    >
      {/* Step icon */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="size-5" />
        </div>
        <span className="font-mono text-sm font-medium text-muted-foreground/50">
          {step}
        </span>
      </div>

      <h3 className="mt-7 font-display text-xl font-semibold leading-tight tracking-[-0.025em] text-foreground">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        {description}
      </p>
    </motion.div>
  );
}

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
              How it works
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-foreground sm:text-5xl">
              Simple, transparent pricing for every stage.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground md:text-lg">
              Get interview-ready in a focused step-by-step flow — from adding a
              job description to practicing live and reviewing your personalized
              feedback.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <StepCard
                key={step.step}
                {...step}
                className={i % 2 === 1 ? "sm:mt-12" : ""}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
