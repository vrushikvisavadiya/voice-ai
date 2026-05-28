import Link from "next/link";
import { Mic } from "lucide-react";

export function MarketingFooter() {
  return (
    <footer className="px-4 pb-8 pt-4 md:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[2rem] border border-border/60 bg-card px-6 py-8 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-foreground text-background">
            <Mic className="size-5" />
          </div>
          <div>
            <p className="font-semibold tracking-tight">VoiceCoach AI</p>
            <p className="text-sm text-muted-foreground">
              Practice better. Interview calmer.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
          <Link href="#">Features</Link>
          <Link href="#">Pricing</Link>
          <Link href="#">FAQ</Link>
          <Link href="#">Privacy</Link>
          <Link href="#">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
