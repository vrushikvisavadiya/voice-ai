import type { ReactNode } from "react";
// import { MarketingFooter } from "@/components/marketing/layout/marketing-footer";
import { MarketingHeader } from "@/components/marketing/layout/marketing-header";
import { MarketingFooter } from "@/components/marketing/layout/marketing-footer";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] bg-[radial-gradient(circle_at_top,_rgba(108,92,231,0.18),_transparent_38%),radial-gradient(circle_at_top_right,_rgba(255,132,86,0.10),_transparent_25%),radial-gradient(circle_at_20%_20%,_rgba(255,255,255,0.35),_transparent_28%)] dark:bg-[radial-gradient(circle_at_top,_rgba(122,104,255,0.18),_transparent_36%),radial-gradient(circle_at_top_right,_rgba(255,132,86,0.08),_transparent_24%)]" />
      <MarketingHeader />
      <main>{children}</main>
      <MarketingFooter />
    </div>
  );
}
