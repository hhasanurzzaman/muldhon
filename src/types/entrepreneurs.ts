/**
 * Entrepreneurs page data models.
 */

export type ApplicationTab = "pending" | "accepted" | "rejected" | "live";

export interface EntrepreneurApplicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  avatarUrl?: string;
  status: ApplicationTab;
}

export interface EntrepreneurAccount {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}
