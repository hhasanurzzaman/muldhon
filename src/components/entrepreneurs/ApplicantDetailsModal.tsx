"use client";

import { UserAvatar } from "@/components/ui/UserAvatar";
import type { EntrepreneurAccount, EntrepreneurApplicant } from "@/types/entrepreneurs";
import { X } from "lucide-react";
import { useEffect } from "react";

type ModalPerson = EntrepreneurApplicant | EntrepreneurAccount;

interface ApplicantDetailsModalProps {
  person: ModalPerson;
  onClose: () => void;
}

function getApplicationId(person: ModalPerson) {
  return "status" in person ? `#${person.id.padStart(5, "0")}` : `#${person.id.toUpperCase()}`;
}

function getPhone(person: ModalPerson) {
  return "phone" in person ? person.phone : "+880-1627441627";
}

const documents = [
  "NID Copy",
  "Trade License",
  "Project Proposal",
  "Other Documents",
];

export function ApplicantDetailsModal({ person, onClose }: ApplicantDetailsModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Applicant details"
      onMouseDown={onClose}
    >
      <div
        className="relative w-full max-w-[430px] rounded-[10px] bg-white p-[12px] shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-[10px] top-[8px] z-10 flex h-5 w-5 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          aria-label="Close details popup"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        <div className="grid overflow-hidden rounded-[5px] outline outline-2 outline-[#139dff] md:grid-cols-[1.1fr_0.9fr]">
          <section className="border-b border-[#d7d7d7] p-[14px] md:border-b-0 md:border-r">
            <div className="mb-[15px] flex items-start justify-between gap-3">
              <h2 className="text-[12px] font-bold leading-none text-[var(--muldhon-text)]">
                Applicants Details
              </h2>
              <span className="mt-[2px] text-[8px] font-bold leading-none text-[var(--muldhon-text)]">
                Today 4:87 PM
              </span>
            </div>

            <div className="mb-[17px] flex items-center gap-[9px]">
              <UserAvatar name={person.name} size="sm" className="h-[31px] w-[31px]" />
              <div className="min-w-0">
                <p className="truncate text-[10px] font-bold leading-none text-[var(--muldhon-text)]">
                  {person.name}
                </p>
                <p className="mt-[5px] text-[8px] font-bold leading-none text-[var(--muldhon-text)]">
                  Application ID - {getApplicationId(person)}
                </p>
              </div>
            </div>

            <div className="space-y-[12px] text-[8px] leading-none text-[var(--muldhon-text)]">
              <div>
                <h3 className="mb-[8px] text-[9px] font-bold">Personal Info</h3>
                <p className="mb-[6px]">Phone No - <span className="ml-3">{getPhone(person)}</span></p>
                <p className="mb-[6px]">NID No -</p>
                <p>Email ID - <span className="ml-4">{person.email}</span></p>
              </div>

              <div>
                <h3 className="mb-[8px] text-[9px] font-bold">Project Info</h3>
                <p className="mb-[6px]">Project Name</p>
                <p className="mb-[6px]">Category</p>
                <p className="mb-[7px]">Description</p>
                <div className="h-[53px] rounded-[5px] border border-[#c9c9c9] bg-white" />
              </div>

              <div>
                <h3 className="mb-[8px] text-[9px] font-bold">Documents</h3>
                <div className="space-y-[7px]">
                  {documents.map((document) => (
                    <div key={document} className="flex items-center justify-between">
                      <span>{document}</span>
                      <button type="button" className="text-[7px] font-medium text-[#1d3cff]">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-[3px]">
                <span className="font-bold">Download Type</span>
                <span className="font-bold">Excel</span>
              </div>
            </div>
          </section>

          <aside className="p-[14px]">
            <h2 className="mb-[14px] text-[12px] font-bold leading-none text-[var(--muldhon-text)]">
              Action
            </h2>

            <div className="mb-[18px] space-y-[8px]">
              <button type="button" className="h-[22px] w-full rounded-full bg-[#9be3b4] text-[8px] font-medium text-[#07864b]">
                Accept Application
              </button>
              <button type="button" className="h-[22px] w-full rounded-full bg-[#ffadad] text-[8px] font-medium text-[#ec1717]">
                Reject Application
              </button>
            </div>

            <h3 className="mb-[11px] text-[12px] font-bold leading-none text-[var(--muldhon-text)]">
              Account
            </h3>

            <div className="mb-[12px] space-y-[8px]">
              <button type="button" className="h-[22px] w-full rounded-full bg-[#ffc8ad] text-[8px] font-medium text-[#f37629]">
                Suspend Account
              </button>
              <button type="button" className="h-[22px] w-full rounded-full bg-[#ffadad] text-[8px] font-medium text-[#ec1717]">
                Permanent Ban
              </button>
              <button type="button" className="h-[22px] w-full rounded-full bg-[#9be3b4] text-[8px] font-medium text-[#07864b]">
                Reactivate Account
              </button>
              <button type="button" className="h-[22px] w-full rounded-full bg-[#cbd5ff] text-[8px] font-medium text-[#1d3cff]">
                Reset Password
              </button>
            </div>

            <label className="mb-[5px] block text-[8px] font-bold text-[var(--muldhon-text)]">
              Reject/ Ban reason
            </label>
            <input className="mb-[11px] h-[20px] w-full rounded-[5px] border border-[#c9c9c9] px-2 text-[8px] outline-none focus:border-[#139dff]" />

            <label className="mb-[5px] block text-[8px] font-bold text-[var(--muldhon-text)]">
              Details
            </label>
            <textarea className="mb-[14px] h-[52px] w-full resize-none rounded-[5px] border border-[#c9c9c9] p-2 text-[8px] outline-none focus:border-[#139dff]" />

            <button type="button" className="h-[20px] w-full rounded-full border border-[#c9c9c9] bg-white text-[8px] font-medium text-[var(--muldhon-text)] hover:bg-gray-50">
              Save Changes
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}
