"use client";

import { StatCard } from "@/components/dashboard/StatCard";
import { Card } from "@/components/ui/Card";
import { adminProjects, projectStats } from "@/data/mock-projects";
import type { AdminProject, ProjectStatus } from "@/types/admin";
import { CheckCircle2, Search, ShieldAlert } from "lucide-react";
import { useMemo, useState } from "react";

const statusTabs: Array<"all" | ProjectStatus> = ["all", "pending", "approved", "funding", "completed", "rejected"];

function formatBdt(value: number) {
  return `${value.toLocaleString("en-US")} BDT`;
}

function statusClass(status: ProjectStatus) {
  const classes: Record<ProjectStatus, string> = {
    pending: "bg-[#fffec9] text-[#8b7600]",
    approved: "bg-[#dfe4f8] text-[#2543a5]",
    funding: "bg-[#e2f8ea] text-[var(--muldhon-green-dark)]",
    completed: "bg-[#bdf2d4] text-[#087344]",
    rejected: "bg-[#ffc6cd] text-[#bd1f35]",
  };
  return classes[status];
}

export function ProjectsPanel() {
  const [projects, setProjects] = useState(adminProjects);
  const [activeStatus, setActiveStatus] = useState<"all" | ProjectStatus>("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(projects[0]?.id);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesStatus = activeStatus === "all" || project.status === activeStatus;
      const matchesQuery =
        !normalized ||
        project.name.toLowerCase().includes(normalized) ||
        project.owner.toLowerCase().includes(normalized) ||
        project.id.toLowerCase().includes(normalized);
      return matchesStatus && matchesQuery;
    });
  }, [activeStatus, projects, query]);

  const selected = projects.find((project) => project.id === selectedId) ?? filtered[0] ?? projects[0];

  function updateStatus(project: AdminProject, status: ProjectStatus) {
    setProjects((rows) => rows.map((row) => (row.id === project.id ? { ...row, status } : row)));
    setSelectedId(project.id);
  }

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {projectStats.map((metric) => (
          <StatCard key={metric.id} metric={metric} />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card className="p-4 sm:p-6">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-[22px] font-bold text-[var(--muldhon-text)]">Project Pipeline</h2>
              <p className="mt-2 text-[13px] text-[var(--muldhon-text-muted)]">
                Review registrations, funding progress and approval status in one place.
              </p>
            </div>
            <div className="relative w-full lg:max-w-[320px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muldhon-green-dark)]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search project, owner or ID"
                className="h-11 w-full rounded-full bg-[#e2f8ea] pl-11 pr-4 text-[13px] outline-none focus:ring-2 focus:ring-[var(--muldhon-green)]/25"
              />
            </div>
          </div>

          <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
            {statusTabs.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setActiveStatus(status)}
                className={`h-10 shrink-0 rounded-full px-5 text-[12px] font-semibold capitalize ${
                  activeStatus === status
                    ? "bg-[var(--muldhon-green)] text-white"
                    : "border border-[#d8d8d8] bg-white text-[var(--muldhon-text)]"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <ul className="space-y-4">
            {filtered.map((project) => {
              const progress = Math.min(100, Math.round((project.fundedBdt / project.requestedBdt) * 100));
              return (
                <li
                  key={project.id}
                  className={`rounded-[16px] border p-4 transition-colors ${
                    selected?.id === project.id ? "border-[var(--muldhon-green)] bg-[#f8fffb]" : "border-[#eeeeee] bg-white"
                  }`}
                >
                  <button type="button" onClick={() => setSelectedId(project.id)} className="w-full text-left">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <p className="text-[15px] font-bold text-[var(--muldhon-text)]">{project.name}</p>
                        <p className="mt-1 text-[12px] text-[var(--muldhon-text-muted)]">
                          {project.id} · {project.owner} · {project.ownerType}
                        </p>
                      </div>
                      <span className={`w-fit rounded-full px-3 py-1 text-[11px] font-bold capitalize ${statusClass(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-[12px] font-semibold text-[var(--muldhon-text)]">
                        <span>{formatBdt(project.fundedBdt)}</span>
                        <span>{progress}% funded</span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-[#edf0ef]">
                        <div className="h-full rounded-full bg-[var(--muldhon-green)]" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  </button>
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <button type="button" onClick={() => updateStatus(project, "approved")} className="h-9 rounded-full bg-[#9be3b4] px-5 text-[12px] font-semibold text-[#07864b]">
                      Approve
                    </button>
                    <button type="button" onClick={() => updateStatus(project, "rejected")} className="h-9 rounded-full bg-[#ffadad] px-5 text-[12px] font-semibold text-[#ec1717]">
                      Reject
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>

        {selected && (
          <Card className="h-fit p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--muldhon-green)]">Selected Project</p>
                <h3 className="mt-3 text-[20px] font-bold text-[var(--muldhon-text)]">{selected.name}</h3>
              </div>
              {selected.risk === "High" ? <ShieldAlert className="h-5 w-5 text-red-500" /> : <CheckCircle2 className="h-5 w-5 text-[var(--muldhon-green)]" />}
            </div>
            <div className="mt-6 space-y-4 text-[13px]">
              <div className="flex justify-between gap-4"><span className="text-[var(--muldhon-text-muted)]">Owner</span><strong>{selected.owner}</strong></div>
              <div className="flex justify-between gap-4"><span className="text-[var(--muldhon-text-muted)]">Category</span><strong>{selected.category}</strong></div>
              <div className="flex justify-between gap-4"><span className="text-[var(--muldhon-text-muted)]">Requested</span><strong>{formatBdt(selected.requestedBdt)}</strong></div>
              <div className="flex justify-between gap-4"><span className="text-[var(--muldhon-text-muted)]">Submitted</span><strong>{selected.submittedAt}</strong></div>
              <div className="flex justify-between gap-4"><span className="text-[var(--muldhon-text-muted)]">Risk level</span><strong>{selected.risk}</strong></div>
            </div>
          </Card>
        )}
      </section>
    </div>
  );
}
