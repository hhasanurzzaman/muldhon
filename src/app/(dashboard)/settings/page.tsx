import { SettingsPanel } from "@/components/settings/SettingsPanel";
import { createPageMetadata } from "@/lib/create-page";

export const metadata = createPageMetadata("Settings");

export default function SettingsPage() {
  return <SettingsPanel />;
}
