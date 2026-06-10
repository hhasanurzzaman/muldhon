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
    <Card className="flex h-[424px] flex-col px-6 py-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-[18px] font-bold leading-none text-[var(--muldhon-text)]">
          Projects
        </h2>
        <button
          type="button"
          className="flex h-9 w-[100px] items-center justify-center gap-2 rounded-full border border-[#d6d6d6] bg-white text-[12px] font-medium text-[var(--muldhon-text)] shadow-[0_4px_12px_rgba(17,24,39,0.12)]"
        >
          Pending
          <ChevronDown className="h-3 w-3 text-[var(--muldhon-text)]" />
        </button>
      </div>

      <ul className="flex-1 divide-y divide-[#e2e2e2]">
        {projects.map((project) => (
          <li
            key={project.id}
            className="flex items-center justify-between gap-4 py-[15px] first:pt-0"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate text-[14px] font-semibold leading-none text-[var(--muldhon-text)]">
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
              <p className="mt-[6px] text-[11px] leading-none text-[var(--muldhon-text-muted)]">
                Budget: {project.budgetBdt.toLocaleString()} BDT
              </p>
              <p className="mt-1 text-[11px] leading-none text-[var(--muldhon-text-muted)]">
                User: {project.userName}
              </p>
            </div>
            <button
              type="button"
              className="flex h-9 w-[100px] shrink-0 items-center justify-center gap-3 rounded-full border border-[#d6d6d6] bg-white text-[12px] font-medium text-[var(--muldhon-text)] shadow-[0_4px_12px_rgba(17,24,39,0.12)] hover:bg-gray-50"
            >
              Details
              <ChevronRight className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>

      <div className="flex justify-center pt-1">
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
