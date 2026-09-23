"use client";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type EncryptedTextProps = {
  text: string;
  className?: string;
  /**
   * Time in milliseconds between revealing each subsequent real character.
   * Lower is faster. Defaults to 50ms per character.
   */
  revealDelayMs?: number;
  /** Optional custom character set to use for the gibberish effect. */
  charset?: string;
  /**
   * Time in milliseconds between gibberish flips for unrevealed characters.
   * Lower is more jittery. Defaults to 50ms.
   */
  flipDelayMs?: number;
  /** CSS class for styling the encrypted/scrambled characters */
  encryptedClassName?: string;
  /** CSS class for styling the revealed characters */
  revealedClassName?: string;
  /**
   * What starts the reveal animation. "view" reveals once when the text
   * scrolls into view (default). "hover" reveals on mouse enter and
   * re-scrambles on mouse leave, so it can replay every time.
   */
  trigger?: "view" | "hover";
};

/** One animation frame: how many real characters show, and the gibberish for the rest. */
type ScrambleFrame = {
  revealCount: number;
  chars: string[];
};

const DEFAULT_CHARSET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[];:,.<>/?";

function generateRandomCharacter(charset: string): string {
  const index = Math.floor(Math.random() * charset.length);
  return charset.charAt(index);
}

function generateGibberishPreservingSpaces(
  original: string,
  charset: string,
): string {
  if (!original) return "";
  let result = "";
  for (let i = 0; i < original.length; i += 1) {
    const ch = original[i];
    result += ch === " " ? " " : generateRandomCharacter(charset);
  }
  return result;
}

export const EncryptedText: React.FC<EncryptedTextProps> = ({
  text,
  className,
  revealDelayMs = 40,
  charset = DEFAULT_CHARSET,
  flipDelayMs = 40,
  encryptedClassName,
  revealedClassName,
  trigger = "view",
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isActive = trigger === "hover" ? isHovered : isInView;

  // Seeded with the plain text (not random gibberish) so the server-rendered
  // markup and the client's pre-hydration render match exactly. Math.random()
  // would otherwise pick different characters on the server vs. the client,
  // causing a hydration mismatch. Real scrambling only starts client-side,
  // from the animation frame callback below.
  const [frame, setFrame] = useState<ScrambleFrame>(() => ({
    revealCount: 0,
    chars: text ? text.split("") : [],
  }));

  // Only the "view" trigger needs to watch visibility; reveals once.
  useEffect(() => {
    if (trigger !== "view") return;
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setIsInView(true);
      observer.disconnect();
    });
    observer.observe(element);

    return () => observer.disconnect();
  }, [trigger]);

  // A fresh run starts every time the text becomes active. State is only set
  // from the rAF callback, so the first frame (elapsed ≈ 0) resets the reveal.
  useEffect(() => {
    if (!isActive || !text) return;

    const totalLength = text.length;
    const startTime = performance.now();
    let lastFlipTime = startTime;
    let chars = generateGibberishPreservingSpaces(text, charset).split("");
    let animationFrame = 0;

    const update = (now: number) => {
      const revealCount = Math.min(
        totalLength,
        Math.floor((now - startTime) / Math.max(1, revealDelayMs)),
      );

      // Re-randomize unrevealed scramble characters on an interval
      if (
        revealCount < totalLength &&
        now - lastFlipTime >= Math.max(0, flipDelayMs)
      ) {
        chars = chars.map((char, index) =>
          index < revealCount || text[index] === " "
            ? char
            : generateRandomCharacter(charset),
        );
        lastFlipTime = now;
      }

      // Bail out when nothing changed so idle frames don't re-render.
      setFrame((previous) =>
        previous.revealCount === revealCount && previous.chars === chars
          ? previous
          : { revealCount, chars },
      );

      if (revealCount < totalLength) {
        animationFrame = requestAnimationFrame(update);
      }
    };

    animationFrame = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animationFrame);
  }, [isActive, text, revealDelayMs, charset, flipDelayMs]);

  if (!text) return null;

  // Hover-triggered text idles as the plain, fully revealed text.
  const revealCount =
    trigger === "hover" && !isActive ? text.length : frame.revealCount;

  return (
    <span
      ref={ref}
      className={cn(className)}
      aria-label={text}
      role="text"
      onMouseEnter={trigger === "hover" ? () => setIsHovered(true) : undefined}
      onMouseLeave={trigger === "hover" ? () => setIsHovered(false) : undefined}
    >
      {text.split("").map((char, index) => {
        const isRevealed = index < revealCount;
        const displayChar = isRevealed ? char : (frame.chars[index] ?? char);

        return (
          <span
            key={index}
            className={cn(isRevealed ? revealedClassName : encryptedClassName)}
          >
            {displayChar}
          </span>
        );
      })}
    </span>
  );
};
