import { ProfilePanel } from "@/components/portal/ProfilePanel";
import { createPageMetadata } from "@/lib/create-page";

export const metadata = createPageMetadata("Investor Profile");

export default function InvestorProfilePage() {
  return <ProfilePanel role="investor" />;
}
