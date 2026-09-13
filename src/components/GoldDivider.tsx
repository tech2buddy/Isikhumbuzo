"use client";

import { motion } from "framer-motion";

export default function GoldDivider({
  align = "center",
  className = "",
}: {
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 ${
        align === "center" ? "justify-center" : "justify-start"
      } ${className}`}
    >
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        style={{ transformOrigin: align === "center" ? "right" : "left" }}
        className="h-px w-12 bg-gradient-to-r from-transparent to-gold origin-right"
      />
      <svg width="10" height="10" viewBox="0 0 10 10" className="shrink-0" aria-hidden>
        <path
          d="M5 0 L6.2 3.8 L10 5 L6.2 6.2 L5 10 L3.8 6.2 L0 5 L3.8 3.8 Z"
          fill="#C89B3C"
        />
      </svg>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        style={{ transformOrigin: "left" }}
        className="h-px w-12 bg-gradient-to-l from-transparent to-gold"
      />
    </div>
  );
}
