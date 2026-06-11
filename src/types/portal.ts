export type PortalRole = "investor" | "entrepreneur";

export interface PortalProfile {
  role: PortalRole;
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  location: string;
  focus: string;
  bio: string;
  joinedAt: string;
}

export interface PortalMessage {
  id: string;
  subject: string;
  body: string;
  sender: "User" | "Admin";
  createdAt: string;
  status: "Sent" | "Read" | "Replied";
}

export interface PortalPayment {
  id: string;
  purpose: string;
  amountBdt: number;
  method: string;
  createdAt: string;
  status: "Pending" | "Completed" | "Review";
}

export interface PortalSnapshot {
  profile: PortalProfile | null;
  messages: PortalMessage[];
  payments: PortalPayment[];
}

export interface PortalRegistrationInput {
  role: PortalRole;
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  location: string;
  focus: string;
  bio: string;
}
