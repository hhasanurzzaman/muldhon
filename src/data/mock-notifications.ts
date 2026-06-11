import type { AdminNotification } from "@/types/admin";
import type { StatMetric } from "@/types/dashboard";

export const notificationStats: StatMetric[] = [
  { id: "sent", label: "Sent Today", value: "42", trend: { text: "+8 alerts", direction: "up" }, iconBgClass: "bg-[#bdf2d4]" },
  { id: "unread", label: "Unread", value: "18", trend: { text: "Needs action", direction: "down" }, iconBgClass: "bg-[#fffec9]" },
  { id: "system", label: "System Alerts", value: "6", trend: { text: "Stable", direction: "up" }, iconBgClass: "bg-[#dfe4f8]" },
];

export const adminNotifications: AdminNotification[] = [
  { id: "NTF-1", title: "New project approved", body: "Organic Agro Farming has moved to funding stage.", category: "Project", audience: "Entrepreneurs", read: false, sentAt: "Today 3:50 PM" },
  { id: "NTF-2", title: "Payment pending review", body: "Bank transfer from Micheal Keny needs confirmation.", category: "Payment", audience: "Investors", read: false, sentAt: "Today 1:55 PM" },
  { id: "NTF-3", title: "Account verification completed", body: "Tasmia Jaman profile is now verified.", category: "Account", audience: "Entrepreneurs", read: true, sentAt: "Yesterday" },
  { id: "NTF-4", title: "Scheduled maintenance", body: "Dashboard maintenance window starts Friday night.", category: "System", audience: "All users", read: true, sentAt: "08 Jun 2026" },
];
