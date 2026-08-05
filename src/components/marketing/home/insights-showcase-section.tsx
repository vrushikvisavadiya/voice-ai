"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  MessageSquare,
  Mic,
  Sliders,
  Star,
  TrendingUp,
} from "lucide-react";
import { SplitCtaButton } from "@/components/ui/split-cta-button";

export function InsightsShowcaseSection() {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-28 px-4 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ── Left Column: Content & Features List ── */}
          <div className="lg:col-span-6 space-y-7 text-left">
            
            {/* Top Split Pill Badge */}
            <div className="inline-flex items-center rounded-full border border-border/70 bg-background/90 p-1 text-xs md:text-sm font-medium shadow-sm backdrop-blur-md">
              <span className="flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1 text-primary-foreground font-bold">
                <Sliders className="size-3.5" />
                Performance Intelligence
              </span>
              <span className="px-3.5 py-1 text-muted-foreground font-medium">
                Built for real hiring
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground leading-[1.12]">
              From Conversation <br />
              to <span className="text-primary font-black">Clear Insights</span>
            </h2>

            {/* Description Paragraph */}
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              After every simulated interview, participants receive a detailed breakdown of their performance. The platform evaluates both delivery and answer quality, transforming each session into clear, measurable insights that drive real improvement.
            </p>

            {/* Features List */}
            <div className="space-y-5 pt-2">
              {/* Feature 1 */}
              <div className="flex items-start gap-4 group">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 transition-transform duration-300 group-hover:scale-105">
                  <BrainCircuit className="size-5" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-base font-bold text-foreground">
                    Deep Answer Evaluation
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Analyzes structure, clarity, and relevance.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-4 group">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 transition-transform duration-300 group-hover:scale-105">
                  <MessageSquare className="size-5" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-base font-bold text-foreground">
                    Communication & Behavioral Metrics
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Tracks tone, pacing, eye contact, and confidence.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-4 group">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 transition-transform duration-300 group-hover:scale-105">
                  <TrendingUp className="size-5" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-base font-bold text-foreground">
                    Progress Tracking Over Time
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Compare sessions and monitor measurable improvement.
                  </p>
                </div>
              </div>
            </div>

            {/* Common Split CTA Button */}
            <div className="pt-3">
              <SplitCtaButton href="/signup" label="See the Platform" size="lg" />
            </div>
          </div>

          {/* ── Right Column: Visual Showcase Container with Overlay Stats ── */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[2.5rem] border border-border/60 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent p-3 sm:p-4 shadow-2xl"
            >
              {/* Photo Image Card */}
              <div className="relative aspect-[4/3.8] w-full overflow-hidden rounded-[2rem] bg-muted/40">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80"
                  alt="Candidate receiving clear interview performance insights"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />

                {/* Soft Bottom Overlay Gradient for Stats readable contrast */}
                <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

                {/* Floating Overlay Stat Cards at Bottom */}
                <div className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4 grid grid-cols-2 gap-3">
                  
                  {/* Stat Card 1: Total Interviews */}
                  <div className="rounded-2xl border border-white/20 bg-background/85 p-3.5 sm:p-4 backdrop-blur-xl shadow-lg transition-all duration-300 hover:bg-background/95">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground/80">
                      <div className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Mic className="size-3.5" />
                      </div>
                      <span>Total Interviews</span>
                    </div>

                    <div className="mt-2 flex items-baseline justify-between">
                      <span className="text-2xl sm:text-3xl font-black text-foreground">
                        38
                      </span>
                    </div>

                    <span className="mt-1 block text-[11px] font-medium text-muted-foreground">
                      12 last month
                    </span>
                  </div>

                  {/* Stat Card 2: Average Score */}
                  <div className="rounded-2xl border border-white/20 bg-background/85 p-3.5 sm:p-4 backdrop-blur-xl shadow-lg transition-all duration-300 hover:bg-background/95">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground/80">
                      <div className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Star className="size-3.5 fill-primary/30 text-primary" />
                      </div>
                      <span>Average Score</span>
                    </div>

                    <div className="mt-2 flex items-baseline justify-between">
                      <span className="text-2xl sm:text-3xl font-black text-foreground">
                        4.7
                      </span>
                    </div>

                    <span className="mt-1 block text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      +12.7% improvement
                    </span>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
