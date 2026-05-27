import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

interface AuthSplitLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

const highlights = [
  "Generate a role-specific mock interview from any job description.",
  "Practice in a focused voice-first session that feels realistic.",
  "Review clear, actionable AI feedback after every attempt.",
];

export function AuthSplitLayout({
  title,
  subtitle,
  children,
}: AuthSplitLayoutProps) {
  return (
    <div className="grid h-dvh overflow-hidden lg:grid-cols-[minmax(0,1fr)_48%]">
      <section className="flex h-dvh min-h-0 items-center justify-center overflow-hidden bg-background px-4 py-4 sm:px-6 lg:px-10">
        <div className="flex h-full min-h-0 w-full max-w-md flex-col justify-center">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-3 text-sm font-medium text-foreground"
          >
            <div className="flex size-10 items-center justify-center rounded-2xl border border-border bg-card text-sm font-semibold">
              VC
            </div>
            <span>Interview Coach</span>
          </Link>

          <div className="mb-6 shrink-0 space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {title}
            </h1>
            <p className="text-sm leading-6 text-muted-foreground sm:text-base">
              {subtitle}
            </p>
          </div>

          <div className="min-h-0">{children}</div>
        </div>
      </section>

      <aside className="relative hidden h-dvh overflow-hidden border-l border-border lg:block">
        <Image
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80"
          alt="Modern workspace with laptop and collaborative desk setup"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/10" />

        <div className="relative flex h-full flex-col justify-between p-10 xl:p-14">
          <div className="space-y-5">
            <Badge className="w-fit rounded-full border-white/15 bg-white/10 px-3 py-1 text-white hover:bg-white/10">
              Voice AI Interview Coach
            </Badge>

            <div className="max-w-xl space-y-4">
              <h2 className="text-4xl font-semibold leading-tight tracking-tight text-white xl:text-5xl">
                Practice for the role you actually want.
              </h2>
              <p className="max-w-lg text-base leading-7 text-white/80">
                Turn a job description into a tailored mock interview and
                improve faster with AI-guided feedback after every session.
              </p>
            </div>
          </div>

          <div className="max-w-xl rounded-[32px] border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
            <div className="space-y-4">
              {highlights.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <CheckCircle2 className="size-3.5 text-white" />
                  </div>
                  <p className="text-sm leading-6 text-white/80">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
