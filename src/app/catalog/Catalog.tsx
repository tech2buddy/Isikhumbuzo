"use client";

import Image from "next/image";
import styles from "./catalog.module.css";
import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Mail, X } from "lucide-react";

const DESIGNS = [
  { code: "ISM-001", style: "Heartfelt", image: "/images/heartfelt-memorial-2.png", description: "An expressive tribute inspired by love and remembrance." },
  { code: "ISM-002", style: "Modern", image: "/images/modern-designs.png", description: "Clean lines and a contemporary approach to remembrance." },
  { code: "ISM-003", style: "Classic", image: "/images/classic-tributes.png", description: "Traditional forms with an enduring, dignified presence." },
  { code: "ISM-004", style: "Natural", image: "/images/natural-stone.png", description: "Organic textures for a quiet connection to nature." },
];
type Design = (typeof DESIGNS)[number];
const FILTERS = ["All designs", ...DESIGNS.map((design) => design.style)];
const INPUT = "w-full rounded-none border border-black-warm/25 bg-white px-3 py-3 text-sm text-black-warm outline-none focus:border-gold-muted focus:ring-1 focus:ring-gold-muted";
const EMAIL = "isikhumbulomemorial@gmail.com";

export default function Catalog() {
  const [filter, setFilter] = useState("All designs");
  const [selected, setSelected] = useState<Design>(DESIGNS[0]);
  const [prepared, setPrepared] = useState(false);
  const [emailUrl, setEmailUrl] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const visible = DESIGNS.filter((design) => filter === "All designs" || design.style === filter);

  function enquire(design: Design) {
    setSelected(design);
    setPrepared(false);
    setEmailUrl("");
    form.current?.reset();
    dialog.current?.showModal();
  }

  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = [
      `I would like to enquire about ${selected.code} (${selected.style}).`,
      "",
      `Name: ${String(data.get("name")).trim()}`,
      `Email: ${String(data.get("email")).trim()}`,
      `Phone: ${String(data.get("phone")).trim()}`,
      `Town / installation location: ${String(data.get("location")).trim() || "Not provided"}`,
      "",
      String(data.get("message")).trim(),
    ].join("\n");
    setEmailUrl(`mailto:${EMAIL}?subject=${encodeURIComponent(`Memorial enquiry — ${selected.code}`)}&body=${encodeURIComponent(body)}`);
    setPrepared(true);
  }

  return (
    <section className={`${styles.collection} border-t border-gold/25 bg-black-secondary px-6 py-12 sm:px-10`}>
      <div className="mx-auto max-w-7xl">
        <div className={`${styles.toolbar} flex flex-wrap items-center justify-between gap-6`}>
          <div className={`${styles.filters} flex flex-wrap gap-2`} role="group" aria-label="Filter memorial designs">
            {FILTERS.map((item) => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)} className={`min-h-11 border px-4 py-2 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${filter === item ? "border-gold bg-gold text-black-main" : "border-ivory/20 text-ivory hover:border-gold"}`}>{item}</button>)}
          </div>
          <p aria-live="polite" className="text-xs text-grey">{visible.length} {visible.length === 1 ? "design" : "designs"}</p>
        </div>
        <p className="mt-6 max-w-3xl text-xs leading-6 text-grey">Images illustrate design styles. Please quote the reference code when enquiring; final design, material, availability and pricing will be confirmed with you.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {visible.map((design) => (
            <article key={design.code} className="group overflow-hidden border border-gold/25 bg-black-main">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={design.image} alt={`${design.style} memorial style, reference ${design.code}`} fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                <span className="absolute left-5 top-5 border border-gold/50 bg-black-main/90 px-3 py-2 text-xs tracking-widest text-gold-light">{design.code}</span>
              </div>
              <div className={`${styles.cardBody} p-6 sm:p-8`}>
                <p className="text-[10px] uppercase tracking-[0.22em] text-gold">{design.style} collection</p>
                <h2 className="mt-2 font-display text-3xl text-ivory">{design.code}</h2>
                <p className="mt-3 text-sm leading-7 text-grey">{design.description}</p>
                <button type="button" onClick={() => enquire(design)} aria-label={`Enquire about ${design.code}`} className="mt-6 flex min-h-12 w-full items-center justify-between border-t border-gold/30 pt-5 text-xs uppercase tracking-wide-gold text-gold-light hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">Enquire about this design <ArrowUpRight size={18} aria-hidden="true" /></button>
              </div>
            </article>
          ))}
        </div>
        <div className="my-14 border-y border-gold/25 py-10 text-center">
          <h2 className="font-display text-3xl text-ivory">Every detail can begin with a conversation.</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-grey">Not sure where to start? Speak to us about the tribute you have in mind.</p>
          <a href="tel:+27760990333" className="mt-5 inline-block text-sm text-gold-light underline underline-offset-4">Call 076 099 0333</a>
        </div>
      </div>

      <dialog ref={dialog} aria-labelledby="enquiry-title" className={`${styles.dialog} fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto border border-gold/50 bg-ivory p-6 text-black-warm shadow-2xl backdrop:bg-black/75 sm:p-9`}>
        <button type="button" onClick={() => dialog.current?.close()} aria-label="Close enquiry form" className={`${styles.dialogClose} absolute right-3 top-3 flex h-11 w-11 items-center justify-center hover:bg-black/5 focus-visible:outline-2`}><X size={20} /></button>
        <p className="pr-10 text-xs uppercase tracking-wide-gold text-gold-muted">A personal enquiry</p>
        <h2 id="enquiry-title" className="mt-3 pr-6 font-display text-4xl">Let’s talk about {selected.code}</h2>
        <p className="mt-3 text-sm leading-6 text-black-warm/75">{selected.style} collection. Share your details and we’ll help you explore the possibilities.</p>
        <form ref={form} onSubmit={prepareEmail} onChange={() => setPrepared(false)} className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-xs sm:col-span-2">Your name *<input autoComplete="name" name="name" required maxLength={100} pattern=".*\S.*" className={INPUT} /></label>
          <label className="grid gap-2 text-xs">Email address *<input type="email" autoComplete="email" name="email" required maxLength={160} className={INPUT} /></label>
          <label className="grid gap-2 text-xs">Phone number *<input type="tel" autoComplete="tel" name="phone" required minLength={7} maxLength={30} pattern="[+0-9() .\-]{7,30}" className={INPUT} /></label>
          <label className="grid gap-2 text-xs sm:col-span-2">Town / installation location (optional)<input name="location" autoComplete="address-level2" maxLength={150} className={INPUT} /></label>
          <label className="grid gap-2 text-xs sm:col-span-2">What would you like us to know? (optional)<textarea name="message" rows={3} maxLength={1000} placeholder="Personalisation, timing, or any questions…" className={INPUT} /></label>
          <p className="text-xs leading-6 text-black-warm/70 sm:col-span-2">Your details will be included in an email to our team. You can review it before sending. Read our <Link href="/privacy-policy" className="underline underline-offset-2">privacy policy</Link>.</p>
          <button type="submit" className="flex min-h-12 items-center justify-center gap-3 bg-black-warm px-5 py-3 text-xs uppercase tracking-wide-gold text-ivory hover:bg-black-warm/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-muted sm:col-span-2"><Mail size={17} aria-hidden="true" />Prepare enquiry</button>
          {prepared && <div role="status" className="border border-gold-muted/40 bg-white p-4 text-sm leading-6 sm:col-span-2"><p>Your enquiry is ready. Open your email app to review and send it.</p><a href={emailUrl} className="mt-3 inline-flex min-h-11 items-center font-semibold text-gold-muted underline underline-offset-4">Open email app <ArrowUpRight size={16} aria-hidden="true" /></a><p className="mt-2 break-words text-xs">If your email app doesn’t open, contact {EMAIL} and quote {selected.code}. Nothing has been sent yet.</p></div>}
        </form>
      </dialog>
    </section>
  );
}

