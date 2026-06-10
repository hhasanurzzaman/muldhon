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
      className={`flex h-[156px] flex-col overflow-hidden px-[20px] pb-0 pt-[18px] ${className}`}
    >
      <p className="text-[12px] font-medium leading-none text-[var(--muldhon-text)]">
        {label}
      </p>
      <p className="mt-[11px] text-[26px] font-bold leading-none text-[var(--muldhon-text)]">
        {value}
      </p>
      <p className="mt-[7px] text-[12px] font-semibold leading-none text-[var(--muldhon-green)]">
        {trend}
      </p>

      <div className="-mx-1 mt-[4px] h-[75px] w-[calc(100%+8px)]">
        <ResponsiveContainer width="100%" height={75} minWidth={0}>
          <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="investmentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#13b66c" stopOpacity={0.78} />
                <stop offset="100%" stopColor="#13b66c" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" hide />
            <YAxis hide domain={[0, "dataMax + 1200000"]} />
            <Area
              type="linear"
              dataKey="amount"
              stroke="#0aa05a"
              strokeWidth={2}
              fill="url(#investmentGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
