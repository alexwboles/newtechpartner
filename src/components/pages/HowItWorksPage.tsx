"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  AnimatedSection — simple fade-up on scroll                        */
/* ------------------------------------------------------------------ */
function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step data                                                          */
/* ------------------------------------------------------------------ */
const steps = [
  {
    number: "01",
    title: "Share Your Needs",
    description:
      "Tell us about your business, tech challenges, and goals in a quick 15-minute call. No jargon, no pressure.",
  },
  {
    number: "02",
    title: "Get Your Custom Plan",
    description:
      "We create a prioritized tech roadmap tailored to your business. You approve it before any work starts.",
  },
  {
    number: "03",
    title: "We Build & Launch",
    description:
      "Your highest-priority project kicks off immediately. Most first builds are delivered within a week.",
  },
  {
    number: "04",
    title: "Grow & Scale",
    description:
      "As your business evolves, your tech stack evolves too. New requests and new tools — always included.",
  },
];

/* ------------------------------------------------------------------ */
/*  HowItWorksPage                                                     */
/* ------------------------------------------------------------------ */
export default function HowItWorksPage({
  navigate,
}: {
  navigate: (page: string) => void;
}) {
  return (
    <div className="min-h-screen">
      {/* ----- 1. Header ----- */}
      <section className="pt-32 pb-16 px-4 text-center">
        <AnimatedSection>
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-400 mb-6">
            Process
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            How It Works
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="mt-5 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            From first call to fully operational in days, not months.
          </p>
        </AnimatedSection>
      </section>

      {/* ----- 2. Steps (vertical layout) ----- */}
      <section className="px-4 max-w-4xl mx-auto py-16">
        <div className="flex flex-col">
          {steps.map((step, i) => {
            const isLast = i === steps.length - 1;
            return (
              <div key={step.number}>
                <AnimatedSection delay={i * 0.1}>
                  <div className="lg:flex items-start gap-8">
                    {/* Number */}
                    <div className="shrink-0 w-16 hidden lg:block">
                      <span className="text-5xl font-bold text-emerald-500/20">
                        {step.number}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="lg:hidden mb-2">
                      <span className="text-xs font-mono text-emerald-500/40 mr-3">
                        {step.number}
                      </span>
                    </div>
                    <div className="flex-1 pb-12 lg:pb-10">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed max-w-lg">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>

                {/* Vertical line between steps (desktop) */}
                {!isLast && (
                  <div className="hidden lg:block w-px h-12 bg-white/[0.06] ml-[30px]" />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ----- 3. Image Section ----- */}
      <section className="px-4 py-16 max-w-5xl mx-auto">
        <AnimatedSection>
          <div className="rounded-2xl overflow-hidden aspect-[16/9]">
            <Image
              src="/img/hands-typing.jpg"
              alt="Professional working on a laptop"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <p className="text-sm text-slate-500 text-center mt-4">
            From first call to fully operational in days, not months.
          </p>
        </AnimatedSection>
      </section>

      {/* ----- 4. CTA ----- */}
      <section className="pb-24 px-4 text-center">
        <AnimatedSection>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Ready to get started?
          </h3>
          <button
            onClick={() => navigate("contact")}
            className="bg-white text-[#050a12] font-semibold rounded-lg hover:bg-slate-100 px-8 py-3 text-sm transition-colors"
          >
            Get Started
          </button>
        </AnimatedSection>
      </section>
    </div>
  );
}