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
      <Card className="flex min-h-[450px] flex-col px-4 py-5 sm:h-[450px] sm:px-7 sm:py-6">
        <div className="mb-8">
          <h2 className="mb-7 text-[20px] font-bold leading-none text-[var(--muldhon-text)]">
            Accounts
          </h2>
          <div className="relative">
            <Search className="pointer-events-none absolute left-5 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-[var(--muldhon-green-dark)] sm:left-6" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by Name or ID"
              className="h-[48px] w-full rounded-full border-0 bg-[#e2f8ea] pl-12 pr-5 text-[13px] text-[var(--muldhon-text)] outline-none placeholder:text-[var(--muldhon-text-muted)] focus:ring-2 focus:ring-[var(--muldhon-green)]/30 sm:pl-[56px]"
              aria-label="Search accounts"
            />
          </div>
        </div>

        <ul className="flex-1 space-y-5 overflow-hidden">
          {filtered.map((account) => (
            <li
              key={account.id}
              className="flex flex-col gap-3 rounded-[14px] border border-[#eeeeee] p-4 sm:flex-row sm:items-center sm:justify-between sm:border-0 sm:p-0"
            >
              <div className="flex min-w-0 items-center gap-5">
                <UserAvatar name={account.name} size="sm" className="h-12 w-12 sm:h-[52px] sm:w-[52px]" />
                <div className="min-w-0">
                  <p className="truncate text-[15px] font-medium leading-none text-[var(--muldhon-text)]">
                    {account.name}
                  </p>
                  <p className="mt-2 truncate text-[13px] leading-none text-[var(--muldhon-text)]">
                    {account.email}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAccount(account)}
                className="flex h-[40px] w-full shrink-0 items-center justify-center gap-4 rounded-full border border-[#a7a7a7] bg-white text-[13px] font-medium text-[var(--muldhon-text)] hover:bg-gray-50 sm:w-[125px]"
              >
                Details
                <ChevronRight className="h-[17px] w-[17px]" />
              </button>
            </li>
          ))}
        </ul>

        <div className="flex justify-center pt-2">
          <button
            type="button"
            className="flex h-[18px] w-[18px] items-center justify-center rounded-full border border-[var(--muldhon-text)] text-[var(--muldhon-text)] hover:bg-gray-50"
            aria-label="Load more accounts"
          >
            <ChevronDown className="h-3 w-3" />
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
