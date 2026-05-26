"use client";

import * as React from "react";
import { CurrentPlanCard } from "@/components/billing/CurrentPlanCard";
import { UsageCard } from "@/components/billing/UsageCard";
import { PaymentMethodCard } from "@/components/billing/PaymentMethodCard";
import {
  InvoiceTable,
  type InvoiceItem,
} from "@/components/billing/InvoiceTable";
import { CancelDialog } from "@/components/billing/CancelDialog";

const invoices: InvoiceItem[] = [
  {
    id: "inv_001",
    date: "May 01, 2026",
    description: "Voice AI Interview Coach Pro — Monthly",
    amount: "$19.00",
    status: "Paid",
  },
  {
    id: "inv_002",
    date: "Apr 01, 2026",
    description: "Voice AI Interview Coach Pro — Monthly",
    amount: "$19.00",
    status: "Paid",
  },
  {
    id: "inv_003",
    date: "Mar 01, 2026",
    description: "Voice AI Interview Coach Pro — Monthly",
    amount: "$19.00",
    status: "Paid",
  },
  {
    id: "inv_004",
    date: "Feb 01, 2026",
    description: "Voice AI Interview Coach Pro — Monthly",
    amount: "$19.00",
    status: "Paid",
  },
  {
    id: "inv_005",
    date: "Jan 01, 2026",
    description: "Voice AI Interview Coach Pro — Monthly",
    amount: "$19.00",
    status: "Paid",
  },
];

export default function BillingPage() {
  const [cancelOpen, setCancelOpen] = React.useState(false);

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Billing
          </h1>
          <p className="text-sm leading-6 text-muted-foreground sm:text-base">
            Manage your subscription and payment details
          </p>
        </header>

        <CurrentPlanCard
          planName="Pro"
          status="Active"
          nextBillingDate="June 01, 2026"
          amount="$19/mo"
          onCancel={() => setCancelOpen(true)}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <UsageCard
            metrics={[
              {
                label: "Interviews used this month",
                usedLabel: "8 / Unlimited",
                progress: 0,
                showProgress: false,
              },
              {
                label: "Reports generated",
                usedLabel: "8",
                progress: 64,
                showProgress: true,
              },
            ]}
          />

          <PaymentMethodCard brand="Visa" last4="4242" expiry="08/2028" />
        </div>

        <InvoiceTable invoices={invoices} />
      </div>

      <CancelDialog
        open={cancelOpen}
        onOpenChange={setCancelOpen}
        onConfirm={() => setCancelOpen(false)}
      />
    </main>
  );
}
