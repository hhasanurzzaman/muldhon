import { RegisterPage } from "@/components/portal/RegisterPage";
import { createPageMetadata } from "@/lib/create-page";

export const metadata = createPageMetadata("Investor Registration");

export default function InvestorRegistrationPage() {
  return <RegisterPage role="investor" />;
}
