"use client";

import Image from "next/image";
import styles from "./catalog.module.css";
import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Mail, X } from "lucide-react";

import { DESIGNS, type Design } from "@/lib/catalog";
import { sendEnquiry } from "@/lib/enquiry-client";
const FILTERS = ["All designs", ...new Set(DESIGNS.map((design) => design.style))];
const INPUT = "w-full rounded-none border border-black-warm/25 bg-white px-3 py-3 text-sm text-black-warm outline-none focus:border-gold-muted focus:ring-1 focus:ring-gold-muted";
const EMAIL = "isikhumbulomemorial@gmail.com";

export default function Catalog() {
  const [filter, setFilter] = useState("All designs");
  const [selected, setSelected] = useState<Design>(DESIGNS[0]);
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "sent" | "already" | "error">("idle");
  const [extras, setExtras] = useState<string[]>([]);
  const [adding, setAdding] = useState(false);
  const [preview, setPreview] = useState<Design | null>(null);
  const pictureDialog = useRef<HTMLDialogElement>(null);
  const slider = useRef<HTMLDivElement>(null);

  function viewPicture(design: Design) {
    setPreview(design);
    pictureDialog.current?.showModal();
  }

  function addStone(code: string) {
    if (sending.current || finished || code === selected.code) return;
    setExtras(items => items.includes(code) ? items : [...items, code]);
  }

  function slide(direction: number) {
    const track = slider.current;
    if (track) track.scrollBy({ left: direction * track.clientWidth * 0.85, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  const sending = useRef(false);
  const finished = submitState === "sent" || submitState === "already";
  const chosen = [selected, ...DESIGNS.filter(design => extras.includes(design.code))];
  const dialog = useRef<HTMLDialogElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const visible = DESIGNS.filter((design) => filter === "All designs" || design.style === filter);

  function enquire(design: Design) {
    if (sending.current) return;
    setSelected(design);
    setExtras([]);
    setAdding(false);
    setSubmitState("idle");
    form.current?.reset();
    dialog.current?.showModal();
  }

  async function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    if (finished) { setSubmitState("already"); return; }
    const data = new FormData(event.currentTarget);
    sending.current = true;
    setSubmitState("sending");
    try {
      setSubmitState(await sendEnquiry({
        codes: chosen.map(design => design.code), name: String(data.get("name") ?? ""), email: String(data.get("email") ?? ""), phone: String(data.get("phone") ?? ""), location: String(data.get("location") ?? ""), message: String(data.get("message") ?? ""),
      }));
    } catch { setSubmitState("error"); }
    finally { sending.current = false; }
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
                <Image src={design.image} alt={`${design.style}, reference ${design.code}`} fill sizes="(max-width: 767px) 100vw, 50vw" className={design.fullImage ? "object-contain" : "object-cover transition-transform duration-500 group-hover:scale-[1.03]"} />
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

      <dialog ref={dialog} onCancel={event => { if (sending.current) event.preventDefault(); }} aria-labelledby="enquiry-title" className={`${styles.dialog} fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto border border-gold/50 bg-ivory p-6 text-black-warm shadow-2xl backdrop:bg-black/75 sm:p-9`}>
        <button type="button" disabled={submitState === "sending"} onClick={() => dialog.current?.close()} aria-label="Close enquiry form" className={`${styles.dialogClose} absolute right-3 top-3 flex h-11 w-11 items-center justify-center hover:bg-black/5 focus-visible:outline-2`}><X size={20} /></button>
        <p className="pr-10 text-xs uppercase tracking-wide-gold text-gold-muted">A personal enquiry</p>
        <h2 id="enquiry-title" className="mt-3 pr-6 font-display text-4xl">Let’s talk about {chosen.length > 1 ? "your selected stones" : selected.code}</h2>
        <p className="mt-3 text-sm leading-6 text-black-warm/75">Share your details once. We’ll receive all your selected stones together in one enquiry.</p>
        <form ref={form} onSubmit={prepareEmail} onChange={() => { if (!sending.current && !finished) setSubmitState("idle"); }} className="mt-6 grid gap-4 sm:grid-cols-2">
          <fieldset disabled={submitState === "sending" || finished} className="contents">
          <div className="grid min-w-0 gap-3 sm:col-span-2">
            <p className="text-xs font-medium">Your selection · {chosen.length} {chosen.length === 1 ? "stone" : "stones"}</p>
            {chosen.map(design => <div key={design.code} className="flex items-center gap-3 border border-gold/30 bg-white p-3">
              <button type="button" onClick={() => viewPicture(design)} aria-label={`View full picture of ${design.code}`} className="shrink-0 cursor-zoom-in focus-visible:outline-2 focus-visible:outline-gold-muted"><Image src={design.image} alt={design.code} width={64} height={56} className="h-14 w-16 object-contain" /></button>
              <div className="min-w-0 flex-1"><p className="text-sm font-medium">{design.code}</p><p className="text-xs text-black-warm/60">{design.style}</p></div>
              {design.code !== selected.code && <button type="button" aria-label={`Remove ${design.code}`} onClick={() => setExtras(items => items.filter(code => code !== design.code))} className="min-h-11 px-2 text-xs underline">Remove</button>}
            </div>)}
            {!adding && chosen.length < DESIGNS.length && <button type="button" onClick={() => setAdding(true)} className="min-h-11 border border-gold-muted px-3 py-2 text-sm">+ Add another stone (optional)</button>}
            {adding && <div className="min-w-0 border border-gold/30 p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium">Choose another stone</p>
                <div className="flex gap-1">
                  <button type="button" onClick={() => slide(-1)} aria-label="Previous stones" className="flex h-11 w-11 items-center justify-center border border-gold/40"><ChevronLeft size={18} /></button>
                  <button type="button" onClick={() => slide(1)} aria-label="Next stones" className="flex h-11 w-11 items-center justify-center border border-gold/40"><ChevronRight size={18} /></button>
                </div>
              </div>
              <p className="my-2 text-xs leading-5 text-black-warm/65">Swipe or use the arrows. Tap a picture to see the full stone.</p>
              <div ref={slider} className={styles.stoneSlider} role="region" aria-label="Browse stones to add" tabIndex={0}>
                {DESIGNS.map(design => {
                  const included = chosen.some(item => item.code === design.code);
                  return <div key={design.code} className={styles.stoneSlide}>
                    <button type="button" onClick={() => viewPicture(design)} aria-label={`Preview ${design.code}`} className="relative block aspect-[4/3] w-full cursor-zoom-in bg-white focus-visible:outline-2 focus-visible:outline-gold-muted">
                      <Image src={design.image} alt={`${design.code} — ${design.style}`} fill sizes="240px" className="object-contain" />
                      <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 text-[10px] text-white">View full picture</span>
                    </button>
                    <div className="p-3"><p className="text-sm font-medium">{design.code}</p><p className="mt-1 text-xs text-black-warm/65">{design.style}</p>
                      <button type="button" disabled={included} onClick={() => addStone(design.code)} aria-label={included ? `${design.code} added` : `Add ${design.code}`} className="mt-3 min-h-11 w-full bg-black-warm px-2 text-xs text-ivory disabled:bg-black-warm/10 disabled:text-black-warm">{included ? "✓ Added" : "+ Add to enquiry"}</button>
                    </div>
                  </div>;
                })}
              </div>
              <button type="button" onClick={() => setAdding(false)} className="mt-3 min-h-11 w-full border border-gold-muted text-sm">Done choosing · {chosen.length} selected</button>
            </div>}
          </div>
          <label className="grid gap-2 text-xs sm:col-span-2">Your name *<input autoComplete="name" name="name" required maxLength={100} pattern=".*\S.*" className={INPUT} /></label>
          <label className="grid gap-2 text-xs">Email address *<input type="email" autoComplete="email" name="email" required maxLength={160} className={INPUT} /></label>
          <label className="grid gap-2 text-xs">Phone number *<input type="tel" autoComplete="tel" name="phone" required minLength={7} maxLength={30} pattern="[+0-9\(\) .\-]{7,30}" className={INPUT} /></label>
          <label className="grid gap-2 text-xs sm:col-span-2">Town / installation location (optional)<input name="location" autoComplete="address-level2" maxLength={150} className={INPUT} /></label>
          <label className="grid gap-2 text-xs sm:col-span-2">What would you like us to know? (optional)<textarea name="message" rows={3} maxLength={1000} placeholder="Personalisation, timing, or any questions…" className={INPUT} /></label>
          </fieldset>
          <p className="text-xs leading-6 text-black-warm/70 sm:col-span-2">Sending shares your details and all selected stones with our team in one email. Read our <Link href="/privacy-policy" className="underline underline-offset-2">privacy policy</Link>.</p>
          <button type="submit" disabled={submitState === "sending"} className="flex min-h-12 items-center justify-center gap-3 bg-black-warm px-5 py-3 text-xs uppercase tracking-wide-gold text-ivory disabled:opacity-60 sm:col-span-2"><Mail size={17} aria-hidden="true" />{submitState === "sending" ? "Sending…" : finished ? "Already sent" : `Send enquiry · ${chosen.length} ${chosen.length === 1 ? "stone" : "stones"}`}</button>
          {finished && <p role="status" className="border border-gold-muted/40 bg-white p-4 text-sm leading-6 sm:col-span-2">Already sent. Thank you — all selected stones are included in your enquiry. No need to send again.</p>}
          {finished && <button type="button" onClick={() => enquire(selected)} className="min-h-11 text-sm underline sm:col-span-2">Start a different enquiry</button>}
          {submitState === "error" && <p role="alert" className="border border-red-800/30 bg-white p-4 text-sm leading-6 sm:col-span-2">We couldn’t send this enquiry. Please email {EMAIL} directly.</p>}
        </form>
      </dialog>
      <dialog ref={pictureDialog} aria-labelledby="stone-picture-title" className={styles.pictureDialog}>
        {preview && <>
          <div className="flex items-center justify-between gap-4 px-4 py-2">
            <h2 id="stone-picture-title" className="font-display text-2xl">{preview.code} <span className="font-body text-xs text-grey">{preview.style}</span></h2>
            <button type="button" onClick={() => pictureDialog.current?.close()} aria-label="Close full picture" className="flex h-11 w-11 shrink-0 items-center justify-center"><X size={22} /></button>
          </div>
          <div className={styles.fullPicture}><Image src={preview.image} alt={`${preview.code} — ${preview.description}`} fill sizes="(max-width: 900px) 94vw, 900px" className="object-contain" /></div>
          <div className="flex flex-wrap items-center justify-between gap-3 p-4">
            <a href={preview.image} target="_blank" rel="noreferrer" className="flex min-h-11 items-center text-xs text-gold-light underline">Open original image</a>
            <button type="button" disabled={chosen.some(item => item.code === preview.code) || finished || submitState === "sending"} onClick={() => addStone(preview.code)} className="min-h-11 bg-gold px-5 py-3 text-sm text-black-main disabled:opacity-60">{chosen.some(item => item.code === preview.code) ? "✓ Added to enquiry" : "+ Add to enquiry"}</button>
          </div>
        </>}
      </dialog>
    </section>
  );
}

