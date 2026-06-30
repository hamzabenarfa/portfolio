import type { ReactNode } from "react";

/**
 * "Book a call" CTA. Scrolls to the contact section (email + WhatsApp) on the
 * home page, and works from sub-pages via the root-anchored `/#contact` href.
 */
interface BookCallProps {
  children: ReactNode;
  className?: string;
  "data-cursor"?: string;
  "data-cursor-label"?: string;
}

export function BookCall({ children, className, ...rest }: BookCallProps) {
  return (
    <a href="/#contact" className={className} {...rest}>
      {children}
    </a>
  );
}
