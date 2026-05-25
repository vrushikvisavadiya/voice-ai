import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="px-6 py-20 md:px-10 lg:px-16">
      <section className="mx-auto flex min-h-[80vh] max-w-7xl items-center">
        <div className="max-w-4xl space-y-8">
          <span className="inline-flex rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground">
            AI Voice Interview Practice
          </span>

          <div className="space-y-5">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              Practice the exact interview for your next job
            </h1>

            <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              Paste a job description, answer realistic AI-led interview
              questions by voice, and get instant coaching with a detailed
              performance report.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-xl">
              <Link href="/signup">Start Free</Link>
            </Button>

            <Button asChild size="lg" variant="outline" className="rounded-xl">
              <Link href="/dashboard">See App UI</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
