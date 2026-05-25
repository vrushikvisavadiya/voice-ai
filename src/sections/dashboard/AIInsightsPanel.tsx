import { BrainCircuit, MessageSquareQuote, Target } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const insights = [
  {
    title: "AI insight: strong technical relevance",
    desc: "Your answers align well with frontend and React-focused job descriptions.",
    icon: Target,
  },
  {
    title: "AI insight: improve STAR structure",
    desc: "Behavioural answers still need clearer situation and result framing.",
    icon: MessageSquareQuote,
  },
  {
    title: "AI insight: communication is improving",
    desc: "The model detects fewer filler words in your recent interview attempts.",
    icon: BrainCircuit,
  },
];

export function AIInsightsPanel() {
  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle>AI coaching insights</CardTitle>
        <CardDescription>
          Signals generated from your recent voice interview sessions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className="rounded-2xl border p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
