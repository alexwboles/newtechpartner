"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  AnimatedSection — subtle fade-up on scroll                        */
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
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
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
      <section className="pt-32 pb-16 text-center">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
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
        </div>
      </section>

      {/* ----- 2. Steps (vertical timeline) ----- */}
      <section className="py-12">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
          <div className="max-w-2xl mx-auto">
            {steps.map((step, i) => {
              const isLast = i === steps.length - 1;
              return (
                <div key={step.number}>
                  <AnimatedSection delay={i * 0.1}>
                    <div className="flex items-start gap-6 lg:gap-8">
                      {/* Emerald circle with step number */}
                      <div className="shrink-0 relative">
                        <div className="h-10 w-10 rounded-full border-2 border-emerald-500/40 bg-emerald-500/10 flex items-center justify-center">
                          <span className="text-sm font-semibold text-emerald-400">
                            {step.number}
                          </span>
                        </div>
                        {/* Vertical connector line */}
                        {!isLast && (
                          <div className="absolute left-1/2 top-full -translate-x-1/2 w-px h-12 bg-gradient-to-b from-emerald-500/20 to-emerald-500/[0.04]" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-12 lg:pb-14">
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {step.title}
                        </h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </AnimatedSection>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ----- 3. Image Section ----- */}
      <section className="py-12">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
          <AnimatedSection>
            <div className="relative rounded-sm overflow-hidden aspect-[16/9]">
              <Image
                src="/img/hands-typing.jpg"
                alt="Professional working on a laptop"
                fill
                className="object-cover w-full h-full"
                unoptimized
              />
            </div>
            <p className="text-sm text-slate-500 text-center mt-4">
              Your dedicated tech partner — handling everything so you can
              focus on what matters.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ----- 4. CTA ----- */}
      <section className="pt-12 pb-24 text-center">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
          <AnimatedSection>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to get started?
            </h3>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
              Book a free 15-minute call and see how TechPartner can transform
              your business.
            </p>
            <button
              onClick={() => navigate("contact")}
              className="bg-white text-[#050a12] font-semibold rounded-sm hover:bg-slate-100 px-8 py-3 text-sm transition-colors"
            >
              Get Started
            </button>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}