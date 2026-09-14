"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ReactNode, useRef, useState } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "dark";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export default function MagneticButton({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
}: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.18;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    setOffset({ x, y });
  }

  function handleMouseLeave() {
    setOffset({ x: 0, y: 0 });
  }

  const base =
    "group relative inline-flex items-center justify-center gap-2.5 rounded-[3px] px-8 h-[50px] font-body text-[12.5px] font-medium uppercase tracking-wide-gold transition-colors duration-500";

  const styles: Record<string, string> = {
    primary: "bg-gold text-black-main hover:bg-gold-light",
    secondary:
      "btn-sweep bg-transparent text-ivory border border-gold/70 hover:text-black-main",
    dark: "btn-sweep bg-black-main text-gold border border-gold/40 hover:text-black-main",
  };

  const content = (
    <motion.span
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.4 }}
      className="relative z-10 flex items-center gap-2.5"
    >
      <span className="relative z-10">{children}</span>
      <ArrowRight
        size={15}
        strokeWidth={1.75}
        className="relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-[5px]"
      />
    </motion.span>
  );

  const commonProps = {
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick,
    className: `${base} ${styles[variant]} ${className}`,
  };

  if (href) {
    return (
      <a ref={ref as React.RefObject<HTMLAnchorElement>} href={href} {...commonProps}>
        {content}
      </a>
    );
  }

  return (
    <button ref={ref as React.RefObject<HTMLButtonElement>} type={type} {...commonProps}>
      {content}
    </button>
  );
}
