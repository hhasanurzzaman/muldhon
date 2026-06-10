/**
 * Dashboard home — pixel-aligned grid from the Muldhon design mockup.
 */

import { InvestmentChartCard } from "@/components/dashboard/InvestmentChartCard";
import { ProjectsCard } from "@/components/dashboard/ProjectsCard";
import { RecentActivityCard } from "@/components/dashboard/RecentActivityCard";
import { StatCard } from "@/components/dashboard/StatCard";
import { StatusListCard } from "@/components/dashboard/StatusListCard";
import { SystemStatusCard } from "@/components/dashboard/SystemStatusCard";
import { PageTitle } from "@/components/ui/PageTitle";
import {
  investmentChartData,
  investmentSummary,
  projectsList,
  projectStatusRows,
  recentActivity,
  statMetrics,
} from "@/data/mock-dashboard";

export default function DashboardPage() {
  return (
    <>
      <PageTitle>Dashboard</PageTitle>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_minmax(340px,1fr)] md:gap-[17px] xl:grid-cols-[minmax(0,1fr)_minmax(366px,1fr)]">
        <div className="flex min-w-0 flex-col gap-[18px]">
          <section className="grid grid-cols-1 gap-[17px] sm:grid-cols-2">
            {statMetrics.map((metric) => (
              <StatCard key={metric.id} metric={metric} />
            ))}
          </section>

          <ProjectsCard projects={projectsList} />
        </div>

        <div className="flex min-w-0 flex-col gap-[18px]">
          <InvestmentChartCard
            label={investmentSummary.label}
            value={investmentSummary.value}
            trend={investmentSummary.trend}
            data={investmentChartData}
          />

          <RecentActivityCard items={recentActivity} />

          <section className="grid grid-cols-1 gap-[17px] sm:grid-cols-2">
            <StatusListCard title="Project Status" rows={projectStatusRows} />
            <SystemStatusCard />
          </section>
        </div>
      </div>
    </>
  );
}
