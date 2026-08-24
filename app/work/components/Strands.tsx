"use client";

import { useCallback, useEffect, useRef, type RefObject } from "react";

/**
 * Three hair-thin strands that thread down the page and pinch together at every
 * `[data-strand-node]` element inside `containerRef`. Drawing is scroll-linked;
 * hovering (or tapping) a strand sends a 1s current along it.
 *
 * Performance notes — this runs on every scroll frame, so it is built to do as
 * little as possible:
 *   - geometry is measured only on mount / resize, never on scroll
 *   - scrolling writes a single `stroke-dashoffset` string per strand (3 writes)
 *     straight to the DOM; React never re-renders
 *   - the rAF loop is gated behind an IntersectionObserver, so it costs nothing
 *     while the section is off-screen
 *   - the "current" runs on the Web Animations API instead of a JS tick, and the
 *     glow is a second wider stroke rather than an SVG blur filter (filters are
 *     an order of magnitude more expensive to composite)
 */

const STRAND_FACTORS = [0.6, 1, 1.42] as const;
const PULSE_DURATION = 1000;
const PULSE_DASH = 120;
const AMBIENT_INTERVAL = 5200;
/** How far down the viewport the "drawing head" of the strands sits. */
const DRAW_HEAD = 0.78;

type Point = { x: number; y: number };

function buildPath(points: Point[], factor: number, spread: number): string {
  if (points.length < 2) return "";

  let d = `M${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`;

  for (let i = 1; i < points.length; i += 1) {
    const a = points[i - 1];
    const b = points[i];
    const dy = b.y - a.y;
    // Alternate which side each segment bows out to, so the bundle snakes.
    const bend = (i % 2 === 1 ? 1 : -1) * spread * factor;
    const c1x = (a.x + bend).toFixed(1);
    const c1y = (a.y + dy * 0.4).toFixed(1);
    const c2x = (b.x + bend).toFixed(1);
    const c2y = (b.y - dy * 0.4).toFixed(1);
    d += ` C${c1x},${c1y} ${c2x},${c2y} ${b.x.toFixed(1)},${b.y.toFixed(1)}`;
  }

  return d;
}

interface StrandsProps {
  /** The element whose `[data-strand-node]` descendants the strands pass through. */
  containerRef: RefObject<HTMLElement | null>;
  className?: string;
}

export function Strands({ containerRef, className }: StrandsProps) {
  const baseRefs = useRef<(SVGPathElement | null)[]>([]);
  const glowRefs = useRef<(SVGPathElement | null)[]>([]);
  const coreRefs = useRef<(SVGPathElement | null)[]>([]);
  const hitRefs = useRef<(SVGPathElement | null)[]>([]);

  const lengths = useRef<number[]>([0, 0, 0]);
  const lastPulse = useRef<number[]>([0, 0, 0]);
  const reduced = useRef(false);
  const visible = useRef(false);
  const frame = useRef(0);

  /* ── Scroll-linked draw: 3 style writes, no React state ─────────── */
  const draw = useCallback(() => {
    frame.current = 0;
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const head = window.innerHeight * DRAW_HEAD;
    const progress = reduced.current
      ? 1
      : Math.min(1, Math.max(0, (head - rect.top) / Math.max(rect.height, 1)));

    for (let i = 0; i < baseRefs.current.length; i += 1) {
      const path = baseRefs.current[i];
      if (path) {
        path.style.strokeDashoffset = `${lengths.current[i] * (1 - progress)}`;
      }
    }
  }, [containerRef]);

  const requestDraw = useCallback(() => {
    if (frame.current || !visible.current) return;
    frame.current = requestAnimationFrame(draw);
  }, [draw]);

  /* ── Geometry: only on mount and resize ─────────────────────────── */
  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (!width || !height) return;

    const nodes = Array.from(
      container.querySelectorAll<HTMLElement>("[data-strand-node]"),
    );

    // Enter at the top centre, pass through every node, exit at the bottom.
    const points: Point[] = [{ x: width / 2, y: 0 }];
    for (const node of nodes) {
      const nodeRect = node.getBoundingClientRect();
      points.push({
        x: nodeRect.left + nodeRect.width / 2 - rect.left,
        y: nodeRect.top + nodeRect.height / 2 - rect.top,
      });
    }
    points.push({ x: width / 2, y: height });

    const spread = Math.max(46, Math.min(width * 0.2, 230));

    for (let i = 0; i < STRAND_FACTORS.length; i += 1) {
      const d = buildPath(points, STRAND_FACTORS[i], spread);
      const base = baseRefs.current[i];
      const glow = glowRefs.current[i];
      const core = coreRefs.current[i];
      const hit = hitRefs.current[i];
      if (!base || !glow || !core || !hit) continue;

      base.setAttribute("d", d);
      glow.setAttribute("d", d);
      core.setAttribute("d", d);
      hit.setAttribute("d", d);

      const length = base.getTotalLength();
      lengths.current[i] = length;

      base.style.strokeDasharray = `${length}`;

      // One travelling dash, parked just before the start of the path.
      const pulseDash = `${PULSE_DASH} ${length + PULSE_DASH}`;
      for (const el of [glow, core]) {
        el.style.strokeDasharray = pulseDash;
        el.style.strokeDashoffset = `${PULSE_DASH}`;
        el.style.opacity = "0";
      }
    }

    draw();
  }, [containerRef, draw]);

  /* ── The "current" ──────────────────────────────────────────────── */
  const pulse = useCallback((index: number) => {
    if (reduced.current) return;

    const now = performance.now();
    if (now - lastPulse.current[index] < PULSE_DURATION * 0.85) return;
    lastPulse.current[index] = now;

    const length = lengths.current[index];
    if (!length) return;

    const keyframes: Keyframe[] = [
      { strokeDashoffset: PULSE_DASH, opacity: 0 },
      { opacity: 1, offset: 0.16 },
      { opacity: 1, offset: 0.82 },
      { strokeDashoffset: -length, opacity: 0 },
    ];

    const options: KeyframeAnimationOptions = {
      duration: PULSE_DURATION,
      easing: "cubic-bezier(.35,0,.2,1)",
    };

    glowRefs.current[index]?.animate(keyframes, options);
    coreRefs.current[index]?.animate(keyframes, options);
  }, []);

  /** Sends a current down all three strands, staggered. */
  const burst = useCallback(() => {
    if (reduced.current) return;
    STRAND_FACTORS.forEach((_, index) => {
      window.setTimeout(() => pulse(index), index * 120);
    });
  }, [pulse]);

  /* ── Wiring ─────────────────────────────────────────────────────── */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = motionQuery.matches;
    const onMotionChange = () => {
      reduced.current = motionQuery.matches;
      draw();
    };
    motionQuery.addEventListener("change", onMotionChange);

    measure();

    // Only observe scroll while the section is actually on screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = visible.current;
        visible.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          requestDraw();
          // Wake the strands up with a current each time they scroll into view.
          if (!wasVisible) burst();
        }
      },
      { rootMargin: "120px 0px" },
    );
    observer.observe(container);

    window.addEventListener("scroll", requestDraw, { passive: true });

    // A broad, forgiving hover trigger — entering the section at all sends a
    // current, rather than requiring the cursor to land on the hair-thin path.
    const onPointerEnter = () => burst();
    container.addEventListener("pointerenter", onPointerEnter);

    // Catches font swaps, image loads and orientation changes in one go.
    let resizeFrame = 0;
    const resizeObserver = new ResizeObserver(() => {
      if (resizeFrame) return;
      resizeFrame = requestAnimationFrame(() => {
        resizeFrame = 0;
        measure();
      });
    });
    resizeObserver.observe(container);

    // Idle life, so the strands read as "live" without any interaction —
    // this is the only way the effect is discoverable on touch devices.
    const ambient = window.setInterval(() => {
      if (!visible.current || document.hidden) return;
      pulse(Math.floor(Math.random() * STRAND_FACTORS.length));
    }, AMBIENT_INTERVAL);

    return () => {
      motionQuery.removeEventListener("change", onMotionChange);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("scroll", requestDraw);
      container.removeEventListener("pointerenter", onPointerEnter);
      window.clearInterval(ambient);
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [containerRef, draw, measure, pulse, requestDraw, burst]);

  return (
    <svg
      className={`pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-visible ${className ?? ""}`}
      aria-hidden="true"
      focusable="false"
    >
      {STRAND_FACTORS.map((_, index) => (
        <g key={index}>
          {/* Resting strand — drawn in as you scroll */}
          <path
            ref={(el) => {
              baseRefs.current[index] = el;
            }}
            fill="none"
            stroke="rgb(255 255 255 / 0.16)"
            strokeWidth={1.5}
          />
          {/* Current: soft halo + bright core, same path, one dash each */}
          <path
            ref={(el) => {
              glowRefs.current[index] = el;
            }}
            fill="none"
            stroke="rgb(168 85 247 / 0.32)"
            strokeWidth={7}
            strokeLinecap="round"
          />
          <path
            ref={(el) => {
              coreRefs.current[index] = el;
            }}
            fill="none"
            stroke="rgb(216 180 254)"
            strokeWidth={1.6}
            strokeLinecap="round"
          />
          {/* Invisible fat stroke — the only part that takes pointer events */}
          <path
            ref={(el) => {
              hitRefs.current[index] = el;
            }}
            fill="none"
            stroke="transparent"
            strokeWidth={28}
            style={{ pointerEvents: "stroke" }}
            onPointerEnter={() => pulse(index)}
            onPointerDown={() => pulse(index)}
          />
        </g>
      ))}
    </svg>
  );
}
