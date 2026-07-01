"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUp, Mail, MapPin, Mic, Phone, Sparkles } from "lucide-react";

const footerGroups = [
  {
    title: "Company",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Blog", href: "/blog" },
      { label: "Pricing", href: "/pricing" },
      { label: "Sign In / Sign Up", href: "/signup" },
    ],
  },
  {
    title: "Quick Navigation",
    links: [
      { label: "Home", href: "/" },
      { label: "Career Preparation", href: "/career-preparation" },
      { label: "Learn & Grow", href: "/learn" },
    ],
  },
  {
    title: "Tools",
    links: [
      { label: "Career Vault", href: "/tools/career-vault" },
      { label: "The Prep Engine", href: "/tools/prep-engine" },
      { label: "Mock Interview", href: "/tools/mock-interview" },
      { label: "Smart Career Coach", href: "/tools/career-coach" },
      { label: "Question Hub", href: "/tools/question-hub" },
    ],
  },
];

function scrollToTop() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

export function MarketingFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border/50 bg-background text-foreground dark:bg-[#07070e] dark:border-white/10 dark:text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(74,222,128,0.06),_transparent_26%),radial-gradient(circle_at_top_right,_rgba(124,92,255,0.05),_transparent_22%)]" />

      <div className="relative mx-auto max-w-7xl px-4 pt-14 md:px-6 md:pt-16">
        <div className="grid gap-12 border-b border-border/50 dark:border-white/10 pb-10 md:grid-cols-[1.15fr_1fr_1fr_1fr] md:gap-10 md:pb-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="max-w-sm"
          >
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                <Mic className="size-5" />
              </div>

              <div className="flex flex-col items-start leading-none">
                <span className="font-display text-2xl font-bold tracking-tight text-foreground dark:text-white">
                  VoiceCoach AI
                </span>
                <span className="mt-1 text-xs text-muted-foreground dark:text-white/60">
                  Practice with precision
                </span>
              </div>
            </Link>

            <div className="mt-8 space-y-4 text-muted-foreground dark:text-white/80">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground/70 dark:text-white/70" />
                <p className="text-base leading-7">
                  1800, Walt Disney World, Bay Lake, Orlando, United State
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-muted-foreground/70 dark:text-white/70" />
                <a
                  href="mailto:support@voicecoachai.com"
                  className="text-base transition hover:text-primary dark:hover:text-emerald-400 text-foreground dark:text-white/90"
                >
                  support@voicecoachai.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-muted-foreground/70 dark:text-white/70" />
                <a
                  href="tel:+17982594652"
                  className="text-base transition hover:text-primary dark:hover:text-emerald-400 text-foreground dark:text-white/90"
                >
                  (+1) 798 259 4652
                </a>
              </div>
            </div>
          </motion.div>

          {footerGroups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: groupIndex * 0.08 }}
            >
              <h3 className="text-lg font-semibold text-foreground dark:text-white">
                {group.title}
              </h3>

              <ul className="mt-6 space-y-4">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-base text-muted-foreground transition hover:text-primary dark:hover:text-emerald-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="relative flex flex-col gap-6 py-6 md:flex-row md:items-center md:justify-between md:py-7">
          <p className="text-base text-muted-foreground dark:text-white/75">
            © 2026 VoiceCoach AI. All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-base text-primary dark:text-emerald-400 transition hover:text-primary/80 dark:hover:text-emerald-300 font-medium"
          >
            Back to the top
            <ArrowUp className="size-4" />
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-[-34px] hidden overflow-hidden md:block">
        <div className="mx-auto max-w-7xl px-6">
          <div className="select-none font-display text-[280px] font-semibold leading-none tracking-[-0.08em] text-foreground/[0.02] dark:text-white/[0.02]">
            interview
          </div>
        </div>
      </div>
    </footer>
  );
}
