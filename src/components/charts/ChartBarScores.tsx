"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { category: "Confidence", score: 82 },
  { category: "Clarity", score: 76 },
  { category: "Relevance", score: 88 },
  { category: "STAR", score: 69 },
];

const chartConfig = {
  score: {
    label: "Score",
    color: "var(--chart-2)",
  },
};

export function ChartBarScores() {
  return (
    <ChartContainer config={chartConfig} className="h-[240px] w-full">
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{ left: 8, right: 8 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="category"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Bar dataKey="score" fill="var(--chart-2)" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}
