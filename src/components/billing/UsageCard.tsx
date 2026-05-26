import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface UsageMetric {
  label: string;
  usedLabel: string;
  progress: number;
  showProgress: boolean;
}

interface UsageCardProps {
  metrics: UsageMetric[];
}

export function UsageCard({ metrics }: UsageCardProps) {
  return (
    <Card className="rounded-[28px] border-border shadow-none">
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight text-foreground">
          Usage
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-2xl border border-border bg-background p-4"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <p className="text-sm font-medium text-foreground">
                {metric.usedLabel}
              </p>
            </div>

            {metric.showProgress ? (
              <div className="mt-4">
                <Progress value={metric.progress} className="h-2" />
              </div>
            ) : null}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
