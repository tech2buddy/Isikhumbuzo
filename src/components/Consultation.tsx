"use client";

import { Phone } from "lucide-react";
import { FadeUp } from "./RevealText";
import MagneticButton from "./MagneticButton";

const FIELDS = [
  { label: "Your Name", type: "text", name: "name" },
  { label: "Email Address", type: "email", name: "email" },
  { label: "Phone Number", type: "tel", name: "phone" },
  { label: "I'm interested in...", type: "text", name: "interest" },
];

export default function Consultation() {
  return (
    <section
      id="contact"
      className="texture-marble relative w-full overflow-hidden bg-ivory py-24"
    >
      <svg
        className="pointer-events-none absolute -right-32 top-0 hidden h-[600px] w-[600px] opacity-[0.08] lg:block"
        viewBox="0 0 500 500"
        aria-hidden
      >
        <path
          d="M250 40 C190 140 320 180 260 280 C220 350 160 380 120 460"
          stroke="#9A742E"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="250" cy="40" r="26" stroke="#9A742E" strokeWidth="1" fill="none" />
        <path
          d="M260 280 C320 300 370 270 430 300"
          stroke="#9A742E"
          strokeWidth="1"
          fill="none"
        />
        <circle cx="430" cy="300" r="16" stroke="#9A742E" strokeWidth="1" fill="none" />
      </svg>

      <div className="relative z-10 mx-auto grid max-w-[1440px] grid-cols-1 gap-14 px-[clamp(20px,6vw,110px)] lg:grid-cols-[0.85fr_1.3fr]">
        <FadeUp>
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold text-gold">
            <Phone size={18} strokeWidth={1.5} />
          </div>
          <span className="mt-6 block font-body text-[12px] font-semibold uppercase tracking-wide-gold text-gold-muted">
            Let&rsquo;s Create A Lasting Tribute
          </span>
          <h2 className="mt-4 font-display text-[clamp(32px,3vw,46px)] font-medium leading-[1.08] text-black-warm">
            Book a Consultation
          </h2>
          <p className="mt-5 max-w-sm font-body text-[15px] font-light leading-[1.85] text-black-warm/70">
            We&rsquo;re here to guide you with care, compassion and expertise.
            Let&rsquo;s create a memorial that honors their life and legacy.
          </p>

          <div className="mt-10 space-y-1 font-body text-[14px] text-black-warm/80">
            <p>076 099 0333</p>
            <p>isikhumbulomemorial@gmail.com</p>
            <p>37 Hoopoe Street, Crystal Park, Benoni, 1520, South Africa</p>
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <form className="grid grid-cols-1 gap-6 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
            {FIELDS.map((field) => (
              <label key={field.name} className="flex flex-col gap-2">
                <span className="font-body text-[11.5px] font-medium uppercase tracking-wide-gold text-black-warm/60">
                  {field.label}
                </span>
                <input
                  type={field.type}
                  name={field.name}
                  className="h-12 border border-black-warm/15 bg-white px-4 font-body text-[14px] text-black-warm outline-none transition-colors duration-300 focus:border-gold"
                />
              </label>
            ))}

            <label className="flex flex-col gap-2 sm:col-span-2">
              <span className="font-body text-[11.5px] font-medium uppercase tracking-wide-gold text-black-warm/60">
                How can we help you?
              </span>
              <textarea
                name="message"
                rows={5}
                className="resize-none border border-black-warm/15 bg-white px-4 py-3 font-body text-[14px] text-black-warm outline-none transition-colors duration-300 focus:border-gold"
              />
            </label>

            <div className="sm:col-span-2">
              <MagneticButton variant="dark" className="w-full sm:w-auto">
                Send Message
              </MagneticButton>
            </div>
          </form>
        </FadeUp>
      </div>
    </section>
  );
}
