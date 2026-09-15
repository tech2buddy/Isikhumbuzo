import Link from "next/link";

export default function MemorialQuestions() {
  return (
    <section aria-labelledby="memorial-questions" className="border-t border-gold/25 bg-black-secondary px-6 py-16 text-ivory sm:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs uppercase tracking-widest text-gold">Isikhumbulo Memorial · Benoni</p>
        <h2 id="memorial-questions" className="mt-4 font-display text-4xl sm:text-5xl">A little guidance, when you need it.</h2>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-grey">Isikhumbulo Memorial creates tombstones and memorials in Crystal Park, Benoni, Gauteng. Explore our designs and speak with us about a personal tribute for your loved one.</p>
        <div className="mt-8 divide-y divide-gold/20">
          <details className="py-5"><summary className="cursor-pointer font-display text-2xl">Where is Isikhumbulo Memorial located?</summary><p className="mt-3 text-sm leading-7 text-grey">Find us at 37 Hoopoe Street, Crystal Park, Benoni, 1520, South Africa. Call <a href="tel:+27760990333" className="text-gold-light underline">076 099 0333</a> to arrange a consultation.</p></details>
          <details className="py-5"><summary className="cursor-pointer font-display text-2xl">Which tombstone designs can I enquire about?</summary><p className="mt-3 text-sm leading-7 text-grey">Our <Link href="/catalog" className="text-gold-light underline">tombstone catalog</Link> includes modern, classic, heartfelt, natural stone and children’s memorial collections. Each design has a reference code. You can select several stones and send them together in one enquiry.</p></details>
          <details className="py-5"><summary className="cursor-pointer font-display text-2xl">How do I get a price for a memorial?</summary><p className="mt-3 text-sm leading-7 text-grey">Choose a design in the catalog and send an enquiry with your contact details. We’ll discuss your preferences and confirm the final design, material, availability and price with you.</p></details>
          <details className="py-5"><summary className="cursor-pointer font-display text-2xl">How do I contact your team?</summary><p className="mt-3 text-sm leading-7 text-grey">Call 076 099 0333, <a href="https://wa.me/27760990333" className="text-gold-light underline">message us on WhatsApp</a>, or email <a href="mailto:isikhumbulomemorial@gmail.com" className="break-all text-gold-light underline">isikhumbulomemorial@gmail.com</a>.</p></details>
        </div>
      </div>
    </section>
  );
}
