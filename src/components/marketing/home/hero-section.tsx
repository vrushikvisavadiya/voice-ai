"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Play, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { SplitCtaButton } from "@/components/ui/split-cta-button";

const smoothEase = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
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

// Avatar photos for social proof
const avatars = [
  {
    name: "Alex",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    name: "Sarah",
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  },
  {
    name: "Marcus",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    name: "Elena",
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
  },
  {
    name: "David",
    url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  },
];

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative isolate flex flex-col items-center justify-center overflow-hidden px-4 pb-20 pt-32 text-center md:px-6 md:pb-28 md:pt-40 lg:pb-32 lg:pt-44">
      {/* ── Background Aurora (Commented out per user request) ── */}
      {/*
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-45 dark:opacity-35 transition-opacity duration-500">
        <Aurora colorStops={["#3b82f6", "#60a5fa", "#93c5fd"]} blend={0.5} amplitude={0.9} speed={0.8} />
      </div>
      */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex w-full flex-col items-center"
      >
        {/* ── Top Split Pill Badge ── */}
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center rounded-full border border-border/70 bg-background/90 p-1 text-xs md:text-sm font-medium shadow-sm backdrop-blur-md">
            <span className="flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1 text-primary-foreground font-bold">
              <TrendingUp className="size-3.5" />
              Train with AI.
            </span>
            <span className="px-3.5 py-1 text-muted-foreground font-medium">
              Perform <strong className="font-bold text-foreground">4× better</strong> in real interviews.
            </span>
          </div>
        </motion.div>

        {/* ── Main Headline ── */}
        <motion.h1
          variants={itemVariants}
          className="mt-8 font-display text-4xl font-black leading-[1.08] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-[76px]"
        >
          Develop Job-Ready Talent <br className="hidden sm:inline" />
          with{" "}
          <span className="text-primary font-black">
            AI-Powered
          </span>{" "}
          Interview Prep
        </motion.h1>

        {/* ── Subtitle Paragraph ── */}
        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          VoiceCoach AI dynamically generates questions, evaluates both delivery and content, and gives measurable insights across every answer.
        </motion.p>

        {/* ── CTA Action Buttons ── */}
        <motion.div
          variants={itemVariants}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          {/* Common Split CTA Button */}
          <SplitCtaButton href="/signup" label="Request A Demo" size="xl" />

          {/* Secondary Watch Demo Button */}
          <Link
            href="#how-it-works"
            className="group flex items-center gap-2.5 rounded-2xl border border-border/80 bg-card/80 px-6 py-3.5 text-sm md:text-base font-semibold text-foreground shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-muted/80 hover:scale-[1.02]"
          >
            <span>Watch How It Works</span>
            <div className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
              <Play className="size-3 fill-primary ml-0.5" />
            </div>
          </Link>
        </motion.div>

        {/* ── Social Proof Avatar Strip ── */}
        <motion.div
          variants={itemVariants}
          className="mt-14 flex flex-col items-center gap-3"
        >
          <span className="text-xs font-bold tracking-wide text-foreground/80">
            Trusted by 1000+ users
          </span>

          <div className="relative flex items-center justify-center">
            {/* Soft Glow */}
            <div className="absolute inset-0 bg-primary/15 blur-xl rounded-full" />

            <div className="relative flex items-center -space-x-3 p-1.5">
              {avatars.map((avatar, idx) => (
                <div
                  key={idx}
                  className="relative size-11 overflow-hidden rounded-full border-2 border-background shadow-md transition-transform hover:z-10 hover:scale-110"
                >
                  <Image
                    src={avatar.url}
                    alt={avatar.name}
                    fill
                    className="object-cover"
                    sizes="44px"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
