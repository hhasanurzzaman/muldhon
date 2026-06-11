"use client";

import { Card } from "@/components/ui/Card";
import { reportChartData, reportKpis, reportRows } from "@/data/mock-reports";
import { ArrowDownToLine, BarChart3, FileText } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function statusClass(status: string) {
  if (status === "Ready") return "bg-[#e2f8ea] text-[var(--muldhon-green-dark)]";
  if (status === "Review") return "bg-[#fffec9] text-[#8b7600]";
  return "bg-[#dfe4f8] text-[#2543a5]";
}

export function ReportsPanel() {
  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {reportKpis.map((kpi) => (
          <Card key={kpi.label} className="relative overflow-hidden p-5">
            <span className={`absolute right-5 top-5 h-12 w-12 rounded-[14px] ${kpi.tone}`} />
            <p className="pr-16 text-[12px] font-medium text-[var(--muldhon-text-muted)]">{kpi.label}</p>
            <h2 className="mt-3 pr-16 text-[25px] font-bold leading-none text-[var(--muldhon-text)]">{kpi.value}</h2>
            <p className="mt-3 text-[12px] font-semibold text-[var(--muldhon-green)]">{kpi.trend}</p>
          </Card>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
        <Card className="p-4 sm:p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-[22px] font-bold text-[var(--muldhon-text)]">Investment & Growth</h2>
              <p className="mt-2 text-[13px] text-[var(--muldhon-text-muted)]">
                Monthly admin overview for investments, projects and registered users.
              </p>
            </div>
            <button className="flex h-10 items-center justify-center gap-2 rounded-full border border-[#d8d8d8] px-5 text-[12px] font-semibold">
              Export <ArrowDownToLine className="h-4 w-4" />
            </button>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={reportChartData} margin={{ left: -18, right: 8, top: 12, bottom: 0 }}>
                <defs>
                  <linearGradient id="investmentReportGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0eaa56" stopOpacity={0.32} />
                    <stop offset="95%" stopColor="#0eaa56" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#edf1ef" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#7a7a7a" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#7a7a7a" }} />
                <Tooltip cursor={{ stroke: "#0eaa56", strokeWidth: 1 }} />
                <Area type="monotone" dataKey="investment" stroke="#0eaa56" strokeWidth={3} fill="url(#investmentReportGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-[22px] font-bold text-[var(--muldhon-text)]">Project Activity</h2>
              <p className="mt-2 text-[13px] text-[var(--muldhon-text-muted)]">Approved projects and user growth.</p>
            </div>
            <BarChart3 className="h-5 w-5 text-[var(--muldhon-green)]" />
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reportChartData} margin={{ left: -20, right: 6, top: 12, bottom: 0 }}>
                <CartesianGrid stroke="#edf1ef" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#7a7a7a" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#7a7a7a" }} />
                <Tooltip />
                <Bar dataKey="projects" fill="#8ed9ad" radius={[8, 8, 0, 0]} />
                <Bar dataKey="users" fill="#cbd5ff" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      <Card className="p-4 sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-[22px] font-bold text-[var(--muldhon-text)]">Admin Reports</h2>
            <p className="mt-2 text-[13px] text-[var(--muldhon-text-muted)]">All reports admin can review and export.</p>
          </div>
          <button className="flex h-10 items-center justify-center gap-2 rounded-full bg-[var(--muldhon-green)] px-5 text-[12px] font-semibold text-white">
            Generate Report <FileText className="h-4 w-4" />
          </button>
        </div>

        <ul className="divide-y divide-[#eeeeee]">
          {reportRows.map((row) => (
            <li key={row.id} className="grid gap-3 py-5 md:grid-cols-[minmax(0,1fr)_140px_130px_100px] md:items-center">
              <div className="min-w-0">
                <p className="truncate text-[15px] font-bold text-[var(--muldhon-text)]">{row.report}</p>
                <p className="mt-1 text-[12px] text-[var(--muldhon-text-muted)]">{row.id} · {row.owner}</p>
              </div>
              <strong className="text-[13px]">{row.metric}</strong>
              <span className={`w-fit rounded-full px-3 py-1 text-[11px] font-bold ${statusClass(row.status)}`}>{row.status}</span>
              <button className="h-9 rounded-full border border-[#d8d8d8] px-4 text-[12px] font-semibold">View</button>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
