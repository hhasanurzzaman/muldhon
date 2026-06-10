"use client";

/**
 * Large “Total investment” card with green area chart (Recharts).
 */

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/Card";
import type { InvestmentChartPoint } from "@/types/dashboard";

interface InvestmentChartCardProps {
  label: string;
  value: string;
  trend: string;
  data: InvestmentChartPoint[];
  className?: string;
}

export function InvestmentChartCard({
  label,
  value,
  trend,
  data,
  className = "",
}: InvestmentChartCardProps) {
  return (
    <Card
      className={`flex h-[170px] flex-col overflow-hidden px-5 pb-0 pt-4 ${className}`}
    >
      <p className="text-[12px] font-medium leading-none text-[var(--muldhon-text-muted)]">
        {label}
      </p>
      <p className="mt-2 text-[26px] font-bold leading-none text-[var(--muldhon-text)]">
        {value}
      </p>
      <p className="mt-[6px] text-[12px] font-semibold leading-none text-[var(--muldhon-green)]">
        {trend}
      </p>

      <div className="-mx-3 mt-auto h-[90px] w-[calc(100%+24px)]">
        <ResponsiveContainer width="100%" height={90} minWidth={0}>
          <AreaChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="investmentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#13b66c" stopOpacity={0.82} />
                <stop offset="78%" stopColor="#13b66c" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#13b66c" stopOpacity={0.03} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" hide />
            <YAxis hide domain={["dataMin - 600000", "dataMax + 180000"]} />
            <Area
              type="linear"
              dataKey="amount"
              stroke="#0aa05a"
              strokeWidth={2.25}
              fill="url(#investmentGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
