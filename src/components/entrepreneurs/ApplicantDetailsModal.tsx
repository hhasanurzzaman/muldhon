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
      className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-black/55 p-0 backdrop-blur-[2px] sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Applicant details"
      onMouseDown={onClose}
    >
      <div
        className="relative max-h-[100dvh] w-full overflow-y-auto rounded-t-[22px] bg-white p-3 shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:max-h-[calc(100dvh-32px)] sm:max-w-[760px] sm:rounded-[18px] sm:p-4"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-400 shadow-md hover:bg-gray-100 hover:text-gray-700 sm:right-6 sm:top-6 sm:h-8 sm:w-8"
          aria-label="Close details popup"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid overflow-hidden rounded-[14px] border-2 border-[#139dff] md:grid-cols-[1.18fr_0.82fr]">
          <section className="border-b border-[#d7d7d7] p-5 sm:p-7 md:border-b-0 md:border-r">
            <div className="mb-5 flex flex-col gap-2 pr-10 sm:mb-6 sm:flex-row sm:items-start sm:justify-between sm:gap-3 sm:pr-0">
              <h2 className="text-[17px] font-bold leading-none text-[var(--muldhon-text)] sm:text-[18px]">
                Applicants Details
              </h2>
              <span className="text-[12px] font-semibold leading-none text-[var(--muldhon-text-muted)] sm:mt-1">
                Today 4:87 PM
              </span>
            </div>

            <div className="mb-6 flex items-center gap-4 sm:mb-7">
              <UserAvatar name={person.name} size="sm" className="h-12 w-12 sm:h-[54px] sm:w-[54px]" />
              <div className="min-w-0">
                <p className="truncate text-[15px] font-bold leading-none text-[var(--muldhon-text)]">
                  {person.name}
                </p>
                <p className="mt-2 text-[12px] font-semibold leading-tight text-[var(--muldhon-text)]">
                  Application ID - {getApplicationId(person)}
                </p>
              </div>
            </div>

            <div className="space-y-5 text-[12px] leading-none text-[var(--muldhon-text)] sm:space-y-6">
              <div>
                <h3 className="mb-3 text-[13px] font-bold">Personal Info</h3>
                <div className="space-y-2 text-[12px] leading-tight">
                  <p>Phone No - <span className="ml-3 sm:ml-5">{getPhone(person)}</span></p>
                  <p>NID No -</p>
                  <p className="break-all">Email ID - <span className="ml-3 sm:ml-6">{person.email}</span></p>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-[13px] font-bold">Project Info</h3>
                <div className="space-y-2">
                  <p>Project Name</p>
                  <p>Category</p>
                  <p>Description</p>
                </div>
                <div className="mt-3 h-[76px] rounded-[8px] border border-[#c9c9c9] bg-white sm:h-[86px]" />
              </div>

              <div>
                <h3 className="mb-3 text-[13px] font-bold">Documents</h3>
                <div className="space-y-3">
                  {documents.map((document) => (
                    <div key={document} className="flex items-center justify-between">
                      <span>{document}</span>
                      <button type="button" className="text-[11px] font-medium text-[#1d3cff] hover:underline">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#eeeeee] pt-4">
                <span className="font-bold">Download Type</span>
                <span className="font-bold">Excel</span>
              </div>
            </div>
          </section>

          <aside className="p-5 sm:p-7">
            <h2 className="mb-5 text-[18px] font-bold leading-none text-[var(--muldhon-text)]">
              Action
            </h2>

            <div className="mb-7 grid grid-cols-1 gap-3 sm:mb-8">
              <button type="button" className="h-10 w-full rounded-full bg-[#9be3b4] text-[12px] font-semibold text-[#07864b] hover:brightness-95">
                Accept Application
              </button>
              <button type="button" className="h-10 w-full rounded-full bg-[#ffadad] text-[12px] font-semibold text-[#ec1717] hover:brightness-95">
                Reject Application
              </button>
            </div>

            <h3 className="mb-4 text-[18px] font-bold leading-none text-[var(--muldhon-text)]">
              Account
            </h3>

            <div className="mb-6 grid grid-cols-1 gap-3">
              <button type="button" className="h-10 w-full rounded-full bg-[#ffc8ad] text-[12px] font-semibold text-[#f37629] hover:brightness-95">
                Suspend Account
              </button>
              <button type="button" className="h-10 w-full rounded-full bg-[#ffadad] text-[12px] font-semibold text-[#ec1717] hover:brightness-95">
                Permanent Ban
              </button>
              <button type="button" className="h-10 w-full rounded-full bg-[#9be3b4] text-[12px] font-semibold text-[#07864b] hover:brightness-95">
                Reactivate Account
              </button>
              <button type="button" className="h-10 w-full rounded-full bg-[#cbd5ff] text-[12px] font-semibold text-[#1d3cff] hover:brightness-95">
                Reset Password
              </button>
            </div>

            <label className="mb-2 block text-[12px] font-bold text-[var(--muldhon-text)]">
              Reject/ Ban reason
            </label>
            <input className="mb-5 h-9 w-full rounded-[8px] border border-[#c9c9c9] px-3 text-[12px] outline-none focus:border-[#139dff]" />

            <label className="mb-2 block text-[12px] font-bold text-[var(--muldhon-text)]">
              Details
            </label>
            <textarea className="mb-6 h-[78px] w-full resize-none rounded-[8px] border border-[#c9c9c9] p-3 text-[12px] outline-none focus:border-[#139dff] sm:h-[88px]" />

            <button type="button" className="h-10 w-full rounded-full border border-[#c9c9c9] bg-white text-[12px] font-semibold text-[var(--muldhon-text)] hover:bg-gray-50">
              Save Changes
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}
