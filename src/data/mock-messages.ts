import type { MessageThread } from "@/types/admin";
import type { StatMetric } from "@/types/dashboard";

export const messageStats: StatMetric[] = [
  { id: "inbox", label: "Inbox", value: "86", trend: { text: "+14 today", direction: "up" }, iconBgClass: "bg-[#bdf2d4]" },
  { id: "unread", label: "Unread", value: "12", trend: { text: "4 priority", direction: "down" }, iconBgClass: "bg-[#fffec9]" },
  { id: "resolved", label: "Resolved", value: "220", trend: { text: "+31 closed", direction: "up" }, iconBgClass: "bg-[#dfe4f8]" },
];

export const messageThreads: MessageThread[] = [
  {
    id: "MSG-1",
    participant: "Khaled Hasan",
    role: "Entrepreneur",
    subject: "Need help uploading trade license",
    preview: "The document upload is showing pending. Can admin verify it?",
    unread: true,
    updatedAt: "Today 4:10 PM",
    messages: [
      { id: "1", sender: "User", body: "The document upload is showing pending. Can admin verify it?", time: "4:10 PM" },
      { id: "2", sender: "Admin", body: "Thanks for reaching out. Please share the updated license copy here.", time: "4:12 PM" },
    ],
  },
  {
    id: "MSG-2",
    participant: "Micheal Keny",
    role: "Investor",
    subject: "Payment confirmation request",
    preview: "I sent 120,000 BDT through bank transfer today.",
    unread: true,
    updatedAt: "Today 1:45 PM",
    messages: [
      { id: "1", sender: "User", body: "I sent 120,000 BDT through bank transfer today.", time: "1:45 PM" },
      { id: "2", sender: "Admin", body: "We received the request and are reviewing the bank reference.", time: "1:55 PM" },
    ],
  },
  {
    id: "MSG-3",
    participant: "Tasmia Jaman",
    role: "Entrepreneur",
    subject: "Project category update",
    preview: "Please change the project category to Fisheries.",
    unread: false,
    updatedAt: "Yesterday",
    messages: [
      { id: "1", sender: "User", body: "Please change the project category to Fisheries.", time: "Yesterday" },
      { id: "2", sender: "Admin", body: "Updated successfully. Your project is now under Fisheries.", time: "Yesterday" },
    ],
  },
];
