"use client";

import AnimatedSection from "./AnimatedSection";

const FAQ_ITEMS = [
  {
    q: "What does the free schema audit include?",
    a: "We review the structured data (JSON-LD) on up to 10 URLs from your website and report markup errors, missing required properties, and business information that is outdated or inconsistent. No obligation, nothing charged.",
  },
  {
    q: "What does the $49 setup/correction include?",
    a: "We correct the issues found in the audit: fixing markup errors, completing required and recommended LocalBusiness properties, and re-checking each corrected URL. Any larger site work beyond the audited URLs is quoted separately and agreed before it starts.",
  },
  {
    q: "What does the $29/month monitoring include?",
    a: "We monitor the structured data on your audited URLs and flag changes that break or alter the markup — such as a site update that removes required fields or publishes outdated hours — and send you a report of what changed.",
  },
  {
    q: "What is the turnaround?",
    a: "The audit is scoped to finish within a few business days of receiving your URL list. Corrections are confirmed with a date before work begins, and monitoring starts once corrections are verified.",
  },
  {
    q: "Can I cancel monitoring?",
    a: "Yes. Monitoring is month-to-month with no long-term contract — cancel by email at any time and it ends at the close of the current month.",
  },
  {
    q: "What information do you need from me?",
    a: "Up to 10 URLs to audit, your correct business details (name, address, phone, hours), and — if we are making corrections on your site — access arranged through your website platform.",
  },
  {
    q: "Does this guarantee better search results?",
    a: "No. Technical validation and monitoring do not guarantee rankings, indexing, or rich results. The service keeps your markup accurate and catches errors early — search engines alone decide how your site is ranked and displayed.",
  },
];

/* FAQ immediately below the primary offers — native details/summary for keyboard accessibility */
export default function SchemaWatchFAQ() {
  return (
    <section className="pb-16 sm:pb-20">
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        <AnimatedSection className="mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-[#D4A853] font-medium mb-3">
            SchemaWatch FAQ
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Questions, answered up front
          </h2>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item) => (
              <details
                key={item.q}
                className="group border border-white/[0.06] bg-[#0c1322] rounded-sm"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer px-5 py-4 text-sm font-medium text-slate-200 list-none [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="text-[#D4A853] text-lg leading-none shrink-0 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="px-5 pb-4 text-sm text-slate-400 leading-relaxed">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}