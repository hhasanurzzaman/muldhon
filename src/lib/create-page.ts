/**
 * Helper metadata for secondary admin pages (keeps page files minimal).
 */

import type { Metadata } from "next";

export function createPageMetadata(
  title: string,
  description?: string
): Metadata {
  return {
    title: `${title} | Muldhon Admin`,
    description: description ?? `Muldhon admin — ${title}`,
  };
}
