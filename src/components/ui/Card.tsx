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
      className={`rounded-[16px] border border-[#d8d8d8] bg-[var(--muldhon-card)] shadow-[0_5px_18px_rgba(17,24,39,0.12)] ${className}`}
    >
      {children}
    </div>
  );
}
