"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  AudioLines,
  BriefcaseBusiness,
  Play,
  Sparkles,
  Star,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const floatingCards = [
  {
    id: 1,
    className: "top-2 left-4 md:top-10 md:left-10",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
    delay: 0,
  },
  {
    id: 2,
    className: "right-2 top-10 md:right-0 md:top-20",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
    delay: 0.2,
  },
  {
    id: 3,
    className: "bottom-6 left-8 md:bottom-10 md:left-16",
    image:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=500&q=80",
    delay: 0.35,
  },
  {
    id: 4,
    className: "bottom-8 right-4 md:bottom-8 md:right-8",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=500&q=80",
    delay: 0.15,
  },
];

const lineTransition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1] as const,
};

export function HeroSection() {
  return (
    <section className="px-4 pb-12 pt-8 md:px-6 md:pb-16 md:pt-10">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-border/60 bg-[#f7f1ee] shadow-[0_20px_80px_-30px_rgba(0,0,0,0.12)] dark:bg-card">
        <div className="grid min-h-[720px] grid-cols-1 gap-10 px-6 py-8 md:px-10 md:py-10 xl:grid-cols-[1.05fr_0.95fr] xl:gap-6">
          <div className="flex flex-col justify-center pt-4 md:pt-8 xl:pb-12">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Badge
                variant="secondary"
                className="rounded-full border border-border/70 bg-background/70 px-4 py-1 text-xs font-medium text-foreground/80 backdrop-blur"
              >
                Voice-first AI interview practice
              </Badge>
            </motion.div>

            <div className="mt-6 space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...lineTransition, delay: 0.08 }}
                className="font-display text-5xl leading-[0.95] tracking-[-0.04em] text-foreground sm:text-6xl md:text-7xl"
              >
                Practice the
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...lineTransition, delay: 0.16 }}
                className="font-display text-5xl leading-[0.95] tracking-[-0.04em] sm:text-6xl md:text-7xl"
              >
                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-400 bg-clip-text text-transparent">
                  exact interview
                </span>
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...lineTransition, delay: 0.24 }}
                className="font-display text-5xl leading-[0.95] tracking-[-0.04em] text-foreground sm:text-6xl md:text-7xl"
              >
                for your next role
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.75,
                delay: 0.28,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-6 max-w-xl text-base leading-7 text-muted-foreground md:text-lg"
            >
              Paste any job description and get a role-specific voice interview,
              instant feedback, score breakdowns, and coaching notes designed to
              make your next answer sharper.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.75,
                delay: 0.34,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Button
                asChild
                size="lg"
                className="group h-13 rounded-full px-6 text-sm shadow-[0_12px_30px_-12px_rgba(124,58,237,0.55)]"
              >
                <Link href="/signup">
                  Start free
                  <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-13 rounded-full border-border/70 bg-background/60 px-6 text-sm backdrop-blur"
              >
                <Link href="#how-it-works">
                  <Play className="mr-2 size-4" />
                  See how it works
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.75,
                delay: 0.42,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-primary" />3 free interviews
              </div>
              <div className="flex items-center gap-2">
                <BriefcaseBusiness className="size-4 text-primary" />
                Role-specific questions
              </div>
              <div className="flex items-center gap-2">
                <AudioLines className="size-4 text-primary" />
                Voice-first practice
              </div>
            </motion.div>
          </div>

          <div className="relative flex min-h-[560px] items-center justify-center py-6 md:min-h-[640px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.14),_transparent_45%)]" />

            {floatingCards.map((card) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, scale: 0.9, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5 + card.delay,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`absolute ${card.className} hidden rounded-[1.35rem] border border-white/70 bg-white/70 p-1 shadow-[0_25px_70px_-25px_rgba(0,0,0,0.25)] backdrop-blur-md md:block`}
                style={{
                  animation: `float ${7 + card.id}s ease-in-out infinite`,
                }}
              >
                <div className="relative h-24 w-36 overflow-hidden rounded-[1rem]">
                  <Image
                    src={card.image}
                    alt="Interview candidate"
                    fill
                    className="object-cover"
                    sizes="144px"
                    priority={card.id === 1}
                  />
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.95,
                delay: 0.32,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative z-10 w-full max-w-[420px]"
            >
              <div className="rounded-[2rem] border border-black/10 bg-black text-white shadow-[0_35px_90px_-28px_rgba(0,0,0,0.45)]">
                <div className="flex items-start justify-between px-6 pt-6">
                  <div>
                    <p className="text-sm text-white/60">Live mock interview</p>
                    <h3 className="mt-1 text-2xl font-semibold tracking-tight">
                      Frontend Engineer
                    </h3>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                    AI listening
                  </div>
                </div>

                <div className="px-6 pb-6 pt-5">
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                    <div className="flex h-28 items-center justify-center gap-1.5">
                      {Array.from({ length: 32 }).map((_, i) => (
                        <motion.span
                          key={i}
                          animate={{
                            height: [10, 28 + (i % 5) * 10, 12],
                          }}
                          transition={{
                            duration: 1.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.03,
                          }}
                          className="w-1 rounded-full bg-white/80"
                        />
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between text-sm text-white/65">
                      <span>00:05:39</span>
                      <span>Analysing confidence + clarity</span>
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: -18, y: 18 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute -bottom-10 left-4 w-[88%] rounded-[1.6rem] border border-border/60 bg-background/88 p-5 shadow-[0_20px_80px_-36px_rgba(0,0,0,0.35)] backdrop-blur-xl"
              >
                <div className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Star className="size-4 fill-current" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Feedback snapshot
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Strong technical depth. Improve answer structure and
                      tighten the first 20 seconds for better executive clarity.
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    ["Clarity", "84"],
                    ["Confidence", "78"],
                    ["Structure", "81"],
                  ].map(([label, value], index) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 + index * 0.08, duration: 0.45 }}
                      className="rounded-2xl border border-border/60 bg-muted/50 px-3 py-3 text-center"
                    >
                      <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                        {label}
                      </p>
                      <p className="mt-1 text-lg font-semibold text-foreground">
                        {value}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="border-t border-border/50 bg-background/70 px-6 py-5 md:px-10">
          <div className="flex flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
            <p className="text-sm font-medium text-foreground/80">
              Practice faster with structured AI coaching for real interview
              outcomes
            </p>
            <p className="text-sm text-primary">
              Start with 3 free interview sessions
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }
      `}</style>
    </section>
  );
}
