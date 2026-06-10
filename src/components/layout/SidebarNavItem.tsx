"use client";

/**
 * Single sidebar link with active-state styling from the mockup.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/config/navigation";

interface SidebarNavItemProps {
  item: NavItem;
}

export function SidebarNavItem({ item }: SidebarNavItemProps) {
  const pathname = usePathname();
  const isActive =
    item.href === "/"
      ? pathname === "/"
      : pathname === item.href || pathname.startsWith(`${item.href}/`);

  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={`flex items-center gap-3 rounded-[9px] px-3 py-[9px] text-[13px] font-medium transition-colors ${
        isActive
          ? "bg-[var(--muldhon-green-light)] text-[var(--muldhon-green-dark)]"
          : "text-[#858585] hover:bg-gray-50"
      }`}
    >
      <Icon
        className={`h-[17px] w-[17px] shrink-0 ${
          isActive ? "text-[var(--muldhon-green-dark)]" : "text-[#8a8a8a]"
        }`}
        strokeWidth={1.75}
      />
      {item.label}
    </Link>
  );
}
