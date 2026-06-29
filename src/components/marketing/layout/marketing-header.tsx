"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import {
  ArrowRight,
  Menu,
  Mic,
  Moon,
  Sparkles,
  SunMedium,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigation = [
  { label: "Product", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "About", href: "/about" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return false;
  return pathname === href;
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "sun" : "moon"}
          initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 20, scale: 0.8 }}
          transition={{ duration: 0.18 }}
          className="inline-flex"
        >
          {isDark ? (
            <SunMedium className="size-4" />
          ) : (
            <Moon className="size-4" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export function MarketingHeader() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const lastScrollY = React.useRef(0);

  // Track scroll direction for hide-on-scroll-down behaviour
  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = lastScrollY.current;
    const diff = current - previous;

    // Hide header only after scrolled past hero (>80px) on scroll down
    if (current > 80 && diff > 0) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    // Glass effect kicks in after 20px
    setScrolled(current > 20);

    lastScrollY.current = current;
  });

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: hidden ? -100 : 0,
        opacity: 1,
      }}
      transition={{
        y: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.35, ease: "easeOut" },
      }}
      className="fixed inset-x-0 top-0 z-50"
    >
      {/* Outer container with padding */}
      <div className="px-4 pt-3 md:px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            animate={{
              backgroundColor: scrolled
                ? "color-mix(in oklch, var(--background) 80%, transparent)"
                : "color-mix(in oklch, var(--background) 60%, transparent)",
              borderColor: scrolled
                ? "color-mix(in oklch, var(--border) 80%, transparent)"
                : "color-mix(in oklch, var(--border) 40%, transparent)",
              boxShadow: scrolled
                ? "0 8px 32px -8px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.06) inset"
                : "0 2px 12px -4px rgba(0,0,0,0.08)",
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative flex h-[58px] items-center justify-between rounded-2xl border px-4 backdrop-blur-xl md:h-[60px] md:px-5"
          >
            {/* Brand */}
            <Link href="/" className="group flex items-center gap-2.5 shrink-0">
              <div className="flex size-8 items-center justify-center rounded-xl bg-primary shadow-[0_4px_12px_-4px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:scale-[1.06]">
                <Mic className="size-4 text-primary-foreground" />
              </div>
              <span className="text-[15px] font-semibold tracking-tight text-foreground">
                VoiceCoach AI
              </span>
            </Link>

            {/* Center nav */}
            <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 md:flex">
              {navigation.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "relative px-3.5 py-2 text-[13.5px] font-medium transition-colors duration-200",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-lg bg-muted"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 32,
                        }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right actions */}
            <div className="hidden items-center gap-1 md:flex">
              <ThemeToggle />
              <Link
                href="/login"
                className="px-4 py-2 text-[13.5px] font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Sign in
              </Link>
              <Button
                asChild
                className="h-9 rounded-xl px-4 text-[13.5px] font-semibold shadow-[0_4px_14px_-4px_rgba(0,0,0,0.35)]"
              >
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>

            {/* Mobile: theme + hamburger */}
            <div className="flex items-center gap-1 md:hidden">
              <ThemeToggle />
              <MobileMenu pathname={pathname} />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}

function MobileMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[88%] border-l border-border/60 bg-background/95 px-0 backdrop-blur-xl sm:max-w-sm"
      >
        <div className="flex h-full flex-col">
          {/* Sheet header */}
          <div className="flex items-center justify-between border-b border-border/50 px-5 py-4">
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-xl bg-primary">
                <Mic className="size-4 text-primary-foreground" />
              </div>
              <span className="text-sm font-semibold text-foreground">
                VoiceCoach AI
              </span>
            </div>
            <SheetClose asChild>
              <button
                type="button"
                className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Close menu"
              >
                <X className="size-4.5" />
              </button>
            </SheetClose>
          </div>

          <div className="flex flex-1 flex-col px-5 py-5">
            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 self-start rounded-full border border-primary/20 bg-primary/8 px-3 py-1.5 text-xs font-medium text-primary">
              <Sparkles className="size-3.5" />
              AI-powered interview coach
            </div>

            {/* Nav links */}
            <div className="flex flex-col gap-1">
              {navigation.map((item, index) => {
                const active = isActive(pathname, item.href);
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.04 + index * 0.05,
                      duration: 0.32,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <SheetClose asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                          active
                            ? "bg-primary/8 text-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}
                      >
                        <span>{item.label}</span>
                        {active && (
                          <span className="size-1.5 rounded-full bg-primary" />
                        )}
                      </Link>
                    </SheetClose>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA buttons */}
            <div className="mt-auto space-y-2.5 pt-8">
              <SheetClose asChild>
                <Button
                  asChild
                  variant="outline"
                  className="h-11 w-full rounded-xl border-border/60 text-sm"
                >
                  <Link href="/login">Sign in</Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button asChild className="h-11 w-full rounded-xl text-sm">
                  <Link href="/signup">
                    Start free
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </SheetClose>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
