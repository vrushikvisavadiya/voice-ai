"use client";

import { Play, Pause, Square } from "lucide-react";

interface TimeTrackerCardProps {
  timerString: string;
  isRunning: boolean;
  onToggleTimer: () => void;
  onStopTimer: () => void;
}

export function TimeTrackerCard({
  timerString,
  isRunning,
  onToggleTimer,
  onStopTimer,
}: TimeTrackerCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/95 to-primary/80 p-6 text-primary-foreground shadow-sm flex flex-col justify-between min-h-[220px]">
      {/* Abstract Background Visual */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg
          className="w-full h-full"
          viewBox="0 0 300 200"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M -20 80 Q 80 160 180 60 T 320 120"
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
          />
          <path
            d="M -20 120 Q 100 40 220 140 T 340 60"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
          />
        </svg>
      </div>

      {/* Header Title */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-xs font-semibold tracking-wide opacity-90">
          Practice Session Timer
        </span>
      </div>

      {/* Timer Counter */}
      <div className="relative z-10 my-4 text-center">
        <span className="font-mono text-4xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-xs">
          {timerString}
        </span>
      </div>

      {/* Controls Footer */}
      <div className="relative z-10 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={onToggleTimer}
          aria-label={isRunning ? "Pause timer" : "Play timer"}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-primary shadow-md hover:scale-105 active:scale-95 transition-all"
        >
          {isRunning ? (
            <Pause className="h-5 w-5 fill-current" />
          ) : (
            <Play className="h-5 w-5 fill-current ml-0.5" />
          )}
        </button>

        <button
          type="button"
          onClick={onStopTimer}
          aria-label="Stop timer"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-600 text-white shadow-md hover:scale-105 active:scale-95 transition-all"
        >
          <Square className="h-4 w-4 fill-current" />
        </button>
      </div>
    </div>
  );
}
