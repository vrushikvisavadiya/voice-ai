import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartAreaSessions } from "@/components/charts/ChartAreaSessions";
import { ChartBarScores } from "@/components/charts/ChartBarScores";

export function InterviewActivityChart() {
  return (
    <section className="grid gap-6 xl:grid-cols-2">
      <Card className="rounded-3xl">
        <CardHeader>
          <CardTitle>Interview activity</CardTitle>
          <CardDescription>
            AI practice sessions completed over the last 7 days.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartAreaSessions />
        </CardContent>
      </Card>

      <Card className="rounded-3xl">
        <CardHeader>
          <CardTitle>Answer quality breakdown</CardTitle>
          <CardDescription>
            How the AI is currently scoring your responses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartBarScores />
        </CardContent>
      </Card>
    </section>
  );
}
