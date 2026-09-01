"use client";

import { useState } from "react";
import { PLAN_ROWS, MARQUES } from "@/content/media";
import { useVision } from "@/content/schema-ext";
import { Resolve } from "@/components/motion/resolve";

/**
 * Every published deposit/instalment pair, on one plate. Filtering is by
 * marque only — the figures themselves are never interpolated or sorted into
 * a ranking, because Vision Auto published them as discrete offers.
 */
export function Plans() {
  const c = useVision();
  const [marque, setMarque] = useState<string | null>(null);
  const rows = marque ? PLAN_ROWS.filter((r) => r.make === marque) : PLAN_ROWS;
  const present = MARQUES.filter((m) => PLAN_ROWS.some((r) => r.make === m));

  return (
    <section id="plans" className="stone-field bg-stone-2 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[92rem]">
        <Resolve>
          <h2 className="font-display text-display italic font-bold leading-[1.03] tracking-[-0.025em]">
            {c.plans.heading}
          </h2>
          <p className="mt-4 max-w-[62ch] text-lead leading-relaxed text-umber">
            {c.plans.intro}
          </p>
        </Resolve>

        <Resolve delay={0.08}>
          <div className="mt-8 flex flex-wrap gap-2">
            <button
              onClick={() => setMarque(null)}
              className={`rounded-full border px-4 py-1.5 text-[0.8rem] transition-colors ${
                marque === null
                  ? "border-ink bg-ink text-stone"
                  : "border-ink/20 text-ink-2 hover:border-ink/45"
              }`}
            >
              {c.marques.heading}
            </button>
            {present.map((m) => (
              <button
                key={m}
                onClick={() => setMarque(m === marque ? null : m)}
                className={`rounded-full border px-4 py-1.5 text-[0.8rem] transition-colors ${
                  marque === m
                    ? "border-ink bg-ink text-stone"
                    : "border-ink/20 text-ink-2 hover:border-ink/45"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </Resolve>

        <Resolve delay={0.12} className="mt-9">
          <div className="max-w-[68rem] overflow-x-auto">
            <table className="w-full min-w-[42rem] border-collapse text-start">
              <thead>
                <tr className="border-b border-ink/25">
                  <th className="py-3 pe-4 text-start text-[0.68rem] font-medium uppercase tracking-[0.16em] text-umber">
                    {c.plans.carLabel}
                  </th>
                  <th className="py-3 px-4 text-start text-[0.68rem] font-medium uppercase tracking-[0.16em] text-umber">
                    {c.plans.depositLabel}
                  </th>
                  <th className="py-3 ps-4 text-start text-[0.68rem] font-medium uppercase tracking-[0.16em] text-gold-deep">
                    {c.plans.monthlyLabel}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) =>
                  row.plans.map((p, i) => (
                    <tr
                      key={`${row.label}-${i}`}
                      className={`transition-colors hover:bg-stone/70 ${
                        i > 0
                          ? "border-b border-ink/10 bg-stone/35"
                          : row.plans.length > 1
                            ? ""
                            : "border-b border-ink/10"
                      }`}
                    >
                      <td className="py-3.5 pe-4 align-top">
                        {i === 0 ? (
                          <>
                            <span className="text-[0.7rem] uppercase tracking-[0.14em] text-gold-deep">
                              {row.make}
                            </span>
                            <span className="mt-0.5 block font-display text-[1.02rem] font-semibold text-ink">
                              {row.label}
                            </span>
                            <span className="tnum text-[0.8rem] text-umber">{row.year}</span>
                          </>
                        ) : (
                          <span className="ps-1 text-[0.78rem] italic text-umber">
                            {c.plans.orLabel}
                          </span>
                        )}
                      </td>
                      <td className="tnum px-4 py-3.5 align-middle font-display text-[1.06rem] font-semibold">
                        {p.deposit}
                        <span className="ms-1.5 text-[0.7rem] font-normal text-umber">
                          {c.plans.currency}
                        </span>
                      </td>
                      <td className="tnum ps-4 py-3.5 align-middle font-display text-[1.06rem] font-bold text-gold-deep">
                        {p.monthly}
                        <span className="ms-1.5 text-[0.7rem] font-normal text-umber">
                          {c.plans.perMonth}
                        </span>
                      </td>
                    </tr>
                  )),
                )}
              </tbody>
            </table>
          </div>

          <p className="mt-6 max-w-[70ch] text-[0.82rem] leading-relaxed text-umber">
            {c.plans.footnote}
          </p>
        </Resolve>
      </div>
    </section>
  );
}
