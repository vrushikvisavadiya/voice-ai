"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const smoothEase = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: smoothEase },
  },
};

const faqs = [
  {
    question: "How does the AI generate interview questions?",
    answer:
      "When you paste a job description, our AI parses the role requirements, responsibilities, and required skills. It then generates questions across behavioral, situational, and role-specific categories — ranked by relevance and seniority level.",
  },
  {
    question: "Is my voice recorded or stored?",
    answer:
      "Audio is processed in real time to generate transcripts and feedback. We do not store raw audio files beyond your active session. Transcripts and scores are saved to your account for review.",
  },
  {
    question: "What interview types does the platform support?",
    answer:
      "We support behavioral, technical, case study, culture fit, and leadership interviews. You can also set custom interview styles to match what you know about the company's process.",
  },
  {
    question: "Can I use this for non-technical roles?",
    answer:
      "Absolutely. The platform is designed for all roles — product management, marketing, design, sales, finance, and more. The AI adapts its questioning and coaching to the function you're preparing for.",
  },
  {
    question: "How is the feedback scored?",
    answer:
      "Each answer is evaluated on six dimensions: clarity, structure, relevance, confidence, conciseness, and technical accuracy (where applicable). Scores are shown per-question and aggregated into a session report.",
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer:
      "Yes. You can cancel, upgrade, or downgrade your plan at any time from your billing settings. Cancellations take effect at the end of your current billing period.",
  },
  {
    question: "Is there a team or enterprise plan?",
    answer:
      "Yes. Our Team plan includes a shared dashboard, candidate progress tracking, and custom question sets. For enterprise deployments, white-labeling, and dedicated support, contact our sales team.",
  },
];

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="border-b border-border/50 last:border-0"
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-foreground"
        aria-expanded={isOpen}
      >
        <span
          className={cn(
            "text-base font-medium leading-6 transition-colors",
            isOpen ? "text-foreground" : "text-foreground/80",
          )}
        >
          {question}
        </span>
        <ChevronDown
          className={cn(
            "size-5 shrink-0 text-muted-foreground transition-transform duration-300",
            isOpen && "rotate-180 text-primary",
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: smoothEase }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-7 text-muted-foreground">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16 xl:gap-24"
        >
          {/* Left: Header */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <motion.div variants={itemVariants}>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
                FAQ
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-foreground sm:text-5xl">
                Commonly asked questions.
              </h2>
              <p className="mt-5 text-base leading-7 text-muted-foreground">
                Have a question that isn&rsquo;t listed here?{" "}
                <a
                  href="/contact"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Contact us
                </a>
                .
              </p>
            </motion.div>
          </div>

          {/* Right: Accordions */}
          <div className="rounded-[1.75rem] border border-border/50 bg-card px-6 py-2 shadow-[0_18px_50px_-28px_rgba(0,0,0,0.08)]">
            {faqs.map((faq, i) => (
              <FaqItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
