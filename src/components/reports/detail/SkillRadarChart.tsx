"use client";

import * as React from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SkillRadarItem {
  skill: string;
  score: number;
}

interface SkillRadarChartProps {
  data: SkillRadarItem[];
}

export function SkillRadarChart({ data }: SkillRadarChartProps) {
  const [compareAverage, setCompareAverage] = React.useState(false);

  const chartData = data.map((item) => ({
    skill: item.skill,
    session: item.score,
    average: Math.max(55, item.score - 6),
  }));

  return (
    <Card className="rounded-[32px] border-border shadow-none">
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <CardTitle className="text-lg font-semibold tracking-tight">
            Skill Profile
          </CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            Based on this session
          </p>
        </div>

        <Button
          variant={compareAverage ? "secondary" : "outline"}
          className="rounded-2xl"
          onClick={() => setCompareAverage((current) => !current)}
        >
          Compare to your average
        </Button>
      </CardHeader>

      <CardContent>
        <div className="h-[340px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData}>
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis
                dataKey="skill"
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              />

              <Radar
                name="This session"
                dataKey="session"
                stroke="var(--primary)"
                fill="var(--primary)"
                fillOpacity={0.14}
                strokeWidth={2}
              />

              {compareAverage ? (
                <Radar
                  name="Average"
                  dataKey="average"
                  stroke="var(--muted-foreground)"
                  fill="var(--muted-foreground)"
                  fillOpacity={0.08}
                  strokeWidth={2}
                />
              ) : null}
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
