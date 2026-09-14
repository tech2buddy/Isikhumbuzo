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
        <div className="flex flex-wrap items-center justify-center gap-5 font-body text-[11px] uppercase tracking-wide-gold text-grey">
          <div className="flex items-center gap-4 border-r border-gold/25 pr-5">
            <a href="https://wa.me/27760990333" target="_blank" rel="noreferrer" aria-label="Chat with Isikhumbulo Memorial on WhatsApp" className="text-grey transition-colors hover:text-gold-light">
              <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3.5 20l1.1-4.2A8.5 8.5 0 1 1 20.5 11.5Z" /><path d="M8.2 8.1c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4-.1.6l-.5.6c.6 1.1 1.5 1.9 2.6 2.5l.6-.5c.2-.2.4-.2.6-.1l1.7.7c.3.1.4.3.4.5v.5c0 .3-.1.5-.4.7-.4.3-1 .4-1.5.3-2.8-.6-5.8-3.5-6.5-6.3-.2-.6 0-1.2.3-1.7Z" /></svg>
            </a>
            <a href="https://www.facebook.com/share/1DHdrPcL7u/?mibextid=wwXIfr" target="_blank" rel="noreferrer" aria-label="Visit Isikhumbulo Memorial on Facebook" className="text-grey transition-colors hover:text-gold-light">
              <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true"><path d="M14.2 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.3H8.4V13h2.7v8h3.1Z" /></svg>
            </a>
          </div>
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
