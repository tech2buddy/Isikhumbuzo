"use client";

import { Gem, Hammer, PenTool, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { FadeUp, ImageReveal, RevealLine } from "./RevealText";
import GoldDivider from "./GoldDivider";

const FEATURES = [
  {
    icon: Gem,
    title: "Premium Materials",
    text: "We source the finest granite, marble and stone from trusted suppliers.",
  },
  {
    icon: Hammer,
    title: "Expert Craftsmanship",
    text: "Every memorial is shaped by artisans with decades of hands-on mastery.",
  },
  {
    icon: PenTool,
    title: "Custom Engraving",
    text: "Bespoke lettering and imagery, engraved with precision and care.",
  },
  {
    icon: ShieldCheck,
    title: "Built to Endure",
    text: "Weather-resistant stone finished to stand the test of generations.",
  },
];

export default function Craftsmanship() {
  return (
    <section id="craftsmanship" className="relative w-full overflow-hidden bg-black-warm">
      <div className="mx-auto flex max-w-[1440px] flex-col lg:flex-row">
        <div className="relative h-[320px] w-full shrink-0 lg:h-[640px] lg:w-[38%]">
          <ImageReveal className="absolute inset-0 h-full w-full">
            <div className="relative h-full w-full">
              <Image
                src="https://images.unsplash.com/photo-1630869087045-06b4a6a4474e?q=80&w=1400&auto=format&fit=crop"
                alt="Artisan hands engraving polished granite stone"
                fill
                loading="eager"
                className="object-cover"
              />
              {/* mobile: fades in from the left edge, out at the right */}
              <div
                className="absolute inset-0 lg:hidden"
                style={{
                  background:
                    "linear-gradient(to right, #15130f 0%, rgba(21,19,15,0.15) 22%, rgba(21,19,15,0.15) 72%, #15130f 100%)",
                }}
              />
              {/* desktop: fades in from the top edge, out at the bottom */}
              <div
                className="absolute inset-0 hidden lg:block"
                style={{
                  background:
                    "linear-gradient(to bottom, #15130f 0%, rgba(21,19,15,0.1) 20%, rgba(21,19,15,0.1) 72%, #15130f 100%)",
                }}
              />
            </div>
          </ImageReveal>
        </div>

        <div className="flex flex-1 flex-col justify-center px-[clamp(24px,5vw,72px)] py-16 lg:py-24">
          <FadeUp className="mb-3">
            <span className="font-body text-[12px] font-semibold uppercase tracking-wide-gold text-gold-muted">
              Our Process
            </span>
          </FadeUp>
          <h2 className="max-w-xl font-display text-[clamp(30px,3vw,44px)] font-medium leading-[1.08] text-gold">
            <RevealLine delay={0.05}>Crafted With Care.</RevealLine>
            <RevealLine delay={0.15}>Built To Last.</RevealLine>
          </h2>
          <GoldDivider align="left" className="mt-7" />

          <div className="mt-12 grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4 lg:divide-x lg:divide-gold/15">
            {FEATURES.map((f, i) => (
              <FadeUp key={f.title} delay={i * 0.1} className="group lg:px-6 lg:first:pl-0">
                <div className="flex flex-col items-start">
                  <f.icon
                    size={30}
                    strokeWidth={1.2}
                    className="text-gold transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1 group-hover:rotate-3"
                  />
                  <h3 className="mt-5 font-crest text-[13px] uppercase tracking-[0.14em] text-ivory">
                    {f.title}
                  </h3>
                  <p className="mt-3 font-body text-[13.5px] font-light leading-relaxed text-grey">
                    {f.text}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
