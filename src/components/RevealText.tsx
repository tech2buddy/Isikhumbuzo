"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

/**
 * These reveal components deliberately avoid framer-motion's whileInView.
 * In this project's preview environment the page can run as a
 * non-focused/background tab, which suspends requestAnimationFrame and
 * IntersectionObserver callbacks in Chromium — framer-motion's tween loop
 * never gets to write its first frame, so content stays permanently stuck
 * at its "initial" (invisible) state. Plain CSS-class-driven transitions
 * don't have that failure mode: the moment React commits the "visible"
 * class, the browser resolves the final style even if it can't paint an
 * animated frame yet, so content is never permanently hidden.
 */
function useRevealOnView<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let settled = false;
    const reveal = () => {
      if (settled) return;
      settled = true;
      setVisible(true);
    };

    // Guaranteed fallback: content must never stay hidden forever.
    const fallback = setTimeout(reveal, 600 + delay * 1000);

    let observer: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) reveal();
        },
        { threshold: 0.15 }
      );
      observer.observe(node);
    }

    return () => {
      clearTimeout(fallback);
      observer?.disconnect();
    };
  }, [delay]);

  return { ref, visible };
}

const EASE = "cubic-bezier(0.76,0,0.24,1)";

export function RevealLine({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "span" | "h1" | "h2" | "h3" | "p";
}) {
  const { ref, visible } = useRevealOnView<HTMLSpanElement>(delay);
  return (
    <span className="block overflow-hidden">
      <span
        ref={ref}
        style={{
          transform: visible ? "translateY(0%)" : "translateY(110%)",
          transitionProperty: "transform",
          transitionDuration: "0.9s",
          transitionTimingFunction: EASE,
          transitionDelay: `${delay}s`,
        }}
        className={`block ${className}`}
      >
        {children}
      </span>
    </span>
  );
}

export function FadeUp({
  children,
  delay = 0,
  className = "",
  y = 32,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(delay);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : `translateY(${y}px)`,
        transitionProperty: "opacity, transform",
        transitionDuration: "0.8s",
        transitionTimingFunction: EASE,
        transitionDelay: `${delay}s`,
      }}
      className={className}
    >
      {children}
    </div>
  );
}

export function ImageReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(delay);
  return (
    <div
      ref={ref}
      style={{
        clipPath: visible ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
        transitionProperty: "clip-path",
        transitionDuration: "1.1s",
        transitionTimingFunction: EASE,
        transitionDelay: `${delay}s`,
      }}
      className={`overflow-hidden ${className}`}
    >
      <div
        style={{
          transform: visible ? "scale(1)" : "scale(1.08)",
          transitionProperty: "transform",
          transitionDuration: "1.3s",
          transitionTimingFunction: EASE,
          transitionDelay: `${delay}s`,
        }}
        className="h-full w-full"
      >
        {children}
      </div>
    </div>
  );
}
