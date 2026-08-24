"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

/**
 * Lenis owns the actual scroll position while smoothWheel is on, so the
 * scroll offset from the previous page carries over on client-side
 * navigation instead of the new page starting at the top — Next.js's own
 * scroll reset doesn't touch Lenis's internal state, so it snaps right back.
 *
 * This also drives the animated glide for a cross-page hash link (e.g. the
 * header's "About" → /#about clicked from /work). Lenis's own `anchors`
 * click handler only animates when the link's pathname matches the current
 * one — a cross-page hash link falls through to a plain Next.js navigation,
 * which lands on the target instantly with no easing.
 */
function ScrollSync() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const target = window.location.hash
      ? document.querySelector<HTMLElement>(window.location.hash)
      : null;

    if (target) {
      // Land at the top first — where the browser's instant fragment jump
      // would have put things — then animate down to the target, the same
      // motion an in-page anchor click produces.
      lenis.scrollTo(0, { immediate: true });
      lenis.scrollTo(target);
    } else {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis]);

  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        anchors: true,
      }}
    >
      <ScrollSync />
      {children}
    </ReactLenis>
  );
}
