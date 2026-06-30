"use client";

import { motion } from "framer-motion";

const smoothEase = [0.16, 1, 0.3, 1] as const;

// Simple Icons CDN slugs — https://simpleicons.org
const row1 = [
  { name: "Google", slug: "google" },
  { name: "Microsoft", slug: "microsoft" },
  { name: "Amazon", slug: "amazon" },
  { name: "Meta", slug: "meta" },
  { name: "Apple", slug: "apple" },
  { name: "Netflix", slug: "netflix" },
  { name: "Spotify", slug: "spotify" },
  { name: "Uber", slug: "uber" },
];

const row2 = [
  { name: "Stripe", slug: "stripe" },
  { name: "Notion", slug: "notion" },
  { name: "OpenAI", slug: "openai" },
  { name: "Figma", slug: "figma" },
  { name: "Airbnb", slug: "airbnb" },
  { name: "Shopify", slug: "shopify" },
  { name: "Atlassian", slug: "atlassian" },
  { name: "Twilio", slug: "twilio" },
];

const row3 = [
  { name: "Salesforce", slug: "salesforce" },
  { name: "Adobe", slug: "adobe" },
  { name: "LinkedIn", slug: "linkedin" },
  { name: "Slack", slug: "slack" },
  { name: "GitHub", slug: "github" },
  { name: "Vercel", slug: "vercel" },
  { name: "Dropbox", slug: "dropbox" },
  { name: "HubSpot", slug: "hubspot" },
];

interface LogoItem {
  name: string;
  slug: string;
}

function LogoRow({
  logos,
  direction = "left",
  duration = 28,
}: {
  logos: LogoItem[];
  direction?: "left" | "right";
  duration?: number;
}) {
  const doubled = [...logos, ...logos];
  const from = direction === "left" ? "0%" : "-50%";
  const to = direction === "left" ? "-50%" : "0%";

  return (
    <div className="flex overflow-hidden">
      <motion.div
        animate={{ x: [from, to] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        className="flex shrink-0 items-center gap-10"
      >
        {doubled.map((logo, i) => (
          <div
            key={`${logo.slug}-${i}`}
            className="group flex shrink-0 items-center gap-2.5 rounded-xl border border-border/40 bg-background/60 px-4 py-2.5 shadow-[0_1px_4px_rgba(0,0,0,0.04)] backdrop-blur-sm transition-all duration-200 hover:border-border hover:bg-background hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://cdn.simpleicons.org/${logo.slug}`}
              alt={logo.name}
              width={18}
              height={18}
              className="size-[18px] shrink-0 opacity-60  transition-all duration-200 group-hover:opacity-100 group-hover:grayscale-0 "
              loading="lazy"
              decoding="async"
            />
            <span className="font-display text-sm font-semibold tracking-[-0.02em] text-muted-foreground/70 transition-colors duration-200 group-hover:text-foreground">
              {logo.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function LogoStrip() {
  return (
    <section className="overflow-hidden border-y border-border/40 bg-muted/30 px-4 py-10 md:py-14">
      <div className="">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: smoothEase }}
          className="mb-8 text-center text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground"
        >
          Trusted by candidates interviewing at top companies
        </motion.p>

        <div className="relative space-y-3">
          {/* Fade masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-muted/60 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-muted/60 to-transparent" />

          <LogoRow logos={row1} direction="left" duration={30} />
          <LogoRow logos={row2} direction="right" duration={26} />
          <LogoRow logos={row3} direction="left" duration={34} />
        </div>
      </div>
    </section>
  );
}
