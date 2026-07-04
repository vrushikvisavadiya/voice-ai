"use client";

import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ScoreTrendItem {
  date: string;
  score: number;
}

interface ScoreTrendChartProps {
  data: ScoreTrendItem[];
}

export function ScoreTrendChart({ data }: ScoreTrendChartProps) {
  const lastThree = data.slice(-3);
  const improvement =
    lastThree.length >= 2
      ? lastThree[lastThree.length - 1].score - lastThree[0].score
      : 0;

  const trendText =
    improvement >= 0
      ? `↑ You've improved ${improvement} points over your last 3 sessions`
      : "↓ Your score dipped slightly — keep practicing!";

  const enhancedData = data.map((item, index) => ({
    ...item,
    isCurrent: index === data.length - 1,
    label: index === data.length - 1 ? "This session" : "",
  }));

  return (
    <Card className="rounded-[32px] border-border shadow-none">
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">
          Score Trend
        </CardTitle>
        <p className="text-sm text-muted-foreground">Your last 8 sessions</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={enhancedData}
              margin={{ top: 20, right: 24, bottom: 4, left: -20 }}
            >
              <CartesianGrid
                stroke="var(--border)"
                vertical={false}
                strokeDasharray="3 3"
              />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              />
              <YAxis
                domain={[0, 100]}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              />
              <Tooltip
                cursor={{
                  stroke: "var(--border)",
                  strokeDasharray: "4 4",
                }}
                contentStyle={{
                  borderRadius: 16,
                  border: "1px solid var(--border)",
                  background: "var(--background)",
                  color: "var(--foreground)",
                }}
                formatter={(value: any) => [`${value}`, "Score"]}
                labelFormatter={(label) => `Session: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="var(--primary)"
                strokeWidth={2.5}
                dot={(props) => {
                  const { cx, cy, payload } = props;
                  if (typeof cx !== "number" || typeof cy !== "number")
                    return null;

                  if (payload?.isCurrent) {
                    return (
                      <g>
                        <circle
                          cx={cx}
                          cy={cy}
                          r={7}
                          fill="var(--background)"
                          stroke="var(--primary)"
                          strokeWidth={2.5}
                        />
                        <circle cx={cx} cy={cy} r={3.5} fill="var(--primary)" />
                      </g>
                    );
                  }

                  return <circle cx={cx} cy={cy} r={3} fill="var(--primary)" />;
                }}
                activeDot={{
                  r: 5,
                  fill: "var(--primary)",
                }}
              >
                <LabelList
                  dataKey="label"
                  position="top"
                  offset={10}
                  className="fill-foreground text-xs"
                />
              </Line>
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-border bg-background px-4 py-3 text-sm text-muted-foreground">
          {trendText}
        </div>
      </CardContent>
    </Card>
  );
}
