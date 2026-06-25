"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */
const faqItems = [
  {
    question: "What exactly do I get for $200/month?",
    answer:
      "You get access to 30+ tech services including AI automation, custom app development, website building, payment integrations, business email setup, marketing tools, workflow automation, and ongoing priority tech support. Everything is included — no per-project fees, no hourly rates.",
  },
  {
    question: "Is there a contract or commitment?",
    answer:
      "No contracts, no long-term commitments. You pay month-to-month and can cancel anytime. We believe in earning your business every single month with results, not locking you in.",
  },
  {
    question: "How fast can I expect results?",
    answer:
      "Most projects are delivered within 3\u20137 business days. Simple requests like website updates or form integrations can be done within 48 hours. More complex builds like custom apps typically take 5\u20137 days.",
  },
  {
    question: "What types of businesses do you work with?",
    answer:
      "We work with small to mid-sized businesses across all industries \u2014 restaurants, real estate, healthcare, legal, e-commerce, fitness, professional services, and more. If you use technology in your business, TechPartner is for you.",
  },
  {
    question: "How do I communicate with my TechPartner?",
    answer:
      "You get direct access via your preferred channel \u2014 email, text, or phone. Support tickets receive priority response within 48 hours. You also get a monthly recap of all work completed and upcoming recommendations.",
  },
  {
    question: "What if I need something not listed in the services?",
    answer:
      "The service list covers the most common needs, but if you have a unique request, just ask! We love creative challenges and will let you know upfront if it\u2019s within scope or how we can make it work.",
  },
  {
    question: "Can I upgrade or get additional services?",
    answer:
      "The $200/month plan is designed to be comprehensive. For enterprise-level needs or highly specialized projects, we can discuss custom arrangements. But for 95% of businesses, the standard plan covers everything.",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQPage                                                            */
/* ------------------------------------------------------------------ */
export default function FAQPage({
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
            FAQ
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Frequently Asked Questions
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="mt-5 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about TechPartner. Can&apos;t find what
            you&apos;re looking for? Reach out directly.
          </p>
        </AnimatedSection>
      </section>

      {/* ----- 2. FAQ Accordion ----- */}
      <section className="px-4 max-w-3xl mx-auto">
        <AnimatedSection delay={0.1}>
          <Accordion type="single" collapsible>
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="border-b border-white/[0.06]"
              >
                <AccordionTrigger className="px-0 py-5 text-left text-white font-medium hover:no-underline hover:text-white [&[data-state=open]>svg]:text-emerald-400">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm text-slate-400 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>
      </section>

      {/* ----- 3. CTA ----- */}
      <section className="py-16 px-4 text-center">
        <AnimatedSection>
          <h3 className="text-2xl font-medium text-white mb-2">
            Still have questions?
          </h3>
          <p className="text-sm text-slate-400 mb-6">
            We&apos;re happy to help. No commitment, no pressure.
          </p>
          <button
            onClick={() => navigate("contact")}
            className="border border-white/20 text-white rounded-lg hover:bg-white/5 px-8 py-2.5 text-sm font-medium transition-colors"
          >
            Contact Us
          </button>
        </AnimatedSection>
      </section>
    </div>
  );
}