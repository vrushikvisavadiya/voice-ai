import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { BillingPeriod } from "@/components/upgrade/BillingToggle";

export interface Plan {
  name: string;
  description: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  highlighted?: boolean;
  current?: boolean;
  talkToSales?: boolean;
}

interface PlanCardProps {
  plan: Plan;
  billing: BillingPeriod;
}

function formatPrice(
  monthlyPrice: number | null,
  annualPrice: number | null,
  billing: BillingPeriod,
) {
  if (monthlyPrice === null || annualPrice === null) {
    return {
      value: "$0",
      suffix: "",
    };
  }

  if (billing === "annual") {
    return {
      value: `$${annualPrice}`,
      suffix: "/mo",
    };
  }

  return {
    value: `$${monthlyPrice}`,
    suffix: "/mo",
  };
}

export function PlanCard({ plan, billing }: PlanCardProps) {
  const price = formatPrice(plan.monthlyPrice, plan.annualPrice, billing);

  return (
    <Card
      className={cn(
        "relative flex h-full flex-col rounded-[32px] border bg-card shadow-none transition-colors",
        plan.highlighted ? "border-primary/40" : "border-border",
      )}
    >
      <CardHeader className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              {plan.name}
            </h3>
            <p className="text-sm leading-6 text-muted-foreground">
              {plan.description}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            {plan.highlighted ? (
              <Badge className="rounded-full px-3 py-1">Most Popular</Badge>
            ) : null}

            {plan.current ? (
              <Badge
                variant="secondary"
                className="rounded-full px-3 py-1 text-xs"
              >
                Your current plan
              </Badge>
            ) : null}
          </div>
        </div>

        <div className="pt-2">
          <div className="flex items-end gap-1">
            <span className="text-4xl font-semibold tracking-tight text-foreground">
              {price.value}
            </span>
            {price.suffix ? (
              <span className="pb-1 text-sm text-muted-foreground">
                {price.suffix}
              </span>
            ) : null}
          </div>

          {billing === "annual" && plan.annualPrice !== null ? (
            <p className="mt-2 text-sm text-muted-foreground">
              Billed annually, equivalent monthly price shown.
            </p>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">
              Straightforward pricing with no hidden fees.
            </p>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 px-6 pb-0">
        <ul className="space-y-3">
          {plan.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 text-sm leading-6 text-muted-foreground"
            >
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-muted">
                <Check className="size-3.5 text-foreground" />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="flex flex-col items-stretch gap-4 p-6">
        <Button
          asChild
          variant={plan.highlighted ? "default" : "outline"}
          className="h-11 rounded-2xl"
        >
          <Link href={plan.ctaHref}>{plan.ctaLabel}</Link>
        </Button>

        {plan.talkToSales ? (
          <Link
            href="/contact-sales"
            className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Talk to sales
          </Link>
        ) : (
          <span className="text-sm text-transparent">.</span>
        )}
      </CardFooter>
    </Card>
  );
}
