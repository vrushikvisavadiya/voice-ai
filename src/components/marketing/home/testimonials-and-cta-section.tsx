"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Sparkles, Star, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const smoothEase = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
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
    name: "Alex Morgan",
    role: "Head of Growth",
    quote:
      "Before Crack My Interview, my answers felt fragmented. The platform helped me structure responses clearly and speak with more confidence under pressure.",
    stars: 5,
  },
  {
    name: "Sarah Klein",
    role: "Revenue Operations Manager",
    quote:
      "What stood out immediately was the quality of the feedback. I could see exactly where my response lacked clarity, depth, and impact.",
    stars: 5,
  },
  {
    name: "Michael Chen",
    role: "Founder & CEO",
    quote:
      "Most interview tools focus only on practice volume, but this helped me understand what actually happens after I answer. That made improvement much faster.",
    stars: 5,
  },
];

function TestimonialCard({
  name,
  role,
  quote,
  stars,
}: (typeof testimonials)[0]) {
  return (
    <motion.article
      variants={itemVariants}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.22, ease: smoothEase }}
      className={cn(
        "group flex h-full flex-col rounded-[2rem] border border-border/60",
        "bg-card px-6 py-6 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.10)]",
        "md:px-7 md:py-7"
      )}
    >
      <div className="flex items-center gap-1 text-primary">
        {Array.from({ length: stars }).map((_, i) => (
          <Star
            key={i}
            className="size-3.5 fill-current text-[oklch(0.63_0.22_290)]"
          />
        ))}
      </div>

      <p className="mt-7 text-[1.08rem] leading-9 tracking-[-0.02em] text-foreground">
        &ldquo;{quote}&rdquo;
      </p>

      <div className="mt-10 flex items-center gap-3 border-t border-border/50 pt-5">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary">
          <UserRound className="size-4" />
        </div>

        <div className="min-w-0">
          <p className="truncate text-[0.95rem] font-semibold uppercase tracking-[-0.01em] text-foreground">
            {name}
          </p>
          <p className="truncate text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            {role}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

function TestimonialsSection() {
  return (
    <section className="relative px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
        >
          <div className="grid items-end gap-8 md:grid-cols-[1fr_auto] md:gap-10">
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/6 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-primary">
                <Sparkles className="size-3.5" />
                Testimonials
              </div>

             

              <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-foreground sm:text-5xl md:text-[3.25rem]">
                 Validated by
                <br />
                 <span className="text-[oklch(0.63_0.22_290)]">
                  high-growth
                </span>
              </h2>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="hidden pb-3 md:block"
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground/80">
                Scroll to explore →
              </p>
            </motion.div>
          </div>

          <div className="mt-14 grid gap-5 md:mt-16 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
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
              Join thousands of candidates who practice smarter with AI coaching
              and walk into interviews with sharper answers and calmer delivery.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                variant="animated-primary"
                size="xl"
                className="rounded-full px-8"
              >
                <Link href="/signup">
                  Get started free
                  <ArrowRight className="size-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="ghost"
                size="xl"
                className="rounded-full border border-white/15 bg-white/5 px-8 text-white/80 hover:bg-white/10 hover:text-white"
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