/**
 * Generic status list (Project status / System status bottom cards).
 */

import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import type { StatusRow } from "@/types/dashboard";

interface StatusListCardProps {
  title: string;
  rows: StatusRow[];
  /** Optional footer slot (e.g. maintenance toggle) */
  footer?: ReactNode;
  children?: ReactNode;
}

export function StatusListCard({
  title,
  rows,
  footer,
  children,
}: StatusListCardProps) {
  return (
    <Card className="min-h-[178px] px-5 py-5 sm:px-6">
      <h2 className="mb-5 text-[18px] font-bold leading-none text-[var(--muldhon-text)]">
        {title}
      </h2>
      <ul className="space-y-3">
        {rows.map((row) => (
          <li
            key={row.label}
            className="flex items-center justify-between rounded-[10px] bg-[#fbfefd] px-3 py-2.5 text-[13px] leading-none"
          >
            <span className="text-[var(--muldhon-text-muted)]">{row.label}</span>
            <span
              className={`font-semibold ${
                row.valueHighlight === "success"
                  ? "text-[var(--muldhon-green)]"
                  : "text-[var(--muldhon-text)]"
              }`}
            >
              {row.value}
            </span>
          </li>
        ))}
      </ul>
      {footer ?? children}
    </Card>
  );
}
