import { DashboardHero } from "@/sections/dashboard/DashboardHero";
import { DashboardStats } from "@/sections/dashboard/DashboardStats";
import { InterviewActivityChart } from "@/sections/dashboard/InterviewActivityChart";
import { AIInsightsPanel } from "@/sections/dashboard/AIInsightsPanel";
import { RecentSessions } from "@/sections/dashboard/RecentSessions";
import { UpcomingInterviewCard } from "@/sections/dashboard/UpcomingInterviewCard";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardHero />
      <DashboardStats />
      <InterviewActivityChart />

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <AIInsightsPanel />
        <UpcomingInterviewCard />
      </section>

      <RecentSessions />
    </div>
  );
}
