/**
 * Entrepreneurs page — stats, application management, accounts grid.
 */

import { ApplicationManagementCard } from "@/components/entrepreneurs/ApplicationManagementCard";
import { AccountsCard } from "@/components/entrepreneurs/AccountsCard";
import { AccountsDetailPanel } from "@/components/entrepreneurs/AccountsDetailPanel";
import { StatCard } from "@/components/dashboard/StatCard";
import {
  entrepreneurAccounts,
  entrepreneurApplicants,
  entrepreneurStatMetrics,
} from "@/data/mock-entrepreneurs";
import { createPageMetadata } from "@/lib/create-page";

export const metadata = createPageMetadata("Entrepreneurs");

export default function EntrepreneursPage() {
  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {entrepreneurStatMetrics.map((metric) => (
          <StatCard key={metric.id} metric={metric} />
        ))}
      </section>

      <section>
        <ApplicationManagementCard applicants={entrepreneurApplicants} />
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <AccountsCard accounts={entrepreneurAccounts} />
        <AccountsDetailPanel />
      </section>
    </div>
  );
}
