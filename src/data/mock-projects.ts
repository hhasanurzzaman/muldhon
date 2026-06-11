import type { AdminProject } from "@/types/admin";
import type { StatMetric } from "@/types/dashboard";

export const projectStats: StatMetric[] = [
  { id: "total", label: "Total Projects", value: "128", trend: { text: "+18 this month", direction: "up" }, iconBgClass: "bg-[#bdf2d4]" },
  { id: "review", label: "Pending Review", value: "24", trend: { text: "6 urgent", direction: "down" }, iconBgClass: "bg-[#fffec9]" },
  { id: "funding", label: "Funding Live", value: "42", trend: { text: "+12% raised", direction: "up" }, iconBgClass: "bg-[#dfe4f8]" },
  { id: "completed", label: "Completed", value: "38", trend: { text: "+7 closed", direction: "up" }, iconBgClass: "bg-[#ffe7da]" },
];

export const adminProjects: AdminProject[] = [
  { id: "PRJ-1001", name: "Organic Agro Farming", owner: "Khaled Hasan", ownerType: "Entrepreneur", category: "Agriculture", requestedBdt: 150000, fundedBdt: 92000, status: "funding", submittedAt: "10 Jun 2026", risk: "Low" },
  { id: "PRJ-1002", name: "Green Tech Solution", owner: "Michael Keny", ownerType: "Investor", category: "Clean Energy", requestedBdt: 250000, fundedBdt: 250000, status: "completed", submittedAt: "08 Jun 2026", risk: "Medium" },
  { id: "PRJ-1003", name: "Smart Fishery Hub", owner: "Tasmia Jaman", ownerType: "Entrepreneur", category: "Fisheries", requestedBdt: 320000, fundedBdt: 45000, status: "pending", submittedAt: "07 Jun 2026", risk: "Low" },
  { id: "PRJ-1004", name: "Bangladesh IT Institution", owner: "Forid Chowdhury", ownerType: "Entrepreneur", category: "Education", requestedBdt: 500000, fundedBdt: 280000, status: "approved", submittedAt: "05 Jun 2026", risk: "High" },
  { id: "PRJ-1005", name: "Women Craft Marketplace", owner: "Nusrat Jahan", ownerType: "Entrepreneur", category: "Commerce", requestedBdt: 180000, fundedBdt: 0, status: "rejected", submittedAt: "02 Jun 2026", risk: "Medium" },
];
