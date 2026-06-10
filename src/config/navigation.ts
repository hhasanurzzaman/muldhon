/**
 * Sidebar navigation configuration for the Muldhon admin panel.
 * Centralize routes here so Sidebar and breadcrumbs stay in sync.
 */

import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BarChart3,
  Bell,
  Briefcase,
  CreditCard,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";

/** Single navigable item in the sidebar */
export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

/** Grouped section (Management, Communication, etc.) */
export interface NavGroup {
  title: string;
  items: NavItem[];
}

/** Standalone dashboard link (not inside a group) */
export const dashboardNavItem: NavItem = {
  label: "Dashboard",
  href: "/",
  icon: LayoutDashboard,
};

/** All sidebar groups below the dashboard link */
export const navigationGroups: NavGroup[] = [
  {
    title: "Management",
    items: [
      { label: "Investors", href: "/investors", icon: Users },
      { label: "Entrepreneurs", href: "/entrepreneurs", icon: Briefcase },
      { label: "Projects", href: "/projects", icon: FileText },
      { label: "Payments", href: "/payments", icon: CreditCard },
    ],
  },
  {
    title: "Communication",
    items: [
      { label: "Notifications", href: "/notifications", icon: Bell },
      { label: "Messages", href: "/messages", icon: MessageSquare },
    ],
  },
  {
    title: "Analytics",
    items: [
      { label: "Reports", href: "/reports", icon: BarChart3 },
      { label: "Activity logs", href: "/activity-logs", icon: Activity },
    ],
  },
  {
    title: "System",
    items: [{ label: "Settings", href: "/settings", icon: Settings }],
  },
];

/** Flat list of every href for active-state checks */
export const allNavHrefs: string[] = [
  dashboardNavItem.href,
  ...navigationGroups.flatMap((g) => g.items.map((i) => i.href)),
];
