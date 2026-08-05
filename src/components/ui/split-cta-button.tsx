"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SplitCtaButtonProps {
  href: string;
  label?: string;
  children?: React.ReactNode;
  size?: "sm" | "default" | "lg" | "xl";
  className?: string;
}

export function SplitCtaButton({
  href,
  label = "Request a Demo",
  children,
  size = "default",
  className,
}: SplitCtaButtonProps) {
  const content = children || label;

  // Size styling map
  const sizeStyles = {
    sm: {
      container: "text-[12.5px] rounded-full font-semibold",
      text: "px-3.5 py-2",
      icon: "px-2 py-2",
      iconSize: "size-3.5",
    },
    default: {
      container: "text-[13.5px] rounded-full font-semibold",
      text: "px-4.5 py-2.5",
      icon: "px-2.5 py-2.5",
      iconSize: "size-4",
    },
    lg: {
      container: "text-sm rounded-2xl font-bold shadow-md shadow-primary/20",
      text: "px-5 py-3",
      icon: "px-3 py-3",
      iconSize: "size-4.5",
    },
    xl: {
      container: "text-sm md:text-base rounded-2xl font-bold shadow-lg shadow-primary/25",
      text: "px-6 py-3.5 md:px-7 md:py-4",
      icon: "px-3.5 py-3.5 md:px-4 md:py-4",
      iconSize: "size-5",
    },
  };

  const currentSize = sizeStyles[size] || sizeStyles.default;

  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex items-center overflow-hidden bg-primary text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]",
        currentSize.container,
        className
      )}
    >
      {/* Left label */}
      <span className={cn("whitespace-nowrap font-bold tracking-tight", currentSize.text)}>
        {content}
      </span>

      {/* Right split icon box */}
      <span
        className={cn(
          "flex items-center justify-center border-l border-primary-foreground/20 bg-primary-foreground/15 transition-colors duration-300 group-hover:bg-primary-foreground/25",
          currentSize.icon
        )}
      >
        <ArrowUpRight
          className={cn(
            "stroke-[2.5] transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-110",
            currentSize.iconSize
          )}
        />
      </span>
    </Link>
  );
}
