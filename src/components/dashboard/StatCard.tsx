/**
 * Small metric card (Reg Investors, Pending, etc.) — top-left grid.
 */

import { Card } from "@/components/ui/Card";
import type { StatMetric } from "@/types/dashboard";

interface StatCardProps {
  metric: StatMetric;
}

export function StatCard({ metric }: StatCardProps) {
  return (
    <Card className="relative h-[96px] overflow-hidden px-5 py-5 pr-[88px] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(15,23,42,0.09)]">
      <div
        className={`absolute right-6 top-1/2 h-12 w-12 -translate-y-1/2 rounded-[14px] shadow-inner ${metric.iconBgClass}`}
        aria-hidden
      />

      <div>
        <p className="text-[12px] font-semibold leading-none text-[var(--muldhon-text-muted)]">
          {metric.label}
        </p>
        <p className="mt-2 text-[27px] font-bold leading-none text-[var(--muldhon-text)]">
          {metric.value}
        </p>
      </div>

      {metric.trend && (
        <p
          className={`mt-2 text-[11px] font-semibold leading-none ${
            metric.trend.direction === "up"
              ? "text-[var(--muldhon-green)]"
              : "text-red-500"
          }`}
        >
          {metric.trend.text}
        </p>
      )}
    </Card>
  );
}
