"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import {
  LayoutDashboard,
  FileText,
  Database,
  Inbox,
  Users,
  BarChart2,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

import "swiper/css";
import "swiper/css/effect-fade";

const smoothEase = [0.16, 1, 0.3, 1] as const;

const tabs = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    image:
      "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/8843bc13926047fe95ab5682392d60a3bcb23ffd.jpg",
    title: "Performance at a glance",
    description:
      "Track every metric that matters — scores, session trends, and readiness signals — in one clean view.",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart2,
    image:
      "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/c0af30b7fe18c327067dad0be1621f9e03342c14.jpg",
    title: "Deep performance insights",
    description:
      "Understand exactly where you improve over time — clarity, structure, and confidence charted clearly.",
  },
  {
    id: "sessions",
    label: "Sessions",
    icon: Database,
    image:
      "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/955711d2c972016aa48488ecb566830dfd6df712.jpg",
    title: "Full session history",
    description:
      "Every past mock interview stored and searchable — replay transcripts, review scores, spot patterns.",
  },
  {
    id: "feedback",
    label: "Feedback",
    icon: Inbox,
    image:
      "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/b4390086af08dca43c751906faffa1a32b84b8b9.jpg",
    title: "Instant AI feedback",
    description:
      "Receive actionable, line-by-line coaching right after each answer — not a vague score.",
  },
  {
    id: "team",
    label: "Team",
    icon: Users,
    image:
      "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/a7541c3bb5724ed036a89b48fa8a9ff81134f4f7.jpg",
    title: "Collaborative coaching",
    description:
      "Invite your career coach or mentor. Share sessions, leave comments, and improve together.",
  },
  {
    id: "templates",
    label: "Templates",
    icon: FileText,
    image:
      "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/12bf9018f3f0aa4e50d5bac8812145dbc59e0e11.jpg",
    title: "Role-specific question banks",
    description:
      "Curated question sets for PM, SWE, Design, Data, and more — tailored to companies you target.",
  },
  {
    id: "ai",
    label: "AI Integration",
    icon: Zap,
    image:
      "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/b6c41ae041abaf4dcbe82b7e16eb023b48d0cbfe.jpg",
    title: "Plug in your job description",
    description:
      "Paste any JD and the AI instantly generates a bespoke interview — questions, scoring rubric, and all.",
  },
];

export function FeatureShowcaseSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleTabClick = useCallback((index: number) => {
    const swiper = swiperRef.current;
    if (!swiper) return;
    swiper.slideTo(index);
    swiper.autoplay.stop();
    swiper.autoplay.start();
  }, []);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  const activeTab = tabs[activeIndex];

  return (
    <section className="relative overflow-hidden px-4 py-24 md:px-6 md:py-32">
      {/* ── Background gradient system ───────────────────────────── */}

      {/* Base wash — primary tint across entire section */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_100%_70%_at_50%_50%,color-mix(in_oklch,var(--primary)_8%,transparent),transparent_70%)]" />

      {/* Top-left orb */}
      <div className="pointer-events-none absolute -left-32 -top-32 -z-10 size-[600px] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--primary)_14%,transparent),transparent_65%)] blur-3xl" />

      {/* Bottom-right orb */}
      <div className="pointer-events-none absolute -bottom-24 -right-24 -z-10 size-[500px] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--primary)_10%,transparent),transparent_65%)] blur-3xl" />

      {/* Top edge fade in from previous section */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-background to-transparent" />

      {/* Bottom edge fade out to next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-background to-transparent" />

      {/* Subtle noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      <div className="mx-auto max-w-6xl">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="mb-4 flex justify-center"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-xs font-medium text-primary">
            Everything in one place
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.08, ease: smoothEase }}
          className="mb-4 text-center font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-[2.75rem] md:leading-[1.1]"
        >
          A complete interview OS,{" "}
          <span className="bg-gradient-to-r from-primary via-[oklch(0.60_0.24_290)] to-[oklch(0.70_0.20_320)] bg-clip-text text-transparent">
            built for winners.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.16, ease: smoothEase }}
          className="mx-auto mb-12 max-w-xl text-center text-base text-muted-foreground md:text-[1.05rem] md:leading-7"
        >
          Every tool you need — from first practice session to offer letter — in
          one focused workspace.
        </motion.p>

        {/* Tab strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.22, ease: smoothEase }}
          className="mb-8 grid grid-cols-4 gap-2 sm:grid-cols-7"
        >
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = index === activeIndex;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(index)}
                className={cn(
                  "group relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border px-2 py-4 text-xs font-medium transition-all duration-200",
                  isActive
                    ? "border-primary/40 bg-primary text-primary-foreground shadow-[0_4px_24px_-6px_color-mix(in_oklch,var(--primary)_50%,transparent)]"
                    : "border-primary/10 bg-background/60 text-muted-foreground backdrop-blur-sm hover:border-primary/25 hover:bg-background/90 hover:text-foreground",
                )}
              >
                {/* Progress bar */}
                {isActive && (
                  <motion.span
                    key={`progress-${activeIndex}`}
                    className="absolute bottom-0 left-0 h-[3px] rounded-full bg-primary-foreground/40"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3.5, ease: "linear" }}
                  />
                )}
                <Icon
                  className={cn(
                    "size-5 shrink-0 transition-colors",
                    isActive
                      ? "text-primary-foreground"
                      : "text-muted-foreground group-hover:text-primary",
                  )}
                />
                <span className="text-center leading-tight">{tab.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Browser frame + Swiper */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.28, ease: smoothEase }}
          className="relative mx-auto"
        >
          {/* Glow ring behind card */}
          <div className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,color-mix(in_oklch,var(--primary)_20%,transparent),transparent)] blur-2xl" />

          {/* Card */}
          <div className="relative overflow-hidden rounded-[1.5rem] border border-primary/15 bg-background/95 shadow-[0_32px_80px_-24px_rgba(0,0,0,0.22)] backdrop-blur-sm">
            {/* Chrome bar */}
            <div className="flex items-center justify-between border-b border-border/40 bg-muted/40 px-5 py-3">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="size-2.5 rounded-full bg-red-400/80" />
                  <div className="size-2.5 rounded-full bg-amber-400/80" />
                  <div className="size-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <div className="hidden items-center gap-1.5 rounded-md border border-border/50 bg-background/60 px-3 py-1 sm:flex">
                  <span className="size-2 rounded-full bg-emerald-400/80" />
                  <span className="text-[11px] text-muted-foreground/70">
                    app.voicecoach.ai
                  </span>
                </div>
              </div>
              <motion.span
                key={activeTab.id}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: smoothEase }}
                className="hidden rounded-md bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary sm:block"
              >
                {activeTab.title}
              </motion.span>
            </div>

            {/* Swiper */}
            <Swiper
              modules={[Autoplay, EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              speed={700}
              loop={true}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={handleSlideChange}
              className="aspect-[16/9] w-full"
            >
              {tabs.map((tab) => (
                <SwiperSlide key={tab.id}>
                  <div className="relative h-full w-full overflow-hidden bg-muted/30">
                    <img
                      src={tab.image}
                      alt={tab.title}
                      className="h-full w-full object-cover object-top"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/70 to-transparent" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Caption strip */}
            <div className="flex items-center justify-between border-t border-border/30 bg-muted/20 px-5 py-4">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: smoothEase }}
              >
                <p className="text-sm font-semibold text-foreground">
                  {activeTab.title}
                </p>
                <p className="mt-0.5 max-w-md text-xs text-muted-foreground">
                  {activeTab.description}
                </p>
              </motion.div>

              {/* Pill dots */}
              <div className="flex shrink-0 items-center gap-1 pl-4">
                {tabs.map((t, i) => (
                  <button
                    key={t.id}
                    onClick={() => handleTabClick(i)}
                    aria-label={`Go to ${t.label}`}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      i === activeIndex
                        ? "w-5 bg-primary"
                        : "w-1.5 bg-border hover:bg-muted-foreground/50",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
