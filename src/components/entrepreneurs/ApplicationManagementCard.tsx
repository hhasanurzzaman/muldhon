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
      <Card className="overflow-hidden px-7 py-6">
        <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="text-[20px] font-bold leading-none text-[var(--muldhon-text)]">
            Application Management
          </h2>

          <div
            className="grid h-[55px] w-full grid-cols-4 rounded-full bg-[#e2f8ea] p-[6px] lg:w-[500px]"
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
                className={`rounded-full text-[13px] font-medium transition-colors ${
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

        <ul className="space-y-6">
          {filtered.length === 0 ? (
            <li className="py-10 text-center text-[14px] text-[var(--muldhon-text-muted)]">
              No applications in this category.
            </li>
          ) : (
            filtered.map((applicant) => (
              <li
                key={applicant.id}
                className="grid gap-4 rounded-[10px] bg-white lg:grid-cols-[minmax(220px,1.2fr)_minmax(160px,0.9fr)_minmax(90px,0.5fr)_120px] lg:items-center"
              >
                <div className="flex min-w-0 items-center gap-5">
                  <UserAvatar name={applicant.name} size="sm" className="h-[54px] w-[54px]" />
                  <div className="min-w-0">
                    <p className="truncate text-[15px] font-bold leading-none text-[var(--muldhon-text)]">
                      {applicant.name}
                    </p>
                    <p className="mt-2 truncate text-[13px] leading-none text-[var(--muldhon-text)]">
                      {applicant.email}
                    </p>
                  </div>
                </div>

                <p className="text-[14px] font-bold leading-none text-[var(--muldhon-text)]">
                  {applicant.phone}
                </p>

                <p className="text-[14px] font-bold leading-none text-[var(--muldhon-text)]">
                  {applicant.date}
                </p>

                <div className="flex justify-start lg:justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedApplicant(applicant)}
                    className="h-[36px] w-[106px] rounded-full border border-[#777] bg-white text-[13px] font-medium text-[var(--muldhon-text)] hover:bg-gray-50"
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
