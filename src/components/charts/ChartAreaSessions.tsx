"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { day: "Mon", sessions: 2 },
  { day: "Tue", sessions: 4 },
  { day: "Wed", sessions: 3 },
  { day: "Thu", sessions: 5 },
  { day: "Fri", sessions: 4 },
  { day: "Sat", sessions: 6 },
  { day: "Sun", sessions: 3 },
];

const chartConfig = {
  sessions: {
    label: "Sessions",
    color: "hsl(var(--chart-1))",
  },
};

export function ChartAreaSessions() {
  return (
    <ChartContainer config={chartConfig} className="h-[240px] w-full">
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{ left: 8, right: 8 }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Area
          dataKey="sessions"
          type="natural"
          fill="hsl(var(--chart-1))"
          fillOpacity={0.18}
          stroke="hsl(var(--chart-1))"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  );
}
