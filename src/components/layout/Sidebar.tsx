"use client";

/**
 * Sidebar — fixed on desktop (lg+), slide-in drawer on mobile with backdrop.
 */

import { MuldhonLogo } from "@/components/brand/MuldhonLogo";
import { useSidebar } from "@/components/layout/SidebarContext";
import { SidebarNavItem } from "@/components/layout/SidebarNavItem";
import { dashboardNavItem, navigationGroups } from "@/config/navigation";
import { X } from "lucide-react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between px-7 pb-4 pt-7 lg:block">
        <MuldhonLogo />
        {onNavigate && (
          <button
            type="button"
            onClick={onNavigate}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-5 pb-6">
        <div className="mb-4 mt-1">
          <SidebarNavItem item={dashboardNavItem} />
        </div>

        {navigationGroups.map((group) => (
          <div key={group.title} className="mb-[18px]">
            <p className="mb-2 px-1 text-[12px] font-bold text-[var(--muldhon-green)]">
              {group.title}
            </p>
            <ul className="flex flex-col gap-[6px]">
              {group.items.map((item) => (
                <li key={item.href}>
                  <SidebarNavItem item={item} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </>
  );
}

export function Sidebar() {
  const { isOpen, close } = useSidebar();
  const pathname = usePathname();

  // Close drawer when route changes (mobile)
  useEffect(() => {
    close();
  }, [pathname, close]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={close}
        aria-hidden={!isOpen}
      />

      {/* Mobile drawer */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[min(280px,85vw)] flex-col border-r border-[var(--muldhon-border)] bg-white transition-transform duration-300 ease-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Main navigation"
        aria-hidden={!isOpen}
      >
        <SidebarContent onNavigate={close} />
      </aside>

      {/* Desktop sidebar */}
      <aside
        className="absolute left-0 top-0 z-30 hidden min-h-full w-[228px] flex-col border-r border-[var(--muldhon-border)] bg-white md:flex"
        aria-label="Main navigation"
      >
        <SidebarContent />
      </aside>
    </>
  );
}
