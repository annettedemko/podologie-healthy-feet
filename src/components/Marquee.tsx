import type { ReactNode } from "react";

interface MarqueeProps {
  items: string[];
  /** Duration of one full loop in seconds. Default 40. */
  duration?: number;
  className?: string;
  /** Optional separator element between items. Default bullet. */
  separator?: ReactNode;
}

/**
 * Infinite horizontal marquee. CSS-animation based for smoothness.
 * Duplicates content once so the loop is seamless.
 */
export default function Marquee({
  items,
  duration = 40,
  className = "",
  separator,
}: MarqueeProps) {
  const sep = separator ?? (
    <span className="text-primary/40 mx-8 select-none" aria-hidden="true">
      ●
    </span>
  );

  const content = (
    <div className="flex items-center shrink-0 py-4">
      {items.map((item, i) => (
        <div key={`${item}-${i}`} className="flex items-center shrink-0">
          <span className="text-2xl md:text-4xl font-serif font-bold text-foreground/30 whitespace-nowrap px-4">
            {item}
          </span>
          {sep}
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      <div
        className="flex will-change-transform"
        style={{ animation: `marquee-scroll ${duration}s linear infinite` }}
      >
        {content}
        {content}
      </div>
    </div>
  );
}
