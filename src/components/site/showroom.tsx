"use client";

import { SHOWROOM } from "@/content/media";
import { useVision } from "@/content/schema-ext";
import { Resolve } from "@/components/motion/resolve";

/**
 * Their two environments: the lit stone hall by day and the forecourt under
 * the sign at night. Both clips are their own, muted and looping — they carry
 * no audio worth keeping and autoplay is only permitted muted.
 */
export function Showroom() {
  const c = useVision();

  return (
    <section id="showroom" className="bg-ink px-5 py-24 text-stone sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[92rem]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Resolve className="lg:col-span-5">
            <h2 className="font-display text-display italic font-bold leading-[1.03] tracking-[-0.025em] text-stone">
              {c.showroom.heading}
            </h2>
            {c.showroom.body.map((p, i) => (
              <p key={i} className="mt-5 max-w-[46ch] text-lead leading-relaxed text-stone-3">
                {p}
              </p>
            ))}

            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-stone/20 pt-7">
              {c.about.stats?.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="tnum font-display text-[1.75rem] font-bold leading-none text-gold">
                    {s.value}
                  </dd>
                  <p className="mt-2 text-[0.74rem] leading-snug text-stone-4">{s.label}</p>
                </div>
              ))}
            </dl>
          </Resolve>

          <Resolve delay={0.1} className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <figure className="relative overflow-hidden rounded-xl">
                <video
                  src={SHOWROOM.hallVideo}
                  poster={SHOWROOM.hallPoster}
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="metadata"
                  className="aspect-[9/16] w-full object-cover"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-3 text-[0.74rem] text-stone-3">
                  {c.showroom.hallCaption}
                </figcaption>
              </figure>
              <figure className="relative overflow-hidden rounded-xl">
                <video
                  src={SHOWROOM.forecourtVideo}
                  poster={SHOWROOM.forecourtPoster}
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="metadata"
                  className="aspect-[9/16] w-full object-cover"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-3 text-[0.74rem] text-stone-3">
                  {c.showroom.forecourtCaption}
                </figcaption>
              </figure>
            </div>
          </Resolve>
        </div>
      </div>
    </section>
  );
}
