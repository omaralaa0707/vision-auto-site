import type { SiteContent } from "@/i18n/schema";
import { useContent } from "@/i18n/locale-provider";

/**
 * Vision Auto's signature sections are an optical hero and a plans plate, so
 * they need strings the shared schema doesn't carry. Extending here keeps the
 * shared schema untouched while staying fully typed.
 */
export type VisionContent = SiteContent & {
  lens: {
    /** Instruction under the hero, telling the visitor to move the lens. */
    hint: string;
    /** Screen-reader description of what the canvas shows. */
    alt: string;
  };
  floor: {
    heading: string;
    intro: string;
    /** "Cabin" tab label on a car card. */
    cabinLabel: string;
    exteriorLabel: string;
    /** Shown where they never published a plan for that trim. */
    noPlan: string;
    noPlanCta: string;
    specsLabel: string;
    kitLabel: string;
    /** Per-car spec labels, keyed by the English label in media.ts. */
    specLabels: Record<string, string>;
    /** Equipment lines, keyed by the English line in media.ts. */
    kit: Record<string, string>;
    /** One factual line per car, keyed by car id, to carry the text column. */
    notes: Record<string, string>;
  };
  plans: {
    heading: string;
    intro: string;
    depositLabel: string;
    monthlyLabel: string;
    currency: string;
    perMonth: string;
    /** Note that both columns are their own published figures. */
    footnote: string;
    /** Column header for the car. */
    carLabel: string;
    /** Marks the second published way to buy the same car. */
    orLabel: string;
  };
  showroom: {
    heading: string;
    body: string[];
    hallCaption: string;
    forecourtCaption: string;
  };
  marques: {
    heading: string;
  };
};

export function useVision() {
  return useContent() as VisionContent;
}
