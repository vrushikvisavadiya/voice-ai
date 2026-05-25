import Link from "next/link";
import { Mic } from "lucide-react";

export function AppLogo() {
  return (
    <Link href="/dashboard" className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
        <Mic className="h-5 w-5" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold leading-none">
          VoiceCoach AI
        </span>
        <span className="text-xs text-muted-foreground leading-none mt-1">
          Interview Practice Platform
        </span>
      </div>
    </Link>
  );
}
