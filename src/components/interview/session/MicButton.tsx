import { cn } from "@/lib/utils";
import { Mic, MicOff } from "lucide-react";

interface MicButtonProps {
  active: boolean;
  onClick: () => void;
}

export function MicButton({ active, onClick }: MicButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={active ? "Stop microphone" : "Start microphone"}
      className={cn(
        "flex size-16 items-center justify-center rounded-full border border-border transition-all duration-200 sm:size-20",
        active
          ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20"
          : "bg-card text-foreground hover:border-primary/40 hover:text-primary",
      )}
    >
      {active ? (
        <MicOff className="size-6 sm:size-7" />
      ) : (
        <Mic className="size-6 sm:size-7" />
      )}
    </button>
  );
}
