import type { Metadata } from "next";
import { Cormorant_Garamond, Cinzel, Montserrat } from "next/font/google";
import "./globals.css";

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
  title: "Isikhumbulo Memorial | Honouring Every Life, Preserving Every Memory",
  description:
    "Isikhumbulo Memorial creates timeless, handcrafted tombstones and memorials. Explore our craftsmanship, memorial gallery and book a private consultation.",
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
