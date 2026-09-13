import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Catalog from "./Catalog";
import styles from "./catalog.module.css";

export const metadata: Metadata = {
  title: "Tombstone Catalog | Isikhumbulo Memorial",
  description: "Explore memorial designs by reference code and enquire about a personal tribute for your loved one.",
};

export default function CatalogPage() {
  return (
    <>
      <Navbar />
      <main className={`flex-1 ${styles.catalog}`}>
        <section className={`${styles.hero} mx-auto max-w-7xl px-6 pb-14 pt-32 sm:px-10 sm:pt-40`}>
          <Link href="/#gallery" className="text-xs text-grey underline-offset-4 hover:text-gold hover:underline">← Back to memorials</Link>
          <div className={`${styles.intro} mt-10 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end`}>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-gold">The memorial collection</p>
              <h1 className={`${styles.title} mt-4 font-display text-5xl leading-[1.05] sm:text-7xl`}>A tribute as unique<br /> as <span className="italic text-gold-light">their memory.</span></h1>
            </div>
            <p className={`${styles.description} max-w-md text-sm leading-7 text-grey`}>Explore our tombstone styles, find a design that speaks to you, and tell us what you have in mind. Each reference code makes it easy to start a personal conversation.</p>
          </div>
        </section>
        <Catalog />
      </main>
      <Footer />
    </>
  );
}

