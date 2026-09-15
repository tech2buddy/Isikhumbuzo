import type { Metadata } from "next";
import { Cormorant_Garamond, Cinzel, Montserrat } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/seo";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const cinzel = Cinzel({
  variable: "--font-crest",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const montserrat = Montserrat({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  robots: { index: true, follow: true, "max-image-preview": "large" },
  title: "Isikhumbulo Memorial | Honouring Every Life, Preserving Every Memory",
  description:
    "Isikhumbulo Memorial creates timeless, handcrafted tombstones and memorials. Explore our craftsmanship, memorial gallery and book a private consultation.",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Isikhumbulo Memorial",
    title: "Isikhumbulo Memorial | Honouring Every Life, Preserving Every Memory",
    description: "Handcrafted tombstones and memorials created with care in South Africa.",
    images: [{ url: "/images/heartfelt-memorial-2.png", width: 1024, height: 768, alt: "Isikhumbulo Memorial tombstone" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Isikhumbulo Memorial",
    description: "Handcrafted tombstones and memorials created with care in South Africa.",
    images: ["/images/heartfelt-memorial-2.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${cinzel.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black-main text-ivory font-body">
        {children}
      </body>
    </html>
  );
}
