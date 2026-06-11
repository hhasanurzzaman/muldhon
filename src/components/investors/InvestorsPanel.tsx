"use client";

import { ApplicantDetailsModal } from "@/components/entrepreneurs/ApplicantDetailsModal";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card } from "@/components/ui/Card";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { applicationTabs } from "@/data/mock-entrepreneurs";
import {
  investorAccounts,
  investorApplicants,
  investorStatMetrics,
} from "@/data/mock-investors";
import type {
  ApplicationTab,
  EntrepreneurAccount,
  EntrepreneurApplicant,
} from "@/types/entrepreneurs";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { useMemo, useState } from "react";

function InvestorApplicationCard() {
  const [activeTab, setActiveTab] = useState<ApplicationTab>("pending");
  const [selectedApplicant, setSelectedApplicant] =
    useState<EntrepreneurApplicant | null>(null);

  const filteredApplicants = useMemo(
    () => investorApplicants.filter((applicant) => applicant.status === activeTab),
    [activeTab]
  );

  return (
    <>
      <Card className="px-4 py-5 sm:px-7 sm:py-6">
        <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="text-[20px] font-bold leading-none text-[var(--muldhon-text)]">
            Application Management
          </h2>

          <div
            className="grid min-h-[48px] w-full grid-cols-2 gap-1 rounded-[18px] bg-[#e2f8ea] p-[6px] sm:grid-cols-4 sm:rounded-full lg:h-[55px] lg:w-[500px]"
            role="tablist"
            aria-label="Investor application status"
          >
            {applicationTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`min-h-9 rounded-full text-[12px] font-medium transition-colors sm:text-[13px] ${
                  activeTab === tab.id
                    ? "bg-white text-[var(--muldhon-text)] shadow-sm"
                    : "text-[var(--muldhon-text-muted)] hover:text-[var(--muldhon-text)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <ul className="space-y-5 sm:space-y-6">
          {filteredApplicants.map((applicant) => (
            <li
              key={applicant.id}
              className="grid gap-3 rounded-[14px] border border-[#eeeeee] p-4 lg:grid-cols-[minmax(220px,1.2fr)_minmax(160px,0.9fr)_minmax(90px,0.5fr)_120px] lg:items-center lg:border-0 lg:p-0"
            >
              <div className="flex min-w-0 items-center gap-5">
                <UserAvatar name={applicant.name} size="sm" className="h-12 w-12 sm:h-[54px] sm:w-[54px]" />
                <div className="min-w-0">
                  <p className="truncate text-[15px] font-bold leading-none text-[var(--muldhon-text)]">
                    {applicant.name}
                  </p>
                  <p className="mt-2 truncate text-[13px] leading-none text-[var(--muldhon-text)]">
                    {applicant.email}
                  </p>
                </div>
              </div>

              <p className="text-[13px] font-bold leading-none text-[var(--muldhon-text)] sm:text-[14px]">
                {applicant.phone}
              </p>
              <p className="text-[13px] font-bold leading-none text-[var(--muldhon-text)] sm:text-[14px]">
                {applicant.date}
              </p>

              <button
                type="button"
                onClick={() => setSelectedApplicant(applicant)}
                className="h-10 w-full rounded-full border border-[#777] bg-white text-[13px] font-medium text-[var(--muldhon-text)] hover:bg-gray-50 sm:w-[106px]"
              >
                Review
              </button>
            </li>
          ))}
        </ul>
      </Card>

      {selectedApplicant && (
        <ApplicantDetailsModal
          person={selectedApplicant}
          onClose={() => setSelectedApplicant(null)}
        />
      )}
    </>
  );
}

function InvestorAccountsCard() {
  const [query, setQuery] = useState("");
  const [selectedAccount, setSelectedAccount] =
    useState<EntrepreneurAccount | null>(null);

  const filteredAccounts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return investorAccounts;

    return investorAccounts.filter(
      (account) =>
        account.name.toLowerCase().includes(normalizedQuery) ||
        account.email.toLowerCase().includes(normalizedQuery)
    );
  }, [query]);

  return (
    <>
      <Card className="flex min-h-[450px] flex-col px-4 py-5 sm:h-[450px] sm:px-7 sm:py-6">
        <h2 className="mb-7 text-[20px] font-bold leading-none text-[var(--muldhon-text)]">
          Accounts
        </h2>

        <div className="relative mb-8">
          <Search className="pointer-events-none absolute left-5 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-[var(--muldhon-green-dark)] sm:left-6" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by Name or ID"
            className="h-[48px] w-full rounded-full border-0 bg-[#e2f8ea] pl-12 pr-5 text-[13px] text-[var(--muldhon-text)] outline-none placeholder:text-[var(--muldhon-text-muted)] focus:ring-2 focus:ring-[var(--muldhon-green)]/30 sm:pl-[56px]"
          />
        </div>

        <ul className="flex-1 space-y-5 overflow-hidden">
          {filteredAccounts.map((account) => (
            <li key={account.id} className="flex flex-col gap-3 rounded-[14px] border border-[#eeeeee] p-4 sm:flex-row sm:items-center sm:justify-between sm:border-0 sm:p-0">
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

export function InvestorsPanel() {
  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {investorStatMetrics.map((metric) => (
          <StatCard key={metric.id} metric={metric} />
        ))}
      </section>

      <InvestorApplicationCard />

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <InvestorAccountsCard />
        <Card className="hidden h-[450px] xl:block">
          <span className="sr-only">Investor account details panel</span>
        </Card>
      </section>
    </div>
  );
}
