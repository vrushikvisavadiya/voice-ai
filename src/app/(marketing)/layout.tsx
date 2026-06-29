import type { ReactNode } from "react";
import { MarketingHeader } from "@/components/marketing/layout/marketing-header";
import { MarketingFooter } from "@/components/marketing/layout/marketing-footer";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-x-hidden bg-background text-foreground">
      <MarketingHeader />
      <main>{children}</main>
      <MarketingFooter />
    </div>
  );
}
