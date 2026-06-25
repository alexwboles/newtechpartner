"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import {
  MousePointerClick,
  Layers,
  Cpu,
  LineChart,
  ArrowRight,
  Clock,
  Check,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/* ------------------------------------------------------------------ */
/*  AnimatedSection — fade-in on scroll                               */
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
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
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
    icon: MousePointerClick,
    title: "Tell Me What You Need",
    description:
      "Share your tech challenges, goals, and ideas in a quick 2-minute consultation. No jargon, no pressure.",
  },
  {
    number: "02",
    icon: Layers,
    title: "I Build Your Custom Plan",
    description:
      "I create a prioritized roadmap tailored to your business. You approve it before any work starts.",
  },
  {
    number: "03",
    icon: Cpu,
    title: "I Build, Launch & Maintain",
    description:
      "I handle every build, integration, and update. You get results in days, not months. Plus ongoing support.",
  },
  {
    number: "04",
    icon: LineChart,
    title: "You Grow, I Scale With You",
    description:
      "As your business evolves, your tech stack evolves too. New requests, new tools — always included.",
  },
];

/* ------------------------------------------------------------------ */
/*  Timeline data                                                      */
/* ------------------------------------------------------------------ */
const timelineItems = [
  {
    title: "Free Consultation",
    description:
      "We discuss your business needs, current tech stack, and goals. No pressure, no commitment.",
    time: "15 minutes",
  },
  {
    title: "Custom Roadmap",
    description:
      "You receive a prioritized tech strategy tailored to your specific business and industry.",
    time: "24 hours",
  },
  {
    title: "First Build Sprint",
    description:
      "Your highest-priority project begins immediately. Most first builds are delivered within a week.",
    time: "3–7 days",
  },
  {
    title: "Review & Iterate",
    description:
      "You review the work, request changes, and we refine until you're 100% satisfied.",
    time: "Ongoing",
  },
  {
    title: "Monthly Check-Ins",
    description:
      "Every month you get a recap of completed work, upcoming recommendations, and a chance to submit new requests.",
    time: "Monthly",
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
    <div className="relative min-h-screen grid-bg">
      {/* Noise overlay */}
      <div className="noise-overlay pointer-events-none absolute inset-0 z-0" />

      <main className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ===== 1. Page Header ===== */}
        <section className="pt-32 pb-12 text-center">
          <AnimatedSection>
            <Badge
              variant="outline"
              className="mb-6 border-emerald-500/30 text-emerald-400"
            >
              <Zap className="mr-1.5 h-3 w-3" />
              Simple Process
            </Badge>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              How It{" "}
              <span className="gradient-text">Works</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
              From first call to fully operational in days, not months.
            </p>
          </AnimatedSection>
        </section>

        {/* ===== 2. 4-Step Process ===== */}
        <section className="mt-8">
          <div className="grid gap-6 lg:grid-cols-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLast = i === steps.length - 1;

              return (
                <AnimatedSection key={step.number} delay={i * 0.12}>
                  <div className="glass-card group relative h-full rounded-2xl p-6 transition-all duration-300 hover:glow-emerald">
                    {/* Large faded step number */}
                    <span className="pointer-events-none absolute right-4 top-4 select-none text-6xl font-black text-emerald-500/10">
                      {step.number}
                    </span>

                    {/* Connector line (hidden on mobile, shown on lg) */}
                    {!isLast && (
                      <span
                        aria-hidden="true"
                        className="absolute -right-3 top-1/2 hidden h-px w-6 bg-gradient-to-r from-emerald-500/50 to-transparent lg:block"
                      />
                    )}

                    {/* Icon */}
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-6 w-6 text-emerald-400" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {step.description}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </section>

        {/* ===== 3. Detailed Timeline ===== */}
        <section className="mt-20 pb-4">
          <AnimatedSection>
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
              What to{" "}
              <span className="gradient-text">Expect</span>
            </h2>
          </AnimatedSection>

          <div className="relative ml-4 sm:ml-8">
            {/* Vertical line */}
            <div className="absolute left-0 top-2 h-[calc(100%-1rem)] w-px border-l border-emerald-500/20" />

            <div className="flex flex-col gap-10">
              {timelineItems.map((item, i) => (
                <AnimatedSection key={item.title} delay={i * 0.1}>
                  <div className="relative pl-8">
                    {/* Dot */}
                    <span
                      aria-hidden="true"
                      className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-emerald-500"
                    />

                    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
                      <h4 className="font-semibold text-white">
                        {item.title}
                      </h4>
                      <Badge
                        variant="outline"
                        className="w-fit border-emerald-500/30 text-emerald-400 text-xs"
                      >
                        <Clock className="mr-1 h-3 w-3" />
                        {item.time}
                      </Badge>
                    </div>

                    <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 4. Bottom CTA ===== */}
        <section className="mt-16 pb-20 text-center">
          <AnimatedSection>
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Ready to get started?
            </h3>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <Button
              size="lg"
              className="glow-emerald mt-6 bg-emerald-600 text-white hover:bg-emerald-500"
              onClick={() => navigate("contact")}
            >
              Book Your Free Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </AnimatedSection>
        </section>
      </main>
    </div>
  );
}