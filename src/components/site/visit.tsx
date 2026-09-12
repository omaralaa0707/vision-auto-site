"use client";

import { useVision } from "@/content/schema-ext";
import { useLocale } from "@/i18n/locale-provider";
import { Resolve } from "@/components/motion/resolve";
import { MARQUES } from "@/content/media";

/** Dial strings must stay Latin even when the label is rendered in Arabic. */
const DIAL = ["+201223828222", "+201044227744"];

export function Visit() {
  const c = useVision();
  const { locale } = useLocale();

  return (
    <>
      {/* How buying here works */}
      <section className="bg-stone px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-[92rem]">
          <Resolve>
            <h2 className="font-display text-display italic font-bold leading-[1.03] tracking-[-0.025em]">
              {c.services.heading}
            </h2>
            <p className="mt-4 max-w-[54ch] text-lead text-umber">{c.services.intro}</p>
          </Resolve>

          <div className="mt-12 grid gap-px overflow-hidden rounded-xl bg-ink/12 sm:grid-cols-2 lg:grid-cols-4">
            {c.services.items.map((s, i) => (
              <Resolve key={s.title} delay={i * 0.06} className="bg-stone p-7">
                <span className="tnum font-display text-[0.78rem] font-bold text-gold-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-[1.14rem] font-semibold leading-snug">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-[0.9rem] leading-relaxed text-umber">{s.body}</p>
              </Resolve>
            ))}
          </div>

          <Resolve delay={0.1} className="mt-16">
            <h3 className="text-[0.7rem] uppercase tracking-[0.24em] text-umber">
              {c.marques.heading}
            </h3>
            <div className="mt-5 flex flex-wrap items-center gap-x-9 gap-y-4">
              {MARQUES.map((m) => (
                <span
                  key={m}
                  className="font-display text-[1.45rem] font-semibold italic tracking-[-0.01em] text-ink/45 transition-colors duration-300 hover:text-ink"
                >
                  {m}
                </span>
              ))}
            </div>
          </Resolve>
        </div>
      </section>

      {/* Visit */}
      <section id="visit" className="stone-field bg-stone-2 px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto grid max-w-[92rem] gap-12 lg:grid-cols-12 lg:gap-16">
          <Resolve className="lg:col-span-6">
            <h2 className="font-display text-display italic font-bold leading-[1.03] tracking-[-0.025em]">
              {c.contact.heading}
            </h2>
            <p className="mt-4 max-w-[46ch] text-lead leading-relaxed text-umber">
              {c.contact.intro}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={`tel:${DIAL[0]}`}
                className="rounded-full bg-ink px-6 py-3 text-[0.88rem] font-semibold text-stone transition-transform duration-300 hover:scale-[1.03]"
              >
                {c.contact.cta}
              </a>
              <a
                href={`https://wa.me/${DIAL[1].replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-ink/25 px-6 py-3 text-[0.88rem] font-medium transition-colors duration-300 hover:bg-ink hover:text-stone"
              >
                WhatsApp
              </a>
            </div>
          </Resolve>

          <Resolve delay={0.08} className="lg:col-span-6">
            <dl className="divide-y divide-ink/12 border-y border-ink/12">
              <div className="flex items-baseline gap-6 py-4">
                <dt className="w-32 shrink-0 text-[0.7rem] uppercase tracking-[0.16em] text-umber">
                  {c.contact.addressLabel}
                </dt>
                <dd className="font-display text-[1.05rem] font-semibold">{c.contact.address}</dd>
              </div>
              <div className="flex items-baseline gap-6 py-4">
                <dt className="w-32 shrink-0 text-[0.7rem] uppercase tracking-[0.16em] text-umber">
                  {c.contact.phoneLabel}
                </dt>
                <dd className="flex flex-col gap-1">
                  {c.contact.phones.map((p, i) => (
                    <a
                      key={p}
                      href={`tel:${DIAL[i]}`}
                      dir="ltr"
                      className="tnum font-display text-[1.05rem] font-semibold underline-offset-4 hover:underline"
                      style={{ textAlign: locale === "ar" ? "right" : "left" }}
                    >
                      {p}
                    </a>
                  ))}
                </dd>
              </div>
              <div className="flex items-baseline gap-6 py-4">
                <dt className="w-32 shrink-0 text-[0.7rem] uppercase tracking-[0.16em] text-umber">
                  {c.contact.hoursLabel}
                </dt>
                <dd className="text-[0.95rem] text-ink-2">{c.contact.hours}</dd>
              </div>
            </dl>

            <div className="mt-6 flex flex-wrap gap-4 text-[0.86rem]">
              <a
                href={c.contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-deep underline underline-offset-4"
              >
                Google Maps
              </a>
              <a
                href={c.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-deep underline underline-offset-4"
              >
                Instagram
              </a>
              <a
                href={c.contact.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-deep underline underline-offset-4"
              >
                Facebook
              </a>
            </div>
          </Resolve>
        </div>
      </section>
    </>
  );
}

export function Footer() {
  const c = useVision();
  return (
    <footer className="bg-ink px-5 py-12 text-stone-4 sm:px-8">
      <div className="mx-auto flex max-w-[92rem] flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-2.5">
          <img src="/mark.svg" alt="" className="h-6 w-auto" />
          <span className="font-display text-[0.9rem] font-bold text-stone">
            <span className="italic">VISION</span> <span className="italic text-gold">AUTO</span>
          </span>
        </div>
        <div className="max-w-[62ch] text-[0.76rem] leading-relaxed">
          <p className="mt-1.5 text-stone-4/70">{c.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
