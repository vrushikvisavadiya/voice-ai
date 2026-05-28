"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

import { Button } from "@/components/ui/button";

const smoothEase = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
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

const testimonials = [
  {
    name: "David Tui",
    role: "Marketing Manager, HubSync",
    quote:
      "Crack My Interview refined my responses and boosted my interview confidence.",
    avatar: "DT",
    featured: true,
  },
  {
    name: "Sarah Mitchell",
    role: "Software Engineer, Anydesk",
    quote:
      "This platform trained me to deliver structured, confident interview answers.",
    avatar: "SM",
    featured: false,
  },
  {
    name: "Priya Sharma",
    role: "Product Designer, Designdot",
    quote:
      "With Crack My Interview, I learned confidence and more professional storytelling.",
    avatar: "PS",
    featured: false,
  },
];

function TestimonialCard({
  name,
  role,
  quote,
  avatar,
  featured,
}: {
  name: string;
  role: string;
  quote: string;
  avatar: string;
  featured?: boolean;
}) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{
        y: -6,
        transition: {
          duration: 0.25,
          ease: smoothEase,
        },
      }}
      className={[
        "relative rounded-[1.8rem] border p-6 pt-10 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.12)] transition-colors",
        featured
          ? "border-emerald-100 bg-[linear-gradient(180deg,#eefaf4_0%,#f7fcf8_100%)]"
          : "border-border/60 bg-background",
      ].join(" ")}
    >
      <div className="absolute left-6 top-6 text-emerald-400">
        <Quote className="size-8 fill-current stroke-0" />
      </div>

      <div className="absolute left-1/2 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <div className="flex size-14 items-center justify-center rounded-full border-4 border-background bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-400 text-sm font-semibold text-white shadow-[0_12px_30px_-12px_rgba(124,58,237,0.45)]">
          {avatar}
        </div>
      </div>

      <p className="mt-8 min-h-[132px] font-display text-[1.95rem] leading-[1.15] tracking-[-0.03em] text-foreground md:text-[2.1rem]">
        {quote}
      </p>

      <div className="mt-8 flex items-start gap-3">
        <div className="mt-1 h-11 w-1 rounded-full bg-emerald-400" />
        <div>
          <p className="text-lg font-semibold text-foreground">{name}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}

function TestimonialsSection() {
  return (
    <section className="px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto max-w-6xl"
        >
          <motion.div variants={itemVariants} className="text-center">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
              Testimonial
            </p>

            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl md:text-6xl">
              What Our Users Say
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
              Real stories from professionals who improved their clarity,
              confidence, and interview performance with Crack My Interview.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {testimonials.map((item) => (
              <TestimonialCard key={item.name} {...item} />
            ))}
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <button className="flex size-12 items-center justify-center rounded-full border border-border/60 bg-background text-muted-foreground shadow-sm transition hover:-translate-y-0.5 hover:text-foreground">
              <ArrowLeft className="size-5" />
            </button>

            <button className="flex size-12 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-600 shadow-sm transition hover:-translate-y-0.5 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
              <ArrowRight className="size-5" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function CtaBannerSection() {
  return (
    <section className="px-4 pb-12 md:px-6 md:pb-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: smoothEase }}
          className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-[#05060a] px-6 py-14 text-center shadow-[0_30px_100px_-36px_rgba(0,0,0,0.5)] md:px-10 md:py-20"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.22),_transparent_22%),radial-gradient(circle_at_50%_85%,_rgba(124,92,255,0.16),_transparent_28%)]" />
          <div className="pointer-events-none absolute inset-x-16 bottom-0 h-32 bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.45),_transparent_58%)] blur-3xl" />

          <div className="relative mx-auto max-w-4xl">
            <h2 className="font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl md:text-6xl">
              Unlock Your Dream Role — One Session Away
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-white/70 md:text-lg">
              Join Crack My Interview and step into your next opportunity with
              sharper answers, calmer delivery, and better interview practice.
            </p>

            <div className="mt-10">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-xl bg-gradient-to-r from-emerald-400 to-lime-400 px-8 text-sm font-semibold text-emerald-950 shadow-[0_16px_40px_-16px_rgba(74,222,128,0.55)] hover:opacity-95"
              >
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
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
