/**
 * Dashboard shell layout — sidebar + main column (used by all admin routes).
 */

import { DashboardShell } from "@/components/layout/DashboardShell";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardShell>{children}</DashboardShell>;
}
