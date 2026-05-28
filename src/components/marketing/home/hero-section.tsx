"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  Mic,
  Settings2,
  Sparkles,
  Star,
  Video,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const smoothEase = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
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

const wordHover: Variants = {
  rest: {
    y: 0,
    rotate: 0,
  },
  hover: {
    y: -4,
    rotate: 0,
    transition: {
      duration: 0.25,
      ease: smoothEase,
    },
  },
};

export function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 120,
    damping: 18,
    mass: 0.8,
  });

  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 120,
    damping: 18,
    mass: 0.8,
  });

  const translateX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 120,
    damping: 18,
    mass: 0.8,
  });

  const translateY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-8, 8]), {
    stiffness: 120,
    damping: 18,
    mass: 0.8,
  });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="relative flex min-h-[calc(100svh-88px)] items-center px-4 pb-8 pt-6 md:px-6 md:pb-10 md:pt-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.4rem] ">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="relative mx-auto flex max-w-5xl flex-col items-center text-center"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary"
            >
              <Sparkles className="size-3.5" />
              Crack My Interview
            </motion.div>

            <motion.div
              variants={itemVariants}
              initial="rest"
              whileHover="hover"
              animate="rest"
              className="mt-7"
            >
              <h1 className="font-display text-5xl font-semibold leading-[0.94] tracking-[-0.05em] text-foreground sm:text-6xl md:text-7xl xl:text-[5.6rem]">
                <motion.span variants={wordHover} className="inline-block">
                  Ace
                </motion.span>{" "}
                <motion.span variants={wordHover} className="inline-block">
                  your
                </motion.span>{" "}
                <motion.span variants={wordHover} className="inline-block">
                  next
                </motion.span>{" "}
                <motion.span variants={wordHover} className="inline-block">
                  interview
                </motion.span>{" "}
                <motion.span variants={wordHover} className="inline-block">
                  with
                </motion.span>{" "}
                <motion.span
                  variants={wordHover}
                  className="inline-block bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-400 bg-clip-text text-transparent"
                >
                  AI-powered
                </motion.span>{" "}
                <motion.span variants={wordHover} className="inline-block">
                  practice
                </motion.span>
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground md:text-[1.15rem] md:leading-8"
            >
              Practice realistic interviews with AI, get instant feedback on
              your answers, and improve the clarity, confidence, and structure
              of every response before the real conversation starts.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Button
                asChild
                size="lg"
                className="group h-12 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-400 px-6 text-sm text-white shadow-[0_16px_40px_-16px_rgba(124,58,237,0.45)] hover:opacity-95"
              >
                <Link href="/signup">
                  Start mock interview
                  <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-border/70 bg-background/70 px-6 text-sm backdrop-blur-sm"
              >
                <Link href="/contact">Watch demo</Link>
              </Button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="relative mt-14 flex w-full items-center justify-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.85,
                  delay: 0.25,
                  ease: smoothEase,
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  rotateX,
                  rotateY,
                  x: translateX,
                  y: translateY,
                  transformPerspective: 1200,
                }}
                className="relative w-full max-w-[560px] will-change-transform"
              >
                <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-background/90 shadow-[0_28px_90px_-34px_rgba(0,0,0,0.24)] backdrop-blur-xl">
                  <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
                    <div className="flex -space-x-2">
                      <div className="size-7 rounded-full border-2 border-background bg-violet-300" />
                      <div className="size-7 rounded-full border-2 border-background bg-orange-300" />
                      <div className="size-7 rounded-full border-2 border-background bg-sky-300" />
                    </div>

                    <div className="text-xs text-muted-foreground">
                      REC&nbsp;&nbsp;00:12:36
                    </div>
                  </div>

                  <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(124,92,255,0.08),_transparent_42%)] px-6 py-8">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40" />

                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{
                        duration: 5.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="relative z-10 overflow-hidden rounded-[2rem] border border-border/60 bg-background shadow-[0_20px_80px_-30px_rgba(0,0,0,0.15)]"
                    >
                      <div className="relative h-[320px] w-[240px] sm:h-[360px] sm:w-[280px]">
                        <Image
                          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80"
                          alt="Candidate practicing a mock interview"
                          fill
                          priority
                          className="object-cover"
                          sizes="(max-width: 640px) 240px, 280px"
                        />
                      </div>
                    </motion.div>

                    <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
                      <div className="flex size-11 items-center justify-center rounded-full bg-background/90 shadow-sm backdrop-blur">
                        <Video className="size-5 text-muted-foreground" />
                      </div>
                      <div className="flex size-14 items-center justify-center rounded-2xl bg-red-500 text-white shadow-lg">
                        <Mic className="size-6" />
                      </div>
                      <div className="flex size-11 items-center justify-center rounded-full bg-background/90 shadow-sm backdrop-blur">
                        <Settings2 className="size-5 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: -16, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.65 }}
                  className="absolute -left-36 top-10 hidden w-[220px] rounded-[1.4rem] border border-border/60 bg-background/92 p-4 text-left shadow-[0_20px_50px_-28px_rgba(0,0,0,0.2)] backdrop-blur-md lg:block"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div className="size-8 rounded-full border-2 border-background bg-violet-300" />
                      <div className="size-8 rounded-full border-2 border-background bg-orange-300" />
                      <div className="size-8 rounded-full border-2 border-background bg-emerald-300" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="size-3 fill-current" />
                        ))}
                      </div>
                      <p className="mt-1 text-sm font-medium text-foreground">
                        18,921 reviews
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-muted-foreground">
                    A smart practice workflow for mastering interviews with more
                    confidence and sharper structure.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 16, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.75 }}
                  className="absolute -right-6 bottom-10 hidden w-[220px] rounded-[1.4rem] border border-border/60 bg-background/92 p-4 text-left shadow-[0_20px_50px_-28px_rgba(0,0,0,0.2)] backdrop-blur-md lg:block"
                >
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                    Real feedback, faster improvement
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Learn where your answer gets stronger and where it still
                    needs clarity.
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-14 flex w-full flex-col items-center justify-between gap-5 border-t border-border/60 pt-6 md:flex-row"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  <div className="size-10 rounded-full border-2 border-background bg-violet-300" />
                  <div className="size-10 rounded-full border-2 border-background bg-orange-300" />
                  <div className="size-10 rounded-full border-2 border-background bg-emerald-300" />
                  <div className="size-10 rounded-full border-2 border-background bg-sky-300" />
                </div>

                <div className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                  20K students enrolled
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-lg font-medium tracking-tight text-foreground/70">
                <span>Google</span>
                <span>Microsoft</span>
                <span>Indeed</span>
                <span>Walmart</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
