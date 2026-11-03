"use client";

import { ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import CheckoutButton from "./CheckoutButton";
import FulfillmentNote from "./FulfillmentNote";
import { SECONDARY_OFFERS, type SecondaryOffer } from "./data";

/* Secondary offers beneath the featured SchemaWatch card */
export default function SecondaryOffers({
  onRequest,
}: {
  onRequest: (offer: SecondaryOffer) => void;
}) {
  return (
    <section className="pb-16 sm:pb-20">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <AnimatedSection className="mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-medium">
            Also available
          </p>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 gap-5">
          {SECONDARY_OFFERS.map((offer, i) => (
            <AnimatedSection key={offer.title} delay={i * 0.08}>
              <div className="pro-card p-6 sm:p-7 h-full flex flex-col hover:border-[#D4A853]/20">
                <h3 className="text-lg font-semibold text-white leading-snug">
                  {offer.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mt-2 flex-1">
                  {offer.description}
                </p>
                <div className="mt-6 pt-5 border-t border-white/[0.06]">
                  <p className="text-sm font-semibold text-[#E8D5B7]">
                    {offer.price}
                  </p>
                  {offer.priceNote && (
                    <p className="text-xs text-slate-500 mt-0.5">
                      {offer.priceNote}
                    </p>
                  )}
                  <div className="mt-4 flex flex-col gap-3">
                    {offer.checkouts.map((opt, ci) => (
                      <CheckoutButton
                        key={opt.url}
                        option={opt}
                        variant={ci === 0 ? "primary" : "outline"}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => onRequest(offer)}
                    className="mt-3 w-full inline-flex items-center justify-center gap-2 text-slate-400 hover:text-slate-200 font-medium text-xs transition-colors"
                  >
                    {offer.cta}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <div className="mt-4">
                    <FulfillmentNote />
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}