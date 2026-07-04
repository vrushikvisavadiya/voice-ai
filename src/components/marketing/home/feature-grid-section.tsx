"use client";

import { useRef, useState, useCallback } from "react";
import { motion, type Variants } from "framer-motion";
import {
  BarChart3,
  Brain,
  FileText,
  Mic,
  Sparkles,
  Target,
  Zap,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const smoothEase = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: smoothEase },
  },
};

// Static waveform heights — no Math.random in render
const WAVEFORM_MINI = [14, 22, 18, 28, 20, 32, 24, 18, 26, 16, 22, 30, 18, 24];
const WAVEFORM_DARK = [
  8, 14, 10, 18, 12, 20, 15, 11, 17, 9, 14, 19, 11, 15, 8, 13, 10, 16, 12, 18,
  14, 10, 16, 8, 13, 18, 11, 14,
];

/* ── Cursor-tracked glowing border card ───────────────────────── */
function GlowCard({
  children,
  className,
  darkBg = false,
}: {
  children: React.ReactNode;
  className?: string;
  darkBg?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn("group relative rounded-[1.75rem] p-[1px]", className)}
      style={{
        background: hovered
          ? `radial-gradient(300px circle at ${pos.x}px ${pos.y}px, color-mix(in oklch, var(--primary) 55%, transparent), transparent 70%)`
          : darkBg
            ? "oklch(0.3 0.01 255 / 0.4)"
            : "oklch(0.9 0.007 255 / 0.6)",
      }}
    >
      {/* Inner card */}
      <div
        className={cn(
          "relative h-full w-full overflow-hidden rounded-[calc(1.75rem-1px)]",
          darkBg ? "bg-neutral-950" : "bg-card",
        )}
      >
        {children}
      </div>
    </motion.div>
  );
}

/* ── Mini waveform ─────────────────────────────────────────────── */
function MiniWaveform() {
  return (
    <div className="flex items-end gap-[3px]">
      {WAVEFORM_MINI.map((h, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full bg-primary/60"
          animate={{ scaleY: [0.4, 1, 0.4] }}
          transition={{
            duration: 0.9 + i * 0.07,
            repeat: Infinity,
            delay: i * 0.05,
            ease: "easeInOut",
          }}
          style={{ height: h, transformOrigin: "bottom" }}
        />
      ))}
    </div>
  );
}

/* ── Score pill ────────────────────────────────────────────────── */
function ScorePill({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-border/50 bg-background/60 px-4 py-3">
      <span className={cn("text-2xl font-bold tabular-nums", color)}>
        {value}
      </span>
      <span className="mt-0.5 text-[11px] text-muted-foreground">{label}</span>
    </div>
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
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* ── Section header ── */}
          <motion.div
            variants={itemVariants}
            className="mb-12 grid grid-cols-1 items-end gap-6 md:grid-cols-2"
          >
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-xs font-medium text-primary">
                <Zap className="size-3" />
                The Platform
              </span>
              <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-foreground sm:text-5xl md:text-[3.25rem]">
                Turn interview prep into
                <br />
                <span className="bg-gradient-to-r from-primary via-[oklch(0.60_0.24_290)] to-[oklch(0.70_0.20_320)] bg-clip-text text-transparent">
                  a reliable system.
                </span>
              </h2>
            </div>
            <div className="md:pb-2 md:pl-8">
              <p className="text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
                VoiceCoach AI brings every part of interview preparation
                together — from question generation to real-time feedback — so
                you can practice with clarity and land with confidence.
              </p>
            </div>
          </motion.div>

          {/* ── Row 1: text card + voice card ── */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
            {/* Card 1 — Role-specific (5 cols) */}
            <GlowCard className="md:col-span-5">
              <div className="p-7">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10">
                  <FileText className="size-5 text-primary" />
                </div>
                <h3 className="mt-7 font-display text-2xl font-semibold leading-tight tracking-[-0.03em] text-foreground">
                  Role-specific questions.
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Paste any job description and instantly get tailored interview
                  questions that reflect the actual role, responsibilities, and
                  expected skills.
                </p>
                <div className="mt-6 flex items-center gap-1.5 text-xs font-medium text-primary">
                  <Sparkles className="size-3.5" />
                  Powered by GPT-4o
                </div>
                {/* JD paste mockup */}
                <div className="mt-6 overflow-hidden rounded-2xl border border-border/50 bg-muted/40">
                  <div className="border-b border-border/40 bg-muted/60 px-4 py-2">
                    <p className="text-[11px] font-medium text-muted-foreground">
                      Job Description
                    </p>
                  </div>
                  <div className="space-y-2 p-4">
                    {[
                      "Senior Product Manager @ Stripe",
                      "5+ yrs experience required",
                      "Own roadmap, drive 0→1 features",
                    ].map((line, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div
                          className={cn(
                            "size-1.5 shrink-0 rounded-full",
                            i === 0 ? "bg-primary" : "bg-border",
                          )}
                        />
                        <p className="text-xs text-muted-foreground">{line}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </GlowCard>

            {/* Card 2 — Voice practice (7 cols) */}
            <GlowCard className="md:col-span-7">
              <div className="p-7">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-500/15">
                  <Mic className="size-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="mt-7 font-display text-2xl font-semibold leading-tight tracking-[-0.03em] text-foreground">
                  Voice-first practice.
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Answer out loud in a realistic session that mimics a real
                  interview. No typing — just speaking, like the real thing.
                </p>
                {/* Live waveform */}
                <div className="mt-7 flex items-center gap-4 rounded-2xl border border-primary/15 bg-primary/5 px-5 py-4">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary shadow-[0_4px_14px_-4px_rgba(0,0,0,0.3)]">
                    <Mic className="size-4 text-primary-foreground" />
                  </div>
                  <MiniWaveform />
                  <span className="ml-auto shrink-0 rounded-full bg-red-500/10 px-2.5 py-0.5 text-[11px] font-medium text-red-500">
                    ● Live
                  </span>
                </div>
                {/* Screenshot */}
                <div className="mt-5 overflow-hidden rounded-2xl border border-border/50">
                  <img
                    src="https://pplx-res.cloudinary.com/image/upload/pplx_search_images/c0af30b7fe18c327067dad0be1621f9e03342c14.jpg"
                    alt="Analytics dashboard"
                    className="h-40 w-full object-cover object-top"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </GlowCard>
          </div>

          {/* ── Row 2: screenshot + AI feedback ── */}
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-12">
            {/* Card 3 — Score reports (7 cols) */}
            <GlowCard className="md:col-span-7">
              <div className="p-7">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-500/15">
                  <BarChart3 className="size-5 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold leading-tight tracking-[-0.03em] text-foreground">
                  Score reports & trends.
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Track how your performance evolves. See which competencies
                  need work and watch your scores climb session by session.
                </p>
                {/* Score pills */}
                <div className="mt-6 flex gap-3">
                  <ScorePill
                    label="Clarity"
                    value={88}
                    color="text-emerald-500"
                  />
                  <ScorePill
                    label="Structure"
                    value={74}
                    color="text-primary"
                  />
                  <ScorePill
                    label="Confidence"
                    value={92}
                    color="text-amber-500"
                  />
                  {/* Trend bars */}
                  <div className="flex flex-1 flex-col justify-between rounded-2xl border border-border/50 bg-background/60 p-3">
                    <div className="flex items-end gap-[3px]">
                      {[42, 55, 50, 70, 65, 80, 88].map((h, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 rounded-sm bg-primary/20"
                          style={{ height: 36 }}
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: 0.3 + i * 0.06,
                            duration: 0.5,
                            ease: smoothEase,
                          }}
                        >
                          <div
                            className="w-full rounded-sm bg-gradient-to-t from-primary to-primary/50"
                            style={{ height: `${h}%`, marginTop: "auto" }}
                          />
                        </motion.div>
                      ))}
                    </div>
                    <p className="mt-1.5 text-[10px] font-medium text-emerald-500">
                      +28 pts this week
                    </p>
                  </div>
                </div>
              </div>
            </GlowCard>

            {/* Card 4 — AI feedback (5 cols) */}
            <GlowCard className="md:col-span-5">
              <div className="p-7">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10">
                  <Brain className="size-5 text-primary" />
                </div>
                <h3 className="mt-7 font-display text-2xl font-semibold leading-tight tracking-[-0.03em] text-foreground">
                  AI-driven feedback.
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Structured coaching on clarity, structure, pacing, and filler
                  words — delivered instantly after every answer.
                </p>
                {/* Feedback chips */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    { label: "Too many fillers", good: false },
                    { label: "Strong opening", good: true },
                    { label: "Add more data", good: false },
                    { label: "Clear structure", good: true },
                    { label: "STAR aligned ✓", good: true },
                  ].map(({ label, good }) => (
                    <span
                      key={label}
                      className={cn(
                        "rounded-full border px-3 py-1 text-[11px] font-medium",
                        good
                          ? "border-emerald-200/60 bg-emerald-50/60 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : "border-amber-200/60 bg-amber-50/60 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400",
                      )}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </GlowCard>
          </div>

          {/* ── Row 3: dark full-width card ── */}
          <GlowCard className="mt-4" darkBg>
            <div className="relative overflow-hidden p-8 md:p-10">
              {/* Background glows */}
              <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--primary)_25%,transparent),transparent_65%)] blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 left-16 size-64 rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--primary)_15%,transparent),transparent_65%)] blur-3xl" />

              <div className="relative grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
                {/* Left */}
                <div>
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-white/10">
                    <Target className="size-5 text-white" />
                  </div>
                  <h3 className="mt-7 font-display text-3xl font-bold leading-tight tracking-[-0.035em] text-white md:text-4xl">
                    Scale your prep without the complexity.
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/60 md:text-base">
                    Build a structured practice flow and keep everything
                    organised as you work through hundreds of questions across
                    multiple target companies.
                  </p>
                  <div className="mt-7 flex items-center gap-3">
                    <button className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/20">
                      <Sparkles className="size-4" />
                      Start practicing
                    </button>
                    <button className="flex size-10 items-center justify-center rounded-xl bg-white/10 text-white transition-all hover:bg-white/20">
                      <ArrowUpRight className="size-4" />
                    </button>
                  </div>
                </div>

                {/* Right: session UI */}
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <div className="mb-4 flex gap-1.5">
                    <div className="size-2.5 rounded-full bg-red-400/70" />
                    <div className="size-2.5 rounded-full bg-amber-400/70" />
                    <div className="size-2.5 rounded-full bg-emerald-400/70" />
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
                      Q4 of 8 · Product Manager
                    </p>
                    <p className="mt-2 text-sm font-medium leading-6 text-white/80">
                      Walk me through how you prioritise features when
                      engineering bandwidth is limited.
                    </p>
                  </div>
                  {/* Waveform — static heights */}
                  <div className="mt-3 flex items-center gap-3 rounded-xl border border-primary/25 bg-primary/10 px-4 py-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary">
                      <Mic className="size-3.5 text-primary-foreground" />
                    </div>
                    <div className="flex flex-1 items-end gap-[2px]">
                      {WAVEFORM_DARK.map((h, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 rounded-full bg-primary/60"
                          animate={{ scaleY: [0.2, h / 20, 0.2] }}
                          transition={{
                            duration: 0.8 + (i % 5) * 0.1,
                            repeat: Infinity,
                            delay: i * 0.04,
                            ease: "easeInOut",
                          }}
                          style={{ height: 16, transformOrigin: "center" }}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] tabular-nums text-white/40">
                      1:12
                    </span>
                  </div>
                  {/* STAR chips */}
                  <div className="mt-3 flex gap-2">
                    {["Situation", "Task", "Action", "Result"].map((s, i) => (
                      <span
                        key={s}
                        className={cn(
                          "flex-1 rounded-lg py-1.5 text-center text-[10px] font-semibold",
                          i < 3
                            ? "bg-primary/20 text-primary"
                            : "border border-white/10 bg-white/5 text-white/30",
                        )}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </GlowCard>
        </motion.div>
      </div>
    </section>
  );
}
