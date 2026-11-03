"use client";

import AnimatedSection from "./AnimatedSection";
import { VALIDATION_STEPS } from "./data";

export default function HowWeValidate() {
  return (
    <section className="py-20">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <AnimatedSection className="mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-[#D4A853] font-medium mb-3">
            How we validate
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Proof before scale, every time
          </h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALIDATION_STEPS.map((step, i) => (
            <AnimatedSection key={step.title} delay={i * 0.08}>
              <div className="border-t border-[#D4A853]/25 pt-5">
                <p className="text-[11px] font-mono text-[#D4A853]/70 mb-2">
                  0{i + 1}
                </p>
                <h3 className="text-sm font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}