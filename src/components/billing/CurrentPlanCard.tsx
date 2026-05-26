import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface CurrentPlanCardProps {
  planName: string;
  status: string;
  nextBillingDate: string;
  amount: string;
  onCancel: () => void;
}

export function CurrentPlanCard({
  planName,
  status,
  nextBillingDate,
  amount,
  onCancel,
}: CurrentPlanCardProps) {
  return (
    <Card className="rounded-[28px] border-border shadow-none">
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <CardTitle className="text-lg font-semibold tracking-tight text-foreground">
            Current plan
          </CardTitle>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-2xl font-semibold tracking-tight text-foreground">
              {planName}
            </p>
            <Badge className="rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-600 hover:bg-emerald-500/10">
              {status}
            </Badge>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" className="rounded-2xl">
            <Link href="/upgrade">Change Plan</Link>
          </Button>
          <Button
            variant="ghost"
            className="rounded-2xl text-destructive hover:text-destructive"
            onClick={onCancel}
          >
            <AlertTriangle className="mr-2 size-4" />
            Cancel Subscription
          </Button>
        </div>
      </CardHeader>

      <CardContent className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-background p-4">
          <p className="text-sm text-muted-foreground">Next billing date</p>
          <p className="mt-2 text-base font-medium text-foreground">
            {nextBillingDate}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-background p-4">
          <p className="text-sm text-muted-foreground">Amount</p>
          <p className="mt-2 text-base font-medium text-foreground">{amount}</p>
        </div>
      </CardContent>
    </Card>
  );
}
