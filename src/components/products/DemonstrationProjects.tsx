"use client";

import { ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { SECONDARY_OFFERS } from "./data";

type Demo =
  | { name: string; description: string; kind: "tool"; key: string }
  | { name: string; description: string; kind: "offer"; offer: string }
  | { name: string; description: string; kind: "external"; href: string };

const DEMOS: Demo[] = [
  {
    name: "LeadRescue Lite",
    description:
      "A working prototype dashboard for tracking inbound leads and surfacing missed opportunities — open it and try the workflow in your browser.",
    kind: "tool",
    key: "tool-lead-rescue",
  },
  {
    name: "FieldQuote Mini",
    description:
      "A live job-pricing calculator for field-service work — enter costs, overhead, and markup and see the margin before you quote.",
    kind: "tool",
    key: "tool-field-quote",
  },
  {
    name: "LocalBusiness Schema Checker",
    description:
      "A live preflight checker for LocalBusiness structured data — paste your JSON-LD and get a checklist of required and recommended properties.",
    kind: "tool",
    key: "tool-schema-checker",
  },
  {
    name: "Contractor landing-page templates",
    description:
      "Sample quote, service-page, and intake-flow templates for contractor sites — shown as a demonstration of layout and copy structure.",
    kind: "offer",
    offer: "Contractor Template Packs",
  },
  {
    name: "Contractor Market Pulse",
    description:
      "A sample report outline showing how local search demand and competitor positioning are presented — the live report is prepared for your trade and service area.",
    kind: "offer",
    offer: "Contractor Market Pulse",
  },
  {
    name: "Business CRM Starter",
    description:
      "A local-first lead pipeline with search, follow-up priorities, duplicate protection, and automated tests.",
    kind: "external",
    href: "https://github.com/alexwboles/business-crm-starter",
  },
  {
    name: "CSV-to-Airtable Sync",
    description:
      "A guarded import utility that validates a complete CSV before any Airtable upsert can run.",
    kind: "external",
    href: "https://github.com/alexwboles/csv-airtable-sync",
  },
  {
    name: "Gmail FAQ Responder",
    description:
      "A safety-first inbox automation proof that creates drafts and keeps uncertain messages for review.",
    kind: "external",
    href: "https://github.com/alexwboles/gmail-faq-responder",
  },
  {
    name: "Product Clarity Coach",
    description:
      "An adaptive discovery prototype that identifies missing product decisions and produces a readiness snapshot.",
    kind: "external",
    href: "https://github.com/alexwboles/product-clarity-coach-prototype",
  },
  {
    name: "Spreadsheet Mapping QA",
    description:
      "A delivery-check utility for spotting missing records, duplicate IDs, and risky spreadsheet mappings.",
    kind: "external",
    href: "https://github.com/alexwboles/spreadsheet-data-mapping-qa",
  },
  {
    name: "WordPress Uptime Monitor",
    description:
      "An authenticated WordPress health endpoint with privacy-conscious monitoring output and behavioral tests.",
    kind: "external",
    href: "https://github.com/alexwboles/crystade-uptime-monitor",
  },
  {
    name: "Drainage Service Landing Page",
    description:
      "A responsive contractor landing-page concept designed around urgent-response and commercial conversion paths.",
    kind: "external",
    href: "https://github.com/alexwboles/drainage-infrastructure-landing-page",
  },
];

/* Proof section — clearly labeled demonstrations, never client results */
export default function DemonstrationProjects({
  onRequest,
  navigate,
}: {
  onRequest: (offer: { title: string; description: string; price: string }) => void;
  navigate: (page: string) => void;
}) {
  return (
    <section className="pb-16 sm:pb-20">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <AnimatedSection className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-[#D4A853] font-medium mb-3">
            Demonstration projects
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Prototypes you can open right now
          </h2>
          <p className="text-slate-400 text-sm mt-3 max-w-2xl leading-relaxed">
            Every item below is a working demonstration or prototype built by
            TechPartner — not client results. We make no claims about
            testimonials, savings, or performance: the tools run entirely in
            your browser, and nothing you enter is saved, sent, or tracked.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {DEMOS.map((demo, i) => {
            const offer =
              demo.kind === "offer"
                ? SECONDARY_OFFERS.find((o) => o.title === demo.offer)
                : undefined;
            return (
              <AnimatedSection key={demo.name} delay={i * 0.06}>
                <div className="pro-card p-6 h-full flex flex-col hover:border-[#D4A853]/20">
                  <span className="self-start text-[10px] uppercase tracking-wider text-[#E8D5B7] border border-[#E8D5B7]/20 px-2.5 py-1 rounded-full mb-3">
                    Demonstration
                  </span>
                  <h3 className="text-base font-semibold text-white leading-snug">
                    {demo.name}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mt-2 flex-1">
                    {demo.description}
                  </p>
                  <div className="mt-5 pt-4 border-t border-white/[0.06]">
                    {demo.kind === "tool" ? (
                      <button
                        onClick={() => navigate(demo.key)}
                        className="inline-flex items-center gap-2 text-xs font-medium text-[#D4A853] hover:text-[#E8D5B7] transition-colors"
                      >
                        Open demo
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : demo.kind === "external" ? (
                      <a
                        href={demo.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-medium text-[#D4A853] hover:text-[#E8D5B7] transition-colors"
                      >
                        View project
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    ) : offer ? (
                      <button
                        onClick={() => onRequest(offer)}
                        className="inline-flex items-center gap-2 text-xs font-medium text-[#D4A853] hover:text-[#E8D5B7] transition-colors"
                      >
                        Request via inquiry
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : null}
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}