import { ProfilePanel } from "@/components/portal/ProfilePanel";
import { createPageMetadata } from "@/lib/create-page";

export const metadata = createPageMetadata("Entrepreneur Profile");

export default function EntrepreneurProfilePage() {
  return <ProfilePanel role="entrepreneur" />;
}
