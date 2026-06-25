"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQPageProps {
  navigate: (page: string) => void;
}

function AnimatedSection({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const faqs = [
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

export default function FAQPage({ navigate }: FAQPageProps) {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section
        className="relative bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.04),transparent_70%)] pt-32 pb-16 text-center"
      >
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
          <AnimatedSection>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-5">
              FAQ
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-5">
              Frequently Asked Questions
            </h1>
            <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Everything you need to know about TechPartner. Can&apos;t find
              what you&apos;re looking for? Reach out directly.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16">
        <div className="max-w-[720px] mx-auto px-6 sm:px-8">
          <AnimatedSection>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-white/[0.06]"
                >
                  <AccordionTrigger className="px-0 py-5 text-left text-[15px] text-white font-medium hover:no-underline hover:text-white [&[data-state=open]>svg]:text-emerald-400">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm text-slate-400 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimatedSection>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 text-center">
        <AnimatedSection>
          <h3 className="text-2xl font-medium text-white mb-2">
            Still have questions?
          </h3>
          <p className="text-sm text-slate-400 mb-8">
            We&apos;re happy to help. No commitment, no pressure.
          </p>
          <button
            onClick={() => navigate("contact")}
            className="rounded-sm bg-white text-[#050a12] font-semibold px-8 py-2.5 text-sm hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Contact Us
          </button>
        </AnimatedSection>
      </section>
    </div>
  );
}