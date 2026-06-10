import { PagePlaceholder } from "@/components/ui/PagePlaceholder";
import { createPageMetadata } from "@/lib/create-page";

export const metadata = createPageMetadata("Notifications");

export default function NotificationsPage() {
  return (
    <>
      <h1 className="mb-6 text-[26px] font-bold text-[var(--muldhon-text)]">
        Notifications
      </h1>
      <PagePlaceholder title="Notifications" />
    </>
  );
}
