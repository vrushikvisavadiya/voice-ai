"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Mic,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const smoothEase = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: smoothEase },
  },
};

/* ─── Mini dashboard card ───────────────────────────────────────── */
function DashboardPreview() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 100,
    damping: 16,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 100,
    damping: 16,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 48, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.55, ease: smoothEase }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="relative mx-auto mt-14 w-full max-w-4xl will-change-transform"
    >
      {/* Glow behind card */}
      <div className="pointer-events-none absolute -inset-px rounded-[2rem] bg-gradient-to-b from-primary/20 via-primary/8 to-transparent blur-2xl" />

      {/* Main card */}
      <div className="relative overflow-hidden rounded-[1.75rem] border border-border/60 bg-background/90 shadow-[0_48px_120px_-40px_rgba(0,0,0,0.30)] backdrop-blur-xl">
        {/* Top chrome bar */}
        <div className="flex items-center justify-between border-b border-border/40 bg-muted/30 px-5 py-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="size-2.5 rounded-full bg-red-400/90" />
              <div className="size-2.5 rounded-full bg-amber-400/90" />
              <div className="size-2.5 rounded-full bg-emerald-400/90" />
            </div>
            <span className="ml-2 text-xs text-muted-foreground/70">
              VoiceCoach AI — Interview Session
            </span>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-red-500/10 px-2.5 py-0.5 text-xs font-medium text-red-500">
            <span className="size-1.5 animate-pulse rounded-full bg-red-500" />
            REC · 04:18
          </span>
        </div>

        {/* Body */}
        <div className="grid gap-0 md:grid-cols-[1fr_280px]">
          {/* Left: interview panel */}
          <div className="border-r border-border/40 p-6">
            {/* Question bubble */}
            <div className="rounded-2xl border border-border/50 bg-muted/50 p-4">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                AI Interviewer · Q3 of 8
              </p>
              <p className="text-sm font-medium leading-6 text-foreground">
                Describe a time you made a critical product decision with
                incomplete data. What was your process?
              </p>
            </div>

            {/* Waveform */}
            <div className="mt-4 flex items-center gap-2.5 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary shadow-[0_6px_18px_-6px_rgba(0,0,0,0.35)]">
                <Mic className="size-4 text-primary-foreground" />
              </div>
              <div className="flex flex-1 items-center gap-[2px] overflow-hidden">
                {Array.from({ length: 48 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-full bg-primary/50"
                    animate={{
                      scaleY: [0.25, Math.random() * 0.75 + 0.4, 0.25],
                    }}
                    transition={{
                      duration: 0.7 + Math.random() * 0.6,
                      repeat: Infinity,
                      delay: i * 0.035,
                      ease: "easeInOut",
                    }}
                    style={{ height: 18, transformOrigin: "center" }}
                  />
                ))}
              </div>
              <span className="ml-1 shrink-0 text-xs tabular-nums text-muted-foreground">
                0:47
              </span>
            </div>

            {/* Score row */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { label: "Clarity", score: 88, cls: "text-emerald-500" },
                { label: "Structure", score: 74, cls: "text-primary" },
                { label: "Confidence", score: 92, cls: "text-amber-500" },
              ].map(({ label, score, cls }) => (
                <div
                  key={label}
                  className="rounded-xl border border-border/50 bg-card p-3 text-center"
                >
                  <p className={cn("text-xl font-semibold", cls)}>{score}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* Transcript snippet */}
            <div className="mt-4 rounded-xl border border-border/40 bg-muted/30 p-3">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Live transcript
              </p>
              <p className="mt-1.5 text-xs leading-5 text-foreground/75">
                "When our analytics were unavailable three days before launch, I
                pivoted to rapid user interviews and heatmap data — and we
                shipped on time with 94% confidence..."
              </p>
            </div>
          </div>

          {/* Right: sidebar stats */}
          <div className="hidden flex-col gap-4 p-5 md:flex">
            {/* Score trend */}
            <div>
              <p className="mb-3 text-xs font-semibold text-muted-foreground">
                Session score
              </p>
              <div className="flex items-end gap-1.5">
                {[42, 55, 50, 70, 65, 80, 88].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 overflow-hidden rounded-sm bg-primary/15"
                    style={{ height: 52 }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{
                      delay: 0.7 + i * 0.06,
                      duration: 0.5,
                      ease: smoothEase,
                    }}
                  >
                    <div
                      className="w-full rounded-sm bg-gradient-to-t from-primary to-primary/60"
                      style={{ height: `${h}%`, marginTop: "auto" }}
                    />
                  </motion.div>
                ))}
              </div>
              <p className="mt-2 text-xs text-emerald-500">+28 pts this week</p>
            </div>

            {/* Recent sessions */}
            <div className="border-t border-border/40 pt-4">
              <p className="mb-3 text-xs font-semibold text-muted-foreground">
                Recent sessions
              </p>
              <div className="space-y-2.5">
                {[
                  { role: "PM @ Google", score: 88, pass: true },
                  { role: "Designer @ Stripe", score: 76, pass: true },
                  { role: "SWE @ Amazon", score: 61, pass: false },
                ].map(({ role, score, pass }) => (
                  <div
                    key={role}
                    className="flex items-center justify-between rounded-xl border border-border/40 bg-muted/30 px-3 py-2"
                  >
                    <div>
                      <p className="text-[11px] font-medium text-foreground">
                        {role}
                      </p>
                      <p
                        className={cn(
                          "text-[10px]",
                          pass ? "text-emerald-500" : "text-red-400",
                        )}
                      >
                        {pass ? "Passed" : "Needs work"}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "text-sm font-semibold",
                        pass ? "text-emerald-500" : "text-muted-foreground",
                      )}
                    >
                      {score}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Completion badge */}
            <div className="mt-auto flex items-center gap-2.5 rounded-xl border border-emerald-200/60 bg-emerald-50/60 p-3 dark:border-emerald-500/20 dark:bg-emerald-500/8">
              <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
              <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                Interview ready — Google PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Hero Section ──────────────────────────────────────────────── */
export function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center overflow-hidden px-4 pb-16 pt-28 text-center md:px-6 md:pt-36">
      {/* Background gradient — subtle lavender like the reference image */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-0 -z-10 bg-[radial-gradient(ellipse_90%_60%_at_50%_100%,color-mix(in_oklch,var(--primary)_12%,transparent),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60%] bg-[radial-gradient(ellipse_70%_50%_at_50%_-5%,color-mix(in_oklch,var(--primary)_10%,transparent),transparent)]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex w-full max-w-4xl flex-col items-center"
      >
        {/* Badge */}
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-4 py-2 text-xs font-medium text-foreground/80 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.12)] backdrop-blur-sm">
            <Sparkles className="size-3.5 text-primary" />
            AI Powered Interview Coach
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="mt-7 font-display text-5xl font-bold leading-[1.04] tracking-[-0.04em] text-foreground sm:text-6xl md:text-7xl lg:text-[80px]"
        >
          The AI Interview Coach for{" "}
          <span className="bg-gradient-to-r from-primary via-[oklch(0.60_0.24_290)] to-[oklch(0.70_0.20_320)] bg-clip-text text-transparent">
            High-Growth
          </span>{" "}
          Careers.
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          variants={itemVariants}
          className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground md:text-[1.15rem] md:leading-8"
        >
          Practice realistic mock interviews with AI. Get instant feedback on
          clarity, structure, and confidence — from the exact job description
          you pasted — before your real conversation starts.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Button
            asChild
            size="lg"
            className="h-[50px] rounded-xl px-7 text-[15px] font-semibold shadow-[0_8px_30px_-8px_rgba(0,0,0,0.35)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_14px_40px_-10px_rgba(0,0,0,0.40)]"
          >
            <Link href="/signup">
              Start free trial
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-[50px] rounded-xl border-border/70 bg-background/80 px-7 text-[15px] font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:bg-background"
          >
            <Link href="#how-it-works">
              <Calendar className="mr-2 size-4 text-primary" />
              Book a Demo
            </Link>
          </Button>
        </motion.div>

        {/* Trust note */}
        <motion.p
          variants={itemVariants}
          className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground/70"
        >
          <CheckCircle2 className="size-3.5 text-emerald-500" />
          No credit card required
        </motion.p>
      </motion.div>

      {/* Dashboard preview */}
      {/* <DashboardPreview /> */}
    </section>
  );
}
