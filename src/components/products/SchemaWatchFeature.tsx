"use client";

import { ArrowRight, Check } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import CheckoutButton from "./CheckoutButton";
import FulfillmentNote from "./FulfillmentNote";
import { SCHEMA_WATCH } from "./data";

/* Primary featured offer — SchemaWatch */
export default function SchemaWatchFeature({
  onRequest,
  navigate,
}: {
  onRequest: () => void;
  navigate: (page: string) => void;
}) {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <AnimatedSection>
          <div className="relative rounded-sm border border-[#D4A853]/30 bg-[#080e1a] overflow-hidden glow-subtle">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4A853]/70 to-transparent" />
            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              <div className="p-8 sm:p-10 lg:p-12">
                <p className="text-xs uppercase tracking-[0.25em] text-[#D4A853] font-medium mb-4">
                  {SCHEMA_WATCH.eyebrow}
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-[1.15] mb-4">
                  {SCHEMA_WATCH.headline}
                </h2>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl mb-8">
                  {SCHEMA_WATCH.description}
                </p>
                <div className="space-y-5">
                  {/* Paid checkout CTAs — billing terms always visible */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <CheckoutButton option={SCHEMA_WATCH.implementation} />
                    <CheckoutButton
                      option={SCHEMA_WATCH.monitoring}
                      variant="outline"
                    />
                  </div>
                  {/* Free / inquiry fallbacks */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                    <button
                      onClick={onRequest}
                      className="inline-flex items-center gap-2 text-[#D4A853] hover:text-[#E8D5B7] font-medium text-xs transition-colors"
                    >
                      Or request the free schema audit first
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => navigate("tool-schema-checker")}
                      className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 font-medium text-xs transition-colors"
                    >
                      Try the free schema checker
                    </button>
                  </div>
                  <FulfillmentNote />
                </div>
              </div>
              <div className="border-t lg:border-t-0 lg:border-l border-white/[0.06] bg-[#050a12]/40 p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 font-medium mb-5">
                  Pricing
                </p>
                <ul className="space-y-3.5 mb-6">
                  {SCHEMA_WATCH.pricingItems.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm text-slate-200"
                    >
                      <Check className="w-4 h-4 text-[#D4A853] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-[11px] text-slate-500 leading-relaxed border-l-2 border-[#E8D5B7]/25 pl-3">
                  {SCHEMA_WATCH.disclaimer}
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}