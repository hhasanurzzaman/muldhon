"use client";

/**
 * System status card with maintenance toggle and server online state.
 */

import { StatusListCard } from "@/components/dashboard/StatusListCard";
import { systemStatusRows } from "@/data/mock-dashboard";
import { useState } from "react";

export function SystemStatusCard() {
  const [maintenance, setMaintenance] = useState(false);

  return (
    <StatusListCard
      title="System Status"
      rows={systemStatusRows}
      footer={
      <div className="mt-[13px] space-y-[13px]">
        <div className="flex items-center justify-between text-[12px] leading-none">
          <span className="text-[var(--muldhon-text)]">Maintenance Mode</span>
          <button
            type="button"
            role="switch"
            aria-checked={maintenance}
            onClick={() => setMaintenance((v) => !v)}
            className={`relative h-[16px] w-[32px] rounded-full transition-colors ${
              maintenance ? "bg-[var(--muldhon-green)]" : "bg-[#d9d9d9]"
            }`}
          >
            <span
              className={`absolute left-[2px] top-[2px] h-[12px] w-[12px] rounded-full bg-[#6b6b6b] transition-transform ${
                maintenance ? "translate-x-4 bg-white" : "translate-x-0"
              }`}
            />
          </button>
        </div>
        <div className="flex items-center justify-between text-[12px] leading-none">
          <span className="text-[var(--muldhon-text)]">Server Status</span>
          <span className="font-medium text-[var(--muldhon-green)]">Online</span>
        </div>
      </div>
      }
    />
  );
}
