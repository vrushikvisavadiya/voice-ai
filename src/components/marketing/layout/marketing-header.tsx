"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
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
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Features", href: "/#features" },
  { label: "FAQ", href: "/#faq" },
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
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="size-10 rounded-full border border-border/60 bg-background/70 backdrop-blur-sm hover:bg-accent"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "sun" : "moon"}
          initial={{ opacity: 0, rotate: -30, scale: 0.85 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 30, scale: 0.85 }}
          transition={{ duration: 0.2 }}
          className="inline-flex"
        >
          {isDark ? (
            <SunMedium className="size-4.5" />
          ) : (
            <Moon className="size-4.5" />
          )}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}

function Brand() {
  return (
    <Link href="/" className="group inline-flex items-center gap-3">
      <div className="relative flex size-11 items-center justify-center overflow-hidden rounded-2xl border border-border/60 bg-foreground text-background shadow-sm transition-transform duration-300 group-hover:scale-[1.03]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),_transparent_45%)] opacity-80" />
        <Mic className="relative z-10 size-5" />
      </div>

      <div className="flex flex-col">
        <span className="text-sm font-semibold tracking-tight text-foreground">
          VoiceCoach AI
        </span>
        <span className="text-xs text-muted-foreground">
          Voice interview practice
        </span>
      </div>
    </Link>
  );
}

export function MarketingHeader() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 px-4 pt-4 md:px-6"
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative flex h-16 items-center justify-between rounded-full border border-border/60 bg-background/72 px-3 shadow-[0_8px_40px_-18px_rgba(0,0,0,0.25)] backdrop-blur-xl md:h-[72px] md:px-4">
          <Brand />

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-border/50 bg-background/60 p-1 backdrop-blur md:flex">
            {navigation.map((item) => {
              const active = isActive(pathname, item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {active ? (
                    <motion.span
                      layoutId="marketing-nav-pill"
                      className="absolute inset-0 rounded-full bg-accent"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  ) : null}
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
              className="rounded-full border border-transparent px-4 text-sm text-muted-foreground hover:border-border/60 hover:bg-background/80 hover:text-foreground"
            >
              <Link href="/login">Sign in</Link>
            </Button>

            <Button
              asChild
              className="group rounded-full px-5 shadow-[0_12px_30px_-12px_rgba(90,72,255,0.55)]"
            >
              <Link href="/signup">
                Start free
                <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <MobileMenu pathname={pathname} />
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
        <Button
          variant="ghost"
          size="icon"
          className="size-10 rounded-full border border-border/60 bg-background/70 backdrop-blur-sm"
          aria-label="Open navigation menu"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[90%] border-l border-border/60 bg-background/95 px-0 backdrop-blur-xl sm:max-w-sm"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-2xl bg-foreground text-background">
                <Mic className="size-4.5" />
              </div>
              <div>
                <p className="text-sm font-semibold tracking-tight">
                  VoiceCoach AI
                </p>
                <p className="text-xs text-muted-foreground">
                  Interview practice
                </p>
              </div>
            </div>

            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-9 rounded-full"
                aria-label="Close navigation menu"
              >
                <X className="size-4.5" />
              </Button>
            </SheetClose>
          </div>

          <div className="flex flex-1 flex-col px-5 py-6">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="size-3.5" />
              Practice smarter with voice AI
            </div>

            <div className="flex flex-col gap-2">
              {navigation.map((item, index) => {
                const active = isActive(pathname, item.href);

                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.05 + index * 0.05,
                      duration: 0.35,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <SheetClose asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium transition-colors",
                          active
                            ? "border-primary/20 bg-primary/10 text-foreground"
                            : "border-border/60 bg-card text-muted-foreground hover:text-foreground",
                        )}
                      >
                        <span>{item.label}</span>
                        {active ? (
                          <span className="size-2 rounded-full bg-primary" />
                        ) : null}
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
                  className="h-11 w-full rounded-full"
                >
                  <Link href="/login">Sign in</Link>
                </Button>
              </SheetClose>

              <SheetClose asChild>
                <Button asChild className="h-11 w-full rounded-full">
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
