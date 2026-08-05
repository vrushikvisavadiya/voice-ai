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
  ChevronDown,
  Menu,
  Mic,
  Moon,
  SunMedium,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SplitCtaButton } from "@/components/ui/split-cta-button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigation = [
  { label: "Platform", href: "/" },
  {
    label: "Solutions",
    href: "/#solutions",
    hasDropdown: true,
  },
  { label: "Success Stories", href: "/#success-stories" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Resources", href: "/#resources" },
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
      className="flex size-9 items-center justify-center rounded-full border border-border/60 bg-background/80 text-muted-foreground transition-all duration-300 hover:bg-muted hover:text-foreground"
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
          {isDark ? <SunMedium className="size-4" /> : <Moon className="size-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export function MarketingHeader() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    setScrolled(current > 14);
  });

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300 py-3 px-4 md:px-8"
    >
      {/* ── Animated Border Outer Wrapper ── */}
      <div className="mx-auto max-w-6xl relative group">
        {/* Animated Gradient Shimmer Line */}
        <div className="absolute -inset-[1px] rounded-2xl md:rounded-full bg-gradient-to-r from-primary/20 via-primary to-primary/20 opacity-70 blur-[2px] transition-all duration-1000 animate-pulse group-hover:opacity-100 group-hover:blur-[4px]" />

        {/* Outer Border Box */}
        <div className="relative rounded-2xl md:rounded-full p-[1.5px] bg-gradient-to-r from-primary/40 via-primary/80 to-primary/40 overflow-hidden shadow-lg shadow-primary/5">
          {/* Rotating Conic Shimmer Beam */}
          <div className="absolute -inset-[200%] animate-[spin_5s_linear_infinite] opacity-60 bg-[conic-gradient(from_0deg,transparent_0_300deg,var(--color-primary)_330deg,transparent_360deg)]" />

          {/* Inner Content Bar */}
          <div
            className={cn(
              "relative flex h-[62px] items-center justify-between px-4 sm:px-6 rounded-2xl md:rounded-full transition-all duration-300",
              scrolled
                ? "bg-background/90 backdrop-blur-xl"
                : "bg-background/80 backdrop-blur-md"
            )}
          >
            {/* Brand Logo */}
            <Link href="/" className="group/logo flex shrink-0 items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform duration-300 group-hover/logo:scale-105">
                <Mic className="size-4" />
              </div>
              <span className="text-base font-bold tracking-tight text-foreground">
                VoiceCoach<span className="text-primary">AI</span>
              </span>
            </Link>

            {/* Center Navigation */}
            <nav className="hidden items-center gap-7 lg:flex">
              {navigation.map((item) => {
                const active = isActive(pathname, item.href);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 text-[13.5px] font-medium transition-colors duration-200",
                      active
                        ? "text-primary font-semibold"
                        : "text-foreground/80 hover:text-primary"
                    )}
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && <ChevronDown className="size-3.5 opacity-60" />}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Area */}
            <div className="hidden items-center gap-3 sm:flex">
              <ThemeToggle />

              <Link
                href="/login"
                className="text-[13.5px] font-medium text-foreground/80 transition-colors hover:text-foreground px-2"
              >
                Login
              </Link>

              {/* Common Split CTA Button */}
              <SplitCtaButton href="/signup" label="Request a Demo" size="default" />
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 sm:hidden">
              <ThemeToggle />
              <MobileMenu pathname={pathname} />
            </div>
          </div>
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
          className="flex size-9 items-center justify-center rounded-full border border-border/60 bg-background/80 text-muted-foreground transition-all duration-300 hover:bg-muted hover:text-foreground"
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
            <div className="flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Mic className="size-4" />
              </div>
              <span className="text-base font-bold text-foreground">
                VoiceCoach<span className="text-primary">AI</span>
              </span>
            </div>

            <SheetClose asChild>
              <button
                type="button"
                className="flex size-9 items-center justify-center rounded-full border border-border/60 bg-background/70 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Close menu"
              >
                <X className="size-4" />
              </button>
            </SheetClose>
          </div>

          <div className="flex flex-1 flex-col px-5 py-6">
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
                          "flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition-all",
                          active
                            ? "border-primary/20 bg-primary/8 text-foreground font-semibold"
                            : "border-transparent text-muted-foreground hover:border-border/60 hover:bg-muted/60 hover:text-foreground"
                        )}
                      >
                        <span>{item.label}</span>
                        {item.hasDropdown && <ChevronDown className="size-4 opacity-50" />}
                      </Link>
                    </SheetClose>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-auto space-y-3 pt-8">
              <SheetClose asChild>
                <Button asChild variant="outline" size="lg" className="w-full rounded-full">
                  <Link href="/login">Login</Link>
                </Button>
              </SheetClose>

              <SheetClose asChild>
                <SplitCtaButton href="/signup" label="Request a Demo" size="lg" className="w-full justify-center" />
              </SheetClose>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}