"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/i18n/locale-provider";
import { useVision } from "@/content/schema-ext";

/**
 * A slim rule across the top. The mark sits alone at the start, the links and
 * the language toggle at the end, and a gold hairline slides under whichever
 * link is hovered — an aperture indicator rather than a underline.
 */
export function Nav() {
  const c = useVision();
  const { locale, toggleLocale } = useLocale();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid
          ? "bg-stone/85 backdrop-blur-md border-b border-ink/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {!solid && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink/55 to-transparent" />
      )}
      <div className="relative mx-auto flex h-16 max-w-[92rem] items-center gap-6 px-5 sm:px-8">
        <a href="#top" className="flex shrink-0 items-center gap-2.5" aria-label={c.brand.name}>
          <img src={solid ? "/mark-ink.svg" : "/mark.svg"} alt="" className="h-6 w-auto" />
          <span
            className={`font-display text-[0.94rem] font-bold tracking-[0.02em] transition-colors duration-500 ${
              solid ? "text-ink" : "text-stone"
            }`}
          >
            <span className="italic">VISION</span>{" "}
            <span className={`italic ${solid ? "text-gold-deep" : "text-gold"}`}>AUTO</span>
          </span>
        </a>

        <nav className="ms-auto hidden items-center gap-1 md:flex">
          {c.nav.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`group relative px-3 py-2 text-[0.86rem] transition-colors duration-500 ${
                solid ? "text-umber hover:text-ink" : "text-stone-3 hover:text-stone"
              }`}
            >
              {l.label}
              <span
                className={`absolute inset-x-3 bottom-1 h-px origin-center scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                  solid ? "bg-gold-deep" : "bg-gold"
                }`}
              />
            </a>
          ))}
        </nav>

        <button
          onClick={toggleLocale}
          className={`ms-auto shrink-0 rounded-full border px-3.5 py-1.5 text-[0.76rem] font-medium tracking-[0.06em] transition-colors duration-500 md:ms-2 ${
            solid
              ? "border-ink/20 text-ink hover:border-ink/45 hover:bg-ink hover:text-stone"
              : "border-stone/35 text-stone hover:bg-stone hover:text-ink"
          }`}
          aria-label={c.a11y.toggleLanguage}
        >
          {locale === "ar" ? "EN" : "ع"}
        </button>

        <button
          onClick={() => setOpen((v) => !v)}
          className={`rounded-full border p-2 transition-colors duration-500 md:hidden ${
            solid ? "border-ink/20" : "border-stone/35"
          }`}
          aria-expanded={open}
          aria-label={open ? c.a11y.closeMenu : c.a11y.openMenu}
        >
          <span className={`block h-px w-4 ${solid ? "bg-ink" : "bg-stone"}`} />
          <span className={`mt-1 block h-px w-4 ${solid ? "bg-ink" : "bg-stone"}`} />
        </button>
      </div>

      {open && (
        <nav className="border-t border-ink/10 bg-stone/95 px-5 pb-4 backdrop-blur-md md:hidden">
          {c.nav.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-ink/8 py-3 text-[0.95rem] text-ink last:border-0"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
