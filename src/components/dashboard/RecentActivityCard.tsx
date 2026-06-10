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
    <Card className="flex h-[249px] flex-col px-[17px] py-[15px]">
      <div className="mb-3">
        <h2 className="text-[17px] font-bold leading-none text-[var(--muldhon-text)]">
          Recent activity
        </h2>
      </div>

      <ul className="flex-1 space-y-[7px]">
        {items.map((item, index) => (
          <li
            key={item.id}
            className={`flex items-center gap-[18px] rounded-none px-0 py-[2px] ${
              index === items.length - 1
                ? "outline outline-2 outline-[#18a8e0] outline-offset-[-2px]"
                : ""
            }`}
          >
            <div
              className="h-[26px] w-[28px] shrink-0 rounded-[7px] bg-[#d9d9d9]"
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] leading-none text-[var(--muldhon-text)]">
                {item.description}
              </p>
            </div>
            <span className="shrink-0 text-[10px] leading-none text-[var(--muldhon-text)]">
              {item.timeAgo}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex justify-center pt-2">
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
