import { RegisterPage } from "@/components/portal/RegisterPage";
import { createPageMetadata } from "@/lib/create-page";

export const metadata = createPageMetadata("Entrepreneur Registration");

export default function EntrepreneurRegistrationPage() {
  return <RegisterPage role="entrepreneur" />;
}
