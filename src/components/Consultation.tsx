"use client";

import { sendEnquiry } from "@/lib/enquiry-client";
import { Phone } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { FadeUp } from "./RevealText";
import MagneticButton from "./MagneticButton";

const FIELDS = [
  { label: "Your Name", type: "text", name: "name" },
  { label: "Email Address", type: "email", name: "email" },
  { label: "Phone Number", type: "tel", name: "phone" },
  { label: "I'm interested in...", type: "text", name: "interest" },
];

export default function Consultation() {
  const form = useRef<HTMLFormElement>(null);
  const [choiceOpen, setChoiceOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "already" | "error">("idle");
  const sending = useRef(false);
  const pendingDetails = useRef<FormData | null>(null);
  const finished = status === "sent" || status === "already";
  const [whatsappUrl, setWhatsappUrl] = useState("");

  function openChoices(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    if (finished) { setStatus("already"); return; }
    setStatus("idle");
    const data = new FormData(event.currentTarget);
    pendingDetails.current = data;
    const message = `Consultation request\nName: ${data.get("name")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone")}\nInterested in: ${data.get("interest")}\nMessage: ${data.get("message")}`;
    setWhatsappUrl(`https://wa.me/27760990333?text=${encodeURIComponent(message)}`);
    setChoiceOpen(true);
  }

  async function sendEmail() {
    if (sending.current || finished) return;
    const data = pendingDetails.current;
    if (!data) return;
    sending.current = true;
    setStatus("sending");
    try {
      const result = await sendEnquiry({ code: "CONSULTATION", name: String(data.get("name") ?? ""), email: String(data.get("email") ?? ""), phone: String(data.get("phone") ?? ""), location: "", message: `Interested in: ${data.get("interest")}\n\n${data.get("message")}` });
      setStatus(result);
      setChoiceOpen(false);
    } catch { setStatus("error"); }
    finally { sending.current = false; }
  }  return (
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
          <form ref={form} className="grid grid-cols-1 gap-6 sm:grid-cols-2" onSubmit={openChoices}>
            <fieldset disabled={choiceOpen || finished} className="contents">
            {FIELDS.map((field) => (
              <label key={field.name} className="flex flex-col gap-2">
                <span className="font-body text-[11.5px] font-medium uppercase tracking-wide-gold text-black-warm/60">
                  {field.label}
                </span>
                <input
                  type={field.type}
                  name={field.name}
                  required={field.name !== "interest"}
                  maxLength={field.name === "phone" ? 30 : field.name === "email" ? 160 : 100}
                  minLength={field.name === "phone" ? 7 : undefined}
                  pattern={field.name === "phone" ? "[+0-9\\(\\) .\\-]{7,30}" : field.name === "name" ? ".*\\S.*" : undefined}
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
                maxLength={800}
                rows={5}
                className="resize-none border border-black-warm/15 bg-white px-4 py-3 font-body text-[14px] text-black-warm outline-none transition-colors duration-300 focus:border-gold"
              />
            </label>

            </fieldset>
            <div className="sm:col-span-2">
              <MagneticButton type="submit" variant="dark" className="w-full sm:w-auto">
                {finished ? "Already sent" : "Send Message"}
              </MagneticButton>
            </div>
          </form>
        </FadeUp>
      </div>
      {choiceOpen && <div role="dialog" aria-modal="true" aria-labelledby="contact-choice-title" className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-5">
        <div className="w-full max-w-md bg-ivory p-7 text-black-warm shadow-2xl">
          <p className="text-xs uppercase tracking-wide-gold text-gold-muted">Choose how to send</p>
          <h2 id="contact-choice-title" className="mt-3 font-display text-3xl">Where should we send your request?</h2>
          <div className="mt-7 grid gap-3">
            <button type="button" onClick={sendEmail} disabled={status === "sending"} className="min-h-12 bg-black-warm px-5 py-3 text-xs uppercase tracking-wide-gold text-ivory disabled:opacity-60">{status === "sending" ? "Sending…" : "Send by email"}</button>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={event => { if (sending.current) event.preventDefault(); else setChoiceOpen(false); }} aria-disabled={status === "sending"} className="min-h-12 border border-black-warm px-5 py-3 text-center text-xs uppercase tracking-wide-gold text-black-warm">Continue on WhatsApp</a>
            <button type="button" disabled={status === "sending"} onClick={() => setChoiceOpen(false)} className="py-2 text-xs text-black-warm/60 underline">Cancel</button>
          </div>
          {status === "error" && <p role="alert" className="mt-4 text-sm text-red-800">Email could not be sent. Please try WhatsApp.</p>}
        </div>
      </div>}
      {finished && <p role="status" className="mx-auto mt-6 max-w-[1440px] px-[clamp(20px,6vw,110px)] text-sm text-gold-muted">Already sent. Your consultation request is with our team.</p>}
      {finished && <button type="button" onClick={() => { setStatus("idle"); form.current?.reset(); }} className="mx-auto mt-4 block min-h-11 text-sm text-gold-muted underline">Start a different enquiry</button>}
    </section>
  );
}
