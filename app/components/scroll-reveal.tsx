"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, type ReactNode } from "react";

const DELAY_CLASSES = {
  0: "delay-0",
  100: "delay-100",
  200: "delay-200",
} as const;

type RevealDelay = keyof typeof DELAY_CLASSES;

let revealObserver: IntersectionObserver | null = null;
const observedElements = new Set<HTMLElement>();

function getRevealObserver() {
  if (revealObserver) return revealObserver;

  revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        const element = entry.target as HTMLElement;
        element.dataset.revealed = "true";
        revealObserver?.unobserve(element);
        observedElements.delete(element);
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
  );

  return revealObserver;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: RevealDelay;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      element.dataset.revealed = "true";
      return;
    }

    const observer = getRevealObserver();
    observedElements.add(element);
    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observedElements.delete(element);

      if (observedElements.size === 0) {
        observer.disconnect();
        revealObserver = null;
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      data-revealed="false"
      className={cn(
        "translate-y-10 opacity-0 transition-[opacity,translate] duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] data-[revealed=true]:translate-y-0 data-[revealed=true]:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
        DELAY_CLASSES[delay],
        className,
      )}
    >
      {children}
    </div>
  );
}
