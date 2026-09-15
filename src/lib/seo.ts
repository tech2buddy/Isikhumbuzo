import type { Metadata } from "next";

export const SITE_URL = "https://www.isikhumbulo.co.za";
export const SITE_NAME = "Isikhumbulo Memorial";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_ZA",
      url: `${SITE_URL}${path}`,
      title,
      description,
      images: [{ url: "/images/heartfelt-memorial-2.png", alt: "Isikhumbulo Memorial tombstone" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/images/heartfelt-memorial-2.png"] },
  };
}

export const businessStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      alternateName: ["Isikhumbulo", "IsikhumbuloMemorial"],
      inLanguage: "en-ZA",
      publisher: { "@id": `${SITE_URL}/#business` },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: SITE_NAME,
      alternateName: ["Isikhumbulo", "IsikhumbuloMemorial"],
      url: `${SITE_URL}/`,
      description: "Tombstones and memorials in Crystal Park, Benoni, South Africa.",
      image: `${SITE_URL}/images/heartfelt-memorial-2.png`,
      logo: `${SITE_URL}/logo.png`,
      telephone: "+27760990333",
      email: "isikhumbulomemorial@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "37 Hoopoe Street, Crystal Park",
        addressLocality: "Benoni",
        addressRegion: "Gauteng",
        postalCode: "1520",
        addressCountry: "ZA",
      },
      sameAs: [
        "https://www.facebook.com/share/1DHdrPcL7u/?mibextid=wwXIfr",
        "https://share.google/2WFNrU0Wueo6tCSlr",
      ],
    },
  ],
};
