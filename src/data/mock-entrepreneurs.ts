/**
 * Mock data for the Entrepreneurs page — replace with API responses later.
 */

import type { EntrepreneurApplicant, EntrepreneurAccount } from "@/types/entrepreneurs";
import type { StatMetric } from "@/types/dashboard";

export const entrepreneurStatMetrics: StatMetric[] = [
  {
    id: "total-entrepreneurs",
    label: "Total Entrepreneurs",
    value: "5000",
    trend: { text: "+12% this month", direction: "up" },
    iconBgClass: "bg-[#bdf2d4]",
  },
  {
    id: "active-entrepreneurs",
    label: "Active Entrepreneurs",
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
    id: "pending-entrepreneurs",
    label: "Pending",
    value: "500",
    iconBgClass: "bg-[#fffec9]",
  },
];

export const entrepreneurApplicants: EntrepreneurApplicant[] = [
  {
    id: "1",
    name: "Jacob Jones",
    email: "jacob.jones@example.com",
    phone: "+880-1627441627",
    date: "9/4/12",
    status: "pending",
  },
  {
    id: "2",
    name: "Floyd Miles",
    email: "floyd.miles@example.com",
    phone: "+880-1627441627",
    date: "9/4/12",
    status: "pending",
  },
  {
    id: "3",
    name: "Wade Warren",
    email: "wade.warren@example.com",
    phone: "+880-1627441627",
    date: "9/4/12",
    status: "pending",
  },
  {
    id: "4",
    name: "Courtney Henry",
    email: "courtney.henry@example.com",
    phone: "+880-1627441627",
    date: "9/4/12",
    status: "pending",
  },
  {
    id: "5",
    name: "Jacob Jones",
    email: "jacob.jones@example.com",
    phone: "+880-1627441627",
    date: "9/4/12",
    status: "accepted",
  },
  {
    id: "6",
    name: "Floyd Miles",
    email: "floyd.miles@example.com",
    phone: "+880-1627441627",
    date: "9/4/12",
    status: "rejected",
  },
];

export const entrepreneurAccounts: EntrepreneurAccount[] = [
  {
    id: "a1",
    name: "Guy Hawkins",
    email: "guy.hawkins@example.com",
  },
  {
    id: "a2",
    name: "Micheal Keny",
    email: "micheal.keny@example.com",
  },
  {
    id: "a3",
    name: "Guy Hawkins",
    email: "guy.hawkins@example.com",
  },
  {
    id: "a4",
    name: "Micheal Keny",
    email: "micheal.keny@example.com",
  },
];

export const applicationTabs = [
  { id: "pending" as const, label: "Pending" },
  { id: "accepted" as const, label: "Accepted" },
  { id: "rejected" as const, label: "Rejected" },
  { id: "live" as const, label: "Live" },
];
