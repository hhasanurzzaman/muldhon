"use client";

import { StatCard } from "@/components/dashboard/StatCard";
import { Card } from "@/components/ui/Card";
import { adminPayments, paymentStats } from "@/data/mock-payments";
import type { AdminPayment, PaymentStatus } from "@/types/admin";
import { CreditCard, Search } from "lucide-react";
import { useMemo, useState } from "react";

const statusTabs: Array<"all" | PaymentStatus> = ["all", "completed", "pending", "failed", "refunded"];

function formatBdt(value: number) {
  return `${value.toLocaleString("en-US")} BDT`;
}

function statusClass(status: PaymentStatus) {
  const classes: Record<PaymentStatus, string> = {
    completed: "bg-[#e2f8ea] text-[var(--muldhon-green-dark)]",
    pending: "bg-[#fffec9] text-[#8b7600]",
    failed: "bg-[#ffc6cd] text-[#bd1f35]",
    refunded: "bg-[#dfe4f8] text-[#2543a5]",
  };
  return classes[status];
}

export function PaymentsPanel() {
  const [payments, setPayments] = useState(adminPayments);
  const [activeStatus, setActiveStatus] = useState<"all" | PaymentStatus>("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(payments[0]?.id);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return payments.filter((payment) => {
      const matchesStatus = activeStatus === "all" || payment.status === activeStatus;
      const matchesQuery =
        !normalized ||
        payment.id.toLowerCase().includes(normalized) ||
        payment.payer.toLowerCase().includes(normalized) ||
        payment.project.toLowerCase().includes(normalized);
      return matchesStatus && matchesQuery;
    });
  }, [activeStatus, payments, query]);

  const selected = payments.find((payment) => payment.id === selectedId) ?? filtered[0] ?? payments[0];

  function updateStatus(payment: AdminPayment, status: PaymentStatus) {
    setPayments((rows) => rows.map((row) => (row.id === payment.id ? { ...row, status } : row)));
    setSelectedId(payment.id);
  }

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {paymentStats.map((metric) => (
          <StatCard key={metric.id} metric={metric} />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card className="p-4 sm:p-6">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-[22px] font-bold text-[var(--muldhon-text)]">Payment Management</h2>
              <p className="mt-2 text-[13px] text-[var(--muldhon-text-muted)]">
                Track deposits, refunds, failed payments and manual approvals.
              </p>
            </div>
            <div className="relative w-full lg:max-w-[320px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muldhon-green-dark)]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search payment, user or project"
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
            {filtered.map((payment) => (
              <li
                key={payment.id}
                className={`grid gap-4 rounded-[16px] border p-4 lg:grid-cols-[minmax(0,1fr)_130px_120px_150px] lg:items-center ${
                  selected?.id === payment.id ? "border-[var(--muldhon-green)] bg-[#f8fffb]" : "border-[#eeeeee] bg-white"
                }`}
              >
                <button type="button" onClick={() => setSelectedId(payment.id)} className="min-w-0 text-left">
                  <p className="text-[15px] font-bold text-[var(--muldhon-text)]">{payment.payer}</p>
                  <p className="mt-1 truncate text-[12px] text-[var(--muldhon-text-muted)]">{payment.id} · {payment.project}</p>
                </button>
                <strong className="text-[13px]">{formatBdt(payment.amountBdt)}</strong>
                <span className={`w-fit rounded-full px-3 py-1 text-[11px] font-bold capitalize ${statusClass(payment.status)}`}>
                  {payment.status}
                </span>
                <div className="flex flex-col gap-2 sm:flex-row lg:justify-end">
                  <button type="button" onClick={() => updateStatus(payment, "completed")} className="h-9 rounded-full bg-[#9be3b4] px-4 text-[12px] font-semibold text-[#07864b]">Approve</button>
                  <button type="button" onClick={() => updateStatus(payment, "refunded")} className="h-9 rounded-full bg-[#cbd5ff] px-4 text-[12px] font-semibold text-[#1d3cff]">Refund</button>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        {selected && (
          <Card className="h-fit p-5 sm:p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#e2f8ea] text-[var(--muldhon-green-dark)]">
              <CreditCard className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-[20px] font-bold text-[var(--muldhon-text)]">{selected.id}</h3>
            <p className="mt-1 text-[13px] text-[var(--muldhon-text-muted)]">{selected.date}</p>
            <div className="mt-6 space-y-4 text-[13px]">
              <div className="flex justify-between gap-4"><span className="text-[var(--muldhon-text-muted)]">Payer</span><strong>{selected.payer}</strong></div>
              <div className="flex justify-between gap-4"><span className="text-[var(--muldhon-text-muted)]">Project</span><strong className="text-right">{selected.project}</strong></div>
              <div className="flex justify-between gap-4"><span className="text-[var(--muldhon-text-muted)]">Method</span><strong>{selected.method}</strong></div>
              <div className="flex justify-between gap-4"><span className="text-[var(--muldhon-text-muted)]">Amount</span><strong>{formatBdt(selected.amountBdt)}</strong></div>
            </div>
          </Card>
        )}
      </section>
    </div>
  );
}
