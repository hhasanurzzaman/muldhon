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
    <Card className="relative h-[86px] overflow-hidden px-5 py-[15px] pr-[84px] transition-shadow hover:shadow-[0_8px_22px_rgba(17,24,39,0.14)]">
      <div
        className={`absolute right-6 top-1/2 h-11 w-11 -translate-y-1/2 rounded-[11px] ${metric.iconBgClass}`}
        aria-hidden
      />

      <div>
        <p className="text-[12px] font-medium leading-none text-[var(--muldhon-text-muted)]">
          {metric.label}
        </p>
        <p className="mt-[7px] text-[25px] font-bold leading-none text-[var(--muldhon-text)]">
          {metric.value}
        </p>
      </div>

      {metric.trend && (
        <p
          className={`mt-[6px] text-[11px] font-semibold leading-none ${
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
