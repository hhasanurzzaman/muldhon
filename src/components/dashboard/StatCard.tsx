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
    <Card className="relative h-[76px] overflow-hidden px-[18px] py-[14px] pr-[76px]">
      <div
        className={`absolute right-[23px] top-[19px] h-[37px] w-[37px] rounded-[9px] ${metric.iconBgClass}`}
        aria-hidden
      />

      <div>
        <p className="text-[12px] font-medium leading-none text-[var(--muldhon-text)]">
          {metric.label}
        </p>
        <p className="mt-[7px] text-[22px] font-bold leading-none text-[var(--muldhon-text)]">
          {metric.value}
        </p>
      </div>

      {metric.trend && (
        <p
          className={`mt-[5px] text-[11px] font-semibold leading-none ${
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
