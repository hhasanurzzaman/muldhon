import { PagePlaceholder } from "@/components/ui/PagePlaceholder";
import { createPageMetadata } from "@/lib/create-page";

export const metadata = createPageMetadata("Activity logs");

export default function ActivityLogsPage() {
  return (
    <>
      <h1 className="mb-6 text-[26px] font-bold text-[var(--muldhon-text)]">
        Activity logs
      </h1>
      <PagePlaceholder title="Activity logs" />
    </>
  );
}
