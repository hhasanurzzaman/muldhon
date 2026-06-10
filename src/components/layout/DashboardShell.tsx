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
      <div className="relative mx-auto min-h-screen w-full overflow-hidden bg-[var(--muldhon-bg)] md:my-[36px] md:min-h-[calc(100vh-72px)] md:w-[calc(100%-96px)] md:max-w-[1440px]">
        <Sidebar />
        <div className="flex min-h-screen flex-col md:ml-[228px] md:min-h-[calc(100vh-72px)]">
          <TopBar />
          <main className="flex-1 px-4 pb-8 pt-0 sm:px-6 md:px-6 md:pb-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
