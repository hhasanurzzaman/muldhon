"use client";

/**
 * Top bar — hamburger (mobile), search, user profile. Responsive layout.
 */

import { useSidebar } from "@/components/layout/SidebarContext";
import { useAuth } from "@/components/auth/AuthProvider";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { currentUser } from "@/data/mock-dashboard";
import { LogOut, Menu, Search } from "lucide-react";

export function TopBar() {
  const { toggle } = useSidebar();
  const { logout } = useAuth();

  return (
    <header className="sticky top-0 z-20 flex min-h-[62px] shrink-0 items-center gap-3 border-b border-[var(--muldhon-border)] bg-[var(--muldhon-bg)]/95 px-4 py-3 backdrop-blur sm:min-h-[70px] sm:gap-4 sm:px-6 md:border-b-0 md:bg-transparent md:px-8">
      {/* Mobile menu */}
      <button
        type="button"
        onClick={toggle}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--muldhon-border)] bg-white text-gray-600 hover:bg-gray-50 md:hidden"
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Search */}
      <div className="relative min-w-0 flex-1 md:max-w-[430px]">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-[14px] w-[14px] -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          placeholder="Search"
          className="h-10 w-full rounded-full border border-[#dfe8e2] bg-white pl-10 pr-4 text-[12px] text-[var(--muldhon-text)] shadow-[0_8px_24px_rgba(15,23,42,0.04)] outline-none placeholder:text-gray-500 focus:border-[var(--muldhon-green)] focus:ring-2 focus:ring-[var(--muldhon-green)]/15 sm:h-10"
          aria-label="Search"
        />
      </div>

      {/* User */}
      <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
        <span className="hidden text-[13px] font-medium text-[var(--muldhon-text)] sm:inline">
          {currentUser.name}
        </span>
        <UserAvatar name={currentUser.name} size="sm" />
        <button
          type="button"
          onClick={logout}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--muldhon-border)] bg-white text-gray-500 shadow-sm transition hover:bg-red-50 hover:text-red-600"
          aria-label="Logout"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
