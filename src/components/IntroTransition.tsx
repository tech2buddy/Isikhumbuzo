"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const EASE = [0.76, 0, 0.24, 1] as const;

export default function IntroTransition() {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const seen = sessionStorage.getItem("intro-seen");
    if (!seen) {
      setShow(true);
      sessionStorage.setItem("intro-seen", "1");
    }
  }, []);

  if (!mounted || !show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.5 }}
          onAnimationComplete={() => setShow(false)}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6 bg-black-main"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <Image src="/logo.png" alt="Isikhumbulo Memorial" width={64} height={58} priority />
          </motion.div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
            className="h-px w-40 origin-center bg-gradient-to-r from-transparent via-gold to-transparent"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
