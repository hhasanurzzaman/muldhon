import { ArrowUpRight, CalendarDays, CheckCircle2, Clock3 } from "lucide-react";

interface PagePlaceholderProps {
  title: string;
  description?: string;
}

const sectionContent: Record<
  string,
  {
    description: string;
    stats: Array<{ label: string; value: string; tone: string }>;
    rows: Array<{ title: string; meta: string; status: string }>;
  }
> = {
  Projects: {
    description: "Track project applications, funding stages, approvals and live campaigns.",
    stats: [
      { label: "Total Projects", value: "500", tone: "bg-[#e2f8ea]" },
      { label: "Pending Review", value: "100", tone: "bg-[#fffec9]" },
      { label: "Approved", value: "50", tone: "bg-[#dfe4f8]" },
    ],
    rows: [
      { title: "Organic Agro farming", meta: "Budget: 150,000 BDT", status: "Pending" },
      { title: "Green Tech Solution", meta: "Budget: 250,000 BDT", status: "Approved" },
      { title: "Bangladesh Agriculture Association", meta: "Budget: 500,000 BDT", status: "Live" },
    ],
  },
  Payments: {
    description: "Review transactions, payout status, investment deposits and payment disputes.",
    stats: [
      { label: "Total Volume", value: "2 lac", tone: "bg-[#e2f8ea]" },
      { label: "Pending", value: "40", tone: "bg-[#fffec9]" },
      { label: "Failed", value: "8", tone: "bg-[#ffc6cd]" },
    ],
    rows: [
      { title: "Investment deposit", meta: "Arghya Biswas", status: "Completed" },
      { title: "Project payout", meta: "Organic Agro farming", status: "Pending" },
      { title: "Refund request", meta: "Green Tech Solution", status: "Review" },
    ],
  },
  Notifications: {
    description: "Manage system alerts, admin announcements and account activity notifications.",
    stats: [
      { label: "Unread", value: "18", tone: "bg-[#fffec9]" },
      { label: "Sent Today", value: "42", tone: "bg-[#e2f8ea]" },
      { label: "Archived", value: "120", tone: "bg-[#dfe4f8]" },
    ],
    rows: [
      { title: "New project has been approved", meta: "2 days ago", status: "Unread" },
      { title: "New transaction 2 lac BDT has been made", meta: "2 days ago", status: "Read" },
      { title: "New entrepreneur has been added", meta: "3 days ago", status: "Read" },
    ],
  },
  Messages: {
    description: "View user conversations, support requests and operational inbox messages.",
    stats: [
      { label: "Open Tickets", value: "23", tone: "bg-[#fffec9]" },
      { label: "Resolved", value: "146", tone: "bg-[#e2f8ea]" },
      { label: "Priority", value: "5", tone: "bg-[#ffc6cd]" },
    ],
    rows: [
      { title: "Investor account verification", meta: "Micheal Keny", status: "Open" },
      { title: "Payment confirmation request", meta: "Guy Hawkins", status: "Pending" },
      { title: "Project document update", meta: "Wade Warren", status: "Resolved" },
    ],
  },
  Reports: {
    description: "Analyze investor growth, project performance and platform activity reports.",
    stats: [
      { label: "Monthly Growth", value: "+25%", tone: "bg-[#e2f8ea]" },
      { label: "Active Users", value: "1000", tone: "bg-[#dfe4f8]" },
      { label: "Exports", value: "12", tone: "bg-[#fffec9]" },
    ],
    rows: [
      { title: "Investment summary", meta: "June report", status: "Ready" },
      { title: "Project status report", meta: "Current quarter", status: "Ready" },
      { title: "User activity report", meta: "Last 30 days", status: "Draft" },
    ],
  },
  "Activity logs": {
    description: "Monitor admin actions, user updates and important platform audit events.",
    stats: [
      { label: "Today", value: "64", tone: "bg-[#e2f8ea]" },
      { label: "Warnings", value: "3", tone: "bg-[#fffec9]" },
      { label: "Resolved", value: "58", tone: "bg-[#dfe4f8]" },
    ],
    rows: [
      { title: "Admin approved a project", meta: "Today 10:24 AM", status: "Success" },
      { title: "User changed account details", meta: "Yesterday", status: "Info" },
      { title: "Payment status updated", meta: "2 days ago", status: "Success" },
    ],
  },
};

export function PagePlaceholder({
  title,
  description,
}: PagePlaceholderProps) {
  const content = sectionContent[title] ?? {
    description:
      description ?? "Manage this section with clean summaries, actions and responsive records.",
    stats: [
      { label: "Total", value: "500", tone: "bg-[#e2f8ea]" },
      { label: "Pending", value: "100", tone: "bg-[#fffec9]" },
      { label: "Active", value: "50", tone: "bg-[#dfe4f8]" },
    ],
    rows: [
      { title: `${title} item`, meta: "Recently updated", status: "Active" },
      { title: `${title} review`, meta: "Pending action", status: "Pending" },
      { title: `${title} archive`, meta: "System generated", status: "Ready" },
    ],
  };

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[22px] border border-[#d8d8d8] bg-white shadow-[0_8px_24px_rgba(17,24,39,0.1)]">
        <div className="flex flex-col gap-6 p-5 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-[var(--muldhon-green)]">
              Management
            </p>
            <h2 className="mt-3 text-[26px] font-bold leading-none text-[var(--muldhon-text)] sm:text-[30px]">
              {title}
            </h2>
            <p className="mt-3 max-w-[560px] text-[14px] leading-6 text-[var(--muldhon-text-muted)]">
              {description ?? content.description}
            </p>
          </div>
          <button className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[var(--muldhon-green)] px-6 text-[14px] font-semibold text-white shadow-[0_8px_20px_rgba(10,160,90,0.2)] sm:w-fit">
            New {title}
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid border-t border-[#eeeeee] sm:grid-cols-3">
          {content.stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-4 border-b border-[#eeeeee] p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:p-6 last:border-r-0">
              <span className={`h-12 w-12 rounded-[14px] ${stat.tone}`} />
              <div>
                <p className="text-[13px] font-medium text-[var(--muldhon-text-muted)]">
                  {stat.label}
                </p>
                <p className="mt-1 text-[24px] font-bold leading-none text-[var(--muldhon-text)]">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[22px] border border-[#d8d8d8] bg-white p-5 shadow-[0_8px_24px_rgba(17,24,39,0.1)] sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-[20px] font-bold text-[var(--muldhon-text)]">Recent records</h3>
          <span className="w-fit rounded-full bg-[#e2f8ea] px-4 py-2 text-[12px] font-semibold text-[var(--muldhon-green-dark)]">
            Live data ready
          </span>
        </div>

        <ul className="divide-y divide-[#eeeeee]">
          {content.rows.map((row) => (
            <li key={row.title} className="grid gap-4 py-5 md:grid-cols-[minmax(0,1fr)_180px_120px] md:items-center">
              <div className="flex min-w-0 items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#f4f7f5] text-[var(--muldhon-green)]">
                  <CheckCircle2 className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[15px] font-semibold text-[var(--muldhon-text)]">
                    {row.title}
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-[13px] text-[var(--muldhon-text-muted)]">
                    <Clock3 className="h-3.5 w-3.5" />
                    {row.meta}
                  </p>
                </div>
              </div>
              <span className="flex items-center gap-2 text-[13px] text-[var(--muldhon-text-muted)]">
                <CalendarDays className="h-4 w-4" />
                Updated recently
              </span>
              <span className="w-fit rounded-full border border-[#d8d8d8] px-4 py-2 text-[12px] font-semibold text-[var(--muldhon-text)]">
                {row.status}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
