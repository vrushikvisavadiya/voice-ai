import Link from "next/link";
import { ArrowRight, Sparkles, Mic, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function DashboardHero() {
  return (
    <Card className="overflow-hidden rounded-3xl border py-0">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_30%)] p-8 md:p-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              AI-powered interview coach
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Turn any job description into a real interview simulation
              </h2>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
                The AI asks tailored questions, listens to your answers,
                evaluates structure and relevance, and coaches you like a smart
                interviewer.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                variant="animated"
                size="lg"
                className="rounded-xl"
              >
                <Link href="/interview/new" className="flex items-center gap-1.5">
                  <Mic className="size-4" />
                  Start AI Interview
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover/button:translate-x-0.5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="animated-muted"
                size="lg"
                className="rounded-xl"
              >
                <Link href="/reports/demo-session" className="flex items-center gap-1.5">
                  <Wand2 className="size-4 text-primary" />
                  View AI Report
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
