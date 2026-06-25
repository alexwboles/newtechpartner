"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    <div className="min-h-screen grid-bg noise-overlay relative">
      {/* ----- 1. Page Header ----- */}
      <section className="pt-32 pb-12 px-4 text-center relative z-10 max-w-3xl mx-auto">
        <AnimatedSection>
          <Badge
            variant="outline"
            className="border-emerald-500/30 text-emerald-400 mb-6"
          >
            FAQ
          </Badge>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Got <span className="gradient-text">Questions?</span>
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="mt-5 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about TechPartner.
          </p>
        </AnimatedSection>
      </section>

      {/* ----- 2. FAQ Accordion ----- */}
      <section className="px-4 max-w-3xl mx-auto relative z-10 pb-4">
        <AnimatedSection delay={0.15}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.06}>
                <AccordionItem
                  value={`faq-${index}`}
                  className="glass-card rounded-xl border-0 overflow-hidden data-[state=open]:glow-emerald"
                >
                  <AccordionTrigger className="px-6 py-5 text-left text-foreground hover:text-emerald-400 transition-colors [&[data-state=open]>svg]:text-emerald-400">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 text-muted-foreground leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </AnimatedSection>
            ))}
          </Accordion>
        </AnimatedSection>
      </section>

      {/* ----- 3. Still Have Questions CTA ----- */}
      <section className="mt-12 pb-20 px-4 max-w-3xl mx-auto text-center relative z-10">
        <AnimatedSection>
          <div className="glass-card animated-border rounded-2xl p-8">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-3">
              Still have questions?
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto leading-relaxed mb-6">
              Let&apos;s talk through it. No commitment, no pressure.
            </p>
            <Button
              onClick={() => navigate("contact")}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold gap-2"
              size="lg"
            >
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}