export default function Footer() {
  return (
    <footer className="w-full border-t border-gold/25 bg-black-main">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-4 px-[clamp(20px,6vw,110px)] py-8 text-center lg:flex-row lg:justify-between lg:text-left">
        <p className="font-body text-[12px] font-light text-grey">
          © 2026 Isikhumbulo Memorial. All Rights Reserved.
        </p>
        <p className="font-body text-[11px] font-medium uppercase tracking-[0.22em] text-gold">
          Honouring Every Life. Preserving Every Memory.
        </p>
        <div className="flex items-center gap-6 font-body text-[11px] uppercase tracking-wide-gold text-grey">
          <a href="/privacy-policy" className="transition-colors hover:text-gold-light">
            Privacy Policy
          </a>
          <a href="/terms-of-service" className="transition-colors hover:text-gold-light">
            Terms of Service
          </a>
          <a href="/site-map" className="transition-colors hover:text-gold-light">
            Site Map
          </a>
        </div>
      </div>
    </footer>
  );
}
