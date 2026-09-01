import type { Metadata } from "next";
import { Familjen_Grotesk, Instrument_Sans, Alexandria } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/i18n/locale-provider";
import { ScrollProvider } from "@/components/motion/scroll-provider";
import { ar } from "@/content/ar";
import { en } from "@/content/en";

// Familjen Grotesk carries a true italic, which is what lets the display type
// echo the oblique of Vision Auto's own wordmark.
const familjen = Familjen_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-familjen",
});
const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-instrument",
});
const alexandria = Alexandria({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-alexandria",
});

export const metadata: Metadata = {
  title: "Vision Auto — Maadi, Cairo",
  description:
    "Your vision, our drive. Brand-new 2026 and 2027 Hyundai, Chery, Changan, Haval, Nissan and Fiat in Maadi — with Vision Auto's own published instalment plans.",
  metadataBase: new URL("https://vision-auto-site.vercel.app"),
  icons: { icon: "/mark.svg" },
  openGraph: {
    title: "Vision Auto",
    description: "Your vision, our drive — Maadi, Cairo.",
    images: ["/media/havalh6-ext-01.jpg"],
    locale: "ar_EG",
    type: "website",
  },
  other: { "theme-color": "#efe8dc" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // translate="no": the site ships its own AR/EN copy, so browser
    // auto-translation would only garble hand-written bilingual text.
    <html
      lang="ar"
      dir="rtl"
      translate="no"
      className={`notranslate ${familjen.variable} ${instrument.variable} ${alexandria.variable}`}
    >
      <body className="bg-stone text-ink antialiased">
        <LocaleProvider dictionaries={{ ar, en }} defaultLocale="ar">
          <ScrollProvider />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
