"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SECTION_LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Memorials", id: "gallery" },
  { label: "Craftsmanship", id: "craftsmanship" },
  { label: "Tributes", id: "tribute" },
  { label: "Contact", id: "contact" },
];

const NAVBAR_OFFSET = 96;

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const LINKS = SECTION_LINKS.map((l) => ({
    label: l.label,
    href: isHome ? `#${l.id}` : `/#${l.id}`,
  }));

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const sectionIds = SECTION_LINKS.map((l) => l.id);

    function onScroll() {
      setScrolled(window.scrollY > 40);

      const scrollPos = window.scrollY + NAVBAR_OFFSET;
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const elTop = el.getBoundingClientRect().top + window.scrollY;
          if (elTop <= scrollPos) {
            current = id;
          }
        }
      }

      // Past the last section's start, keep it active through the footer too.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) current = sectionIds[sectionIds.length - 1];

      setActive(`#${current}`);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 h-[72px] border-b transition-colors duration-500 ${
        scrolled
          ? "bg-black-main/85 backdrop-blur-md border-gold/25"
          : "bg-transparent border-gold/[0.12]"
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-[clamp(20px,6vw,110px)]">
        <a
          href={isHome ? "#home" : "/"}
          className="group flex items-center gap-3"
          data-cursor="link"
        >
          <span className="transition-transform duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_8px_rgba(200,155,60,0.5)]">
            <Image src="/logo.png" alt="Isikhumbulo Memorial" width={48} height={44} className="h-11 w-auto" priority />
          </span>
          <span className="font-crest leading-[1.15] text-ivory">
            <span className="block text-[13px] tracking-[0.18em]">ISIKHUMBULO</span>
            <span className="block text-[11px] tracking-[0.28em] text-gold">MEMORIAL</span>
          </span>
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {LINKS.map((link) => {
            const isActive = link.href === active;
            return (
              <a
                key={link.label}
                href={link.href}
                data-cursor="link"
                aria-current={isActive ? "page" : undefined}
                className={`group relative font-body text-[12px] font-medium uppercase tracking-wide-gold transition-colors duration-300 hover:text-gold-light ${
                  isActive ? "text-gold-light" : "text-ivory/85"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-2 left-0 h-px bg-gold transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="text-gold lg:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <motion.nav
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="flex flex-col gap-1 border-t border-gold/20 bg-black-main/98 px-6 py-6 lg:hidden"
        >
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`py-3 font-body text-[13px] uppercase tracking-wide-gold hover:text-gold-light ${
                link.href === active ? "text-gold-light" : "text-ivory/85"
              }`}
            >
              {link.label}
            </a>
          ))}
        </motion.nav>
      )}
    </motion.header>
  );
}
