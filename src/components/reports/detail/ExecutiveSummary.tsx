import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { ScoreRingLarge } from "@/components/reports/detail/ScoreRingLarge";
import { CategoryBars } from "@/components/reports/detail/CategoryBars";

interface ExecutiveSummaryProps {
  score: number;
  grade: string;
  categories: {
    communication: number;
    technical: number;
    confidence: number;
    relevance: number;
  };
  strengths: string[];
  improvements: string[];
}

function getSummaryText(score: number) {
  if (score >= 90) {
    return "Excellent interview performance with strong readiness for similar roles.";
  }

  if (score >= 70) {
    return "Solid performance overall, with a clear foundation and a few focused areas to improve.";
  }

  if (score >= 50) {
    return "A fair performance with promising signals, but more structured practice is needed.";
  }

  return "This session shows meaningful gaps that can improve with targeted repetition and clearer answer structure.";
}

export function ExecutiveSummary({
  score,
  grade,
  categories,
  strengths,
  improvements,
}: ExecutiveSummaryProps) {
  return (
    <Card className="overflow-hidden rounded-[32px] border border-border bg-card shadow-none">
      <CardContent className="p-0">
        <div className="grid gap-0 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="border-b border-border bg-background/60 p-6 lg:border-b-0 lg:border-r lg:p-8">
            <div className="flex h-full flex-col items-center justify-center text-center lg:items-start lg:text-left">
              <ScoreRingLarge score={score} grade={grade} />

              <div className="mt-6 space-y-2">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Overall assessment
                </p>
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  {grade} performance
                </h2>
                <p className="max-w-xs text-sm leading-6 text-muted-foreground">
                  {getSummaryText(score)}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 lg:p-8">
            <div className="grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
              <div className="space-y-5">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    Category breakdown
                  </p>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    How this session scored across core signals
                  </h3>
                </div>

                <div className="rounded-[24px] border border-border bg-background p-5">
                  <CategoryBars categories={categories} />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-1">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-emerald-600" />
                    <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground">
                      Strengths
                    </h3>
                  </div>

                  <ul className="space-y-3">
                    {strengths.map((item) => (
                      <li
                        key={item}
                        className="border-l border-emerald-500/20 pl-4 text-sm leading-6 text-muted-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="size-4 text-amber-600" />
                    <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground">
                      Areas to improve
                    </h3>
                  </div>

                  <ul className="space-y-3">
                    {improvements.map((item) => (
                      <li
                        key={item}
                        className="border-l border-amber-500/20 pl-4 text-sm leading-6 text-muted-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
