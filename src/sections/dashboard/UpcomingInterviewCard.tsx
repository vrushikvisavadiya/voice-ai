import Link from "next/link";
import { CalendarClock, WandSparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function UpcomingInterviewCard() {
  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle>Next best action</CardTitle>
        <CardDescription>
          Let the AI simulate your next likely interview round.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-2xl border p-4">
          <div className="flex items-start gap-3">
            <CalendarClock className="mt-0.5 h-4 w-4 text-primary" />
            <div>
              <p className="font-medium">Behavioural round practice</p>
              <p className="mt-1 text-sm text-muted-foreground">
                The AI will focus on teamwork, ownership, and problem-solving
                questions.
              </p>
            </div>
          </div>
        </div>

        <Button asChild className="w-full rounded-xl">
          <Link href="/interview/new">
            <WandSparkles className="mr-2 h-4 w-4" />
            Generate AI Interview
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
