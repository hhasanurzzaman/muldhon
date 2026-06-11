import { PortalMessagesPanel } from "@/components/portal/PortalMessagesPanel";
import { createPageMetadata } from "@/lib/create-page";

export const metadata = createPageMetadata("Investor Messages");

export default function InvestorMessagesPage() {
  return <PortalMessagesPanel role="investor" />;
}
