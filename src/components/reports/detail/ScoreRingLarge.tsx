import { cn } from "@/lib/utils";

interface ScoreRingLargeProps {
  score: number;
  grade: string;
  className?: string;
}

function getScoreTone(score: number) {
  if (score >= 90) {
    return {
      stroke: "stroke-emerald-500",
      text: "text-emerald-600",
    };
  }

  if (score >= 70) {
    return {
      stroke: "stroke-blue-500",
      text: "text-blue-600",
    };
  }

  if (score >= 50) {
    return {
      stroke: "stroke-amber-500",
      text: "text-amber-600",
    };
  }

  return {
    stroke: "stroke-red-500",
    text: "text-red-600",
  };
}

export function ScoreRingLarge({
  score,
  grade,
  className,
}: ScoreRingLargeProps) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(score, 100));
  const dashoffset = circumference - (progress / 100) * circumference;
  const tone = getScoreTone(score);

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative flex size-[120px] items-center justify-center">
        <svg
          viewBox="0 0 120 120"
          className="-rotate-90 size-[120px]"
          role="img"
          aria-label={`Overall score ${score}`}
        >
          <circle
            cx="60"
            cy="60"
            r={radius}
            className="fill-none stroke-border"
            strokeWidth="10"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            className={cn("fill-none transition-all duration-500", tone.stroke)}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashoffset}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-semibold tracking-tight text-foreground tabular-nums">
            {score}
          </span>
        </div>
      </div>

      <p className={cn("mt-4 text-sm font-medium", tone.text)}>{grade}</p>
    </div>
  );
}
