export type ProjectStatus = "pending" | "approved" | "funding" | "completed" | "rejected";

export interface AdminProject {
  id: string;
  name: string;
  owner: string;
  ownerType: "Investor" | "Entrepreneur";
  category: string;
  requestedBdt: number;
  fundedBdt: number;
  status: ProjectStatus;
  submittedAt: string;
  risk: "Low" | "Medium" | "High";
}

export type PaymentStatus = "completed" | "pending" | "failed" | "refunded";

export interface AdminPayment {
  id: string;
  payer: string;
  project: string;
  method: string;
  amountBdt: number;
  status: PaymentStatus;
  date: string;
}

export interface MessageThread {
  id: string;
  participant: string;
  role: "Investor" | "Entrepreneur";
  subject: string;
  preview: string;
  unread: boolean;
  updatedAt: string;
  messages: Array<{
    id: string;
    sender: "Admin" | "User";
    body: string;
    time: string;
  }>;
}

export type NotificationCategory = "Account" | "Payment" | "Project" | "System";

export interface AdminNotification {
  id: string;
  title: string;
  body: string;
  category: NotificationCategory;
  audience: "All users" | "Investors" | "Entrepreneurs";
  read: boolean;
  sentAt: string;
}

export interface ReportKpi {
  label: string;
  value: string;
  trend: string;
  tone: string;
}

export interface ReportChartPoint {
  month: string;
  investment: number;
  projects: number;
  users: number;
}

export interface ReportRow {
  id: string;
  report: string;
  owner: string;
  metric: string;
  status: "Ready" | "Draft" | "Review";
}
