import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Mic,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Volume2,
  Star,
} from "lucide-react";

interface AuthSplitLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

const featureHighlights = [
  "Role-specific interview generation from any job link or description.",
  "Real-time voice AI practice with instant feedback on clarity & pacing.",
  "Comprehensive STAR method scoring & structured improvement reports.",
];

export function AuthSplitLayout({
  title,
  subtitle,
  children,
}: AuthSplitLayoutProps) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-12 bg-background font-sans text-foreground">
      {/* Left Column - Form Container */}
      <section className="col-span-12 lg:col-span-6 xl:col-span-5 flex flex-col justify-between p-6 sm:p-10 xl:p-14 overflow-y-auto border-r border-border/40">
        <div>
          {/* Top Brand Bar */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5 text-sm font-semibold tracking-tight text-foreground transition-opacity hover:opacity-90"
            >
              <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-primary/90 to-primary/70 text-primary-foreground shadow-sm shadow-primary/25">
                <Mic className="size-4" />
              </div>
              <div className="flex flex-col">
                <span className="leading-none font-bold">Crack My Interview</span>
                <span className="text-[10px] text-muted-foreground font-normal">AI Mock Practice</span>
              </div>
            </Link>

            <Link
              href="/"
              className="group inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Back to home</span>
            </Link>
          </div>

          {/* Form Header */}
          <div className="mt-10 sm:mt-14 mb-8 space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              {title}
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {subtitle}
            </p>
          </div>

          {/* Form Slot */}
          <div className="w-full">{children}</div>
        </div>

        {/* Security / Compliance Footer */}
        <div className="mt-10 pt-6 border-t border-border/50 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-400" />
            <span>256-Bit SSL Encrypted & Private</span>
          </div>
          <span>&copy; {new Date().getFullYear()} Crack My Interview Inc.</span>
        </div>
      </section>

      {/* Right Column - Clean Image & Minimal Showcase Canvas */}
      <aside className="relative hidden lg:flex lg:col-span-6 xl:col-span-7 flex-col justify-between overflow-hidden bg-zinc-950 p-10 xl:p-14 text-white border-l border-zinc-800/60 select-none">
        {/* Background Showcase Image */}
        <Image
          src="/auth-showcase-bg.jpg"
          alt="Candidate practicing mock interview on Crack My Interview platform"
          fill
          priority
          className="object-cover object-center opacity-85 scale-100 transition-transform duration-700 hover:scale-105 pointer-events-none"
        />

        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/30 to-zinc-950/60 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-950/40 via-transparent to-zinc-950/70 pointer-events-none" />

        {/* Visual Canvas Top Header */}
        <div className="relative z-10 flex items-center justify-between">
          <Badge className="gap-2 rounded-full border border-emerald-500/40 bg-zinc-950/70 px-3.5 py-1.5 text-xs font-medium text-emerald-300 backdrop-blur-md shadow-lg">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            Crack My Interview
          </Badge>
        </div>

        {/* Minimal Floating Glassmorphic AI Active Session Pill at Bottom */}
        <div className="relative z-10 mt-auto pt-8">
          <div className="rounded-3xl border border-white/20 bg-zinc-950/65 p-4 sm:p-5 backdrop-blur-xl shadow-2xl space-y-3 max-w-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  <Volume2 className="size-4 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Live Mock Session</h4>
                  <p className="text-[11px] text-zinc-400">Real-time Audio Feedback</p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <TrendingUp className="size-3" />
                <span>94% Score</span>
              </div>
            </div>

            {/* Audio Waveform */}
            <div className="flex items-center justify-between bg-zinc-900/80 rounded-2xl px-3.5 py-2 border border-white/10">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-rose-500 animate-ping" />
                <span className="text-xs text-zinc-300 font-medium">Candidate Speaking...</span>
              </div>

              <div className="flex items-center gap-1 h-4">
                <span className="w-1 bg-indigo-400 rounded-full h-2 animate-[pulse_0.8s_ease-in-out_infinite]" />
                <span className="w-1 bg-indigo-400 rounded-full h-4 animate-[pulse_0.6s_ease-in-out_infinite_0.1s]" />
                <span className="w-1 bg-indigo-400 rounded-full h-2 animate-[pulse_1.0s_ease-in-out_infinite_0.2s]" />
                <span className="w-1 bg-indigo-400 rounded-full h-3 animate-[pulse_0.7s_ease-in-out_infinite_0.3s]" />
                <span className="w-1 bg-indigo-400 rounded-full h-4 animate-[pulse_0.5s_ease-in-out_infinite_0.15s]" />
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}



