import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const sessions = [
  {
    role: "Frontend Developer",
    score: "81%",
    type: "AI Voice Interview",
    date: "Today",
  },
  {
    role: "React Native Engineer",
    score: "74%",
    type: "AI Voice Interview",
    date: "Yesterday",
  },
  {
    role: "Full Stack Developer",
    score: "79%",
    type: "AI Coaching Session",
    date: "2 days ago",
  },
];

export function RecentSessions() {
  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle>Recent sessions</CardTitle>
        <CardDescription>
          Your latest AI-powered mock interview attempts.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {sessions.map((item) => (
          <div
            key={`${item.role}-${item.date}`}
            className="flex items-center justify-between rounded-2xl border p-4"
          >
            <div>
              <p className="font-medium">{item.role}</p>
              <p className="text-sm text-muted-foreground">
                {item.type} · {item.date}
              </p>
            </div>
            <div className="text-sm font-semibold text-primary">
              {item.score}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
