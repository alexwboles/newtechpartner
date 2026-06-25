"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { X, Check, ArrowRight, Zap, DollarSign, BarChart3, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/* ------------------------------------------------------------------ */
/*  AnimatedSection helper                                             */
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
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const traditionalRoles = [
  {
    role: "Freelance Developer",
    cost: "$5,000/mo",
    note: "One skill set, long timelines",
  },
  {
    role: "Graphic Designer",
    cost: "$3,000/mo",
    note: "Visuals only, no tech help",
  },
  {
    role: "IT Support",
    cost: "$2,000/mo",
    note: "Tech fixes, but no building",
  },
  {
    role: "SaaS Tools Stack",
    cost: "$300\u2013700/mo",
    note: "Disconnected, no support",
  },
];

const techPartnerFeatures = [
  "AI automations & chatbots",
  "Custom apps (3-day delivery)",
  "Website builds & updates",
  "Payment integrations",
  "Business email & security",
  "Marketing & analytics setup",
  "Team workflow automation",
  "Ongoing priority support",
];

const savingsStats = [
  {
    value: "$10,300+",
    label: "Traditional monthly cost",
    icon: DollarSign,
  },
  {
    value: "$200",
    label: "TechPartner monthly",
    icon: Zap,
  },
  {
    value: "98% savings",
    label: "Without sacrificing quality",
    icon: BarChart3,
  },
];

/* ------------------------------------------------------------------ */
/*  PricingPage                                                       */
/* ------------------------------------------------------------------ */
export default function PricingPage({
  navigate,
}: {
  navigate: (page: string) => void;
}) {
  return (
    <div className="min-h-screen grid-bg noise-overlay relative">
      {/* ----- 1. Page Header ----- */}
      <section className="pt-32 pb-12 px-4 text-center relative z-10">
        <AnimatedSection>
          <Badge
            variant="outline"
            className="border-emerald-500/30 text-emerald-400 mb-6"
          >
            Smart Value
          </Badge>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            <span className="gradient-text">$200/mo</span>{" "}
            <span className="text-foreground">Replaces a </span>
            <span className="gradient-text">$10k+ Team</span>
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="mt-5 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Instead of hiring multiple specialists, one flat monthly plan covers
            everything.
          </p>
        </AnimatedSection>
      </section>

      {/* ----- 2. Side-by-Side Comparison ----- */}
      <section className="px-4 max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* --- Left Card: The Traditional Way --- */}
          <AnimatedSection delay={0.1}>
            <div className="glass-card rounded-2xl p-8 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                <X className="h-5 w-5 text-red-400" />
                <h3 className="text-xl font-bold text-red-400">
                  The Traditional Way
                </h3>
              </div>

              <div className="flex flex-col gap-3 flex-1">
                {traditionalRoles.map((item) => (
                  <div
                    key={item.role}
                    className="rounded-xl bg-white/[0.02] border border-white/5 p-4"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-foreground">
                        {item.role}
                      </span>
                      <span className="text-red-400 font-bold text-sm">
                        {item.cost}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.note}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-muted-foreground font-medium">
                  Total per month
                </span>
                <span className="text-red-400 text-2xl font-extrabold">
                  $10,300+
                </span>
              </div>
            </div>
          </AnimatedSection>

          {/* --- Right Card: With TechPartner --- */}
          <AnimatedSection delay={0.2}>
            <div className="glass-card rounded-2xl p-8 border-emerald-500/20 glow-emerald h-full flex flex-col relative">
              {/* BEST VALUE badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg shadow-emerald-500/30">
                  BEST VALUE
                </span>
              </div>

              <div className="flex items-center gap-2 mb-6 mt-2">
                <Check className="h-5 w-5 text-emerald-400" />
                <h3 className="text-xl font-bold text-emerald-400">
                  With TechPartner
                </h3>
              </div>

              <ul className="flex flex-col gap-3 flex-1">
                {techPartnerFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span className="text-foreground/90">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-emerald-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    All-inclusive, per month
                  </p>
                  <span className="gradient-text text-4xl font-extrabold">
                    $200
                  </span>
                </div>
                <Button
                  onClick={() => navigate("contact")}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold gap-2"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ----- 3. Savings Breakdown ----- */}
      <section className="mt-16 px-4 max-w-5xl mx-auto relative z-10">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-10">
            The Math is Simple
          </h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-3 gap-6">
          {savingsStats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 0.12}>
              <div className="glass-card rounded-2xl p-6 text-center h-full">
                <div className="flex justify-center mb-4">
                  <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-emerald-400" />
                  </div>
                </div>
                <p className="text-3xl sm:text-4xl font-extrabold gradient-text mb-2">
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ----- 4. Money-Back Guarantee Banner ----- */}
      <section className="mt-12 px-4 max-w-4xl mx-auto relative z-10">
        <AnimatedSection>
          <div className="glass-card animated-border rounded-2xl p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-3">No-Risk Guarantee</h3>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Try TechPartner for a full month. If you don&apos;t see value,
              cancel with zero hassle. No contracts, no cancellation fees, ever.
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* ----- 5. Bottom CTA ----- */}
      <section className="mt-12 pb-20 px-4 text-center relative z-10">
        <AnimatedSection>
          <Button
            onClick={() => navigate("contact")}
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold gap-2 glow-emerald h-12 px-8 text-base"
          >
            Start Saving Today
            <ArrowRight className="h-4 w-4" />
          </Button>
        </AnimatedSection>
      </section>
    </div>
  );
}