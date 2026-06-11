"use client";

/**
 * Responsive admin shell — drawer sidebar on mobile, fixed sidebar on desktop.
 */

import { Sidebar } from "@/components/layout/Sidebar";
import { SidebarProvider } from "@/components/layout/SidebarContext";
import { TopBar } from "@/components/layout/TopBar";
import { useAuth } from "@/components/auth/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { ReactNode } from "react";

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const { isAuthenticated, isReady } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isReady && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isReady, router]);

  if (!isReady || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--muldhon-green-light)] border-t-[var(--muldhon-green)]" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="relative min-h-screen w-full overflow-hidden bg-[var(--muldhon-bg)]">
        <Sidebar />
        <div className="flex min-h-screen flex-col md:ml-[228px]">
          <TopBar />
          <main className="flex-1 px-4 pb-10 pt-0 sm:px-6 md:px-8 md:pb-10 xl:px-8 2xl:px-10">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
