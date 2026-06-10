"use client";

/**
 * Accounts list with green pill search and Details actions.
 */

import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { ApplicantDetailsModal } from "@/components/entrepreneurs/ApplicantDetailsModal";
import { Card } from "@/components/ui/Card";
import { UserAvatar } from "@/components/ui/UserAvatar";
import type { EntrepreneurAccount } from "@/types/entrepreneurs";

interface AccountsCardProps {
  accounts: EntrepreneurAccount[];
}

export function AccountsCard({ accounts }: AccountsCardProps) {
  const [query, setQuery] = useState("");
  const [selectedAccount, setSelectedAccount] =
    useState<EntrepreneurAccount | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return accounts;
    return accounts.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q)
    );
  }, [accounts, query]);

  return (
    <>
      <Card className="flex h-[215px] flex-col px-[17px] py-[15px]">
        <div className="mb-[12px]">
          <h2 className="mb-[12px] text-[12px] font-bold leading-none text-[var(--muldhon-text)] sm:text-[13px]">
            Accounts
          </h2>
          <div className="relative">
            <Search className="pointer-events-none absolute left-[15px] top-1/2 h-[10px] w-[10px] -translate-y-1/2 text-[var(--muldhon-green-dark)]" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by Name or ID"
              className="h-[24px] w-full rounded-full border-0 bg-[#e2f8ea] pl-[31px] pr-4 text-[8px] text-[var(--muldhon-text)] outline-none placeholder:text-[var(--muldhon-text-muted)] focus:ring-2 focus:ring-[var(--muldhon-green)]/30"
              aria-label="Search accounts"
            />
          </div>
        </div>

        <ul className="flex-1 space-y-[10px] overflow-hidden">
          {filtered.map((account) => (
            <li
              key={account.id}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex min-w-0 items-center gap-[9px]">
                <UserAvatar name={account.name} size="sm" className="h-[31px] w-[31px]" />
                <div className="min-w-0">
                  <p className="truncate text-[10px] font-bold leading-none text-[var(--muldhon-text)]">
                    {account.name}
                  </p>
                  <p className="mt-[4px] truncate text-[8px] leading-none text-[var(--muldhon-text)]">
                    {account.email}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAccount(account)}
                className="flex h-[23px] w-[57px] shrink-0 items-center justify-center gap-1 rounded-full border border-[var(--muldhon-border)] bg-white text-[8px] font-medium text-[var(--muldhon-text)] shadow-[0_2px_8px_rgba(17,24,39,0.13)] hover:bg-gray-50"
              >
                Details
                <ChevronRight className="h-[11px] w-[11px]" />
              </button>
            </li>
          ))}
        </ul>

        <div className="flex justify-center pt-[2px]">
          <button
            type="button"
            className="flex h-[14px] w-[14px] items-center justify-center rounded-full border border-[var(--muldhon-text)] text-[var(--muldhon-text)] hover:bg-gray-50"
            aria-label="Load more accounts"
          >
            <ChevronDown className="h-[9px] w-[9px]" />
          </button>
        </div>
      </Card>

      {selectedAccount && (
        <ApplicantDetailsModal
          person={selectedAccount}
          onClose={() => setSelectedAccount(null)}
        />
      )}
    </>
  );
}
