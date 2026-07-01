"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex size-10 items-center justify-center rounded-full border border-border/60 bg-background/70 text-muted-foreground backdrop-blur-md transition-all duration-300 hover:border-border hover:bg-background hover:text-foreground"
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

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = lastScrollY.current;
    const diff = current - previous;

    if (current > 80 && diff > 0) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    setScrolled(current > 16);
    lastScrollY.current = current;
  });

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: hidden ? -110 : 0,
        opacity: 1,
      }}
      transition={{
        y: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.3, ease: "easeOut" },
      }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="px-4 pt-3 md:px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            animate={{
              y: scrolled ? 0 : 2,
              scale: scrolled ? 0.985 : 1,
              backgroundColor: scrolled
                ? "color-mix(in oklch, var(--background) 84%, transparent)"
                : "color-mix(in oklch, var(--background) 68%, transparent)",
              borderColor: scrolled
                ? "color-mix(in oklch, var(--border) 72%, transparent)"
                : "color-mix(in oklch, var(--border) 38%, transparent)",
              boxShadow: scrolled
                ? "0 18px 50px -18px rgba(0,0,0,0.18)"
                : "0 8px 24px -16px rgba(0,0,0,0.12)",
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative flex h-[64px] items-center justify-between rounded-[22px] border px-3 backdrop-blur-xl md:px-4"
          >
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="group flex shrink-0 items-center gap-3 rounded-2xl px-2 py-1.5"
              >
                <div className="flex size-9 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[0_10px_24px_-10px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-[1.06]">
                  <Mic className="size-4" />
                </div>
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[15px] font-semibold tracking-tight text-foreground">
                    VoiceCoach AI
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    Practice with precision
                  </span>
                </div>
              </Link>
            </div>

            <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center rounded-full border border-border/50 bg-background/60 p-1 backdrop-blur-md md:flex">
              {navigation.map((item) => {
                const active = isActive(pathname, item.href);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-200",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full bg-muted"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="hidden items-center gap-2 md:flex">
              <ThemeToggle />

              <Button
                asChild
                variant="ghost"
                size="sm"
                className="rounded-full px-4"
              >
                <Link href="/login">Sign in</Link>
              </Button>

              <Button
                asChild
                variant="animated"
                size="lg"
                className="rounded-full px-5"
              >
                <Link href="/signup" className="flex items-center gap-1">
                  Start free
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover/button:translate-x-0.5" />
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-2 md:hidden">
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
          className="flex size-10 items-center justify-center rounded-full border border-border/60 bg-background/70 text-muted-foreground backdrop-blur-md transition-all duration-300 hover:border-border hover:bg-background hover:text-foreground"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[90%] border-l border-border/60 bg-background/96 px-0 backdrop-blur-2xl sm:max-w-sm"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border/50 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Mic className="size-4" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-semibold text-foreground">
                  VoiceCoach AI
                </span>
                <span className="mt-1 text-[11px] text-muted-foreground">
                  Practice with precision
                </span>
              </div>
            </div>

            <SheetClose asChild>
              <button
                type="button"
                className="flex size-10 items-center justify-center rounded-full border border-border/60 bg-background/70 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Close menu"
              >
                <X className="size-4.5" />
              </button>
            </SheetClose>
          </div>

          <div className="flex flex-1 flex-col px-5 py-5">
            <div className="mb-6 inline-flex items-center gap-2 self-start rounded-full border border-primary/20 bg-primary/8 px-3 py-1.5 text-xs font-medium text-primary">
              <Sparkles className="size-3.5" />
              AI-powered interview coach
            </div>

            <div className="flex flex-col gap-2">
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
                          "flex items-center justify-between rounded-2xl border px-4 py-3.5 text-sm font-medium transition-all",
                          active
                            ? "border-primary/20 bg-primary/8 text-foreground"
                            : "border-transparent text-muted-foreground hover:border-border/60 hover:bg-muted/60 hover:text-foreground",
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

            <div className="mt-auto space-y-3 pt-8">
              <SheetClose asChild>
                <Button
                  asChild
                  variant="outline"
                  size="xl"
                  className="w-full rounded-2xl"
                >
                  <Link href="/login">Sign in</Link>
                </Button>
              </SheetClose>

              <SheetClose asChild>
                <Button
                  asChild
                  variant="animated-primary"
                  size="xl"
                  className="w-full rounded-2xl"
                >
                  <Link href="/signup" className="flex items-center gap-1">
                    Start free
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover/button:translate-x-0.5" />
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
