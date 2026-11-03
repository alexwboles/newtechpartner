export const PRODUCTS_EMAIL = "alexwboles@gmail.com";

export interface Tool {
  key: string;
  name: string;
  tagline: string;
  description: string;
  price: string;
  status: string;
  demoUrl?: string;
  checkout?: CheckoutOption;
}

export const TOOLS: Tool[] = [
  {
    key: "tool-lead-rescue",
    name: "LeadRescue Lite",
    tagline: "Lead pipeline & missed-opportunity recovery",
    description:
      "A working prototype of a lightweight dashboard for tracking inbound leads and surfacing missed opportunities — with recovery actions built in.",
    price: "$29/month Pro",
    status: "Live & purchasable",
    demoUrl: "https://leadrescue-app.alexwboles.chatgpt.site",
    checkout: {
      label: "Start LeadRescue Pro",
      billing: "Recurring — $29/month",
      url: "https://buy.stripe.com/dRm4gzctK8Ljdii9uj0sU0e",
    },
  },
  {
    key: "tool-field-quote",
    name: "FieldQuote Mini",
    tagline: "Job pricing, markup & gross-margin calculator",
    description:
      "Price field-service jobs with confidence: enter costs, apply overhead and markup, and see gross margin before you send the quote.",
    price: "$49 lifetime Pro",
    status: "Live & purchasable",
    demoUrl: "https://fieldquote-app.alexwboles.chatgpt.site",
    checkout: {
      label: "Buy FieldQuote Pro",
      billing: "$49 one-time",
      url: "https://buy.stripe.com/eVqfZh9hy6Db922fSH0sU0d",
    },
  },
  {
    key: "tool-schema-checker",
    name: "LocalBusiness Schema Checker",
    tagline: "Preflight review for LocalBusiness structured data",
    description:
      "Paste your JSON-LD and get a preflight checklist of required and recommended LocalBusiness properties — before search engines grade it.",
    price: "Free checker · $49 review · $149 implementation",
    status: "Working prototype",
  },
  {
    key: "tool-lead-calculator",
    name: "Missed-Lead Revenue Calculator",
    tagline: "Estimate revenue lost to unanswered or delayed leads",
    description:
      "Estimate the monthly revenue walking out the door when inbound leads go unanswered — using your own numbers and transparent assumptions.",
    price: "Free tool",
    status: "Live calculator",
  },
];

export interface CheckoutOption {
  label: string;
  /* Billing terms shown next to the CTA — never hidden for recurring offers */
  billing: string;
  url: string;
}

export const SCHEMA_WATCH = {
  eyebrow: "Schema monitoring for local businesses",
  headline:
    "Keep your local business markup accurate as your website changes",
  description:
    "We audit, correct, and monitor the structured data on up to 10 URLs so broken or outdated business information is caught early.",
  pricingItems: [
    "Free initial audit",
    "$49 setup/correction",
    "$29/month monitoring",
  ],
  pricingLine:
    "Free initial audit · $49 setup/correction · $29/month monitoring",
  disclaimer:
    "Technical validation and monitoring do not guarantee rankings, indexing, or rich results.",
  modalTitle: "SchemaWatch — free schema audit",
  implementation: {
    label: "Buy $49 implementation",
    billing: "$49 one-time",
    url: "https://buy.stripe.com/eVq14n9hy3qZ922cGv0sU04",
  } satisfies CheckoutOption,
  monitoring: {
    label: "Start $29/month monitoring",
    billing: "Recurring — $29/month",
    url: "https://buy.stripe.com/3cIdR9ctK2mVceebCr0sU0c",
  } satisfies CheckoutOption,
};

export interface SecondaryOffer {
  title: string;
  description: string;
  price: string;
  priceNote?: string;
  cta: string;
  checkouts: CheckoutOption[];
}

export const SECONDARY_OFFERS: SecondaryOffer[] = [
  {
    title: "Contractor Market Pulse",
    description:
      "A focused report on local search demand, competitor positioning, and where the lead opportunities are for your trade and service area.",
    price: "$49 founding brief · $129/month pilot",
    cta: "Request a report",
    checkouts: [
      {
        label: "Buy $49 founding brief",
        billing: "$49 one-time",
        url: "https://buy.stripe.com/eVq4gz9hy3qZ2DE0XN0sU02",
      },
      {
        label: "Start $129/month pilot",
        billing: "Recurring — $129/month",
        url: "https://buy.stripe.com/9B6fZh9hyaTr0vw21R0sU0a",
      },
    ],
  },
  {
    title: "Contractor Template Packs",
    description:
      "Ready-to-deploy templates for contractor sites — quotes, service pages, and intake flows you can put to work immediately.",
    price: "$99 single license",
    priceNote: "$249 three-template agency pilot",
    cta: "Request this pilot",
    checkouts: [
      {
        label: "Buy $99 license",
        billing: "$99 one-time",
        url: "https://buy.stripe.com/28E28rctKe5D7XY49Z0sU07",
      },
      {
        label: "Buy $249 agency pilot",
        billing: "$249 one-time",
        url: "https://buy.stripe.com/28E14ndxOd1z922fSH0sU08",
      },
    ],
  },
];

interface Pilot {
  title: string;
  description: string;
  price: string;
  priceNote?: string;
  badge?: string;
  note?: string;
}

export const PILOTS: Pilot[] = [
  {
    title: "Lead Leak Audit",
    description:
      "We map how leads currently enter, route, and follow up inside your business, then document every leak with a repair estimate.",
    price: "$149 audit",
    priceNote: "Repair sprint from $499",
  },
  {
    title: "AI Receptionist Discovery",
    description:
      "A time-boxed discovery session to determine whether an AI receptionist can genuinely answer and route your calls — and what it would take.",
    price: "$32/hour",
    priceNote: "Capped at four hours",
  },
  {
    title: "Campaign Page Launch Sprint",
    description:
      "One focused landing page for a single offer or campaign, built to convert — copy structure, form, and measurement included.",
    price: "$295",
  },
  {
    title: "Lead-Generation Campaign Site",
    description:
      "A dedicated site engineered around one job: generating qualified local leads for your business, with measurement built in.",
    price: "$499 purchase",
    priceNote: "or $199/month lease",
  },
  {
    title: "Consent-Based Local Lead Pilot",
    description:
      "A validation-only pilot to test local lead capture and routing with explicit consent at every step.",
    price: "$149 setup + $10 per accepted exclusive lead",
    badge: "Validation only",
    note: "Live consumer lead collection remains disabled pending written buyer approval.",
  },
];

export const VALIDATION_STEPS = [
  {
    title: "Measurable problem",
    description:
      "Every engagement starts by defining the operational problem and the number that proves it's solved.",
  },
  {
    title: "Small paid pilot",
    description:
      "We scope the smallest useful version and put a fixed price on it — no long implementation cycle.",
  },
  {
    title: "Delivery & handoff",
    description:
      "You get a working tool and the documentation to run it, review the results, and decide what's next.",
  },
  {
    title: "Scale only after results",
    description:
      "Nothing scales until the pilot's numbers say it should. Results first, growth second.",
  },
];