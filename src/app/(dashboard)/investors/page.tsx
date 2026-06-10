import { InvestorsPanel } from "@/components/investors/InvestorsPanel";
import { createPageMetadata } from "@/lib/create-page";

export const metadata = createPageMetadata("Investors");

export default function InvestorsPage() {
  return <InvestorsPanel />;
}
