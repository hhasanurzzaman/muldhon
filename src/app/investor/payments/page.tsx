import { PortalPaymentsPanel } from "@/components/portal/PortalPaymentsPanel";
import { createPageMetadata } from "@/lib/create-page";

export const metadata = createPageMetadata("Investor Payments");

export default function InvestorPaymentsPage() {
  return <PortalPaymentsPanel role="investor" />;
}
