"use client";

import dynamic from "next/dynamic";
import { useVision } from "@/content/schema-ext";
import { HERO_SHOT } from "@/content/media";

// The lens pulls in three.js; keep it out of the first payload.
const LensStage = dynamic(
  () => import("@/components/three/lens-stage").then((m) => m.LensStage),
  { ssr: false },
);

export function Hero() {
  const c = useVision();

  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden bg-ink">
      <LensStage src={HERO_SHOT} alt={c.lens.alt} />

      {/* Weighted to the bottom third, where the copy actually sits. A scrim
          across the whole frame buries the photograph the lens exists to
          show. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/35 via-45% to-transparent" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[92rem] flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-20">
        <p
          className="mb-5 text-[0.74rem] font-medium uppercase tracking-[0.34em] text-gold"
          style={{ animation: "resolve 900ms 120ms both cubic-bezier(.2,.7,.2,1)" }}
        >
          {c.hero.eyebrow}
        </p>

        <h1
          className="font-display text-hero italic font-bold leading-[0.94] tracking-[-0.025em] text-stone max-w-[19ch]"
          style={{ animation: "resolve 1100ms 200ms both cubic-bezier(.2,.7,.2,1)" }}
        >
          {c.hero.headline}
        </h1>

        <p
          className="mt-6 max-w-[52ch] text-lead leading-relaxed text-stone-3"
          style={{ animation: "resolve 1000ms 420ms both cubic-bezier(.2,.7,.2,1)" }}
        >
          {c.hero.sub}
        </p>

        <div
          className="mt-9 flex flex-wrap items-center gap-3"
          style={{ animation: "resolve 900ms 620ms both cubic-bezier(.2,.7,.2,1)" }}
        >
          <a
            href="#floor"
            className="rounded-full bg-gold px-6 py-3 text-[0.88rem] font-semibold text-ink transition-transform duration-300 hover:scale-[1.03]"
          >
            {c.hero.primaryCta}
          </a>
          <a
            href="tel:+201223828222"
            className="rounded-full border border-stone/35 px-6 py-3 text-[0.88rem] font-medium text-stone transition-colors duration-300 hover:bg-stone hover:text-ink"
          >
            {c.hero.secondaryCta}
          </a>
        </div>

        <p className="mt-10 flex items-center gap-2.5 text-[0.72rem] tracking-[0.14em] text-stone-4 uppercase">
          <span className="inline-block h-2 w-2 rounded-full border border-gold/70" />
          {c.lens.hint}
        </p>
      </div>
    </section>
  );
}
