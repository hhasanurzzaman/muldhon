import { PaymentsPanel } from "@/components/payments/PaymentsPanel";
import { createPageMetadata } from "@/lib/create-page";

export const metadata = createPageMetadata("Payments");

export default function PaymentsPage() {
  return (
    <>
      <h1 className="mb-6 text-[26px] font-bold text-[var(--muldhon-text)]">
        Payments
      </h1>
      <PaymentsPanel />
    </>
  );
}
