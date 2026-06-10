import { PagePlaceholder } from "@/components/ui/PagePlaceholder";
import { createPageMetadata } from "@/lib/create-page";

export const metadata = createPageMetadata("Investors");

export default function InvestorsPage() {
  return (
    <>
      <h1 className="mb-6 text-[26px] font-bold text-[var(--muldhon-text)]">
        Investors
      </h1>
      <PagePlaceholder title="Investors" />
    </>
  );
}
