import { PagePlaceholder } from "@/components/ui/PagePlaceholder";
import { createPageMetadata } from "@/lib/create-page";

export const metadata = createPageMetadata("Messages");

export default function MessagesPage() {
  return (
    <>
      <h1 className="mb-6 text-[26px] font-bold text-[var(--muldhon-text)]">
        Messages
      </h1>
      <PagePlaceholder title="Messages" />
    </>
  );
}
