"use client";

import Image from "next/image";
import { FadeUp, ImageReveal } from "./RevealText";

export default function Tribute() {
  return (
    <section id="tribute" className="relative flex h-[80vh] min-h-[560px] w-full items-center overflow-hidden">
      <ImageReveal className="absolute inset-0 h-full w-full">
        <div className="relative h-full w-full">
          <Image
            src="https://images.unsplash.com/photo-1602523961358-f9f03dd557db?q=80&w=1800&auto=format&fit=crop"
            alt="White candles glowing softly against a dark background"
            fill
            loading="eager"
            className="object-cover"
          />
        </div>
      </ImageReveal>
      <div className="absolute inset-0 bg-black-main/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-black-main via-black-main/40 to-black-main/60" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-[clamp(20px,6vw,110px)] text-center">
        <FadeUp>
          <span className="font-display text-[80px] leading-none text-gold/70">&ldquo;</span>
        </FadeUp>
        <FadeUp delay={0.15}>
          <p className="mx-auto max-w-2xl font-display text-[clamp(24px,2.6vw,38px)] italic leading-[1.35] text-ivory">
            Those we love don&rsquo;t go away, they walk beside us every day.
          </p>
        </FadeUp>
        <FadeUp delay={0.3} className="mt-9">
          <span className="font-body text-[12.5px] font-semibold uppercase tracking-wide-gold text-gold">
            We help you tell their story beautifully
          </span>
        </FadeUp>
      </div>
    </section>
  );
}
