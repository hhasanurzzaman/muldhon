"use client";

import { MuldhonLogo } from "@/components/brand/MuldhonLogo";
import { roleFocusPlaceholder, roleHeroCopy, roleLabels } from "@/data/mock-portal";
import { useAuth } from "@/components/auth/AuthProvider";
import type { PortalRole } from "@/types/portal";
import { ArrowRight, BriefcaseBusiness, Mail, MapPin, Phone, UserRound } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface RegisterPageProps {
  role: PortalRole;
}

function inputClass() {
  return "h-12 w-full rounded-xl border border-[#d8d8d8] bg-white px-4 text-[14px] outline-none transition focus:border-[var(--muldhon-green)] focus:ring-2 focus:ring-[var(--muldhon-green)]/15";
}

export function RegisterPage({ role }: RegisterPageProps) {
  const { registerPortalUser } = useAuth();
  const copy = roleHeroCopy[role];
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    location: "Dhaka, Bangladesh",
    focus: "",
    bio: "",
  });

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#eefaf3_0%,#ffffff_45%,#dff6e8_100%)] px-4 py-8 sm:py-10">
      <section className="mx-auto grid w-full max-w-[1120px] overflow-hidden rounded-[28px] border border-[#d7eadf] bg-white shadow-[0_24px_80px_rgba(17,24,39,0.16)] lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="relative bg-[#063f2d] p-7 text-white sm:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(245,197,24,0.28),transparent_30%),radial-gradient(circle_at_82%_76%,rgba(13,159,79,0.55),transparent_38%)]" />
          <div className="relative flex min-h-[360px] flex-col justify-between lg:min-h-[660px]">
            <MuldhonLogo className="w-[170px] rounded-xl bg-white/95 p-3" />
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.24em] text-[#f3d56a]">
                {copy.eyebrow}
              </p>
              <h1 className="mt-4 max-w-[410px] text-[34px] font-bold leading-tight sm:text-[44px]">
                {copy.title}
              </h1>
              <p className="mt-5 max-w-[380px] text-[15px] leading-6 text-white/75">
                {copy.body}
              </p>
            </div>
          </div>
        </aside>

        <div className="p-6 sm:p-10 lg:p-12">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-[var(--muldhon-green)]">
                Create account
              </p>
              <h2 className="mt-3 text-[30px] font-bold leading-none text-[var(--muldhon-text)]">
                {roleLabels[role]} Register
              </h2>
            </div>
            <Link href="/login" className="text-[13px] font-semibold text-[var(--muldhon-green-dark)] hover:underline">
              Admin login
            </Link>
          </div>

          <form
            className="grid grid-cols-1 gap-5 sm:grid-cols-2"
            onSubmit={(event) => {
              event.preventDefault();
              setError("");
              const ok = registerPortalUser({ role, ...form });
              if (!ok) setError("Please complete name, email, phone and organization correctly.");
            }}
          >
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-[13px] font-semibold"><UserRound className="h-4 w-4" /> Full Name</span>
              <input className={inputClass()} value={form.fullName} onChange={(event) => updateField("fullName", event.target.value)} placeholder="Your full name" />
            </label>
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-[13px] font-semibold"><Mail className="h-4 w-4" /> Email</span>
              <input className={inputClass()} value={form.email} onChange={(event) => updateField("email", event.target.value)} type="email" placeholder="example@gmail.com" />
            </label>
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-[13px] font-semibold"><Phone className="h-4 w-4" /> Phone</span>
              <input className={inputClass()} value={form.phone} onChange={(event) => updateField("phone", event.target.value)} placeholder="+880 1627441627" />
            </label>
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-[13px] font-semibold"><BriefcaseBusiness className="h-4 w-4" /> Organization</span>
              <input className={inputClass()} value={form.organization} onChange={(event) => updateField("organization", event.target.value)} placeholder={role === "investor" ? "Investment group" : "Business name"} />
            </label>
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-[13px] font-semibold"><MapPin className="h-4 w-4" /> Location</span>
              <input className={inputClass()} value={form.location} onChange={(event) => updateField("location", event.target.value)} placeholder="City, Country" />
            </label>
            <label className="block">
              <span className="mb-2 block text-[13px] font-semibold">Focus Area</span>
              <input className={inputClass()} value={form.focus} onChange={(event) => updateField("focus", event.target.value)} placeholder={roleFocusPlaceholder[role]} />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-2 block text-[13px] font-semibold">Short Bio</span>
              <textarea className="h-28 w-full resize-none rounded-xl border border-[#d8d8d8] bg-white p-4 text-[14px] outline-none transition focus:border-[var(--muldhon-green)] focus:ring-2 focus:ring-[var(--muldhon-green)]/15" value={form.bio} onChange={(event) => updateField("bio", event.target.value)} placeholder="Write a short professional profile" />
            </label>
            {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-[13px] font-medium text-red-600 sm:col-span-2">{error}</p>}
            <button type="submit" className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[var(--muldhon-green)] text-[15px] font-bold text-white shadow-[0_10px_24px_rgba(10,160,90,0.24)] transition hover:bg-[var(--muldhon-green-dark)] sm:col-span-2">
              Create {roleLabels[role]} Account <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
