import { PagePlaceholder } from "@/components/ui/PagePlaceholder";
import { createPageMetadata } from "@/lib/create-page";

export const metadata = createPageMetadata("Projects");

export default function ProjectsPage() {
  return (
    <>
      <h1 className="mb-6 text-[26px] font-bold text-[var(--muldhon-text)]">
        Projects
      </h1>
      <PagePlaceholder title="Projects" />
    </>
  );
}
