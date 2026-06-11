/**
 * Projects list widget with filter dropdown and row actions.
 */

"use client";

import { BadgeCheck, ChevronDown, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { ProjectListItem } from "@/types/dashboard";

interface ProjectsCardProps {
  projects: ProjectListItem[];
}

export function ProjectsCard({ projects }: ProjectsCardProps) {
  return (
    <Card className="flex min-h-[440px] flex-col overflow-hidden px-5 py-5 sm:px-6 sm:py-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-[19px] font-bold leading-none text-[var(--muldhon-text)]">
            Projects
          </h2>
          <p className="mt-2 text-[12px] font-medium text-[var(--muldhon-text-muted)]">
            Latest applications and funding requests
          </p>
        </div>
        <button
          type="button"
          className="flex h-9 w-[104px] items-center justify-center gap-2 rounded-full border border-[#dfe8e2] bg-[#fbfefd] text-[12px] font-semibold text-[var(--muldhon-text)] shadow-[0_8px_18px_rgba(15,23,42,0.06)]"
        >
          Pending
          <ChevronDown className="h-3 w-3 text-[var(--muldhon-text)]" />
        </button>
      </div>

      <ul className="flex-1 space-y-3">
        {projects.map((project) => (
          <li
            key={project.id}
            className="flex items-center justify-between gap-4 rounded-[14px] border border-[#edf2ef] bg-[#fbfefd] px-4 py-3"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate text-[15px] font-bold leading-none text-[var(--muldhon-text)]">
                  {project.name}
                </span>
                {project.verified && (
                  <BadgeCheck
                    className="h-4 w-4 shrink-0 text-[#e9ff00]"
                    fill="currentColor"
                    stroke="white"
                    strokeWidth={2}
                  />
                )}
              </div>
              <p className="mt-2 text-[12px] leading-none text-[var(--muldhon-text-muted)]">
                Budget: {project.budgetBdt.toLocaleString()} BDT
              </p>
              <p className="mt-1 text-[12px] leading-none text-[var(--muldhon-text-muted)]">
                User: {project.userName}
              </p>
            </div>
            <button
              type="button"
              className="flex h-9 w-[100px] shrink-0 items-center justify-center gap-2 rounded-full border border-[#dfe8e2] bg-white text-[12px] font-semibold text-[var(--muldhon-text)] shadow-[0_8px_18px_rgba(15,23,42,0.05)] hover:bg-[#f7fbf8]"
            >
              Details
              <ChevronRight className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>

      <div className="flex justify-center pt-4">
        <button
          type="button"
          className="flex h-[17px] w-[17px] items-center justify-center rounded-full border border-[var(--muldhon-text)] text-[var(--muldhon-text)] hover:bg-gray-50"
          aria-label="See more projects"
        >
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>
    </Card>
  );
}
