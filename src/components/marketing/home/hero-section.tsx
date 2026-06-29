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

    </section>
  );
}
