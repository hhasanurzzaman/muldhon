/**
 * Consistent page heading used across admin routes.
 */

import type { ReactNode } from "react";

interface PageTitleProps {
  children: ReactNode;
  className?: string;
}

export function PageTitle({ children, className = "" }: PageTitleProps) {
  return (
    <h1
      className={`mb-4 text-[24px] font-bold leading-none text-[var(--muldhon-text)] sm:text-[27px] ${className}`}
    >
      {children}
    </h1>
  );
}
