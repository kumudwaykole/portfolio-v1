"use client";

import { useLenis } from "lenis/react";

export function BackToTop({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const lenis = useLenis();

  return (
    <a
      href="#top"
      className={className}
      onClick={(event) => {
        event.preventDefault();
        // Stop the click from bubbling to Lenis's own global anchor-click
        // listener (options.anchors), which would independently fire a
        // second, competing scrollTo("#top") and stall the animation
        // partway through.
        event.stopPropagation();
        // Lenis owns the actual scroll position while smoothWheel is on, so
        // a native/Next.js hash jump (document.body.scrollIntoView) gets
        // fought by Lenis's own animation loop and never visibly lands.
        // Scrolling through the Lenis instance keeps the two in sync.
        if (lenis) {
          lenis.scrollTo(0);
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
    >
      {children}
    </a>
  );
}
