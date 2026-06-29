"use client";

import { motion } from "framer-motion";

const smoothEase = [0.16, 1, 0.3, 1] as const;

const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Meta",
  "Apple",
  "Stripe",
  "Notion",
  "OpenAI",
  "Netflix",
  "Salesforce",
  "Adobe",
  "Airbnb",
];

export function LogoStrip() {
  return (
    <section className="overflow-hidden border-y border-border/40 bg-muted/30 px-4 py-10 md:py-12">
      <div className="mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: smoothEase }}
          className="mb-8 text-center text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground"
        >
          Trusted by candidates interviewing at top companies
        </motion.p>

        <div className="relative">
          {/* Fade masks on sides */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-muted/30 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-muted/30 to-transparent" />

          <div className="flex overflow-hidden">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 28,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex shrink-0 items-center gap-12"
            >
              {/* Double the list for seamless loop */}
              {[...companies, ...companies].map((company, i) => (
                <span
                  key={i}
                  className="shrink-0 font-display text-lg font-semibold tracking-[-0.02em] text-muted-foreground/60 transition-colors hover:text-foreground"
                >
                  {company}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
