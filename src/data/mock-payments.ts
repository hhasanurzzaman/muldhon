import type { AdminPayment } from "@/types/admin";
import type { StatMetric } from "@/types/dashboard";

export const paymentStats: StatMetric[] = [
  { id: "volume", label: "Total Volume", value: "8.2 lac", trend: { text: "+25% this month", direction: "up" }, iconBgClass: "bg-[#bdf2d4]" },
  { id: "pending", label: "Pending", value: "18", trend: { text: "Needs review", direction: "down" }, iconBgClass: "bg-[#fffec9]" },
  { id: "success", label: "Successful", value: "412", trend: { text: "+32 paid", direction: "up" }, iconBgClass: "bg-[#dfe4f8]" },
  { id: "refunds", label: "Refunds", value: "7", trend: { text: "-3 fewer", direction: "up" }, iconBgClass: "bg-[#ffc6cd]" },
];

export const adminPayments: AdminPayment[] = [
  { id: "PAY-8492", payer: "Arghya Biswas", project: "Organic Agro Farming", method: "bKash", amountBdt: 50000, status: "completed", date: "Today 4:20 PM" },
  { id: "PAY-8491", payer: "Micheal Keny", project: "Green Tech Solution", method: "Bank Transfer", amountBdt: 120000, status: "pending", date: "Today 1:45 PM" },
  { id: "PAY-8488", payer: "Guy Hawkins", project: "Smart Fishery Hub", method: "Nagad", amountBdt: 25000, status: "failed", date: "Yesterday" },
  { id: "PAY-8479", payer: "Wade Warren", project: "Bangladesh IT Institution", method: "Card", amountBdt: 75000, status: "refunded", date: "08 Jun 2026" },
  { id: "PAY-8468", payer: "Nusrat Jahan", project: "Women Craft Marketplace", method: "Rocket", amountBdt: 32000, status: "completed", date: "06 Jun 2026" },
];
