"use client";

import { ArrowRight, Calculator, FileSearch, Target, TrendingUp } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { TOOLS } from "./data";

const TOOL_ICONS: Record<string, typeof TrendingUp> = {
  "tool-lead-rescue": TrendingUp,
  "tool-field-quote": Calculator,
  "tool-schema-checker": FileSearch,
  "tool-lead-calculator": Target,
};

export default function FeaturedTools({
  navigate,
}: {
  navigate: (page: string) => void;
}) {
  return (
    <section id="featured-tools" className="pt-6 pb-20">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <div className="grid md:grid-cols-2 gap-5">
          {TOOLS.map((tool, i) => {
            const Icon = TOOL_ICONS[tool.key];
            return (
              <AnimatedSection key={tool.key} delay={i * 0.08}>
                <div className="pro-card p-6 sm:p-7 h-full flex flex-col hover:border-[#D4A853]/20">
                  <div className="flex items-start justify-between mb-4">
                    <span className="w-9 h-9 border border-[#D4A853]/25 bg-[#D4A853]/[0.06] flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[#D4A853]" />
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-[#E8D5B7] border border-[#E8D5B7]/20 px-2.5 py-1 rounded-full">
                      {tool.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">{tool.name}</h3>
                  <p className="text-xs text-[#D4A853] font-medium mt-1 mb-3">
                    {tool.tagline}
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed flex-1">
                    {tool.description}
                  </p>
                  <div className="mt-6 pt-5 border-t border-white/[0.06]">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-[#E8D5B7]">
                        {tool.price}
                      </span>
                      {tool.demoUrl ? (
                        <a
                          href={tool.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-medium text-[#D4A853] hover:text-[#E8D5B7] transition-colors"
                        >
                          Open live demo
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <button
                          onClick={() => navigate(tool.key)}
                          className="inline-flex items-center gap-2 text-xs font-medium text-[#D4A853] hover:text-[#E8D5B7] transition-colors"
                        >
                          Open tool
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    {tool.checkout && (
                      <div className="mt-4">
                        <a
                          href={tool.checkout.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-sm font-semibold px-6 py-3 text-sm transition-colors w-full bg-[#D4A853] text-[#050a12] hover:bg-[#E8D5B7]"
                        >
                          {tool.checkout.label}
                          <ArrowRight className="w-4 h-4" />
                        </a>
                        <p className="text-[11px] text-slate-500 text-center mt-1.5">
                          {tool.checkout.billing}
                        </p>
                      </div>
                    )}
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