/**
 * Type definitions for dashboard data models.
 * Replace mock data with API responses when backend is ready.
 */

export interface StatMetric {
  id: string;
  label: string;
  value: string;
  /** Optional month-over-month trend, e.g. "+12% this month" */
  trend?: {
    text: string;
    direction: "up" | "down";
  };
  /** Tailwind background class for the icon square */
  iconBgClass: string;
}

export interface InvestmentChartPoint {
  month: string;
  amount: number;
}

export interface ProjectListItem {
  id: string;
  name: string;
  budgetBdt: number;
  userName: string;
  verified?: boolean;
}

export interface ActivityItem {
  id: string;
  description: string;
  timeAgo: string;
}

export interface StatusRow {
  label: string;
  value: string | number;
  /** Highlight value in green (e.g. Server Online) */
  valueHighlight?: "success";
}
