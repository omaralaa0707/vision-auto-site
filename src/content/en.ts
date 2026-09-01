import type { VisionContent } from "./schema-ext";

/**
 * English copy. Claims are drawn from Vision Auto's own captions: immediate
 * delivery, flexible instalments up to seven years, paperwork cleared quickly,
 * 2026–2027 stock, Maadi branch.
 */
export const en: VisionContent = {
  locale: "en",
  dir: "ltr",
  brand: {
    name: "Vision Auto",
    shortName: "VA",
    tagline: "Your vision, our drive",
  },
  nav: [
    { label: "The floor", href: "#floor" },
    { label: "Plans", href: "#plans" },
    { label: "Showroom", href: "#showroom" },
    { label: "Visit", href: "#visit" },
  ],
  hero: {
    eyebrow: "Maadi, Cairo",
    headline: "Your vision, our drive",
    sub: "Brand-new 2026 and 2027 cars, on the floor and ready to hand over — with a payment plan built around what you can carry each month.",
    primaryCta: "See the floor",
    secondaryCta: "Call 012 2382 8222",
  },
  about: {
    heading: "Bring it into focus",
    body: [
      "Vision Auto keeps a single lit hall in Maadi and fills it with cars that have not been driven. Hyundai, Chery, Changan, Haval, Nissan and Fiat stand along the same stone wall, so you compare them in one light instead of across six showrooms.",
      "The part most people come for is the plan. Every car on this page carries the deposit and the monthly instalment exactly as Vision Auto published it — most in two versions, so you can pay more now and less each month, or the other way round.",
    ],
    stats: [
      { value: "6", label: "Marques on the floor" },
      { value: "7 yrs", label: "Longest published term" },
      { value: "2027", label: "Newest model year in stock" },
    ],
  },
  services: {
    heading: "How buying here works",
    intro: "Four things they repeat in almost every post.",
    items: [
      {
        title: "Instalments that fit",
        body: "Flexible plans with terms published up to seven years, and more than one way to split the same car between deposit and monthly.",
      },
      {
        title: "Immediate handover",
        body: "Cars are on the floor, not on order. Stock is quoted for immediate delivery with the fewest steps they can manage.",
      },
      {
        title: "Paperwork cleared",
        body: "Registration and documents handled end to end, in the shortest time they can turn it round.",
      },
      {
        title: "2026 and 2027 stock",
        body: "New model years brought in early — several of the cars here reached the Egyptian market through this floor first.",
      },
    ],
  },
  gallery: {
    heading: "In the hall",
    intro: "Every frame below was shot by Vision Auto against their own stone wall.",
    items: [],
  },
  contact: {
    heading: "Come and look",
    intro: "The hall is in Maadi. Call ahead and they will have the car you asked about pulled out under the lights.",
    addressLabel: "Branch",
    address: "Maadi, Cairo",
    phoneLabel: "Phone & WhatsApp",
    phones: ["012 2382 8222", "010 4422 7744"],
    hoursLabel: "Best time to call",
    hours: "Daily, showroom hours",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Vision+Auto+Maadi+Cairo",
    instagramUrl: "https://www.instagram.com/vision_auto.eg/",
    facebookUrl: "https://www.facebook.com/profile.php?id=61572401109702",
    cta: "Call now",
  },
  footer: {
    disclaimer:
      "Concept design — an independent demonstration, not an official Vision Auto website. Photography and published figures belong to Vision Auto.",
    rights: "Vision Auto, Maadi — Cairo",
  },
  a11y: {
    toggleLanguage: "التبديل إلى العربية",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  lens: {
    hint: "Move the lens — drag anywhere",
    alt: "A Haval H6 standing against the lit stone wall of Vision Auto's showroom in Maadi.",
  },
  floor: {
    heading: "The floor",
    intro:
      "Six cars, photographed where they stand. The figures under each one are Vision Auto's own published plans — nothing here is estimated.",
    cabinLabel: "Cabin",
    exteriorLabel: "Exterior",
    noPlan: "No plan published for this trim",
    noPlanCta: "Ask for the price",
    specsLabel: "Figures",
    kitLabel: "Equipment",
    notes: {
      tiggo8:
        "The biggest car they carry, and the one they write most about: seven seats, ten airbags and a Sony system, listed as the top Flagship grade.",
      tucson:
        "The Shadow trim, posted brand new from the floor. The Tucson figures they have published are for the P1 grade, so they sit on the plans plate rather than here.",
      cs55plus:
        "The Premium grade, 2027. They post it in both white and dark grey against the same stretch of wall.",
      eado:
        "The sedan that appears most often in their feed — Premium grade, and the one they quote the lightest instalment on.",
      arrizo6:
        "The GT in Comfort grade. Photographed at night with the hall lights on, which is how they shoot most of their sedans.",
      havalh6:
        "The Ultra grade, in the two-tone black and white they took delivery of. No instalment plan has been published for this one yet.",
    },
    specLabels: {
      Engine: "Engine",
      Power: "Power",
      Torque: "Torque",
      Seats: "Seats",
    },
    kit: {
      "10 airbags": "10 airbags",
      "360° camera": "360° camera",
      "Sony audio": "Sony audio",
      "Head-up display": "Head-up display",
      "Full panoramic roof": "Full panoramic roof",
      "Ambient lighting": "Ambient lighting",
      "Wireless charger": "Wireless charger",
      "Built-in cooler box": "Built-in cooler box",
      "Lane keep assist": "Lane keep assist",
      "Blind spot detection": "Blind spot detection",
      "Autonomous emergency braking": "Autonomous emergency braking",
      '19" two-tone alloys': '19" two-tone alloys',
    },
  },
  plans: {
    heading: "Every plan they have published",
    intro:
      "Two rows mean two published ways to buy the same car: a smaller deposit with a heavier monthly, or a larger deposit that lightens it. Figures as posted.",
    depositLabel: "Deposit",
    monthlyLabel: "Monthly",
    currency: "EGP",
    perMonth: "/mo",
    footnote:
      "Transcribed from Vision Auto's Instagram posts. Plans and availability change — confirm on the phone before you count on a figure.",
    carLabel: "Car",
    orLabel: "or",
  },
  showroom: {
    heading: "One hall, one light",
    body: [
      "The wall is the whole identity: rough stone, washed from below by a warm line of light, with the mark mounted at eye height. Every car they post stands against it, which is why their photographs all look like they belong to the same catalogue.",
      "After dark the forecourt takes over — the sign lights up over the front row and the cars stay out under it.",
    ],
    hallCaption: "The stone wall, Maadi",
    forecourtCaption: "The forecourt after dark",
  },
  marques: {
    heading: "On the floor",
  },
};
