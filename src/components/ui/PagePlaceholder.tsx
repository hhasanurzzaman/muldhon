/**
 * Placeholder content for routes not yet fully built.
 * Replace with real tables/forms as each section is implemented.
 */

interface PagePlaceholderProps {
  title: string;
  description?: string;
}

export function PagePlaceholder({
  title,
  description = "This section is ready for your UI — connect APIs and tables here.",
}: PagePlaceholderProps) {
  return (
    <div className="rounded-2xl border border-dashed border-[var(--muldhon-border)] bg-white p-12 text-center">
      <h2 className="text-xl font-semibold text-[var(--muldhon-text)]">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-[15px] text-[var(--muldhon-text-muted)]">
        {description}
      </p>
    </div>
  );
}
