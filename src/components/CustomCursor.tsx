"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState<"none" | "link" | "gallery">("none");

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced) return;
    setEnabled(true);
    document.body.classList.add("custom-cursor-active");

    let ringX = 0;
    let ringY = 0;

    function onMove(e: MouseEvent) {
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
      ringX = e.clientX;
      ringY = e.clientY;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
      }

      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor='gallery']")) {
        setHovering("gallery");
      } else if (target.closest("a, button, [data-cursor='link']")) {
        setHovering("link");
      } else {
        setHovering("none");
      }
    }

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          width: hovering === "link" ? 5 : 8,
          height: hovering === "link" ? 5 : 8,
        }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          width: hovering === "gallery" ? 64 : hovering === "link" ? 44 : 34,
          height: hovering === "gallery" ? 64 : hovering === "link" ? 44 : 34,
          opacity: hovering === "gallery" ? 0.9 : 0.6,
          borderColor:
            hovering === "gallery" ? "rgba(225,188,102,0.8)" : "rgba(200,155,60,0.55)",
        }}
      />
    </>
  );
}
