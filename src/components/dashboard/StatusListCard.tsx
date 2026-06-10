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
    <Card className="h-[157px] px-[17px] py-[17px]">
      <h2 className="mb-[18px] text-[17px] font-bold leading-none text-[var(--muldhon-text)]">
        {title}
      </h2>
      <ul className="space-y-[13px]">
        {rows.map((row) => (
          <li
            key={row.label}
            className="flex items-center justify-between text-[12px] leading-none"
          >
            <span className="text-[var(--muldhon-text)]">{row.label}</span>
            <span
              className={`font-medium ${
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
