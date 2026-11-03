"use client";

import AnimatedSection from "./AnimatedSection";
import { PILOTS } from "./data";

type Pilot = (typeof PILOTS)[number];

/* Pilot & service cards — each card opens the inquiry modal via onRequest */
export default function PilotsServices({
  onRequest,
}: {
  onRequest: (pilot: Pilot) => void;
}) {
  return (
    <section className="py-20 bg-[#080e1a]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <AnimatedSection className="mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-[#D4A853] font-medium mb-3">
            Pilots &amp; services
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Focused engagements, fixed prices
          </h2>
          <p className="text-slate-400 text-sm mt-3 max-w-xl leading-relaxed">
            Start with a small, clearly-scoped pilot. Every price is stated up
            front.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PILOTS.map((pilot, i) => (
            <AnimatedSection key={pilot.title} delay={i * 0.06}>
              <div className="pro-card p-6 h-full flex flex-col hover:border-[#D4A853]/20">
                {pilot.badge && (
                  <span className="self-start text-[10px] uppercase tracking-wider text-[#E8D5B7] border border-[#E8D5B7]/30 bg-[#E8D5B7]/[0.06] px-2.5 py-1 rounded-full mb-3">
                    {pilot.badge}
                  </span>
                )}
                <h3 className="text-base font-semibold text-white leading-snug">
                  {pilot.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mt-2 flex-1">
                  {pilot.description}
                </p>
                {pilot.note && (
                  <p className="text-[11px] text-[#E8D5B7]/80 italic leading-relaxed mt-3 border-l-2 border-[#E8D5B7]/25 pl-3">
                    {pilot.note}
                  </p>
                )}
                <div className="mt-5 pt-4 border-t border-white/[0.06]">
                  <p className="text-sm font-semibold text-[#E8D5B7]">
                    {pilot.price}
                  </p>
                  {pilot.priceNote && (
                    <p className="text-xs text-slate-500 mt-0.5">
                      {pilot.priceNote}
                    </p>
                  )}
                  <button
                    onClick={() => onRequest(pilot)}
                    className="mt-4 w-full inline-flex items-center justify-center border border-[#D4A853]/30 text-[#D4A853] hover:bg-[#D4A853]/[0.08] font-medium rounded-sm px-5 py-2.5 text-xs transition-colors"
                  >
                    Request this pilot
                  </button>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}