"use client";

import { PortalShell } from "@/components/portal/PortalShell";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/components/auth/AuthProvider";
import type { PortalRole } from "@/types/portal";
import { MessageSquare, Send } from "lucide-react";
import { useState } from "react";

interface PortalMessagesPanelProps {
  role: PortalRole;
}

function statusClass(status: string) {
  if (status === "Replied") return "bg-[#e2f8ea] text-[var(--muldhon-green-dark)]";
  if (status === "Read") return "bg-[#dfe4f8] text-[#2543a5]";
  return "bg-[#fffec9] text-[#8b7600]";
}

export function PortalMessagesPanel({ role }: PortalMessagesPanelProps) {
  const { portalSnapshot, addPortalMessage } = useAuth();
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  function sendMessage() {
    const cleanSubject = subject.trim();
    const cleanBody = body.trim();
    if (!cleanSubject || !cleanBody) return;
    addPortalMessage({
      subject: cleanSubject,
      body: cleanBody,
      sender: "User",
      status: "Sent",
    });
    setSubject("");
    setBody("");
  }

  return (
    <PortalShell role={role} title="Messages">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <Card className="p-4 sm:p-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-[22px] font-bold text-[var(--muldhon-text)]">Message History</h2>
              <p className="mt-2 text-[13px] text-[var(--muldhon-text-muted)]">
                Your communication with Muldhon admin support.
              </p>
            </div>
            <MessageSquare className="h-5 w-5 text-[var(--muldhon-green)]" />
          </div>

          <ul className="space-y-4">
            {(portalSnapshot?.messages ?? []).map((message) => (
              <li key={message.id} className="rounded-[16px] border border-[#eeeeee] bg-white p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-[15px] font-bold text-[var(--muldhon-text)]">{message.subject}</p>
                    <p className="mt-2 text-[13px] leading-5 text-[var(--muldhon-text-muted)]">{message.body}</p>
                    <p className="mt-3 text-[12px] text-[var(--muldhon-text-muted)]">
                      {message.sender} · {message.createdAt}
                    </p>
                  </div>
                  <span className={`w-fit rounded-full px-3 py-1 text-[11px] font-bold ${statusClass(message.status)}`}>
                    {message.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="h-fit p-5 sm:p-6">
          <h2 className="text-[22px] font-bold text-[var(--muldhon-text)]">Send Message</h2>
          <p className="mt-2 text-[13px] leading-5 text-[var(--muldhon-text-muted)]">
            Send a direct message to admin. It will be saved to your local portal inbox.
          </p>
          <label className="mt-5 block">
            <span className="mb-2 block text-[13px] font-semibold">Subject</span>
            <input
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              className="h-11 w-full rounded-xl border border-[#d8d8d8] px-4 text-[13px] outline-none focus:border-[var(--muldhon-green)]"
              placeholder="How can admin help?"
            />
          </label>
          <label className="mt-4 block">
            <span className="mb-2 block text-[13px] font-semibold">Message</span>
            <textarea
              value={body}
              onChange={(event) => setBody(event.target.value)}
              className="h-32 w-full resize-none rounded-xl border border-[#d8d8d8] p-4 text-[13px] outline-none focus:border-[var(--muldhon-green)]"
              placeholder="Write your message"
            />
          </label>
          <button type="button" onClick={sendMessage} className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[var(--muldhon-green)] text-[13px] font-bold text-white">
            Send Message <Send className="h-4 w-4" />
          </button>
        </Card>
      </div>
    </PortalShell>
  );
}
