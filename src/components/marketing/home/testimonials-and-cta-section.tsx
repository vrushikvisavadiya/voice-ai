"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Quote, Sparkles, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

const testimonials = [
  {
    name: "David Tui",
    role: "Marketing Manager, HubSync",
    quote:
      "Crack My Interview refined my responses and boosted my interview confidence dramatically. I got the offer within 3 weeks.",
    avatar: "DT",
    stars: 5,
    company: "HubSpot",
  },
  {
    name: "Sarah Mitchell",
    role: "Software Engineer, Anydesk",
    quote:
      "This platform trained me to deliver structured, confident interview answers. The AI feedback was eerily accurate.",
    avatar: "SM",
    stars: 5,
    company: "Stripe",
  },
  {
    name: "Priya Sharma",
    role: "Product Designer, Designdot",
    quote:
      "I practiced 12 sessions before my Google interview. The STAR coaching was a game-changer for my behavioral rounds.",
    avatar: "PS",
    stars: 5,
    company: "Google",
  },
  {
    name: "Marcus Lee",
    role: "Product Manager, BuildCore",
    quote:
      "The session transcripts let me review exactly what went wrong and correct it. My scores jumped 40 points in a week.",
    avatar: "ML",
    stars: 5,
    company: "Amazon",
  },
  {
    name: "Aisha Patel",
    role: "Data Analyst, Quantify",
    quote:
      "The filler word tracking was eye-opening. I had no idea how many times I said 'umm' until the AI showed me.",
    avatar: "AP",
    stars: 5,
    company: "Netflix",
  },
  {
    name: "Jordan Clarke",
    role: "Engineering Manager, Loopify",
    quote:
      "My team used this for mock hiring rounds on both sides. It gave us a shared, objective view of where people struggled.",
    avatar: "JC",
    stars: 5,
    company: "Meta",
  },
];

function TestimonialCard({
  name,
  role,
  quote,
  avatar,
  stars,
  company,
}: (typeof testimonials)[0]) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -6, transition: { duration: 0.22, ease: smoothEase } }}
      className="flex break-inside-avoid flex-col rounded-[1.75rem] border border-border/60 bg-card p-6 shadow-[0_18px_50px_-28px_rgba(0,0,0,0.10)]"
    >
      {/* Quote icon */}
      <Quote className="size-7 text-primary/30" />

      {/* Stars */}
      <div className="mt-3 flex items-center gap-0.5">
        {Array.from({ length: stars }).map((_, i) => (
          <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
        ))}
      </div>

      {/* Quote */}
      <p className="mt-4 flex-1 text-sm leading-7 text-foreground/80">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Author */}
      <div className="mt-5 flex items-center gap-3 border-t border-border/40 pt-5">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
          {avatar}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">
            {name}
          </p>
          <p className="truncate text-xs text-muted-foreground">{role}</p>
        </div>
        <span className="ml-auto shrink-0 rounded-full border border-border/50 bg-muted/50 px-2.5 py-1 text-xs font-medium text-muted-foreground">
          ✓ {company}
        </span>
      </div>
    </motion.div>
  );
}

function TestimonialsSection() {
  return (
    <section className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
              Testimonials
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-foreground sm:text-5xl">
              Validated by high-growth teams.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              Real results from professionals who improved their clarity,
              confidence, and interview performance.
            </p>
          </motion.div>

          {/* Masonry-style grid */}
          <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
            {testimonials.map((t) => (
              <div key={t.name} className="mb-5">
                <TestimonialCard {...t} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CtaBannerSection() {
  return (
    <section className="px-4 pb-16 md:px-6 md:pb-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: smoothEase }}
          className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-[#07070e] px-6 py-16 text-center shadow-[0_40px_120px_-36px_rgba(0,0,0,0.55)] md:px-10 md:py-24"
        >
          {/* Glows */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(84,58,237,0.28),transparent_55%),radial-gradient(ellipse_at_80%_100%,rgba(130,80,255,0.18),transparent_50%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

          <div className="relative mx-auto max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70">
              <Sparkles className="size-3.5 text-primary" />
              Start scaling your interview prep with AI
            </div>

            <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl">
              Unlock Your Dream Role —
              <br />
              One Session Away.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/60 md:text-lg">
              Join 20,000+ candidates who practice smarter with Voice AI
              coaching and walk into interviews with sharper answers and calmer
              delivery.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-[0_16px_40px_-16px_rgba(84,58,237,0.6)] hover:bg-primary/90"
              >
                <Link href="/signup">
                  Get started free
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="h-12 rounded-full border border-white/15 px-8 text-sm text-white/80 hover:bg-white/5 hover:text-white"
              >
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>

            <p className="mt-5 text-xs text-white/40">
              No credit card required · 7-day free trial · Cancel anytime
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function TestimonialsAndCtaSection() {
  return (
    <>
      <TestimonialsSection />
      <CtaBannerSection />
    </>
  );
}
