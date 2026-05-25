import { Brain, Mic, FileText, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const items = [
  {
    title: "AI interviews completed",
    value: "12",
    icon: Mic,
    desc: "Voice-based role-specific mock sessions",
  },
  {
    title: "Average AI score",
    value: "78%",
    icon: Brain,
    desc: "Combined clarity, structure, and relevance",
  },
  {
    title: "Reports generated",
    value: "9",
    icon: FileText,
    desc: "Detailed AI coaching summaries",
  },
  {
    title: "Weekly improvement",
    value: "+11%",
    icon: TrendingUp,
    desc: "Better answers across recent sessions",
  },
];

export function DashboardStats() {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <Card key={item.title} className="rounded-3xl py-0">
            <CardContent className="p-5">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{item.title}</p>
                <h3 className="text-3xl font-semibold tracking-tight">
                  {item.value}
                </h3>
                <p className="text-xs leading-5 text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
