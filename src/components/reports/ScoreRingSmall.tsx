import { cn } from "@/lib/utils";

interface ScoreRingSmallProps {
  score: number;
  className?: string;
}

function getScoreColor(score: number) {
  if (score >= 90) return "stroke-emerald-500 text-emerald-600";
  if (score >= 70) return "stroke-blue-500 text-blue-600";
  if (score >= 50) return "stroke-amber-500 text-amber-600";
  return "stroke-red-500 text-red-600";
}

export function ScoreRingSmall({ score, className }: ScoreRingSmallProps) {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(score, 100));
  const dashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={cn(
        "relative flex size-12 items-center justify-center",
        className,
      )}
      aria-label={`Overall score ${score}`}
    >
      <svg
        viewBox="0 0 48 48"
        className="size-12 -rotate-90"
        role="img"
        aria-hidden="true"
      >
        <circle
          cx="24"
          cy="24"
          r={radius}
          className="fill-none stroke-border"
          strokeWidth="4"
        />
        <circle
          cx="24"
          cy="24"
          r={radius}
          className={cn(
            "fill-none transition-all duration-500",
            getScoreColor(score),
          )}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
        />
      </svg>

      <span className="absolute text-[11px] font-semibold tabular-nums text-foreground">
        {score}
      </span>
    </div>
  );
}
