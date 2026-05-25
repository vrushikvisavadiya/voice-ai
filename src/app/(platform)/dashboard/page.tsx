import { PageHeading } from "@/components/shared/PageHeading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <PageHeading
          title="Welcome back"
          description="Practice smarter with role-specific AI interview sessions."
        />
        <Button asChild className="rounded-xl">
          <Link href="/interview/new">Start New Interview</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-3xl">
          <CardHeader>
            <CardDescription>Total Sessions</CardDescription>
            <CardTitle className="text-3xl">12</CardTitle>
          </CardHeader>
        </Card>

        <Card className="rounded-3xl">
          <CardHeader>
            <CardDescription>Average Score</CardDescription>
            <CardTitle className="text-3xl">78%</CardTitle>
          </CardHeader>
        </Card>

        <Card className="rounded-3xl">
          <CardHeader>
            <CardDescription>Current Plan</CardDescription>
            <CardTitle className="flex items-center gap-2 text-3xl">
              Free <Badge>2 left</Badge>
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle>Continue preparing</CardTitle>
            <CardDescription>
              Use your actual job description to generate a tailored mock
              interview.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="rounded-xl">
              <Link href="/interview/new">Paste Job Description</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>Your last three mock interviews.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-2xl border p-3">
              <p className="font-medium">Frontend Developer</p>
              <p className="text-sm text-muted-foreground">Score: 81%</p>
            </div>
            <div className="rounded-2xl border p-3">
              <p className="font-medium">React Native Engineer</p>
              <p className="text-sm text-muted-foreground">Score: 74%</p>
            </div>
            <div className="rounded-2xl border p-3">
              <p className="font-medium">Full Stack Developer</p>
              <p className="text-sm text-muted-foreground">Score: 79%</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
