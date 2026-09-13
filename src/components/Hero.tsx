"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import MagneticButton from "./MagneticButton";

const EASE = [0.76, 0, 0.24, 1] as const;

const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  left: (i * 37) % 100,
  top: (i * 53) % 100,
  size: 1 + (i % 3),
  duration: 18 + (i % 7) * 4,
  delay: (i % 5) * 1.6,
}));

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const imgX = useTransform(springX, [-1, 1], [-8, 8]);
  const imgY = useTransform(springY, [-1, 1], [-8, 8]);
  const linesX = useTransform(springX, [-1, 1], [-16, 16]);
  const linesY = useTransform(springY, [-1, 1], [-12, 12]);
  const contentX = useTransform(springX, [-1, 1], [-3, 3]);
  const contentY = useTransform(springY, [-1, 1], [-3, 3]);

  const { scrollY } = useScroll();
  const heroImgY = useTransform(scrollY, [0, 800], [0, 120]);
  const heroContentY = useTransform(scrollY, [0, 800], [0, -60]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth) * 2 - 1);
      mouseY.set((e.clientY / innerHeight) * 2 - 1);
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex h-[92vh] min-h-[640px] w-full items-center overflow-hidden bg-black-main"
    >
      {/* Background image */}
      <motion.div
        style={{ x: imgX, y: heroImgY }}
        className="absolute inset-0 h-[110%] w-full"
      >
        <Image
          src="https://images.unsplash.com/photo-1652636817388-36ea4aad7177?q=80&w=1800&auto=format&fit=crop"
          alt="Polished black granite memorial in a peaceful garden at golden hour"
          fill
          priority
          className="object-cover object-center"
        />
      </motion.div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.85) 32%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0.15) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black-main via-transparent to-black-main/40" />

      {/* Gold motion lines */}
      <motion.svg
        style={{ x: linesX, y: linesY }}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="goldLine1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C89B3C" stopOpacity="0" />
            <stop offset="50%" stopColor="#E1BC66" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#C89B3C" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M -100 620 C 300 500, 700 700, 1600 420"
          stroke="url(#goldLine1)"
          strokeWidth="1.2"
          fill="none"
          filter="blur(0.6px)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3.2, ease: EASE, delay: 0.6 }}
        />
        <motion.path
          d="M -100 200 C 400 320, 900 80, 1600 240"
          stroke="url(#goldLine1)"
          strokeWidth="0.8"
          fill="none"
          filter="blur(0.6px)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3.6, ease: EASE, delay: 1.1 }}
        />
      </motion.svg>

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0">
        {PARTICLES.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-gold-light"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              boxShadow: "0 0 6px rgba(225,188,102,0.6)",
            }}
            animate={{ y: [-10, 10, -10], opacity: [0.15, 0.6, 0.15] }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={{ x: contentX, y: heroContentY, opacity: heroOpacity }}
        className="relative z-10 mx-auto w-full max-w-[1440px] px-[clamp(20px,6vw,110px)]"
      >
        <div className="max-w-[760px]">
          <h1 className="font-display font-medium text-gold" style={{ lineHeight: 0.9 }}>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
                className="block text-[clamp(52px,6vw,110px)] tracking-[0.01em]"
              >
                ISIKHUMBULO
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.2, ease: EASE, delay: 0.5 }}
                className="block text-[clamp(52px,6vw,110px)] tracking-[0.01em]"
              >
                MEMORIAL
              </motion.span>
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.9, delay: 1.1, ease: EASE }}
            className="mt-7 h-px w-40 origin-left bg-gradient-to-r from-gold via-gold-light to-transparent"
          />

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.3, ease: EASE }}
            className="mt-7 font-display text-[clamp(20px,2vw,30px)] italic text-ivory/90"
          >
            &ldquo;Honouring every life. Preserving every memory.&rdquo;
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.55, ease: EASE }}
            className="mt-11 flex flex-wrap items-center gap-5"
          >
            <MagneticButton href="#gallery" variant="primary">
              View Our Work
            </MagneticButton>
            <MagneticButton href="#gallery" variant="secondary">
              Explore Memorials
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Carousel indicators */}
      <div className="absolute right-[clamp(20px,4vw,64px)] top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-4 md:flex">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`h-2.5 w-2.5 rounded-full border transition-colors ${
              i === 0 ? "border-gold bg-gold" : "border-gold/50 bg-transparent"
            }`}
          />
        ))}
      </div>

    </section>
  );
}
