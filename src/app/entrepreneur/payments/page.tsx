import { PortalPaymentsPanel } from "@/components/portal/PortalPaymentsPanel";
import { createPageMetadata } from "@/lib/create-page";

export const metadata = createPageMetadata("Entrepreneur Payments");

export default function EntrepreneurPaymentsPage() {
  return <PortalPaymentsPanel role="entrepreneur" />;
}
