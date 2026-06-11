import type { PortalMessage, PortalPayment, PortalRole } from "@/types/portal";

export const roleLabels: Record<PortalRole, string> = {
  investor: "Investor",
  entrepreneur: "Entrepreneur",
};

export const roleHomePaths: Record<PortalRole, string> = {
  investor: "/investor/profile",
  entrepreneur: "/entrepreneur/profile",
};

export const roleFocusPlaceholder: Record<PortalRole, string> = {
  investor: "Agriculture, clean energy, women-led commerce",
  entrepreneur: "Project category or business sector",
};

export const roleHeroCopy: Record<PortalRole, { eyebrow: string; title: string; body: string }> = {
  investor: {
    eyebrow: "Investor Registration",
    title: "Create an investor profile and manage your investments.",
    body: "Register to message admins, track payments, and keep your investment preferences organized.",
  },
  entrepreneur: {
    eyebrow: "Entrepreneur Registration",
    title: "Create an entrepreneur profile and prepare your project.",
    body: "Register to contact admins, submit payment records, and manage your project information.",
  },
};

export const defaultPortalMessages: Record<PortalRole, PortalMessage[]> = {
  investor: [
    {
      id: "INV-MSG-1",
      subject: "Investment opportunity question",
      body: "I want to know which agriculture projects are open for investment this week.",
      sender: "User",
      createdAt: "Today 10:30 AM",
      status: "Replied",
    },
  ],
  entrepreneur: [
    {
      id: "ENT-MSG-1",
      subject: "Project review request",
      body: "Please review my project documents and let me know if anything is missing.",
      sender: "User",
      createdAt: "Today 9:15 AM",
      status: "Read",
    },
  ],
};

export const defaultPortalPayments: Record<PortalRole, PortalPayment[]> = {
  investor: [
    {
      id: "INV-PAY-1",
      purpose: "Organic Agro Farming investment",
      amountBdt: 50000,
      method: "bKash",
      createdAt: "Today 4:20 PM",
      status: "Completed",
    },
  ],
  entrepreneur: [
    {
      id: "ENT-PAY-1",
      purpose: "Project verification fee",
      amountBdt: 2500,
      method: "Nagad",
      createdAt: "Yesterday",
      status: "Review",
    },
  ],
};
