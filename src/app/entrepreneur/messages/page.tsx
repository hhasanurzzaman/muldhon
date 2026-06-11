import { PortalMessagesPanel } from "@/components/portal/PortalMessagesPanel";
import { createPageMetadata } from "@/lib/create-page";

export const metadata = createPageMetadata("Entrepreneur Messages");

export default function EntrepreneurMessagesPage() {
  return <PortalMessagesPanel role="entrepreneur" />;
}
