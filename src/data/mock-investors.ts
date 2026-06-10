import type { StatMetric } from "@/types/dashboard";
import type { EntrepreneurAccount, EntrepreneurApplicant } from "@/types/entrepreneurs";

export const investorStatMetrics: StatMetric[] = [
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
    id: "pending",
    label: "Pending",
    value: "500",
    iconBgClass: "bg-[#fffec9]",
  },
];

export const investorApplicants: EntrepreneurApplicant[] = [
  {
    id: "1",
    name: "11/7/16",
    email: "example@gmail.com",
    phone: "+880-1627441627",
    date: "9/4/12",
    status: "pending",
  },
  {
    id: "2",
    name: "Floyd Miles",
    email: "example@gmail.com",
    phone: "+880-1734665585",
    date: "12/10/13",
    status: "pending",
  },
  {
    id: "3",
    name: "Wade Warren",
    email: "example@gmail.com",
    phone: "+880-1541604548",
    date: "1/15/12",
    status: "pending",
  },
  {
    id: "4",
    name: "Courtney Henry",
    email: "example@gmail.com",
    phone: "+880-1819753642",
    date: "5/27/15",
    status: "pending",
  },
];

export const investorAccounts: EntrepreneurAccount[] = [
  { id: "a1", name: "Guy Hawkins", email: "example@gmail.com" },
  { id: "a2", name: "Micheal Keny", email: "example@gmail.com" },
  { id: "a3", name: "Arafat Hossain", email: "example@gmail.com" },
  { id: "a4", name: "Guy Hawkins", email: "example@gmail.com" },
];
