"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FadeUp, ImageReveal } from "./RevealText";

const CARDS = [
  {
    label: "Heartfelt Memorials",
    image: "/images/heartfelt-memorial-2.png",
    alt: "Heartfelt Memorials",
  },
  {
    label: "Modern Designs",
    image: "/images/modern-designs.png",
    alt: "Contemporary granite memorial headstones",
  },
  {
    label: "Classic Tributes",
    image: "/images/classic-tributes.png",
    alt: "Classic headstones in a grassy memorial garden",
  },
  {
    label: "Natural Stone",
    image: "/images/natural-stone.png",
    alt: "Natural stone memorial markers",
  },
];

export default function MemorialGallery() {
  return (
    <div
      id="gallery"
      className="relative flex w-full flex-col justify-center overflow-hidden bg-black-secondary px-[clamp(24px,5vw,64px)] py-20 lg:basis-[64%] lg:py-24"
    >
      <FadeUp className="mb-12 flex items-center justify-center gap-5">
        <span className="hidden h-px w-16 bg-gradient-to-r from-transparent to-gold/60 sm:block" />
        <h2 className="font-crest text-[13px] font-semibold uppercase tracking-[0.28em] text-gold">
          Memorial Gallery
        </h2>
        <span className="hidden h-px w-16 bg-gradient-to-l from-transparent to-gold/60 sm:block" />
      </FadeUp>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {CARDS.map((card, i) => (
          <motion.a
            href="#gallery"
            data-cursor="gallery"
            key={card.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.76, 0, 0.24, 1] }}
            whileHover={{ y: -5 }}
            className="group relative block border border-gold/25 transition-colors duration-400 hover:border-gold"
          >
            <ImageReveal className="relative aspect-[4/3] w-full">
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  loading="eager"
                  className="object-cover transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-[1.05] group-hover:brightness-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black-main/70 via-transparent to-transparent" />
              </div>
            </ImageReveal>
            <div className="flex items-center justify-between bg-black-main px-5 py-4">
              <span className="font-crest text-[12px] uppercase tracking-[0.18em] text-ivory/90">
                {card.label}
              </span>
              <ArrowUpRight
                size={16}
                strokeWidth={1.5}
                className="text-gold transition-transform duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
