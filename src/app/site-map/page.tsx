import { pageMetadata } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import LegalPage from "@/components/LegalPage";

export const metadata = pageMetadata(
  "Site Map | Isikhumbulo Memorial",
  "A full overview of every section and page on the Isikhumbulo Memorial website.",
  "/site-map",
);

const GROUPS = [
  {
    title: "Homepage Sections",
    links: [
      { label: "Home", href: "/#home" },
      { label: "About Us", href: "/#about" },
      { label: "Memorial Gallery", href: "/#gallery" },
      { label: "Tombstone Catalog", href: "/catalog" },
      { label: "Craftsmanship", href: "/#craftsmanship" },
      { label: "Tributes", href: "/#tribute" },
      { label: "Book a Consultation", href: "/#contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
      { label: "Site Map", href: "/site-map" },
    ],
  },
];

export default function SiteMapPage() {
  return (
    <LegalPage eyebrow="Navigate" title="Site Map" updated="19 August 2026">
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
        {GROUPS.map((group) => (
          <div key={group.title}>
            <h2 className="font-display text-[22px] font-medium text-ivory">
              {group.title}
            </h2>
            <ul className="mt-5 space-y-3">
              {group.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 font-body text-[14px] uppercase tracking-wide-gold text-grey transition-colors hover:text-gold-light"
                  >
                    {link.label}
                    <ArrowRight
                      size={13}
                      strokeWidth={1.5}
                      className="text-gold transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </LegalPage>
  );
}
