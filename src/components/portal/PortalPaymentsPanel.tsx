"use client";

import { PortalShell } from "@/components/portal/PortalShell";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/components/auth/AuthProvider";
import type { PortalRole } from "@/types/portal";
import { CreditCard, Plus } from "lucide-react";
import { useMemo, useState } from "react";

interface PortalPaymentsPanelProps {
  role: PortalRole;
}

function formatBdt(value: number) {
  return `${value.toLocaleString("en-US")} BDT`;
}

function statusClass(status: string) {
  if (status === "Completed") return "bg-[#e2f8ea] text-[var(--muldhon-green-dark)]";
  if (status === "Review") return "bg-[#dfe4f8] text-[#2543a5]";
  return "bg-[#fffec9] text-[#8b7600]";
}

export function PortalPaymentsPanel({ role }: PortalPaymentsPanelProps) {
  const { portalSnapshot, addPortalPayment } = useAuth();
  const [purpose, setPurpose] = useState(role === "investor" ? "New project investment" : "Project verification fee");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("bKash");

  const totalPaid = useMemo(
    () => (portalSnapshot?.payments ?? []).reduce((sum, payment) => sum + payment.amountBdt, 0),
    [portalSnapshot?.payments]
  );

  function submitPayment() {
    const numericAmount = Number(amount);
    if (!purpose.trim() || !Number.isFinite(numericAmount) || numericAmount <= 0) return;
    addPortalPayment({
      purpose: purpose.trim(),
      amountBdt: numericAmount,
      method,
    });
    setAmount("");
  }

  return (
    <PortalShell role={role} title="Payments">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-6">
          <section className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <Card className="p-5">
              <p className="text-[12px] font-medium text-[var(--muldhon-text-muted)]">Total Records</p>
              <p className="mt-2 text-[26px] font-bold">{portalSnapshot?.payments.length ?? 0}</p>
            </Card>
            <Card className="p-5">
              <p className="text-[12px] font-medium text-[var(--muldhon-text-muted)]">Total Amount</p>
              <p className="mt-2 text-[26px] font-bold">{formatBdt(totalPaid)}</p>
            </Card>
            <Card className="p-5">
              <p className="text-[12px] font-medium text-[var(--muldhon-text-muted)]">Payment Role</p>
              <p className="mt-2 text-[26px] font-bold capitalize">{role}</p>
            </Card>
          </section>

          <Card className="p-4 sm:p-6">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-[22px] font-bold text-[var(--muldhon-text)]">Payment History</h2>
                <p className="mt-2 text-[13px] text-[var(--muldhon-text-muted)]">
                  All local payment records created from this portal.
                </p>
              </div>
              <CreditCard className="h-5 w-5 text-[var(--muldhon-green)]" />
            </div>
            <ul className="space-y-4">
              {(portalSnapshot?.payments ?? []).map((payment) => (
                <li key={payment.id} className="grid gap-3 rounded-[16px] border border-[#eeeeee] bg-white p-4 md:grid-cols-[minmax(0,1fr)_140px_110px] md:items-center">
                  <div className="min-w-0">
                    <p className="truncate text-[15px] font-bold text-[var(--muldhon-text)]">{payment.purpose}</p>
                    <p className="mt-1 text-[12px] text-[var(--muldhon-text-muted)]">
                      {payment.id} · {payment.method} · {payment.createdAt}
                    </p>
                  </div>
                  <strong className="text-[13px]">{formatBdt(payment.amountBdt)}</strong>
                  <span className={`w-fit rounded-full px-3 py-1 text-[11px] font-bold ${statusClass(payment.status)}`}>
                    {payment.status}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <Card className="h-fit p-5 sm:p-6">
          <h2 className="text-[22px] font-bold text-[var(--muldhon-text)]">Create Payment</h2>
          <p className="mt-2 text-[13px] leading-5 text-[var(--muldhon-text-muted)]">
            Add a mock payment record for admin review. This stays in localStorage.
          </p>
          <label className="mt-5 block">
            <span className="mb-2 block text-[13px] font-semibold">Purpose</span>
            <input value={purpose} onChange={(event) => setPurpose(event.target.value)} className="h-11 w-full rounded-xl border border-[#d8d8d8] px-4 text-[13px] outline-none focus:border-[var(--muldhon-green)]" />
          </label>
          <label className="mt-4 block">
            <span className="mb-2 block text-[13px] font-semibold">Amount BDT</span>
            <input value={amount} onChange={(event) => setAmount(event.target.value)} inputMode="numeric" className="h-11 w-full rounded-xl border border-[#d8d8d8] px-4 text-[13px] outline-none focus:border-[var(--muldhon-green)]" placeholder="50000" />
          </label>
          <label className="mt-4 block">
            <span className="mb-2 block text-[13px] font-semibold">Method</span>
            <select value={method} onChange={(event) => setMethod(event.target.value)} className="h-11 w-full rounded-xl border border-[#d8d8d8] px-4 text-[13px] outline-none focus:border-[var(--muldhon-green)]">
              <option>bKash</option>
              <option>Nagad</option>
              <option>Rocket</option>
              <option>Bank Transfer</option>
              <option>Card</option>
            </select>
          </label>
          <button type="button" onClick={submitPayment} className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[var(--muldhon-green)] text-[13px] font-bold text-white">
            Add Payment <Plus className="h-4 w-4" />
          </button>
        </Card>
      </div>
    </PortalShell>
  );
}
