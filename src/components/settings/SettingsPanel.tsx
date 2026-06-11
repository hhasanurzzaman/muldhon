"use client";

import { UserAvatar } from "@/components/ui/UserAvatar";
import {
  Bell,
  Camera,
  CheckCircle,
  CreditCard,
  LockKeyhole,
  ShieldCheck,
  Smartphone,
  Trash2,
  User,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";

type SettingsTab = "profile" | "password" | "payments" | "notifications" | "verification";

interface ActivityRow {
  id: string;
  description: string;
  timeAgo: string;
}

interface DeviceRow {
  id: string;
  name: string;
  ip: string;
  location: string;
}

interface PaymentOption {
  id: string;
  name: string;
  description: string;
  accountLabel: string;
  accountValue: string;
  paypalAccount?: string;
  stripeAccount?: string;
  fee: string;
  settlement: string;
  enabled: boolean;
}

const tabs = [
  { id: "profile" as const, label: "Profile Settings", icon: User },
  { id: "password" as const, label: "Password", icon: LockKeyhole },
  { id: "payments" as const, label: "Payment Options", icon: CreditCard },
  { id: "notifications" as const, label: "Notifications", icon: Bell },
  { id: "verification" as const, label: "Verification", icon: ShieldCheck },
];

const initialActivities: ActivityRow[] = [
  { id: "1", description: "new project has been approved", timeAgo: "2 days ago" },
  { id: "2", description: "new transection 2 lac BDT has been made", timeAgo: "2 days ago" },
  { id: "3", description: "new intrapreneur has been added by milan", timeAgo: "2 days ago" },
  { id: "4", description: "new project has been approved", timeAgo: "2 days ago" },
  { id: "5", description: "new intrapreneur has been added by milan", timeAgo: "2 days ago" },
  { id: "6", description: "new project has been approved", timeAgo: "2 days ago" },
];

const initialDevices: DeviceRow[] = [
  {
    id: "desktop",
    name: "Windows Desktop",
    ip: "DGTY571545EGH",
    location: "Uttara, Dhaka.",
  },
  {
    id: "phone",
    name: "Samsung S24 Ultra",
    ip: "541FDF8186687F",
    location: "Uttara, Dhaka.",
  },
];

const initialPaymentOptions: PaymentOption[] = [
  {
    id: "bkash",
    name: "bKash",
    description: "Mobile wallet payment for investor deposits and entrepreneur fees.",
    accountLabel: "Merchant Number",
    accountValue: "01700-000000",
    fee: "1.5%",
    settlement: "Instant",
    enabled: true,
  },
  {
    id: "nagad",
    name: "Nagad",
    description: "Mobile financial service for quick local BDT payments.",
    accountLabel: "Merchant Number",
    accountValue: "01800-000000",
    fee: "1.2%",
    settlement: "Instant",
    enabled: true,
  },
  {
    id: "rocket",
    name: "Rocket",
    description: "Rocket wallet support for verified users and admin approvals.",
    accountLabel: "Merchant Number",
    accountValue: "01900-000000",
    fee: "1.3%",
    settlement: "Same day",
    enabled: false,
  },
  {
    id: "online",
    name: "Online Payment",
    description: "Card, bank transfer, and gateway payment support.",
    accountLabel: "Gateway ID",
    accountValue: "MULDHON-GATEWAY-01",
    paypalAccount: "payments@muldhon.com",
    stripeAccount: "pk_live_muldhon_stripe",
    fee: "2.0%",
    settlement: "1-2 business days",
    enabled: true,
  },
];

function SettingsSidebar({
  activeTab,
  onChange,
}: {
  activeTab: SettingsTab;
  onChange: (tab: SettingsTab) => void;
}) {
  return (
    <nav className="h-fit rounded-[14px] bg-[#d3f0dc] p-0 shadow-[0_4px_14px_rgba(17,24,39,0.08)] lg:w-[245px]">
      <ul className="py-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;

          return (
            <li key={tab.id}>
              <button
                type="button"
                onClick={() => onChange(tab.id)}
                className={`flex h-[48px] w-full items-center gap-5 px-7 text-left text-[14px] font-medium transition-colors ${
                  active ? "bg-white/70 text-[var(--muldhon-text)]" : "text-[var(--muldhon-text)] hover:bg-white/40"
                }`}
              >
                <Icon
                  className={`h-[18px] w-[18px] ${
                    tab.id === "profile" ? "text-[#3396ff]" : "text-[var(--muldhon-text)]"
                  }`}
                  strokeWidth={1.8}
                />
                {tab.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-medium text-[var(--muldhon-text)]">
        {label}
        {required && <span className="text-red-500">*</span>}
      </span>
      {children}
    </label>
  );
}

function textInputClass(className = "") {
  return `h-11 w-full rounded-[7px] border border-[#bdbdbd] bg-white px-4 text-[12px] text-[var(--muldhon-text)] outline-none placeholder:text-[#9b9b9b] focus:border-[var(--muldhon-green)] ${className}`;
}

function ProfileSettings() {
  const [saved, setSaved] = useState(false);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <section className="w-full rounded-[14px] border border-[#bfe7d0] bg-white px-4 pb-8 pt-6 shadow-[0_20px_45px_rgba(43,83,255,0.09)] sm:px-8 sm:pb-10 sm:pt-8 lg:min-h-[650px]">
      <div className="mb-9 flex flex-col items-center gap-4 sm:flex-row sm:gap-5 sm:pl-10">
        <div className="relative">
          <div className="flex h-[124px] w-[124px] items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(135deg,#d8e8df,#204f3d)]">
            {photoName ? (
              <span className="px-3 text-center text-[11px] font-semibold text-white">{photoName}</span>
            ) : (
              <UserAvatar name="Arghya Biswas" className="h-full w-full border-0" />
            )}
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-[8px] right-[2px] flex h-6 w-6 items-center justify-center rounded-full border border-white bg-[#85d9a6] text-white"
            aria-label="Change profile photo"
          >
            <Camera className="h-[13px] w-[13px]" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) setPhotoName(file.name);
            }}
          />
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="h-11 w-full rounded-[7px] bg-[#0eaa56] px-7 text-[13px] font-medium text-white sm:w-auto"
        >
          Change Photo
        </button>
        <button
          type="button"
          onClick={() => setPhotoName(null)}
          className="h-11 w-full rounded-[7px] border border-[#a7a7a7] bg-white px-7 text-[13px] font-medium text-[var(--muldhon-text)] sm:w-auto"
        >
          Delete avatar
        </button>
      </div>

      <form
        className="mx-auto grid max-w-[820px] grid-cols-1 gap-x-12 gap-y-5 sm:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          setSaved(true);
          window.setTimeout(() => setSaved(false), 2000);
        }}
      >
        <Field label="First Name" required>
          <input className={textInputClass()} placeholder="First name" />
        </Field>
        <Field label="Last Name" required>
          <input className={textInputClass()} placeholder="Last name" />
        </Field>
        <Field label="Email" required>
          <input className={textInputClass()} type="email" placeholder="example@gmail.com" />
        </Field>
        <Field label="Mobile Number" required>
          <div className="flex h-11 overflow-hidden rounded-[7px] border border-[#bdbdbd] bg-white">
            <button type="button" className="flex w-[60px] items-center justify-center gap-[5px] border-r border-[#d7d7d7]">
              <span className="h-[11px] w-[17px] rounded-[1px] bg-[#006a4e]">
                <span className="ml-[7px] mt-[3px] block h-[5px] w-[5px] rounded-full bg-[#f42a41]" />
              </span>
              <span className="text-[7px] text-[#777]">⌄</span>
            </button>
            <input className="min-w-0 flex-1 px-4 text-[12px] outline-none placeholder:text-[#9b9b9b]" placeholder="01627441627" />
          </div>
        </Field>
        <Field label="Gender">
          <div className="grid grid-cols-2 gap-6">
            {["Male", "Female"].map((gender) => (
              <label key={gender} className="flex h-11 items-center gap-2 rounded-[7px] border border-[#bdbdbd] px-4 text-[12px] text-[#777]">
                <input type="radio" name="gender" className="h-3 w-3 accent-[#3396ff]" />
                {gender}
              </label>
            ))}
          </div>
        </Field>
        <Field label="ID">
          <input className={textInputClass()} placeholder="1559 8686 4228 9446 8834" />
        </Field>
        <Field label="Tax Identification Number">
          <input className={textInputClass()} placeholder="example@gmail.com" />
        </Field>
        <Field label="Tax Identification Country">
          <div className="flex h-11 overflow-hidden rounded-[7px] border border-[#bdbdbd] bg-white">
            <button type="button" className="flex w-[60px] items-center justify-center gap-[5px] border-r border-[#d7d7d7]">
              <span className="h-[11px] w-[17px] rounded-[1px] bg-[#006a4e]">
                <span className="ml-[7px] mt-[3px] block h-[5px] w-[5px] rounded-full bg-[#f42a41]" />
              </span>
              <span className="text-[7px] text-[#777]">⌄</span>
            </button>
            <input className="min-w-0 flex-1 px-4 text-[12px] outline-none placeholder:text-[#9b9b9b]" placeholder="Bangladesh" />
          </div>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Residential Address">
            <textarea className="h-[76px] w-full resize-none rounded-[7px] border border-[#bdbdbd] bg-white px-4 py-3 text-[12px] outline-none placeholder:text-[#9b9b9b] focus:border-[var(--muldhon-green)]" placeholder="Address in details with valid Roadmap" />
          </Field>
        </div>
        <div className="flex items-center justify-end gap-3 sm:col-span-2">
          {saved && <span className="text-[12px] font-medium text-[var(--muldhon-green)]">Saved</span>}
          <button type="submit" className="h-11 rounded-[7px] bg-[#8ed9ad] px-9 text-[13px] font-medium text-[var(--muldhon-text)]">
            Save Changes
          </button>
        </div>
      </form>
    </section>
  );
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative h-[19px] w-[38px] rounded-full transition-colors ${
        checked ? "bg-[#169b55]" : "bg-[#d4d4d4]"
      }`}
    >
      <span
        className={`absolute top-[3px] h-[13px] w-[13px] rounded-full transition-transform ${
          checked ? "left-[21px] bg-white" : "left-[4px] bg-[#6b6b6b]"
        }`}
      />
    </button>
  );
}

function DeviceRows({
  devices,
  onDelete,
}: {
  devices: DeviceRow[];
  onDelete: (id: string) => void;
}) {
  return (
    <div className="mt-8">
      <h3 className="text-[16px] font-bold leading-none text-[var(--muldhon-text)]">
        Devices signed In
      </h3>
      <p className="mt-2 text-[13px] leading-none text-[var(--muldhon-text-muted)]">
        These devices are currently signed in to your accounts. Remove any unauthorized devices.
      </p>
      <div className="mt-6 divide-y divide-[#d7d7d7] border-y border-[#d7d7d7]">
        {devices.map((device) => (
          <div key={device.id} className="grid grid-cols-[minmax(0,1fr)_24px] gap-2 py-5 text-[13px] text-[var(--muldhon-text)] sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.8fr)_24px] sm:items-center sm:gap-4">
            <span>{device.name}</span>
            <button type="button" onClick={() => onDelete(device.id)} aria-label={`Remove ${device.name}`} className="row-span-3 justify-self-end text-red-600 sm:row-span-1">
              <Trash2 className="h-[16px] w-[16px]" fill="currentColor" />
            </button>
            <span className="break-all text-[12px] text-[var(--muldhon-text-muted)] sm:text-[13px] sm:text-[var(--muldhon-text)]">IP: {device.ip}</span>
            <span className="text-[12px] text-[var(--muldhon-text-muted)] sm:text-[13px] sm:text-[var(--muldhon-text)]">{device.location}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PasswordSettings({
  devices,
  onDeleteDevice,
}: {
  devices: DeviceRow[];
  onDeleteDevice: (id: string) => void;
}) {
  const [authenticator, setAuthenticator] = useState(true);
  const [phone, setPhone] = useState(false);
  const [email, setEmail] = useState(false);

  return (
    <section className="w-full rounded-[14px] border border-[#bfe7d0] bg-white px-4 py-8 shadow-[0_20px_45px_rgba(43,83,255,0.09)] sm:px-9 sm:py-10 lg:min-h-[650px]">
      <div className="grid grid-cols-1 items-start gap-4 border-b border-[#1f1f1f] pb-8 md:grid-cols-[minmax(0,1fr)_210px_70px]">
        <div>
          <h3 className="text-[16px] font-bold leading-none">Password</h3>
          <p className="mt-2 text-[13px] text-[var(--muldhon-text-muted)]">
            Last updated 14 April, 2026
          </p>
        </div>
        <div className="flex items-center gap-2 text-[13px]">
          <span className="font-bold tracking-[2px]">••••••••</span>
          <CheckCircle className="h-[13px] w-[13px] text-[var(--muldhon-green)]" fill="currentColor" />
          <span className="text-[var(--muldhon-green)]">Very secure</span>
        </div>
        <button type="button" className="h-9 w-full rounded-[7px] border border-[#bdbdbd] bg-white text-[13px] md:w-auto">
          Edit
        </button>
      </div>

      <div className="grid grid-cols-1 items-start gap-4 border-b border-[#1f1f1f] py-10 md:grid-cols-[minmax(0,1fr)_240px_70px]">
        <div>
          <h3 className="text-[16px] font-bold leading-none">Two-step verification</h3>
          <p className="mt-2 max-w-[330px] text-[13px] leading-tight text-[var(--muldhon-text-muted)]">
            We recommend requiring a verification code in addition to your password.
          </p>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[13px] text-[var(--muldhon-text-muted)]">
            <Toggle checked={authenticator} onChange={() => setAuthenticator((value) => !value)} />
            Authenticator app
          </div>
          <div className="flex items-center gap-3 text-[13px] text-[var(--muldhon-text-muted)]">
            <Toggle checked={phone} onChange={() => setPhone((value) => !value)} />
            Phone number
          </div>
          <div className="flex items-center gap-3 text-[13px] text-[var(--muldhon-text-muted)]">
            <Toggle checked={email} onChange={() => setEmail((value) => !value)} />
            Email address
          </div>
        </div>
        <button type="button" className="h-9 w-full rounded-[7px] border border-[#bdbdbd] bg-white text-[13px] md:w-auto">
          Edit
        </button>
      </div>

      <DeviceRows devices={devices} onDelete={onDeleteDevice} />
    </section>
  );
}

function PaymentOptionsSettings() {
  const [paymentOptions, setPaymentOptions] = useState(initialPaymentOptions);
  const [saved, setSaved] = useState(false);

  function updatePaymentOption(
    id: string,
    field: keyof PaymentOption,
    value: string | boolean
  ) {
    setPaymentOptions((options) =>
      options.map((option) =>
        option.id === id ? { ...option, [field]: value } : option
      )
    );
  }

  return (
    <section className="w-full rounded-[14px] border border-[#bfe7d0] bg-white px-4 py-8 shadow-[0_20px_45px_rgba(43,83,255,0.09)] sm:px-9 sm:py-10 lg:min-h-[650px]">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-[22px] font-bold leading-none text-[var(--muldhon-text)]">
            Payment Options
          </h3>
          <p className="mt-3 max-w-[620px] text-[13px] leading-6 text-[var(--muldhon-text-muted)]">
            Configure payment methods users can select for investments, project fees,
            deposits and online transactions.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:flex">
          <div className="rounded-[14px] bg-[#e2f8ea] px-4 py-3">
            <p className="text-[11px] font-semibold text-[var(--muldhon-text-muted)]">
              Active
            </p>
            <p className="mt-1 text-[20px] font-bold text-[var(--muldhon-text)]">
              {paymentOptions.filter((option) => option.enabled).length}
            </p>
          </div>
          <div className="rounded-[14px] bg-[#fffec9] px-4 py-3">
            <p className="text-[11px] font-semibold text-[var(--muldhon-text-muted)]">
              Methods
            </p>
            <p className="mt-1 text-[20px] font-bold text-[var(--muldhon-text)]">
              {paymentOptions.length}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {paymentOptions.map((option) => (
          <div
            key={option.id}
            className="rounded-[18px] border border-[#d8eadf] bg-[#fbfefd] p-4 sm:p-5"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-[#e2f8ea] text-[var(--muldhon-green-dark)]">
                  {option.id === "online" ? (
                    <CreditCard className="h-6 w-6" />
                  ) : (
                    <Smartphone className="h-6 w-6" />
                  )}
                </div>
                <div>
                  <h4 className="text-[18px] font-bold text-[var(--muldhon-text)]">
                    {option.name}
                  </h4>
                  <p className="mt-2 text-[13px] leading-5 text-[var(--muldhon-text-muted)]">
                    {option.description}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <span
                  className={`hidden text-[11px] font-bold uppercase tracking-[0.12em] sm:inline ${
                    option.enabled ? "text-[var(--muldhon-green)]" : "text-[#8a8a8a]"
                  }`}
                >
                  {option.enabled ? "Active" : "Off"}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    updatePaymentOption(option.id, "enabled", !option.enabled)
                  }
                  className={`relative h-[28px] w-[54px] shrink-0 rounded-full transition-colors ${
                    option.enabled ? "bg-[var(--muldhon-green)]" : "bg-[#d4d4d4]"
                  }`}
                  role="switch"
                  aria-checked={option.enabled}
                >
                  <span
                    className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-[0_2px_8px_rgba(15,23,42,0.18)] transition-transform ${
                      option.enabled ? "translate-x-[26px]" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label={option.accountLabel}>
                <input
                  className={textInputClass()}
                  value={option.accountValue}
                  onChange={(event) =>
                    updatePaymentOption(
                      option.id,
                      "accountValue",
                      event.target.value
                    )
                  }
                />
              </Field>
              <Field label="Processing Fee">
                <input
                  className={textInputClass()}
                  value={option.fee}
                  onChange={(event) =>
                    updatePaymentOption(option.id, "fee", event.target.value)
                  }
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Settlement Time">
                  <input
                    className={textInputClass()}
                    value={option.settlement}
                    onChange={(event) =>
                      updatePaymentOption(
                        option.id,
                        "settlement",
                        event.target.value
                      )
                    }
                  />
                </Field>
              </div>
              {option.id === "online" && (
                <>
                  <Field label="PayPal Merchant Email">
                    <input
                      className={textInputClass()}
                      value={option.paypalAccount ?? ""}
                      onChange={(event) =>
                        updatePaymentOption(
                          option.id,
                          "paypalAccount",
                          event.target.value
                        )
                      }
                    />
                  </Field>
                  <Field label="Stripe Publishable Key">
                    <input
                      className={textInputClass()}
                      value={option.stripeAccount ?? ""}
                      onChange={(event) =>
                        updatePaymentOption(
                          option.id,
                          "stripeAccount",
                          event.target.value
                        )
                      }
                    />
                  </Field>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        {saved && (
          <span className="text-[12px] font-medium text-[var(--muldhon-green)]">
            Payment options saved
          </span>
        )}
        <button
          type="button"
          onClick={() => {
            setSaved(true);
            window.setTimeout(() => setSaved(false), 2000);
          }}
          className="h-11 rounded-[7px] bg-[#8ed9ad] px-9 text-[13px] font-medium text-[var(--muldhon-text)]"
        >
          Save Payment Settings
        </button>
      </div>
    </section>
  );
}

function NotificationsSettings({
  activities,
  onDelete,
  onClear,
}: {
  activities: ActivityRow[];
  onDelete: (id: string) => void;
  onClear: () => void;
}) {
  const [marked, setMarked] = useState(false);

  return (
    <section className="w-full rounded-[14px] border border-[#bfe7d0] bg-white px-4 py-8 shadow-[0_20px_45px_rgba(43,83,255,0.09)] sm:px-9 sm:py-9 lg:min-h-[650px]">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-[16px] font-bold leading-none">Recent activity</h3>
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-[12px]">
          <button
            type="button"
            onClick={() => setMarked(true)}
            className="h-10 rounded-full border border-[#d3d3d3] bg-white px-6 text-[12px] shadow-[0_2px_9px_rgba(17,24,39,0.13)]"
          >
            {marked ? "Marked as read" : "Mark all as read"}
          </button>
          <button
            type="button"
            onClick={onClear}
            className="flex h-10 items-center justify-center gap-2 rounded-full border border-[#d3d3d3] bg-white px-6 text-[12px] shadow-[0_2px_9px_rgba(17,24,39,0.13)]"
          >
            Delete all
            <Trash2 className="h-[14px] w-[14px] text-red-600" fill="currentColor" />
          </button>
        </div>
      </div>

      <ul className="divide-y divide-[#d7d7d7]">
        {activities.map((activity) => (
          <li key={activity.id} className="grid grid-cols-[40px_minmax(0,1fr)_24px] items-center gap-3 py-4 sm:grid-cols-[40px_minmax(0,1fr)_100px_24px] sm:gap-6">
            <span className="h-9 w-9 rounded-[8px] bg-[#d9d9d9]" />
            <span className="truncate text-[13px] text-[var(--muldhon-text)]">
              {activity.description}
            </span>
            <span className="col-start-2 text-[12px] text-[var(--muldhon-text-muted)] sm:col-start-auto sm:text-[var(--muldhon-text)]">{activity.timeAgo}</span>
            <button type="button" onClick={() => onDelete(activity.id)} aria-label="Delete activity" className="text-red-600">
              <Trash2 className="h-[16px] w-[16px]" fill="currentColor" />
            </button>
          </li>
        ))}
        {activities.length === 0 && (
          <li className="py-12 text-center text-[12px] text-[var(--muldhon-text-muted)]">
            No recent activity.
          </li>
        )}
      </ul>
    </section>
  );
}

function VerificationSettings({
  devices,
  onDeleteDevice,
}: {
  devices: DeviceRow[];
  onDeleteDevice: (id: string) => void;
}) {
  return (
    <section className="w-full rounded-[14px] border-2 border-[#139dff] bg-white px-4 py-8 shadow-[0_20px_45px_rgba(43,83,255,0.09)] sm:px-9 sm:py-10 lg:min-h-[650px]">
      <DeviceRows devices={devices} onDelete={onDeleteDevice} />
    </section>
  );
}

export function SettingsPanel() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [activities, setActivities] = useState(initialActivities);
  const [devices, setDevices] = useState(initialDevices);

  const title = useMemo(
    () => {
      if (activeTab === "password") return "Password";
      if (activeTab === "profile") return "Profile Settings";
      if (activeTab === "payments") return "Payment Options";
      if (activeTab === "notifications") return "Notifications";
      return "Verification";
    },
    [activeTab]
  );

  return (
    <div>
      <h1 className="mb-6 text-[24px] font-bold leading-none text-[var(--muldhon-text)] sm:text-[28px]">
        {title}
      </h1>

      <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-[245px_minmax(0,1fr)]">
        <SettingsSidebar activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === "profile" && <ProfileSettings />}
        {activeTab === "password" && (
          <PasswordSettings
            devices={devices}
            onDeleteDevice={(id) => setDevices((rows) => rows.filter((row) => row.id !== id))}
          />
        )}
        {activeTab === "payments" && <PaymentOptionsSettings />}
        {activeTab === "notifications" && (
          <NotificationsSettings
            activities={activities}
            onDelete={(id) => setActivities((rows) => rows.filter((row) => row.id !== id))}
            onClear={() => setActivities([])}
          />
        )}
        {activeTab === "verification" && (
          <VerificationSettings
            devices={devices}
            onDeleteDevice={(id) => setDevices((rows) => rows.filter((row) => row.id !== id))}
          />
        )}
      </div>
    </div>
  );
}
