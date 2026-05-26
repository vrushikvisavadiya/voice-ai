import { cn } from "@/lib/utils";

interface WaveformVisualizerProps {
  mode: "speaking" | "listening" | "processing";
}

const barHeights = [
  "h-7",
  "h-11",
  "h-16",
  "h-10",
  "h-14",
  "h-[72px]",
  "h-10",
  "h-[58px]",
  "h-8",
];

export function WaveformVisualizer({ mode }: WaveformVisualizerProps) {
  return (
    <div className="flex items-end justify-center gap-2 rounded-full border border-border bg-card/80 px-6 py-8 backdrop-blur-sm sm:px-10">
      {barHeights.map((height, index) => (
        <span
          key={`${height}-${index}`}
          className={cn(
            "w-2 rounded-full transition-all duration-300",
            height,
            mode === "speaking" && "bg-primary/80 animate-pulse",
            mode === "listening" && "bg-chart-2/80 animate-bounce",
            mode === "processing" && "bg-muted-foreground/50",
          )}
        />
      ))}
    </div>
  );
}
