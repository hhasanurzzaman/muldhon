/**
 * Recent activity feed — right column of middle row.
 */

import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { ActivityItem } from "@/types/dashboard";

interface RecentActivityCardProps {
  items: ActivityItem[];
}

export function RecentActivityCard({ items }: RecentActivityCardProps) {
  return (
    <Card className="flex min-h-[286px] flex-col px-5 py-5 sm:px-6">
      <div className="mb-5">
        <h2 className="text-[19px] font-bold leading-none text-[var(--muldhon-text)]">
          Recent activity
        </h2>
        <p className="mt-2 text-[12px] font-medium text-[var(--muldhon-text-muted)]">
          Platform updates and admin actions
        </p>
      </div>

      <ul className="flex-1 space-y-3">
        {items.map((item, index) => (
          <li
            key={item.id}
            className={`flex items-center gap-4 rounded-[14px] px-3.5 py-3.5 ${
              index === 0
                ? "bg-[#f4fbf7]"
                : "bg-[#fbfefd]"
            }`}
          >
            <div
              className="h-9 w-9 shrink-0 rounded-[12px] bg-[#dfe8e2]"
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold leading-5 text-[var(--muldhon-text)]">
                {item.description}
              </p>
            </div>
            <span className="shrink-0 text-[12px] font-medium leading-none text-[var(--muldhon-text-muted)]">
              {item.timeAgo}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex justify-center pt-4">
        <button
          type="button"
          className="flex h-[17px] w-[17px] items-center justify-center rounded-full border border-[var(--muldhon-text)] text-[var(--muldhon-text)] hover:bg-gray-50"
          aria-label="See more activity"
        >
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>
    </Card>
  );
}
