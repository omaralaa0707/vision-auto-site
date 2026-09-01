/**
 * Every figure below is transcribed verbatim from Vision Auto's own Instagram
 * captions (@vision_auto.eg). Nothing is interpolated: where they published two
 * payment plans for a car, both appear; where they published none, the card
 * says so rather than inventing one.
 *
 * Photographs are named for the model in the post they came from, so a frame
 * can never drift onto a card for a different car.
 */

export type Plan = {
  /** Down payment, in EGP, exactly as posted. */
  deposit: string;
  /** Monthly instalment, in EGP, exactly as posted. */
  monthly: string;
};

export type Car = {
  id: string;
  make: string;
  model: string;
  /** Trim as they write it. */
  trim: string;
  year: string;
  /** Exterior frames, all from that model's own post. */
  shots: string[];
  /** Cabin frames from the same post, where they shot one. */
  cabin: string[];
  /** Both published plans, high-instalment first, as they list them. */
  plans: Plan[];
  /** Headline figures only where they published them. */
  specs?: { label: string; value: string }[];
  /** Equipment lines, in their order. */
  kit?: string[];
};

export const CARS: Car[] = [
  {
    id: "tiggo8",
    make: "Chery",
    model: "Tiggo 8 Pro Max",
    trim: "Flagship",
    year: "2027",
    shots: [
      "/media/tiggo8-ext-01.jpg",
      "/media/tiggo8-ext-02.jpg",
      "/media/tiggo8-ext-03.jpg",
      "/media/tiggo8-ext-04.jpg",
      "/media/tiggo8-ext-05.jpg",
      "/media/tiggo8-ext-06.jpg",
    ],
    cabin: ["/media/tiggo8-cab-01.jpg", "/media/tiggo8-cab-02.jpg"],
    plans: [{ deposit: "516,000", monthly: "28,400" }],
    specs: [
      { label: "Engine", value: "1.6T" },
      { label: "Power", value: "197 hp" },
      { label: "Torque", value: "290 Nm" },
      { label: "Seats", value: "7" },
    ],
    kit: [
      "10 airbags",
      "360° camera",
      "Sony audio",
      "Head-up display",
      "Full panoramic roof",
      "Ambient lighting",
      "Wireless charger",
      "Built-in cooler box",
      "Lane keep assist",
      "Blind spot detection",
      "Autonomous emergency braking",
      '19" two-tone alloys',
    ],
  },
  {
    id: "tucson",
    make: "Hyundai",
    model: "Tucson",
    trim: "Shadow",
    year: "2027",
    shots: ["/media/tucson-ext-01.jpg", "/media/tucson-ext-02.jpg", "/media/tucson-ext-03.jpg"],
    cabin: [],
    // They published plans for the Tucson P1, not for this Shadow trim, so this
    // card carries no figure. The P1 plans appear on the plans plate instead.
    plans: [],
  },
  {
    id: "cs55plus",
    make: "Changan",
    model: "CS55 Plus",
    trim: "Premium",
    year: "2027",
    shots: [
      "/media/cs55-ext-01.jpg",
      "/media/cs55-ext-02.jpg",
      "/media/cs55-ext-03.jpg",
      "/media/cs55-ext-04.jpg",
      "/media/cs55-ext-05.jpg",
    ],
    cabin: ["/media/cs55-cab-01.jpg"],
    plans: [
      { deposit: "339,000", monthly: "18,640" },
      { deposit: "565,000", monthly: "12,380" },
    ],
  },
  {
    id: "eado",
    make: "Changan",
    model: "Eado Plus",
    trim: "Premium",
    year: "2026",
    shots: [
      "/media/eado-ext-01.jpg",
      "/media/eado-ext-02.jpg",
      "/media/eado-ext-03.jpg",
      "/media/eado-ext-04.jpg",
    ],
    cabin: ["/media/eado-cab-01.jpg", "/media/eado-cab-02.jpg"],
    plans: [{ deposit: "330,000", monthly: "18,800" }],
  },
  {
    id: "arrizo6",
    make: "Chery",
    model: "Arrizo 6 GT",
    trim: "Comfort",
    year: "2026",
    shots: [
      "/media/arrizo6-ext-01.jpg",
      "/media/arrizo6-ext-02.jpg",
      "/media/arrizo6-ext-03.jpg",
      "/media/arrizo6-ext-04.jpg",
      "/media/arrizo6-ext-05.jpg",
    ],
    cabin: ["/media/arrizo6-cab-01.jpg"],
    plans: [{ deposit: "273,000", monthly: "15,000" }],
  },
  {
    id: "havalh6",
    make: "Haval",
    model: "H6",
    trim: "Ultra",
    year: "2026",
    shots: [
      "/media/havalh6-ext-01.jpg",
      "/media/havalh6-ext-02.jpg",
      "/media/havalh6-ext-03.jpg",
      "/media/havalh6-ext-04.jpg",
      "/media/havalh6-ext-05.jpg",
      "/media/havalh6-ext-06.jpg",
      "/media/havalh6-ext-07.jpg",
      "/media/havalh6-ext-08.jpg",
    ],
    cabin: ["/media/havalh6-cab-01.jpg", "/media/havalh6-cab-02.jpg"],
    plans: [],
  },
];

/**
 * The full plans plate: every deposit/instalment pair they have published,
 * grouped by car and labelled with the trim they attached to it. Two rows mean
 * they posted two ways to buy the same car.
 */
export type PlanRow = {
  make: string;
  /** Model plus the trim exactly as they label it in the post. */
  label: string;
  year: string;
  plans: Plan[];
};

export const PLAN_ROWS: PlanRow[] = [
  { make: "Hyundai", label: "Tucson P1", year: "2027", plans: [
    { deposit: "555,000", monthly: "30,520" },
    { deposit: "925,000", monthly: "20,260" },
  ] },
  { make: "Hyundai", label: "Elantra AD Topline", year: "2027", plans: [
    { deposit: "375,000", monthly: "20,620" },
    { deposit: "625,000", monthly: "13,690" },
  ] },
  { make: "Chery", label: "Tiggo 8 Pro Max Flagship", year: "2027", plans: [
    { deposit: "516,000", monthly: "28,400" },
  ] },
  { make: "Chery", label: "Tiggo 7 Pro Max", year: "2027", plans: [
    { deposit: "417,000", monthly: "22,935" },
    { deposit: "695,000", monthly: "15,224" },
  ] },
  { make: "Chery", label: "Tiggo 7 Luxury", year: "2026", plans: [
    { deposit: "321,000", monthly: "17,700" },
  ] },
  { make: "Chery", label: "Tiggo 4 Comfort", year: "2026", plans: [
    { deposit: "270,000", monthly: "14,900" },
  ] },
  { make: "Chery", label: "Arrizo 6 Comfort", year: "2026", plans: [
    { deposit: "273,000", monthly: "15,000" },
  ] },
  { make: "Chery", label: "Arrizo 5 Highline (auto)", year: "2027", plans: [
    { deposit: "250,000", monthly: "13,800" },
  ] },
  { make: "Chery", label: "Arrizo 5 (manual)", year: "2027", plans: [
    { deposit: "225,000", monthly: "12,400" },
  ] },
  { make: "Changan", label: "CS55 Plus", year: "2027", plans: [
    { deposit: "339,000", monthly: "18,640" },
    { deposit: "565,000", monthly: "12,380" },
  ] },
  { make: "Changan", label: "CS55", year: "2027", plans: [
    { deposit: "378,000", monthly: "20,800" },
  ] },
  { make: "Changan", label: "Eado Plus P1", year: "2026", plans: [
    { deposit: "313,500", monthly: "17,250" },
    { deposit: "522,500", monthly: "11,450" },
  ] },
  { make: "Changan", label: "Eado Plus Premium", year: "2026", plans: [
    { deposit: "330,000", monthly: "18,800" },
  ] },
  { make: "Haval", label: "Jolion P2", year: "2026", plans: [
    { deposit: "318,000", monthly: "17,490" },
    { deposit: "530,000", monthly: "11,610" },
  ] },
  { make: "Haval", label: "Jolion", year: "2026", plans: [
    { deposit: "363,000", monthly: "19,970" },
    { deposit: "605,000", monthly: "13,260" },
  ] },
  { make: "Nissan", label: "Sunny (first grade)", year: "2027", plans: [
    { deposit: "226,000", monthly: "12,500" },
  ] },
  { make: "Fiat", label: "500X", year: "2026", plans: [
    { deposit: "324,000", monthly: "17,900" },
  ] },
];

/** Marques named across their captions. */
export const MARQUES = ["Hyundai", "Chery", "Changan", "Haval", "Nissan", "Fiat"];

/** The frame the hero lens resolves. */
export const HERO_SHOT = "/media/havalh6-ext-01.jpg";

export const SHOWROOM = {
  hallVideo: "/media/video/hall-detail.mp4",
  hallPoster: "/media/video/hall-detail-poster.jpg",
  forecourtVideo: "/media/video/forecourt.mp4",
  forecourtPoster: "/media/video/forecourt-poster.jpg",
  wall: "/media/tiggo8-ext-01.jpg",
};
