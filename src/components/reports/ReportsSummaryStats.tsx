import { Card, CardContent } from "@/components/ui/card";

interface ReportsSummaryStatsProps {
  totalReports: number;
  averageScore: number;
  bestScore: {
    score: number;
    role: string;
    company: string;
  } | null;
  mostPracticedRole: string;
}

export function ReportsSummaryStats({
  totalReports,
  averageScore,
  bestScore,
  mostPracticedRole,
}: ReportsSummaryStatsProps) {
  const items = [
    {
      label: "Total Reports",
      value: String(totalReports),
      sublabel: "Completed interviews",
    },
    {
      label: "Average Score",
      value: String(averageScore),
      sublabel: "Across all saved reports",
    },
    {
      label: "Best Score",
      value: bestScore ? String(bestScore.score) : "—",
      sublabel: bestScore
        ? `${bestScore.role} · ${bestScore.company}`
        : "No reports yet",
    },
    {
      label: "Most Practiced Role",
      value: mostPracticedRole,
      sublabel: "Most repeated interview target",
    },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Card
          key={item.label}
          className="rounded-[28px] border-border shadow-none"
        >
          <CardContent className="p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              {item.label}
            </p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
              {item.value}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {item.sublabel}
            </p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
