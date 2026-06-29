"use client";

import { motion, type Variants } from "framer-motion";
import {
  BarChart3,
  Brain,
  FileText,
  Mic,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
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

const features = [
  {
    icon: FileText,
    title: "Role-specific questions",
    description:
      "Paste any job description and instantly get tailored interview questions that reflect the actual role, responsibilities, and expected skills.",
    size: "large",
    accent: "primary",
  },
  {
    icon: Mic,
    title: "Voice-first practice",
    description:
      "Answer out loud in a realistic session that mimics a real interview conversation. No typing, just speaking.",
    size: "small",
    accent: "emerald",
  },
  {
    icon: Brain,
    title: "AI-driven feedback",
    description:
      "Receive structured coaching on clarity, structure, pacing, and filler words after every answer.",
    size: "small",
    accent: "primary",
  },
  {
    icon: BarChart3,
    title: "Score reports & trends",
    description:
      "Track how your performance evolves over time. Identify which competencies need the most work.",
    size: "large",
    accent: "amber",
  },
  {
    icon: Target,
    title: "STAR framework coaching",
    description:
      "The AI guides you to structure answers using proven frameworks, making every story land effectively.",
    size: "small",
    accent: "primary",
  },
  {
    icon: Zap,
    title: "Instant replay & review",
    description:
      "Re-read full transcripts, hear playback, and compare answers across sessions to measure your growth.",
    size: "small",
    accent: "emerald",
  },
];

function FeatureCard({
  icon: Icon,
  title,
  description,
  size,
  accent,
  index,
}: (typeof features)[0] & { index: number }) {
  const isLarge = size === "large";

  const iconBg =
    accent === "primary"
      ? "bg-primary/10 text-primary"
      : accent === "emerald"
        ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400"
        : "bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400";

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -6, transition: { duration: 0.22, ease: smoothEase } }}
      className={`group relative overflow-hidden rounded-[1.75rem] border border-border/60 bg-card p-6 shadow-[0_18px_50px_-28px_rgba(0,0,0,0.12)] transition-shadow hover:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.18)] ${isLarge ? "md:col-span-2" : ""}`}
    >
      {/* Subtle glow on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(var(--primary-rgb),0.04),transparent_60%)]" />
      </div>

      <div
        className={`flex size-12 items-center justify-center rounded-2xl ${iconBg}`}
      >
        <Icon className="size-5" />
      </div>

      <h3 className="mt-6 font-display text-xl font-semibold leading-tight tracking-[-0.025em] text-foreground">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        {description}
      </p>

      {isLarge && (
        <div className="mt-6 flex items-center gap-2 text-xs font-medium text-primary">
          <Sparkles className="size-3.5" />
          AI-powered insights
        </div>
      )}
    </motion.div>
  );
}

export function FeatureGridSection() {
  return (
    <section id="features" className="px-4 py-16 md:px-6 md:py-24">
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
              Everything you need
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-foreground sm:text-5xl">
              Turn outbound prep into
              <br />
              a reliable system.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground md:text-lg">
              Every tool you need to go from anxious to confident — before the
              real interview starts.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.slice(0, 4).map((feature, i) => (
              <FeatureCard key={feature.title} {...feature} index={i} />
            ))}
          </div>
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            {features.slice(4).map((feature, i) => (
              <FeatureCard key={feature.title} {...feature} index={i + 4} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
