import { cn } from "@/lib/utils";

interface WaveformVisualizerProps {
  mode: "speaking" | "listening" | "processing";
}

const bars = ["h-4", "h-7", "h-10", "h-6", "h-12", "h-8", "h-5"];

export function WaveformVisualizer({ mode }: WaveformVisualizerProps) {
  const isSpeaking = mode === "speaking";
  const isListening = mode === "listening";
  const isProcessing = mode === "processing";

  return (
    <div className="relative flex min-h-[260px] w-full items-center justify-center">
      <div
        className={cn(
          "absolute size-[140px] rounded-full border transition-all duration-500",
          isSpeaking && "border-primary/30 scale-105",
          isListening && "border-chart-2/30 scale-100",
          isProcessing && "border-muted-foreground/20 scale-95",
        )}
      />

      <div
        className={cn(
          "relative z-10 flex size-24 items-center justify-center rounded-full border bg-card/70 backdrop-blur-md transition-all duration-500",
          isSpeaking &&
            "border-primary/30 shadow-[0_0_30px_rgba(124,58,237,0.18)]",
          isListening &&
            "border-chart-2/30 shadow-[0_0_30px_rgba(0,158,221,0.16)]",
          isProcessing && "border-muted-foreground/20",
        )}
      >
        <div
          className={cn(
            "flex size-12 items-center justify-center rounded-full transition-all duration-500",
            isSpeaking && "bg-primary animate-pulse",
            isListening && "bg-chart-2 animate-pulse",
            isProcessing && "bg-muted-foreground/40 animate-pulse",
          )}
        >
          <div className="size-3 rounded-full bg-white/90" />
        </div>
      </div>

      <div className="absolute top-[calc(50%+72px)] flex items-end gap-1.5">
        {bars.map((height, index) => (
          <span
            key={`${height}-${index}`}
            className={cn(
              "w-1.5 rounded-full transition-all duration-300",
              height,
              isSpeaking && "bg-primary/80 animate-pulse",
              isListening && "bg-chart-2/80 animate-bounce",
              isProcessing && "bg-muted-foreground/40",
            )}
          />
        ))}
      </div>
    </div>
  );
}
