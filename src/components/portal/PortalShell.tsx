"use client";

import { MuldhonLogo } from "@/components/brand/MuldhonLogo";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { roleHomePaths, roleLabels } from "@/data/mock-portal";
import { useAuth } from "@/components/auth/AuthProvider";
import type { PortalRole } from "@/types/portal";
import { CreditCard, LogOut, MessageSquare, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

interface PortalShellProps {
  role: PortalRole;
  title: string;
  children: ReactNode;
}

const navItems = [
  { label: "Profile", suffix: "profile", icon: UserRound },
  { label: "Messages", suffix: "messages", icon: MessageSquare },
  { label: "Payments", suffix: "payments", icon: CreditCard },
];

export function PortalShell({ role, title, children }: PortalShellProps) {
  const { portalRole, portalUser, portalSnapshot, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (portalRole === role && portalSnapshot?.profile) return;
    router.replace(`/register/${role}`);
  }, [portalRole, portalSnapshot, role, router]);

  if (portalRole !== role || !portalUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7fbf8]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--muldhon-green-light)] border-t-[var(--muldhon-green)]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7fbf8]">
      <header className="sticky top-0 z-30 border-b border-[#d8eadf] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <Link href={roleHomePaths[role]}>
              <MuldhonLogo className="w-[140px]" />
            </Link>
            <button
              type="button"
              onClick={logout}
              className="flex h-10 items-center gap-2 rounded-full border border-[#d8d8d8] px-4 text-[12px] font-semibold lg:hidden"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>

          <nav className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
            {navItems.map((item) => {
              const href = `/${role}/${item.suffix}`;
              const Icon = item.icon;
              const active = pathname === href;
              return (
                <Link
                  key={item.suffix}
                  href={href}
                  className={`flex h-10 shrink-0 items-center gap-2 rounded-full px-4 text-[13px] font-semibold ${
                    active ? "bg-[var(--muldhon-green)] text-white" : "border border-[#d8d8d8] bg-white text-[var(--muldhon-text)]"
                  }`}
                >
                  <Icon className="h-4 w-4" /> {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <UserAvatar name={portalUser.fullName} size="sm" className="h-10 w-10" />
            <div>
              <p className="text-[13px] font-bold text-[var(--muldhon-text)]">{portalUser.fullName}</p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muldhon-green)]">
                {roleLabels[role]}
              </p>
            </div>
            <button type="button" onClick={logout} className="ml-2 flex h-10 items-center gap-2 rounded-full border border-[#d8d8d8] px-4 text-[12px] font-semibold">
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-[var(--muldhon-green)]">
            {roleLabels[role]} Portal
          </p>
          <h1 className="mt-2 text-[28px] font-bold leading-none text-[var(--muldhon-text)] sm:text-[34px]">
            {title}
          </h1>
        </div>
        {children}
      </main>
    </div>
  );
}
