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
    <Card className="flex h-[340px] flex-col px-[17px] py-[17px]">
      <div className="mb-[17px] flex items-center justify-between gap-3">
        <h2 className="text-[17px] font-bold leading-none text-[var(--muldhon-text)]">
          Projects
        </h2>
        <button
          type="button"
          className="flex h-[33px] w-[87px] items-center justify-center gap-2 rounded-full border border-[var(--muldhon-border)] bg-white text-[11px] font-medium text-[var(--muldhon-text)] shadow-[0_2px_9px_rgba(17,24,39,0.13)]"
        >
          Pending
          <ChevronDown className="h-3 w-3 text-[var(--muldhon-text)]" />
        </button>
      </div>

      <ul className="flex-1 divide-y divide-[#e2e2e2]">
        {projects.map((project) => (
          <li
            key={project.id}
            className="flex items-center justify-between gap-3 py-[12px] first:pt-0"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate text-[13px] font-medium leading-none text-[var(--muldhon-text)]">
                  {project.name}
                </span>
                {project.verified && (
                  <BadgeCheck
                    className="h-[14px] w-[14px] shrink-0 text-[#e9ff00]"
                    fill="currentColor"
                    stroke="white"
                    strokeWidth={2}
                  />
                )}
              </div>
              <p className="mt-[5px] text-[10px] leading-none text-[var(--muldhon-text)]">
                Budget: {project.budgetBdt.toLocaleString()} BDT
              </p>
              <p className="mt-[3px] text-[10px] leading-none text-[var(--muldhon-text)]">
                User: {project.userName}
              </p>
            </div>
            <button
              type="button"
              className="flex h-[31px] w-[86px] shrink-0 items-center justify-center gap-3 rounded-full border border-[var(--muldhon-border)] bg-white text-[11px] font-medium text-[var(--muldhon-text)] shadow-[0_2px_9px_rgba(17,24,39,0.13)] hover:bg-gray-50"
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
