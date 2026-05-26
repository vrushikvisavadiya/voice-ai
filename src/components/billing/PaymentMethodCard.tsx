import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

interface PaymentMethodCardProps {
  brand: string;
  last4: string;
  expiry: string;
}

export function PaymentMethodCard({
  brand,
  last4,
  expiry,
}: PaymentMethodCardProps) {
  return (
    <Card className="rounded-[28px] border-border shadow-none">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-lg font-semibold tracking-tight text-foreground">
            Payment method
          </CardTitle>
        </div>

        <div className="flex size-10 items-center justify-center rounded-full border border-border bg-background">
          <CreditCard className="size-4 text-foreground" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="rounded-2xl border border-border bg-background p-4">
          <p className="text-sm text-muted-foreground">
            {brand} ending in {last4}
          </p>
          <p className="mt-2 text-base font-medium text-foreground">
            Expires {expiry}
          </p>
        </div>

        <Button variant="outline" className="rounded-2xl">
          Update payment method
        </Button>
      </CardContent>
    </Card>
  );
}
