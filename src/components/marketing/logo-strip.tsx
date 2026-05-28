"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/marketing/animated-section";

const logos = [
  "SHELLS",
  "SmartFinder",
  "Zoomerr",
  "Kontrastr",
  "WaveSprint",
  "TalentGrid",
];

export function LogoStrip() {
  return (
    <AnimatedSection className="px-4 py-8 md:px-6 md:py-10" delay={0.05}>
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-border/60 bg-background/70 px-6 py-6 backdrop-blur md:px-10">
        <p className="text-center text-sm text-muted-foreground">
          Trusted by candidates preparing for fast-moving hiring loops
        </p>

        <div className="relative mt-6 overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="flex min-w-max gap-12"
          >
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={`${logo}-${index}`}
                className="text-lg font-semibold tracking-tight text-foreground/80"
              >
                {logo}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
