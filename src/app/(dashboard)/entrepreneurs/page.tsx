/**
 * Entrepreneurs page — stats, application management, accounts grid.
 */

import { ApplicationManagementCard } from "@/components/entrepreneurs/ApplicationManagementCard";
import { AccountsCard } from "@/components/entrepreneurs/AccountsCard";
import { AccountsDetailPanel } from "@/components/entrepreneurs/AccountsDetailPanel";
import { StatCard } from "@/components/dashboard/StatCard";
import { PageTitle } from "@/components/ui/PageTitle";
import {
  entrepreneurAccounts,
  entrepreneurApplicants,
  entrepreneurStatMetrics,
} from "@/data/mock-entrepreneurs";
import { createPageMetadata } from "@/lib/create-page";

export const metadata = createPageMetadata("Entrepreneurs");

export default function EntrepreneursPage() {
  return (
    <>
      <PageTitle>Entrepreneurs</PageTitle>

      <section className="mb-[17px] grid grid-cols-1 gap-[17px] sm:grid-cols-2 lg:grid-cols-4">
        {entrepreneurStatMetrics.map((metric) => (
          <StatCard key={metric.id} metric={metric} />
        ))}
      </section>

      <section className="mb-[17px]">
        <ApplicationManagementCard applicants={entrepreneurApplicants} />
      </section>

      <section className="grid grid-cols-1 gap-[17px] lg:grid-cols-2">
        <AccountsCard accounts={entrepreneurAccounts} />
        <AccountsDetailPanel />
      </section>
    </>
  );
}
