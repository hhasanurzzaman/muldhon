"use client";

import { PortalShell } from "@/components/portal/PortalShell";
import { Card } from "@/components/ui/Card";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { roleLabels } from "@/data/mock-portal";
import { useAuth } from "@/components/auth/AuthProvider";
import type { PortalProfile, PortalRole } from "@/types/portal";
import { CheckCircle2, MapPin, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

interface ProfilePanelProps {
  role: PortalRole;
}

function inputClass() {
  return "h-11 w-full rounded-xl border border-[#d8d8d8] bg-white px-4 text-[13px] outline-none focus:border-[var(--muldhon-green)] focus:ring-2 focus:ring-[var(--muldhon-green)]/15";
}

export function ProfilePanel({ role }: ProfilePanelProps) {
  const { portalUser, portalSnapshot, updatePortalProfile } = useAuth();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState<PortalProfile | null>(portalUser);

  useEffect(() => {
    setForm(portalUser);
  }, [portalUser]);

  function updateField(field: keyof PortalProfile, value: string) {
    setForm((current) => (current ? { ...current, [field]: value } : current));
  }

  return (
    <PortalShell role={role} title="Profile Overview">
      {form && (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
          <Card className="h-fit p-5 sm:p-6">
            <div className="flex flex-col items-center text-center">
              <UserAvatar name={form.fullName} size="md" className="h-24 w-24" />
              <h2 className="mt-5 text-[24px] font-bold text-[var(--muldhon-text)]">{form.fullName}</h2>
              <p className="mt-2 rounded-full bg-[#e2f8ea] px-4 py-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--muldhon-green-dark)]">
                {roleLabels[role]}
              </p>
              <p className="mt-4 flex items-center gap-2 text-[13px] text-[var(--muldhon-text-muted)]">
                <MapPin className="h-4 w-4" /> {form.location}
              </p>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3">
              <div className="rounded-[16px] bg-[#f4f8f5] p-4">
                <p className="text-[20px] font-bold">{portalSnapshot?.messages.length ?? 0}</p>
                <p className="mt-1 text-[12px] text-[var(--muldhon-text-muted)]">Messages</p>
              </div>
              <div className="rounded-[16px] bg-[#f4f8f5] p-4">
                <p className="text-[20px] font-bold">{portalSnapshot?.payments.length ?? 0}</p>
                <p className="mt-1 text-[12px] text-[var(--muldhon-text-muted)]">Payments</p>
              </div>
            </div>

            <div className="mt-6 space-y-3 text-[13px]">
              <div className="flex items-center gap-2 text-[var(--muldhon-green-dark)]">
                <ShieldCheck className="h-4 w-4" /> Profile stored locally
              </div>
              <div className="flex items-center gap-2 text-[var(--muldhon-green-dark)]">
                <CheckCircle2 className="h-4 w-4" /> Joined {form.joinedAt}
              </div>
            </div>
          </Card>

          <Card className="p-5 sm:p-6">
            <div className="mb-6">
              <h2 className="text-[22px] font-bold text-[var(--muldhon-text)]">Edit Profile</h2>
              <p className="mt-2 text-[13px] text-[var(--muldhon-text-muted)]">
                Keep your profile professional and up to date for admin review.
              </p>
            </div>

            <form
              className="grid grid-cols-1 gap-5 sm:grid-cols-2"
              onSubmit={(event) => {
                event.preventDefault();
                updatePortalProfile(form);
                setSaved(true);
                window.setTimeout(() => setSaved(false), 1600);
              }}
            >
              <label><span className="mb-2 block text-[13px] font-semibold">Full Name</span><input className={inputClass()} value={form.fullName} onChange={(event) => updateField("fullName", event.target.value)} /></label>
              <label><span className="mb-2 block text-[13px] font-semibold">Email</span><input className={inputClass()} value={form.email} onChange={(event) => updateField("email", event.target.value)} /></label>
              <label><span className="mb-2 block text-[13px] font-semibold">Phone</span><input className={inputClass()} value={form.phone} onChange={(event) => updateField("phone", event.target.value)} /></label>
              <label><span className="mb-2 block text-[13px] font-semibold">Organization</span><input className={inputClass()} value={form.organization} onChange={(event) => updateField("organization", event.target.value)} /></label>
              <label><span className="mb-2 block text-[13px] font-semibold">Location</span><input className={inputClass()} value={form.location} onChange={(event) => updateField("location", event.target.value)} /></label>
              <label><span className="mb-2 block text-[13px] font-semibold">Focus Area</span><input className={inputClass()} value={form.focus} onChange={(event) => updateField("focus", event.target.value)} /></label>
              <label className="sm:col-span-2">
                <span className="mb-2 block text-[13px] font-semibold">Bio</span>
                <textarea className="h-28 w-full resize-none rounded-xl border border-[#d8d8d8] bg-white p-4 text-[13px] outline-none focus:border-[var(--muldhon-green)] focus:ring-2 focus:ring-[var(--muldhon-green)]/15" value={form.bio} onChange={(event) => updateField("bio", event.target.value)} />
              </label>
              <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-end">
                {saved && <span className="text-[13px] font-semibold text-[var(--muldhon-green)]">Profile saved</span>}
                <button type="submit" className="h-11 rounded-xl bg-[var(--muldhon-green)] px-8 text-[13px] font-bold text-white">
                  Save Changes
                </button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </PortalShell>
  );
}
