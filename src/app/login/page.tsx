"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { Eye, LockKeyhole, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("admin@muldhon.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");

  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,#eefaf3_0%,#ffffff_45%,#dff6e8_100%)] px-4 py-10">
      <section className="grid w-full max-w-[980px] overflow-hidden rounded-[28px] border border-[#d7eadf] bg-white shadow-[0_24px_80px_rgba(17,24,39,0.16)] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative hidden min-h-[620px] flex-col justify-between bg-[#063f2d] p-10 text-white lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,197,24,0.28),transparent_28%),radial-gradient(circle_at_80%_70%,rgba(13,159,79,0.55),transparent_35%)]" />
          <div className="relative">
            <Image
              src="/muldhon-logo.png"
              alt="Muldhon"
              width={300}
              height={90}
              priority
              className="w-[190px] rounded-xl bg-white/95 p-3"
            />
          </div>
          <div className="relative">
            <p className="text-[15px] font-semibold uppercase tracking-[0.28em] text-[#f3d56a]">
              Admin Panel
            </p>
            <h1 className="mt-4 max-w-[360px] text-[42px] font-bold leading-tight">
              Manage investment, projects and accounts with confidence.
            </h1>
            <p className="mt-5 max-w-[330px] text-[15px] leading-6 text-white/75">
              Secure dashboard access for Muldhon administrators.
            </p>
          </div>
        </div>

        <div className="p-8 sm:p-12 lg:p-14">
          <div className="mb-10 lg:hidden">
            <Image
              src="/muldhon-logo.png"
              alt="Muldhon"
              width={300}
              height={90}
              priority
              className="h-auto w-[170px]"
            />
          </div>

          <p className="text-[14px] font-semibold uppercase tracking-[0.22em] text-[var(--muldhon-green)]">
            Welcome back
          </p>
          <h2 className="mt-3 text-[34px] font-bold leading-none text-[var(--muldhon-text)]">
            Login to dashboard
          </h2>
          <p className="mt-3 text-[14px] leading-6 text-[var(--muldhon-text-muted)]">
            Use any email and a password with at least 4 characters for this demo admin login.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Link
              href="/register/investor"
              className="rounded-xl border border-[#d8d8d8] bg-white px-4 py-3 text-center text-[13px] font-bold text-[var(--muldhon-green-dark)] transition hover:border-[var(--muldhon-green)] hover:bg-[#f3fbf6]"
            >
              Register as Investor
            </Link>
            <Link
              href="/register/entrepreneur"
              className="rounded-xl border border-[#d8d8d8] bg-white px-4 py-3 text-center text-[13px] font-bold text-[var(--muldhon-green-dark)] transition hover:border-[var(--muldhon-green)] hover:bg-[#f3fbf6]"
            >
              Register as Entrepreneur
            </Link>
          </div>

          <form
            className="mt-10 space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              setError("");

              if (!login(email, password)) {
                setError("Please enter an email and a password of at least 4 characters.");
              }
            }}
          >
            <label className="block">
              <span className="mb-2 block text-[13px] font-semibold text-[var(--muldhon-text)]">
                Email
              </span>
              <span className="relative block">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  className="h-12 w-full rounded-xl border border-[#d8d8d8] bg-white pl-12 pr-4 text-[14px] outline-none transition focus:border-[var(--muldhon-green)] focus:ring-2 focus:ring-[var(--muldhon-green)]/15"
                  placeholder="admin@muldhon.com"
                />
              </span>
            </label>

            <label className="block">
              <span className="mb-2 block text-[13px] font-semibold text-[var(--muldhon-text)]">
                Password
              </span>
              <span className="relative block">
                <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  className="h-12 w-full rounded-xl border border-[#d8d8d8] bg-white pl-12 pr-12 text-[14px] outline-none transition focus:border-[var(--muldhon-green)] focus:ring-2 focus:ring-[var(--muldhon-green)]/15"
                  placeholder="Password"
                />
                <Eye className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              </span>
            </label>

            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-[13px] font-medium text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="h-12 w-full rounded-xl bg-[var(--muldhon-green)] text-[15px] font-bold text-white shadow-[0_10px_24px_rgba(10,160,90,0.24)] transition hover:bg-[var(--muldhon-green-dark)]"
            >
              Login
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
