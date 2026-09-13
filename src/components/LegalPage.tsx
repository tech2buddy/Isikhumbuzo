import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import GoldDivider from "./GoldDivider";

export default function LegalPage({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-black-main">
        <section className="mx-auto max-w-[900px] px-[clamp(20px,6vw,110px)] pb-24 pt-40">
          <span className="font-body text-[12px] font-semibold uppercase tracking-wide-gold text-gold-muted">
            {eyebrow}
          </span>
          <h1 className="mt-4 font-display text-[clamp(34px,4vw,54px)] font-medium leading-[1.05] text-gold">
            {title}
          </h1>
          <GoldDivider align="left" className="mt-7" />
          <p className="mt-6 font-body text-[12.5px] uppercase tracking-wide-gold text-grey">
            Last updated: {updated}
          </p>

          <div className="prose-legal mt-12 space-y-8">{children}</div>
        </section>
      </main>
      <Footer />
    </>
  );
}
