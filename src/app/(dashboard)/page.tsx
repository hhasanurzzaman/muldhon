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

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(570px,1fr)_minmax(480px,0.94fr)]">
        <div className="mx-auto flex w-full max-w-[720px] min-w-0 flex-col gap-6 xl:mx-0 xl:max-w-none">
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {statMetrics.map((metric) => (
              <StatCard key={metric.id} metric={metric} />
            ))}
          </section>

          <ProjectsCard projects={projectsList} />
        </div>

        <div className="mx-auto flex w-full max-w-[680px] min-w-0 flex-col gap-6 xl:mx-0 xl:max-w-none">
          <InvestmentChartCard
            label={investmentSummary.label}
            value={investmentSummary.value}
            trend={investmentSummary.trend}
            data={investmentChartData}
          />

          <RecentActivityCard items={recentActivity} />

          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <StatusListCard title="Project Status" rows={projectStatusRows} />
            <SystemStatusCard />
          </section>
        </div>
      </div>
    </>
  );
}
