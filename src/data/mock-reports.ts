import type { ReportChartPoint, ReportKpi, ReportRow } from "@/types/admin";

export const reportKpis: ReportKpi[] = [
  { label: "Total Investment", value: "82 lac BDT", trend: "+25% vs last month", tone: "bg-[#bdf2d4]" },
  { label: "Registered Users", value: "1,240", trend: "+96 new users", tone: "bg-[#dfe4f8]" },
  { label: "Active Projects", value: "128", trend: "42 in funding", tone: "bg-[#fffec9]" },
  { label: "Payment Success", value: "96.4%", trend: "+2.1% improved", tone: "bg-[#ffe7da]" },
];

export const reportChartData: ReportChartPoint[] = [
  { month: "Jan", investment: 18, projects: 22, users: 120 },
  { month: "Feb", investment: 24, projects: 28, users: 180 },
  { month: "Mar", investment: 21, projects: 31, users: 230 },
  { month: "Apr", investment: 30, projects: 44, users: 360 },
  { month: "May", investment: 46, projects: 52, users: 510 },
  { month: "Jun", investment: 62, projects: 68, users: 740 },
];

export const reportRows: ReportRow[] = [
  { id: "RPT-1", report: "Investment performance", owner: "Finance", metric: "82 lac BDT", status: "Ready" },
  { id: "RPT-2", report: "User registration growth", owner: "Operations", metric: "1,240 users", status: "Ready" },
  { id: "RPT-3", report: "Project approval cycle", owner: "Review Team", metric: "2.4 days", status: "Review" },
  { id: "RPT-4", report: "Payment dispute summary", owner: "Finance", metric: "7 refunds", status: "Draft" },
];
