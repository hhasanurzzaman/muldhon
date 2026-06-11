"use client";

import { StatCard } from "@/components/dashboard/StatCard";
import { Card } from "@/components/ui/Card";
import { adminNotifications, notificationStats } from "@/data/mock-notifications";
import type { AdminNotification, NotificationCategory } from "@/types/admin";
import { BellRing, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

const categories: Array<"All" | NotificationCategory> = ["All", "Account", "Payment", "Project", "System"];

function categoryClass(category: NotificationCategory) {
  const classes: Record<NotificationCategory, string> = {
    Account: "bg-[#dfe4f8] text-[#2543a5]",
    Payment: "bg-[#fffec9] text-[#8b7600]",
    Project: "bg-[#e2f8ea] text-[var(--muldhon-green-dark)]",
    System: "bg-[#ffe7da] text-[#b85a21]",
  };
  return classes[category];
}

export function NotificationsPanel() {
  const [notifications, setNotifications] = useState(adminNotifications);
  const [category, setCategory] = useState<"All" | NotificationCategory>("All");
  const [draft, setDraft] = useState("");

  const filtered = useMemo(
    () => notifications.filter((notification) => category === "All" || notification.category === category),
    [category, notifications]
  );

  function markRead(id: string) {
    setNotifications((rows) => rows.map((row) => (row.id === id ? { ...row, read: !row.read } : row)));
  }

  function deleteNotification(id: string) {
    setNotifications((rows) => rows.filter((row) => row.id !== id));
  }

  function sendNotification() {
    const title = draft.trim();
    if (!title) return;
    const notification: AdminNotification = {
      id: `NTF-${Date.now()}`,
      title,
      body: "Admin broadcast notification has been queued for users.",
      category: "System",
      audience: "All users",
      read: false,
      sentAt: "Just now",
    };
    setNotifications((rows) => [notification, ...rows]);
    setDraft("");
  }

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {notificationStats.map((metric) => (
          <StatCard key={metric.id} metric={metric} />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card className="p-4 sm:p-6">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-[22px] font-bold text-[var(--muldhon-text)]">Notification Center</h2>
              <p className="mt-2 text-[13px] text-[var(--muldhon-text-muted)]">
                Monitor account, project, payment and system alerts.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setNotifications((rows) => rows.map((row) => ({ ...row, read: true })))}
              className="h-10 rounded-full border border-[#d8d8d8] px-5 text-[12px] font-semibold"
            >
              Mark all as read
            </button>
          </div>

          <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`h-10 shrink-0 rounded-full px-5 text-[12px] font-semibold ${
                  category === item ? "bg-[var(--muldhon-green)] text-white" : "border border-[#d8d8d8] bg-white text-[var(--muldhon-text)]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <ul className="space-y-4">
            {filtered.map((notification) => (
              <li key={notification.id} className="rounded-[16px] border border-[#eeeeee] bg-white p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      {!notification.read && <span className="h-2.5 w-2.5 rounded-full bg-[var(--muldhon-green)]" />}
                      <h3 className="text-[15px] font-bold text-[var(--muldhon-text)]">{notification.title}</h3>
                      <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${categoryClass(notification.category)}`}>
                        {notification.category}
                      </span>
                    </div>
                    <p className="mt-2 text-[13px] leading-5 text-[var(--muldhon-text-muted)]">{notification.body}</p>
                    <p className="mt-2 text-[12px] text-[var(--muldhon-text-muted)]">{notification.audience} · {notification.sentAt}</p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => markRead(notification.id)} className="h-9 rounded-full border border-[#d8d8d8] px-4 text-[12px] font-semibold">
                      {notification.read ? "Unread" : "Read"}
                    </button>
                    <button type="button" onClick={() => deleteNotification(notification.id)} className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ffd1d7] text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="h-fit p-5 sm:p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#e2f8ea] text-[var(--muldhon-green-dark)]">
            <BellRing className="h-6 w-6" />
          </div>
          <h3 className="mt-5 text-[20px] font-bold text-[var(--muldhon-text)]">Send Notification</h3>
          <p className="mt-2 text-[13px] leading-5 text-[var(--muldhon-text-muted)]">
            Create a mock broadcast notification for investors and entrepreneurs.
          </p>
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Write notification title"
            className="mt-5 h-28 w-full resize-none rounded-[12px] border border-[#d8d8d8] p-4 text-[13px] outline-none focus:border-[var(--muldhon-green)]"
          />
          <button type="button" onClick={sendNotification} className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[var(--muldhon-green)] text-[13px] font-semibold text-white">
            <Plus className="h-4 w-4" /> Send Mock Alert
          </button>
        </Card>
      </section>
    </div>
  );
}
