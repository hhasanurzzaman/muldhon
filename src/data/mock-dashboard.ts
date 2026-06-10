/**
 * Mock dashboard data — swap with fetch/API calls in production.
 */

import type {
  ActivityItem,
  InvestmentChartPoint,
  ProjectListItem,
  StatMetric,
  StatusRow,
} from "@/types/dashboard";

export const statMetrics: StatMetric[] = [
  {
    id: "reg-investors",
    label: "Reg Investors",
    value: "500",
    trend: { text: "+12% this month", direction: "up" },
    iconBgClass: "bg-[#bdf2d4]",
  },
  {
    id: "reg-entrepreneurs",
    label: "Reg Entrepreneurs",
    value: "500",
    trend: { text: "-2% this month", direction: "down" },
    iconBgClass: "bg-[#dfe4f8]",
  },
  {
    id: "active-investors",
    label: "Active Investors",
    value: "500",
    iconBgClass: "bg-[#fbff78]",
  },
  {
    id: "pending",
    label: "Pending",
    value: "500",
    iconBgClass: "bg-[#fffec9]",
  },
  {
    id: "total-project",
    label: "Total Project",
    value: "500",
    iconBgClass: "bg-[#ffe7da]",
  },
  {
    id: "rejected-project",
    label: "Rejected project",
    value: "500",
    iconBgClass: "bg-[#ffc6cd]",
  },
];

export const investmentSummary = {
  label: "Total investment",
  value: "5000000 BDT",
  trend: "+25% increased then the last month",
};

export const investmentChartData: InvestmentChartPoint[] = [
  { month: "Jan", amount: 1500000 },
  { month: "Feb", amount: 2300000 },
  { month: "Mar", amount: 1650000 },
  { month: "Apr", amount: 1200000 },
  { month: "May", amount: 850000 },
  { month: "Jun", amount: 2600000 },
  { month: "Jul", amount: 3500000 },
  { month: "Aug", amount: 4000000 },
  { month: "Sep", amount: 5600000 },
];

export const projectsList: ProjectListItem[] = [
  {
    id: "1",
    name: "Organic Agro farming",
    budgetBdt: 150000,
    userName: "Mr. Khaled Hasan",
    verified: true,
  },
  {
    id: "2",
    name: "Green Tech Solution",
    budgetBdt: 250000,
    userName: "MD. Forid Chowdhury",
    verified: true,
  },
  {
    id: "3",
    name: "Bangladesh IT Institution for future",
    budgetBdt: 100000,
    userName: "Mr. Boditul Alam",
    verified: true,
  },
  {
    id: "4",
    name: "Bangladesh Agriculture Association",
    budgetBdt: 500000,
    userName: "Mrs. Tasmia Jaman",
    verified: true,
  },
];

export const recentActivity: ActivityItem[] = [
  {
    id: "1",
    description: "new project has been approved",
    timeAgo: "2 days ago",
  },
  {
    id: "2",
    description: "new transection 2 lac BDT has been made",
    timeAgo: "2 days ago",
  },
  {
    id: "3",
    description: "new intrapreneur has been added by milan",
    timeAgo: "2 days ago",
  },
  {
    id: "4",
    description: "new project has been approved",
    timeAgo: "2 days ago",
  },
];

export const projectStatusRows: StatusRow[] = [
  { label: "Pending", value: 100 },
  { label: "Approved", value: 50 },
  { label: "Live", value: 10 },
  { label: "Closed", value: 40 },
];

export const systemStatusRows: StatusRow[] = [
  { label: "Total Users", value: 2000 },
  { label: "Active Users", value: 1000 },
];

export const currentUser = {
  name: "Arghya Biswas",
  avatarUrl: "/avatar-placeholder.png",
};
