/**
 * Empty detail panel (bottom-right placeholder from design).
 */

import { Card } from "@/components/ui/Card";

export function AccountsDetailPanel() {
  return (
    <Card className="hidden h-[450px] xl:block">
      <span className="sr-only">Account details panel</span>
    </Card>
  );
}
