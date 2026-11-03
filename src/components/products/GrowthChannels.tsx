"use client";

import { ArrowRight, Bot, ScanSearch, PackageOpen } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const CHANNELS = [
  {
    icon: Bot,
    title: "Contractor Lead-to-Quote Assistant",
    label: "AI micro-SaaS",
    description:
      "A focused assistant that qualifies inbound leads, prepares estimate drafts, schedules follow-up reminders, and keeps a human approval step before anything is sent.",
    revenue: "$29–$199/month · onboarding available",
    status: "MVP in development",
  },
  {
    icon: ScanSearch,
    title: "Automated Website Audit & Redesign Funnel",
    label: "Productized service",
    description:
      "A transparent website audit that identifies conversion, accessibility, and local-search issues, then pairs the findings with an optional implementation sprint.",
    revenue: "Free audit · implementation from $299",
    status: "Pilot workflow in development",
  },
  {
    icon: PackageOpen,
    title: "Developer Tools & Template Library",
    label: "Digital products",
    description:
      "Reusable contractor-site sections, intake flows, calculators, automation starters, and documented AI workflow kits built for fast deployment.",
    revenue: "$29–$249 per license",
    status: "First collection in development",
  },
];

export default function GrowthChannels({
  onRequest,
}: {
  onRequest: (pilot: {
    title: string;
    description: string;
    price: string;
    badge?: string;
  }) => void;
}) {
  return (
    <section className="py-20 border-y border-white/[0.04] bg-white/[0.01]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <AnimatedSection>
          <p className="text-xs uppercase tracking-[0.2em] text-[#D4A853] font-medium mb-3">
            Now building
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Three ways to put the same systems to work
          </h2>
          <p className="text-slate-400 text-sm mt-3 max-w-2xl leading-relaxed">
            Each product begins as a bounded pilot, uses transparent assumptions,
            and moves toward self-service only after real customer validation.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-5 mt-10">
          {CHANNELS.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <AnimatedSection key={channel.title} delay={index * 0.08}>
                <article className="pro-card p-6 sm:p-7 h-full flex flex-col">
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <span className="w-10 h-10 border border-[#D4A853]/25 bg-[#D4A853]/[0.06] flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[#D4A853]" />
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-[#E8D5B7] border border-[#E8D5B7]/20 px-2.5 py-1 rounded-full">
                      {channel.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#D4A853] font-medium mb-2">
                    {channel.label}
                  </p>
                  <h3 className="text-xl font-semibold text-white">{channel.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mt-3 flex-1">
                    {channel.description}
                  </p>
                  <div className="mt-6 pt-5 border-t border-white/[0.06]">
                    <p className="text-sm font-semibold text-[#E8D5B7] mb-4">
                      {channel.revenue}
                    </p>
                    <button
                      onClick={() =>
                        onRequest({
                          title: channel.title,
                          description: channel.description,
                          price: channel.revenue,
                          badge: channel.status,
                        })
                      }
                      className="inline-flex items-center gap-2 text-xs font-medium text-[#D4A853] hover:text-[#E8D5B7] transition-colors"
                    >
                      Join the pilot list
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
