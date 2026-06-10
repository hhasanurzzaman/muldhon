/**
 * Base card shell used across dashboard widgets.
 */

import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-[12px] border border-[var(--muldhon-border)] bg-[var(--muldhon-card)] shadow-[0_2px_10px_rgba(17,24,39,0.12)] ${className}`}
    >
      {children}
    </div>
  );
}
