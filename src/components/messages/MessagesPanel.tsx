"use client";

import { StatCard } from "@/components/dashboard/StatCard";
import { Card } from "@/components/ui/Card";
import { messageStats, messageThreads } from "@/data/mock-messages";
import { MessageSquare, Search, Send } from "lucide-react";
import { useMemo, useState } from "react";

export function MessagesPanel() {
  const [threads, setThreads] = useState(messageThreads);
  const [query, setQuery] = useState("");
  const [reply, setReply] = useState("");
  const [selectedId, setSelectedId] = useState(threads[0]?.id);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return threads.filter(
      (thread) =>
        !normalized ||
        thread.participant.toLowerCase().includes(normalized) ||
        thread.subject.toLowerCase().includes(normalized) ||
        thread.role.toLowerCase().includes(normalized)
    );
  }, [query, threads]);

  const selected = threads.find((thread) => thread.id === selectedId) ?? filtered[0] ?? threads[0];

  function selectThread(id: string) {
    setSelectedId(id);
    setThreads((rows) => rows.map((row) => (row.id === id ? { ...row, unread: false } : row)));
  }

  function sendReply() {
    const body = reply.trim();
    if (!body || !selected) return;
    setThreads((rows) =>
      rows.map((thread) =>
        thread.id === selected.id
          ? {
              ...thread,
              preview: body,
              updatedAt: "Just now",
              messages: [...thread.messages, { id: `${thread.id}-${thread.messages.length + 1}`, sender: "Admin", body, time: "Just now" }],
            }
          : thread
      )
    );
    setReply("");
  }

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {messageStats.map((metric) => (
          <StatCard key={metric.id} metric={metric} />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[390px_minmax(0,1fr)]">
        <Card className="p-4 sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-[22px] font-bold text-[var(--muldhon-text)]">Admin Inbox</h2>
              <p className="mt-1 text-[13px] text-[var(--muldhon-text-muted)]">Investor and entrepreneur messages</p>
            </div>
            <MessageSquare className="h-5 w-5 text-[var(--muldhon-green)]" />
          </div>
          <div className="relative mb-5">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muldhon-green-dark)]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search conversations"
              className="h-11 w-full rounded-full bg-[#e2f8ea] pl-11 pr-4 text-[13px] outline-none focus:ring-2 focus:ring-[var(--muldhon-green)]/25"
            />
          </div>
          <ul className="space-y-3">
            {filtered.map((thread) => (
              <li key={thread.id}>
                <button
                  type="button"
                  onClick={() => selectThread(thread.id)}
                  className={`w-full rounded-[16px] border p-4 text-left transition-colors ${
                    selected?.id === thread.id ? "border-[var(--muldhon-green)] bg-[#f8fffb]" : "border-[#eeeeee] bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-[14px] font-bold text-[var(--muldhon-text)]">{thread.participant}</p>
                      <p className="mt-1 text-[12px] font-semibold text-[var(--muldhon-green-dark)]">{thread.role}</p>
                    </div>
                    {thread.unread && <span className="h-2.5 w-2.5 rounded-full bg-[var(--muldhon-green)]" />}
                  </div>
                  <p className="mt-3 truncate text-[13px] font-semibold text-[var(--muldhon-text)]">{thread.subject}</p>
                  <p className="mt-1 line-clamp-2 text-[12px] leading-5 text-[var(--muldhon-text-muted)]">{thread.preview}</p>
                </button>
              </li>
            ))}
          </ul>
        </Card>

        {selected && (
          <Card className="flex min-h-[560px] flex-col p-4 sm:p-6">
            <div className="border-b border-[#eeeeee] pb-5">
              <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--muldhon-green)]">{selected.role}</p>
              <h3 className="mt-2 text-[22px] font-bold text-[var(--muldhon-text)]">{selected.subject}</h3>
              <p className="mt-1 text-[13px] text-[var(--muldhon-text-muted)]">{selected.participant} · {selected.updatedAt}</p>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto py-5">
              {selected.messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "Admin" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[82%] rounded-[16px] px-4 py-3 text-[13px] leading-5 ${
                    message.sender === "Admin" ? "bg-[var(--muldhon-green)] text-white" : "bg-[#f4f7f5] text-[var(--muldhon-text)]"
                  }`}>
                    <p>{message.body}</p>
                    <p className={`mt-2 text-[11px] ${message.sender === "Admin" ? "text-white/75" : "text-[var(--muldhon-text-muted)]"}`}>{message.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3 border-t border-[#eeeeee] pt-4 sm:flex-row">
              <input
                value={reply}
                onChange={(event) => setReply(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") sendReply();
                }}
                placeholder="Write a professional reply"
                className="h-11 min-w-0 flex-1 rounded-full border border-[#d8d8d8] px-5 text-[13px] outline-none focus:border-[var(--muldhon-green)]"
              />
              <button type="button" onClick={sendReply} className="flex h-11 items-center justify-center gap-2 rounded-full bg-[var(--muldhon-green)] px-6 text-[13px] font-semibold text-white">
                Send <Send className="h-4 w-4" />
              </button>
            </div>
          </Card>
        )}
      </section>
    </div>
  );
}
