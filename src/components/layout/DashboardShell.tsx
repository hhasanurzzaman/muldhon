"use client";

/**
 * Responsive admin shell — drawer sidebar on mobile, fixed sidebar on desktop.
 */

import { Sidebar } from "@/components/layout/Sidebar";
import { SidebarProvider } from "@/components/layout/SidebarContext";
import { TopBar } from "@/components/layout/TopBar";
import type { ReactNode } from "react";

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <SidebarProvider>
      <div className="relative min-h-screen w-full overflow-hidden bg-[var(--muldhon-bg)]">
        <Sidebar />
        <div className="flex min-h-screen flex-col md:ml-[228px]">
          <TopBar />
          <main className="flex-1 px-4 pb-8 pt-0 sm:px-6 md:px-8 md:pb-8 xl:px-10">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
