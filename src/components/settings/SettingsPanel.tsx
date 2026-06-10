"use client";

import { UserAvatar } from "@/components/ui/UserAvatar";
import {
  Bell,
  Camera,
  CheckCircle,
  LockKeyhole,
  ShieldCheck,
  Trash2,
  User,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";

type SettingsTab = "profile" | "password" | "notifications" | "verification";

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

const tabs = [
  { id: "profile" as const, label: "Profile Settings", icon: User },
  { id: "password" as const, label: "Password", icon: LockKeyhole },
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

function SettingsSidebar({
  activeTab,
  onChange,
}: {
  activeTab: SettingsTab;
  onChange: (tab: SettingsTab) => void;
}) {
  return (
    <nav className="h-fit rounded-[9px] bg-[#d3f0dc] p-0 md:w-[214px]">
      <ul className="py-[18px]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;

          return (
            <li key={tab.id}>
              <button
                type="button"
                onClick={() => onChange(tab.id)}
                className={`flex h-[40px] w-full items-center gap-[17px] px-[24px] text-left text-[13px] font-medium transition-colors ${
                  active ? "bg-white/70 text-[var(--muldhon-text)]" : "text-[var(--muldhon-text)] hover:bg-white/40"
                }`}
              >
                <Icon
                  className={`h-[16px] w-[16px] ${
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
      <span className="mb-[7px] block text-[8px] font-medium text-[var(--muldhon-text)]">
        {label}
        {required && <span className="text-red-500">*</span>}
      </span>
      {children}
    </label>
  );
}

function textInputClass(className = "") {
  return `h-[33px] w-full rounded-[5px] border border-[#bdbdbd] bg-white px-[13px] text-[9px] text-[var(--muldhon-text)] outline-none placeholder:text-[#9b9b9b] focus:border-[var(--muldhon-green)] ${className}`;
}

function ProfileSettings() {
  const [saved, setSaved] = useState(false);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <section className="rounded-[8px] border border-[#bfe7d0] bg-white px-[14px] pb-[42px] pt-[26px] shadow-[0_25px_55px_rgba(43,83,255,0.08)] md:min-h-[600px] md:w-[580px]">
      <div className="mb-[28px] flex flex-col items-center gap-[16px] sm:flex-row sm:pl-[37px]">
        <div className="relative">
          <div className="flex h-[116px] w-[116px] items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(135deg,#d8e8df,#204f3d)]">
            {photoName ? (
              <span className="px-3 text-center text-[11px] font-semibold text-white">{photoName}</span>
            ) : (
              <UserAvatar name="Arghya Biswas" className="h-full w-full border-0" />
            )}
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-[8px] right-[2px] flex h-[22px] w-[22px] items-center justify-center rounded-full border border-white bg-[#85d9a6] text-white"
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
          className="h-[34px] rounded-[5px] bg-[#0eaa56] px-[21px] text-[10px] font-medium text-white"
        >
          Change Photo
        </button>
        <button
          type="button"
          onClick={() => setPhotoName(null)}
          className="h-[34px] rounded-[5px] border border-[#a7a7a7] bg-white px-[21px] text-[10px] font-medium text-[var(--muldhon-text)]"
        >
          Delete avatar
        </button>
      </div>

      <form
        className="mx-auto grid max-w-[522px] grid-cols-1 gap-x-[56px] gap-y-[18px] sm:grid-cols-2"
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
          <div className="flex h-[33px] overflow-hidden rounded-[5px] border border-[#bdbdbd] bg-white">
            <button type="button" className="flex w-[52px] items-center justify-center gap-[5px] border-r border-[#d7d7d7]">
              <span className="h-[11px] w-[17px] rounded-[1px] bg-[#006a4e]">
                <span className="ml-[7px] mt-[3px] block h-[5px] w-[5px] rounded-full bg-[#f42a41]" />
              </span>
              <span className="text-[7px] text-[#777]">⌄</span>
            </button>
            <input className="min-w-0 flex-1 px-[12px] text-[9px] outline-none placeholder:text-[#9b9b9b]" placeholder="01627441627" />
          </div>
        </Field>
        <Field label="Gender">
          <div className="grid grid-cols-2 gap-[56px]">
            {["Male", "Female"].map((gender) => (
              <label key={gender} className="flex h-[33px] items-center gap-[7px] rounded-[5px] border border-[#bdbdbd] px-[11px] text-[9px] text-[#777]">
                <input type="radio" name="gender" className="h-[10px] w-[10px] accent-[#3396ff]" />
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
          <div className="flex h-[33px] overflow-hidden rounded-[5px] border border-[#bdbdbd] bg-white">
            <button type="button" className="flex w-[52px] items-center justify-center gap-[5px] border-r border-[#d7d7d7]">
              <span className="h-[11px] w-[17px] rounded-[1px] bg-[#006a4e]">
                <span className="ml-[7px] mt-[3px] block h-[5px] w-[5px] rounded-full bg-[#f42a41]" />
              </span>
              <span className="text-[7px] text-[#777]">⌄</span>
            </button>
            <input className="min-w-0 flex-1 px-[12px] text-[9px] outline-none placeholder:text-[#9b9b9b]" placeholder="Bangladesh" />
          </div>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Residential Address">
            <textarea className="h-[58px] w-full resize-none rounded-[5px] border border-[#bdbdbd] bg-white px-[13px] py-[10px] text-[9px] outline-none placeholder:text-[#9b9b9b] focus:border-[var(--muldhon-green)]" placeholder="Address in details with valid Roadmap" />
          </Field>
        </div>
        <div className="flex items-center justify-end gap-3 sm:col-span-2">
          {saved && <span className="text-[10px] font-medium text-[var(--muldhon-green)]">Saved</span>}
          <button type="submit" className="h-[34px] rounded-[5px] bg-[#8ed9ad] px-[28px] text-[10px] font-medium text-[var(--muldhon-text)]">
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
    <div className="mt-[22px]">
      <h3 className="text-[13px] font-bold leading-none text-[var(--muldhon-text)]">
        Devices signed In
      </h3>
      <p className="mt-[4px] text-[10px] leading-none text-[var(--muldhon-text-muted)]">
        These devices are currently signed in to your accounts. Remove any unauthorized devices.
      </p>
      <div className="mt-[18px] divide-y divide-[#d7d7d7] border-y border-[#d7d7d7]">
        {devices.map((device) => (
          <div key={device.id} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.8fr)_24px] items-center gap-3 py-[14px] text-[11px] text-[var(--muldhon-text)]">
            <span>{device.name}</span>
            <span>IP: {device.ip}</span>
            <span>{device.location}</span>
            <button type="button" onClick={() => onDelete(device.id)} aria-label={`Remove ${device.name}`} className="text-red-600">
              <Trash2 className="h-[16px] w-[16px]" fill="currentColor" />
            </button>
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
    <section className="rounded-[8px] border border-[#bfe7d0] bg-white px-[27px] py-[45px] shadow-[0_25px_55px_rgba(43,83,255,0.08)] md:min-h-[600px] md:w-[580px]">
      <div className="grid grid-cols-[minmax(0,1fr)_160px_54px] items-start gap-4 border-b border-[#1f1f1f] pb-[30px]">
        <div>
          <h3 className="text-[13px] font-bold leading-none">Password</h3>
          <p className="mt-[4px] text-[10px] text-[var(--muldhon-text-muted)]">
            Last updated 14 April, 2026
          </p>
        </div>
        <div className="flex items-center gap-[7px] text-[10px]">
          <span className="font-bold tracking-[2px]">••••••••</span>
          <CheckCircle className="h-[13px] w-[13px] text-[var(--muldhon-green)]" fill="currentColor" />
          <span className="text-[var(--muldhon-green)]">Very secure</span>
        </div>
        <button type="button" className="h-[23px] rounded-[5px] border border-[#bdbdbd] bg-white text-[10px]">
          Edit
        </button>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_190px_54px] items-start gap-4 border-b border-[#1f1f1f] py-[36px]">
        <div>
          <h3 className="text-[13px] font-bold leading-none">Two-step verification</h3>
          <p className="mt-[4px] max-w-[230px] text-[10px] leading-tight text-[var(--muldhon-text-muted)]">
            We recommend requiring a verification code in addition to your password.
          </p>
        </div>
        <div className="space-y-[9px]">
          <div className="flex items-center gap-[8px] text-[11px] text-[var(--muldhon-text-muted)]">
            <Toggle checked={authenticator} onChange={() => setAuthenticator((value) => !value)} />
            Authenticator app
          </div>
          <div className="flex items-center gap-[8px] text-[11px] text-[var(--muldhon-text-muted)]">
            <Toggle checked={phone} onChange={() => setPhone((value) => !value)} />
            Phone number
          </div>
          <div className="flex items-center gap-[8px] text-[11px] text-[var(--muldhon-text-muted)]">
            <Toggle checked={email} onChange={() => setEmail((value) => !value)} />
            Email address
          </div>
        </div>
        <button type="button" className="h-[23px] rounded-[5px] border border-[#bdbdbd] bg-white text-[10px]">
          Edit
        </button>
      </div>

      <DeviceRows devices={devices} onDelete={onDeleteDevice} />
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
    <section className="rounded-[8px] border border-[#bfe7d0] bg-white px-[27px] py-[32px] shadow-[0_25px_55px_rgba(43,83,255,0.08)] md:min-h-[600px] md:w-[580px]">
      <div className="mb-[28px] flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-[13px] font-bold leading-none">Recent activity</h3>
        <div className="flex gap-[12px]">
          <button
            type="button"
            onClick={() => setMarked(true)}
            className="h-[36px] rounded-full border border-[#d3d3d3] bg-white px-[20px] text-[10px] shadow-[0_2px_9px_rgba(17,24,39,0.13)]"
          >
            {marked ? "Marked as read" : "Mark all as read"}
          </button>
          <button
            type="button"
            onClick={onClear}
            className="flex h-[36px] items-center gap-[8px] rounded-full border border-[#d3d3d3] bg-white px-[20px] text-[10px] shadow-[0_2px_9px_rgba(17,24,39,0.13)]"
          >
            Delete all
            <Trash2 className="h-[14px] w-[14px] text-red-600" fill="currentColor" />
          </button>
        </div>
      </div>

      <ul className="divide-y divide-[#d7d7d7]">
        {activities.map((activity) => (
          <li key={activity.id} className="grid grid-cols-[34px_minmax(0,1fr)_88px_24px] items-center gap-[19px] py-[10px]">
            <span className="h-[31px] w-[31px] rounded-[7px] bg-[#d9d9d9]" />
            <span className="truncate text-[11px] text-[var(--muldhon-text)]">
              {activity.description}
            </span>
            <span className="text-[10px] text-[var(--muldhon-text)]">{activity.timeAgo}</span>
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
    <section className="rounded-[8px] border-2 border-[#139dff] bg-white px-[27px] py-[39px] shadow-[0_25px_55px_rgba(43,83,255,0.08)] md:min-h-[600px] md:w-[580px]">
      <DeviceRows devices={devices} onDelete={onDeleteDevice} />
    </section>
  );
}

export function SettingsPanel() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [activities, setActivities] = useState(initialActivities);
  const [devices, setDevices] = useState(initialDevices);

  const title = useMemo(
    () => (activeTab === "profile" ? "Profile Settings" : "Account settings"),
    [activeTab]
  );

  return (
    <div>
      <h1 className="mb-[22px] text-[26px] font-bold leading-none text-[var(--muldhon-text)]">
        {activeTab === "profile" ? "Settings" : "Account settings"}
      </h1>
      <h2 className="mb-[14px] text-[26px] font-bold leading-none text-[var(--muldhon-text)]">
        {title}
      </h2>

      <div className="flex flex-col gap-[19px] lg:flex-row">
        <SettingsSidebar activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === "profile" && <ProfileSettings />}
        {activeTab === "password" && (
          <PasswordSettings
            devices={devices}
            onDeleteDevice={(id) => setDevices((rows) => rows.filter((row) => row.id !== id))}
          />
        )}
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
