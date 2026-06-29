"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Check, Sparkles, Zap } from "lucide-react";

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

const plans = [
  {
    name: "Free",
    description: "Start practicing at no cost.",
    monthlyPrice: 0,
    annualPrice: 0,
    cta: "Get started free",
    ctaHref: "/signup",
    popular: false,
    features: [
      "3 mock interviews per month",
      "Basic AI feedback",
      "Voice practice sessions",
      "Question library (50 questions)",
      "Session transcripts",
    ],
  },
  {
    name: "Pro",
    description: "For serious candidates preparing to land top roles.",
    monthlyPrice: 19,
    annualPrice: 14,
    cta: "Start Pro trial",
    ctaHref: "/signup?plan=pro",
    popular: true,
    features: [
      "Unlimited mock interviews",
      "Deep AI feedback & coaching",
      "Score tracking & trend reports",
      "Custom job description upload",
      "STAR framework coaching",
      "Filler word & pacing analysis",
      "Priority support",
    ],
  },
  {
    name: "Team",
    description: "For recruiting teams & career coaching programs.",
    monthlyPrice: 49,
    annualPrice: 38,
    cta: "Contact sales",
    ctaHref: "/contact",
    popular: false,
    features: [
      "Everything in Pro",
      "Team dashboard & analytics",
      "Candidate progress tracking",
      "Custom question sets",
      "White-label options",
      "Dedicated account manager",
    ],
  },
];

export function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
              Pricing
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-foreground sm:text-5xl">
              Simple, transparent pricing.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              Choose the plan that fits your preparation timeline. Upgrade,
              downgrade, or cancel anytime.
            </p>
          </motion.div>

          {/* Billing toggle */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex items-center justify-center gap-4"
          >
            <span
              className={cn(
                "text-sm font-medium transition-colors",
                !annual ? "text-foreground" : "text-muted-foreground",
              )}
            >
              Monthly
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={annual}
              onClick={() => setAnnual((v) => !v)}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full border-2 border-transparent transition-colors duration-200",
                annual ? "bg-primary" : "bg-border",
              )}
            >
              <span
                className={cn(
                  "inline-block size-4 rounded-full bg-white shadow-sm transition-transform duration-200",
                  annual ? "translate-x-5" : "translate-x-0.5",
                )}
              />
            </button>
            <span
              className={cn(
                "flex items-center gap-1.5 text-sm font-medium transition-colors",
                annual ? "text-foreground" : "text-muted-foreground",
              )}
            >
              Annual
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
                Save 25%
              </span>
            </span>
          </motion.div>

          {/* Pricing cards */}
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                variants={itemVariants}
                className={cn(
                  "relative overflow-hidden rounded-[1.75rem] border p-7 transition-shadow",
                  plan.popular
                    ? "border-primary/30 bg-primary shadow-[0_24px_80px_-28px_rgba(84,58,237,0.30)]"
                    : "border-border/60 bg-card shadow-[0_18px_50px_-28px_rgba(0,0,0,0.12)] hover:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.18)]",
                )}
              >
                {plan.popular && (
                  <>
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_55%)]" />
                    <div className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white">
                      <Sparkles className="size-3" />
                      Most Popular
                    </div>
                  </>
                )}

                <div>
                  <p
                    className={cn(
                      "text-sm font-medium",
                      plan.popular ? "text-white/70" : "text-muted-foreground",
                    )}
                  >
                    {plan.name}
                  </p>
                  <div className="mt-2 flex items-end gap-1">
                    <span
                      className={cn(
                        "font-display text-5xl font-semibold tracking-[-0.04em]",
                        plan.popular ? "text-white" : "text-foreground",
                      )}
                    >
                      ${annual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    {plan.monthlyPrice > 0 && (
                      <span
                        className={cn(
                          "mb-1.5 text-sm",
                          plan.popular
                            ? "text-white/60"
                            : "text-muted-foreground",
                        )}
                      >
                        / mo
                      </span>
                    )}
                  </div>
                  <p
                    className={cn(
                      "mt-2 text-sm leading-6",
                      plan.popular ? "text-white/70" : "text-muted-foreground",
                    )}
                  >
                    {plan.description}
                  </p>
                </div>

                <div className="mt-6">
                  <Button
                    asChild
                    className={cn(
                      "w-full rounded-full",
                      plan.popular
                        ? "bg-white text-primary hover:bg-white/90"
                        : "",
                    )}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    <Link href={plan.ctaHref}>
                      {plan.cta}
                      <ArrowRight className="ml-1.5 size-4" />
                    </Link>
                  </Button>
                </div>

                <ul
                  className={cn(
                    "mt-7 space-y-3.5 border-t pt-6",
                    plan.popular ? "border-white/15" : "border-border/50",
                  )}
                >
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check
                        className={cn(
                          "mt-0.5 size-4 shrink-0",
                          plan.popular
                            ? "text-white/80"
                            : "text-emerald-500 dark:text-emerald-400",
                        )}
                      />
                      <span
                        className={cn(
                          "text-sm leading-6",
                          plan.popular ? "text-white/80" : "text-foreground/80",
                        )}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Footer note */}
          <motion.p
            variants={itemVariants}
            className="mt-8 text-center text-sm text-muted-foreground"
          >
            All plans include a 7-day free trial. No credit card required.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
