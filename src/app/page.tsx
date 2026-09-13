import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import MemorialGallery from "@/components/MemorialGallery";
import Craftsmanship from "@/components/Craftsmanship";
import Tribute from "@/components/Tribute";
import Consultation from "@/components/Consultation";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import IntroTransition from "@/components/IntroTransition";

function SeamMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" className="drop-shadow-[0_0_4px_rgba(200,155,60,0.7)]">
      <rect
        x="1"
        y="1"
        width="12"
        height="12"
        fill="#090909"
        stroke="#C89B3C"
        strokeWidth="1.2"
        transform="rotate(45 7 7)"
      />
    </svg>
  );
}

/**
 * A gold seam laid directly over a section boundary rather than as its own
 * document-flow sliver — a 1px flow element can get swallowed by sub-pixel
 * rounding on one side of a flex boundary (renders solid on one background,
 * vanishes on the other). Overlaying it guarantees it always paints.
 */
function HorizontalSeam() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 z-30"
      style={{ top: 0, transform: "translateY(-50%)" }}
    >
      <div className="h-[2px] w-full bg-gold shadow-[0_0_10px_rgba(200,155,60,0.8)]" />
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <SeamMark />
      </div>
    </div>
  );
}

function VerticalSeam() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-0 z-30 hidden h-full lg:block"
      style={{ left: "36%", transform: "translateX(-50%)" }}
    >
      <div className="h-full w-[2px] bg-gold shadow-[0_0_10px_rgba(200,155,60,0.8)]" />
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <SeamMark />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <IntroTransition />
      <CustomCursor />
      <Navbar />
      <main className="flex-1">
        <Hero />

        <section id="about" className="relative flex w-full flex-col lg:flex-row">
          {/* seam where the cinematic hero meets the ivory panel */}
          <HorizontalSeam />

          <About />

          {/* seam where the ivory and dark panels meet — stacked layout only */}
          <div className="relative lg:hidden">
            <HorizontalSeam />
          </div>

          <MemorialGallery />

          {/* seam where the ivory and dark panels meet — side-by-side layout only */}
          <VerticalSeam />
        </section>
        <Craftsmanship />
        <Tribute />
        <Consultation />
      </main>
      <Footer />
    </>
  );
}
