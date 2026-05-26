"use client";

import * as React from "react";
import { PlanCard, type Plan } from "@/components/upgrade/PlanCard";
import {
  BillingToggle,
  type BillingPeriod,
} from "@/components/upgrade/BillingToggle";
import { PricingFAQ } from "@/components/upgrade/PricingFAQ";

const plans: Plan[] = [
  {
    name: "Free",
    description: "Best for getting started with AI interview practice.",
    monthlyPrice: null,
    annualPrice: null,
    features: [
      "3 interviews per month",
      "Basic AI feedback",
      "No reports export",
      "Core interview practice experience",
    ],
    ctaLabel: "Current Plan",
    ctaHref: "/dashboard",
    current: true,
  },
  {
    name: "Pro",
    description:
      "For serious candidates who want unlimited practice and deeper feedback.",
    monthlyPrice: 19,
    annualPrice: 15,
    features: [
      "Unlimited interviews",
      "Full AI feedback",
      "PDF export",
      "Complete interview history",
      "Priority support",
    ],
    ctaLabel: "Upgrade to Pro",
    ctaHref: "/checkout/pro",
    highlighted: true,
  },
  {
    name: "Team",
    description:
      "For teams running structured coaching, hiring, or shared interview workflows.",
    monthlyPrice: 49,
    annualPrice: 39,
    features: [
      "Everything in Pro",
      "Team analytics",
      "Shared reports",
      "Admin dashboard",
      "Centralized member management",
    ],
    ctaLabel: "Upgrade to Team",
    ctaHref: "/checkout/team",
    talkToSales: true,
  },
];

export default function UpgradePage() {
  const [billing, setBilling] = React.useState<BillingPeriod>("monthly");

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <section className="flex max-w-3xl flex-col items-center text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Choose your plan
          </h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
            Pick the plan that matches how often you practice. Upgrade anytime
            to unlock more interviews, deeper insights, and better
            collaboration.
          </p>

          <div className="mt-6">
            <BillingToggle value={billing} onChange={setBilling} />
          </div>
        </section>

        <section className="grid w-full gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} billing={billing} />
          ))}
        </section>

        <section className="w-full max-w-4xl">
          <PricingFAQ />
        </section>
      </div>
    </main>
  );
}
