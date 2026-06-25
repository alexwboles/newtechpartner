"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { Check, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const traditionalRoles = [
  { role: "Freelance Developer", cost: "$5,000/mo" },
  { role: "Graphic Designer", cost: "$3,000/mo" },
  { role: "IT Support", cost: "$2,000/mo" },
  { role: "SaaS Tool Stack", cost: "$300–700/mo" },
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

/* ------------------------------------------------------------------ */
/*  PricingPage                                                        */
/* ------------------------------------------------------------------ */
export default function PricingPage({
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
            Pricing
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Simple, Transparent Pricing
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="mt-5 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            One flat monthly rate. No hidden fees, no surprises. Everything your
            business needs to compete online.
          </p>
        </AnimatedSection>
      </section>

      {/* ----- 2. Comparison Cards ----- */}
      <section className="px-4 max-w-4xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-6 items-stretch">
          {/* Left card: Traditional Approach */}
          <AnimatedSection delay={0.1}>
            <div className="pro-card p-8 sm:p-10 h-full flex flex-col">
              <p className="text-xs uppercase tracking-wider text-slate-500 mb-6">
                Traditional Approach
              </p>

              <div className="flex-1">
                {traditionalRoles.map((item, i) => (
                  <div
                    key={item.role}
                    className="flex justify-between items-center py-4 border-b border-white/[0.04] last:border-0"
                  >
                    <span className="text-white/80">{item.role}</span>
                    <span className="text-slate-400">{item.cost}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-between items-center pt-6 border-t border-white/[0.04]">
                <span className="text-white/80 font-medium">Total</span>
                <span className="text-red-400 font-bold text-xl">
                  $10,300+/mo
                </span>
              </div>
            </div>
          </AnimatedSection>

          {/* Right card: TechPartner */}
          <AnimatedSection delay={0.2}>
            <div className="pro-card border-emerald-500/20 p-8 sm:p-10 h-full flex flex-col relative">
              <Badge className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-400 text-xs px-2 py-0.5 rounded border-0">
                RECOMMENDED
              </Badge>

              <p className="text-xs uppercase tracking-wider text-emerald-400 mb-6">
                TechPartner
              </p>

              <ul className="flex-1 space-y-3">
                {techPartnerFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span className="text-white/80 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex justify-between items-end pt-6 border-t border-white/[0.04]">
                <div>
                  <span className="text-4xl font-bold text-white">$200</span>
                  <span className="text-slate-500 ml-1">/month</span>
                </div>
                <button
                  onClick={() => navigate("contact")}
                  className="bg-white text-[#050a12] font-semibold rounded-lg hover:bg-slate-100 px-6 py-2.5 text-sm transition-colors"
                >
                  Get Started
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ----- 3. Stats Row ----- */}
      <section className="mt-16 px-4 max-w-4xl mx-auto">
        <div className="section-divider mb-16" />
        <AnimatedSection>
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-white">
                $10,300+
              </p>
              <p className="text-sm text-slate-500 mt-2">
                Traditional monthly cost
              </p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold gradient-text">
                $200
              </p>
              <p className="text-sm text-slate-500 mt-2">
                TechPartner monthly
              </p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-emerald-400">
                98% savings
              </p>
              <p className="text-sm text-slate-500 mt-2">
                Without sacrificing quality
              </p>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ----- 4. Guarantee ----- */}
      <section className="mt-16 pb-24 px-4 text-center">
        <AnimatedSection>
          <div className="max-w-xl mx-auto">
            <ShieldCheck className="h-8 w-8 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              No-Risk Guarantee
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Try TechPartner for a full month. Cancel anytime. No contracts, no
              cancellation fees.
            </p>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}