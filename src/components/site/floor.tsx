"use client";

import { useState } from "react";
import { CARS, type Car } from "@/content/media";
import { useVision } from "@/content/schema-ext";
import { Resolve } from "@/components/motion/resolve";

/** Deposit / instalment pair, set the way their own collateral sets it. */
function PlanPlate({ car }: { car: Car }) {
  const c = useVision();

  if (car.plans.length === 0) {
    return (
      <div className="plate rounded-lg px-4 py-3.5">
        <p className="text-[0.82rem] text-umber">{c.floor.noPlan}</p>
        <a
          href="tel:+201223828222"
          className="mt-1 inline-block text-[0.86rem] font-semibold text-gold-deep underline underline-offset-4"
        >
          {c.floor.noPlanCta}
        </a>
      </div>
    );
  }

  return (
    <div className="plate overflow-hidden rounded-lg">
      {car.plans.map((p, i) => (
        <div
          key={i}
          className="flex items-stretch divide-x divide-ink/10 border-b border-ink/10 last:border-b-0 rtl:divide-x-reverse"
        >
          <div className="flex-1 px-4 py-3">
            <p className="text-[0.66rem] uppercase tracking-[0.16em] text-umber">
              {c.plans.depositLabel}
            </p>
            <p className="tnum mt-1 font-display text-[1.32rem] font-bold leading-none text-ink">
              {p.deposit}
              <span className="ms-1.5 text-[0.7rem] font-medium text-umber">
                {c.plans.currency}
              </span>
            </p>
          </div>
          <div className="flex-1 bg-gold/12 px-4 py-3">
            <p className="text-[0.66rem] uppercase tracking-[0.16em] text-gold-deep">
              {c.plans.monthlyLabel}
            </p>
            <p className="tnum mt-1 font-display text-[1.32rem] font-bold leading-none text-ink">
              {p.monthly}
              <span className="ms-1.5 text-[0.7rem] font-medium text-umber">
                {c.plans.perMonth}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function CarRow({ car, index }: { car: Car; index: number }) {
  const c = useVision();
  // Four exteriors and two cabins is as many as the strip can show without the
  // thumbnails shrinking below a usable tap target.
  const frames = [...car.shots.slice(0, 4), ...car.cabin.slice(0, 2)];
  const [active, setActive] = useState(0);
  const flip = index % 2 === 1;
  const exteriorCount = Math.min(car.shots.length, 4);

  return (
    <Resolve className="border-t border-ink/12 py-12 first:border-t-0 sm:py-16">
      <div
        className={`grid items-center gap-8 lg:grid-cols-12 lg:gap-14 ${
          flip ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* Frame */}
        <div className="lg:col-span-7">
          <div className="relative aspect-[3/2] overflow-hidden rounded-xl bg-stone-3">
            {frames.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`${car.make} ${car.model} ${car.trim} ${car.year}`}
                loading={index === 0 && i === 0 ? "eager" : "lazy"}
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-[650ms] ease-[cubic-bezier(.2,.7,.2,1)] ${
                  i === active ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-md scale-[1.03]"
                }`}
              />
            ))}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {frames.map((src, i) => (
              <button
                key={src}
                onClick={() => setActive(i)}
                aria-label={`${i < exteriorCount ? c.floor.exteriorLabel : c.floor.cabinLabel} ${i + 1}`}
                aria-current={i === active}
                className={`h-11 w-16 overflow-hidden rounded-md border transition-all duration-300 ${
                  i === active
                    ? "border-gold-deep opacity-100"
                    : "border-ink/12 opacity-55 hover:opacity-90"
                }`}
              >
                <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Plate */}
        <div className="lg:col-span-5">
          <p className="text-[0.7rem] uppercase tracking-[0.24em] text-gold-deep">{car.make}</p>
          <h3 className="mt-2 font-display text-display italic font-bold leading-[1.02] tracking-[-0.02em]">
            {car.model}
          </h3>
          <p className="mt-2 text-[0.95rem] text-umber">
            {car.trim} · {car.year}
          </p>

          {c.floor.notes[car.id] && (
            <p className="mt-5 max-w-[44ch] text-[0.92rem] leading-relaxed text-ink-2">
              {c.floor.notes[car.id]}
            </p>
          )}

          <div className="mt-6">
            <PlanPlate car={car} />
          </div>

          {car.specs && (
            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
              {car.specs.map((s) => (
                <div key={s.label}>
                  <dt className="text-[0.66rem] uppercase tracking-[0.14em] text-umber">
                    {c.floor.specLabels[s.label] ?? s.label}
                  </dt>
                  <dd className="tnum mt-0.5 font-display text-[1.05rem] font-semibold">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {car.kit && (
            <>
              <p className="mt-7 text-[0.66rem] uppercase tracking-[0.16em] text-umber">
                {c.floor.kitLabel}
              </p>
              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {car.kit.map((k) => (
                  <li
                    key={k}
                    className="rounded-full border border-ink/14 px-2.5 py-1 text-[0.76rem] text-ink-2"
                  >
                    {c.floor.kit[k] ?? k}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </Resolve>
  );
}

export function Floor() {
  const c = useVision();

  return (
    <section id="floor" className="bg-stone px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[92rem]">
        <Resolve>
          <h2 className="font-display text-display italic font-bold leading-[1.03] tracking-[-0.025em]">
            {c.floor.heading}
          </h2>
          <p className="mt-4 max-w-[58ch] text-lead leading-relaxed text-umber">
            {c.floor.intro}
          </p>
        </Resolve>

        <div className="mt-10 sm:mt-14">
          {CARS.map((car, i) => (
            <CarRow key={car.id} car={car} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
