"use client";

/**
 * Application Management — filter tabs + applicant list (table on desktop, cards on mobile).
 */

import { Card } from "@/components/ui/Card";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { ApplicantDetailsModal } from "@/components/entrepreneurs/ApplicantDetailsModal";
import { applicationTabs } from "@/data/mock-entrepreneurs";
import type { ApplicationTab, EntrepreneurApplicant } from "@/types/entrepreneurs";
import { useMemo, useState } from "react";

interface ApplicationManagementCardProps {
  applicants: EntrepreneurApplicant[];
}

export function ApplicationManagementCard({
  applicants,
}: ApplicationManagementCardProps) {
  const [activeTab, setActiveTab] = useState<ApplicationTab>("pending");
  const [selectedApplicant, setSelectedApplicant] =
    useState<EntrepreneurApplicant | null>(null);

  const filtered = useMemo(
    () => applicants.filter((a) => a.status === activeTab),
    [applicants, activeTab]
  );

  return (
    <>
      <Card className="overflow-hidden px-[17px] py-[15px]">
        <div className="mb-[15px] flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-[12px] font-bold leading-none text-[var(--muldhon-text)] sm:text-[13px]">
            Application Management
          </h2>

          <div
            className="inline-flex w-full max-w-full rounded-full bg-[#e2f8ea] p-[3px] sm:w-[252px]"
            role="tablist"
            aria-label="Application status"
          >
            {applicationTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`h-[20px] flex-1 rounded-full px-2 text-[9px] font-medium leading-none transition-colors ${
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

        <ul className="space-y-[11px]">
          {filtered.length === 0 ? (
            <li className="py-8 text-center text-[12px] text-[var(--muldhon-text-muted)]">
              No applications in this category.
            </li>
          ) : (
            filtered.map((applicant) => (
              <li
                key={applicant.id}
                className="grid gap-3 rounded-[10px] bg-white sm:grid-cols-[minmax(0,1.4fr)_minmax(116px,0.8fr)_52px_68px] sm:items-center"
              >
                <div className="flex min-w-0 items-center gap-[9px]">
                  <UserAvatar name={applicant.name} size="sm" className="h-[31px] w-[31px]" />
                  <div className="min-w-0">
                    <p className="truncate text-[10px] font-bold leading-none text-[var(--muldhon-text)]">
                      {applicant.name}
                    </p>
                    <p className="mt-[4px] truncate text-[8px] leading-none text-[var(--muldhon-text)]">
                      {applicant.email}
                    </p>
                  </div>
                </div>

                <p className="text-[9px] font-medium leading-none text-[var(--muldhon-text)]">
                  {applicant.phone}
                </p>

                <p className="text-[9px] font-medium leading-none text-[var(--muldhon-text)]">
                  {applicant.date}
                </p>

                <div className="flex justify-start sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedApplicant(applicant)}
                    className="h-[23px] w-[57px] rounded-full border border-[var(--muldhon-border)] bg-white text-[8px] font-medium text-[var(--muldhon-text)] shadow-[0_2px_8px_rgba(17,24,39,0.13)] hover:bg-gray-50"
                  >
                    Review
                  </button>
                </div>
              </li>
            ))
          )}
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
