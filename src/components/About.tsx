"use client";

import { FadeUp, RevealLine } from "./RevealText";
import MagneticButton from "./MagneticButton";
import GoldDivider from "./GoldDivider";

export default function About() {
  return (
    <div className="relative flex w-full flex-col justify-center overflow-hidden bg-ivory px-[clamp(24px,5vw,64px)] py-20 lg:basis-[36%] lg:py-0">
      {/* botanical line art, top-left */}
      <svg
        className="pointer-events-none absolute -left-20 -top-14 h-[440px] w-[440px] opacity-[0.1]"
        viewBox="0 0 400 400"
        aria-hidden
      >
        <path
          d="M200 20 C160 100 260 140 220 220 C190 280 140 300 100 380"
          stroke="#9A742E"
          strokeWidth="1.4"
          fill="none"
        />
        <path d="M200 20 C120 60 90 40 40 70" stroke="#9A742E" strokeWidth="1" fill="none" />
        <path
          d="M220 220 C260 240 300 220 340 250"
          stroke="#9A742E"
          strokeWidth="1"
          fill="none"
        />
        <path d="M160 90 C130 100 110 90 90 105" stroke="#9A742E" strokeWidth="0.8" fill="none" />
        <path
          d="M190 160 C220 165 235 155 260 168"
          stroke="#9A742E"
          strokeWidth="0.8"
          fill="none"
        />
        <path d="M150 250 C170 260 175 280 165 300" stroke="#9A742E" strokeWidth="0.8" fill="none" />
        <circle cx="200" cy="20" r="4" fill="#9A742E" />
        <circle cx="40" cy="70" r="2.5" fill="#9A742E" />
        <circle cx="340" cy="250" r="2.5" fill="#9A742E" />
      </svg>

      {/* botanical line art, bottom-right */}
      <svg
        className="pointer-events-none absolute -right-16 -bottom-20 h-[360px] w-[360px] opacity-[0.08] hidden sm:block"
        viewBox="0 0 400 400"
        aria-hidden
      >
        <path
          d="M60 380 C110 320 60 260 130 210 C180 175 220 150 260 90"
          stroke="#9A742E"
          strokeWidth="1.2"
          fill="none"
        />
        <path d="M130 210 C160 230 190 225 210 245" stroke="#9A742E" strokeWidth="0.8" fill="none" />
        <path d="M260 90 C280 60 300 55 330 30" stroke="#9A742E" strokeWidth="0.8" fill="none" />
        <circle cx="330" cy="30" r="3" fill="#9A742E" />
      </svg>

      {/* faint monogram watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-6 bottom-0 select-none font-crest text-[280px] leading-none text-black-warm/[0.025]"
      >
        I
      </span>

      {/* corner brackets */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-6 top-6 h-8 w-8 border-l border-t border-gold/35 sm:left-9 sm:top-9"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-6 right-6 h-8 w-8 border-b border-r border-gold/35 sm:bottom-9 sm:right-9"
      />

      <div className="relative z-10 max-w-md">
        <FadeUp className="flex items-center gap-3">
          <svg width="9" height="9" viewBox="0 0 10 10" aria-hidden>
            <path
              d="M5 0 L6.2 3.8 L10 5 L6.2 6.2 L5 10 L3.8 6.2 L0 5 L3.8 3.8 Z"
              fill="#C89B3C"
            />
          </svg>
          <span className="font-body text-[12px] font-semibold uppercase tracking-wide-gold text-gold-muted">
            About Us
          </span>
        </FadeUp>

        <h2 className="relative mt-5 border-l border-gold/30 pl-6 font-display text-[clamp(34px,3.4vw,48px)] font-medium leading-[1.05] text-black-warm">
          <RevealLine delay={0.05}>Honoring Lives.</RevealLine>
          <RevealLine delay={0.15}>Preserving Memories.</RevealLine>
        </h2>

        <GoldDivider align="left" className="mt-7" />

        <FadeUp delay={0.25}>
          <p className="mt-7 font-body text-[15px] font-light leading-[1.85] text-black-warm/70">
            At Isikhumbulo Memorial, we believe every life tells a story worth
            remembering. With compassion, artistry and time-honored
            craftsmanship, we create memorials that stand as enduring
            tributes to the lives and legacies of those we love.
          </p>
        </FadeUp>

        <FadeUp delay={0.35} className="mt-9">
          <MagneticButton href="#craftsmanship" variant="dark">
            Learn Our Story
          </MagneticButton>
        </FadeUp>
      </div>
    </div>
  );
}
