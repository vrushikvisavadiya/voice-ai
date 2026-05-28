"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, Mic, Moon, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Use cases", href: "#use-cases" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function MarketingHeader() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 px-4 pt-4 md:px-6"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full border border-border/60 bg-background/70 px-4 shadow-sm backdrop-blur-xl md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-foreground text-background shadow-sm">
            <Mic className="size-5" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold tracking-tight">
              VoiceCoach AI
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={toggleTheme}
          >
            {resolvedTheme === "dark" ? (
              <SunMedium className="size-4.5" />
            ) : (
              <Moon className="size-4.5" />
            )}
          </Button>
          <Button variant="ghost" className="rounded-full">
            Sign in
          </Button>
          <Button className="rounded-full px-5">Start free</Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={toggleTheme}
          >
            {resolvedTheme === "dark" ? (
              <SunMedium className="size-4.5" />
            ) : (
              <Moon className="size-4.5" />
            )}
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88%] sm:w-[420px]">
              <div className="mt-10 flex flex-col gap-5">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-base font-medium text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="mt-4 flex flex-col gap-3">
                  <Button variant="outline" className="rounded-full">
                    Sign in
                  </Button>
                  <Button className="rounded-full">Start free</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
