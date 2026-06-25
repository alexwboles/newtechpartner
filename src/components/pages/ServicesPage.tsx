"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import {
  Bot,
  Code2,
  CreditCard,
  Globe,
  ShieldCheck,
  Headphones,
  Megaphone,
  Workflow,
  ArrowRight,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

/* ─── AnimatedSection: subtle fade-up on scroll ───────────────────── */
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
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Data ─────────────────────────────────────────────────────────── */

interface FeaturedService {
  num: string;
  title: string;
  description: string;
  checks: string[];
  image: string;
  reversed: boolean;
}

const featuredServices: FeaturedService[] = [
  {
    num: "01",
    title: "AI Tools & Smart Automation",
    description:
      "Build chat assistants, AI graphics, automated reminders, custom dashboards, and email responders. AI that works while you sleep.",
    checks: [
      "24/7 AI chatbot for your website",
      "Automated appointment reminders",
      "Custom dashboards and AI tools",
    ],
    image: "/img/ai-chatbot.jpg",
    reversed: false,
  },
  {
    num: "02",
    title: "Website & App Development",
    description:
      "Custom websites, mobile-friendly booking forms, landing pages, and full applications delivered in days — not months.",
    checks: [
      "Custom websites from scratch",
      "Apps in 7 days or less",
      "Mobile-first design",
    ],
    image: "/img/website-design.jpg",
    reversed: true,
  },
  {
    num: "03",
    title: "Support, Security & Systems",
    description:
      "Business email setup, cloud storage, two-factor authentication, team file sharing, and priority 48-hour support with monthly recaps.",
    checks: [
      "48-hour priority response",
      "Monthly work recaps",
      "Full system security setup",
    ],
    image: "/img/team-collab.jpg",
    reversed: false,
  },
];

interface ServiceCard {
  icon: ReactNode;
  title: string;
  bullets: string[];
}

const serviceCards: ServiceCard[] = [
  {
    icon: <Bot className="h-4 w-4" />,
    title: "AI Tools",
    bullets: [
      "Chat assistants",
      "AI graphics",
      "Automated reminders",
      "Custom dashboards",
    ],
  },
  {
    icon: <Code2 className="h-4 w-4" />,
    title: "Custom Apps",
    bullets: [
      "Field crew apps",
      "Booking forms",
      "Chat widgets",
      "Landing pages",
      "Calendar sync",
    ],
  },
  {
    icon: <CreditCard className="h-4 w-4" />,
    title: "Financial Tools",
    bullets: [
      "On-site payments",
      "Auto-logged transactions",
      "Financial dashboards",
      "Automated invoicing",
    ],
  },
  {
    icon: <Globe className="h-4 w-4" />,
    title: "Website Setup",
    bullets: [
      "Custom website builds",
      "Domain/email setup",
      "Online booking",
      "Landing pages",
      "Content updates",
    ],
  },
  {
    icon: <ShieldCheck className="h-4 w-4" />,
    title: "Security",
    bullets: [
      "Business email/cloud",
      "Two-factor auth",
      "App connections",
      "Shared folders",
      "Software setup",
    ],
  },
  {
    icon: <Headphones className="h-4 w-4" />,
    title: "Tech Support",
    bullets: [
      "Troubleshooting",
      "New tool recommendations",
      "System reviews",
      "Monthly check-ins",
      "48h priority",
      "End-of-month recap",
    ],
  },
  {
    icon: <Megaphone className="h-4 w-4" />,
    title: "Marketing",
    bullets: [
      "Google Analytics",
      "Email drip campaigns",
      "CRM connections",
      "QR campaigns",
      "Google Business",
      "AI social posts",
    ],
  },
  {
    icon: <Workflow className="h-4 w-4" />,
    title: "Workflow",
    bullets: [
      "Auto task assignments",
      "Team notifications",
      "Digital onboarding",
      "Time-tracking",
      "Auto invoicing",
      "Approval workflows",
    ],
  },
];

/* ─── Page Component ───────────────────────────────────────────────── */

export default function ServicesPage({
  navigate,
}: {
  navigate: (page: string) => void;
}) {
  return (
    <section className="min-h-screen">
      {/* ── 1. Page Header ────────────────────────────────────────── */}
      <div className="pt-32 pb-16 max-w-[1200px] mx-auto px-6 sm:px-8 text-center">
        <AnimatedSection>
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-400 font-medium mb-4">
            Our Services
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.08}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            30+ Services. One Flat Rate.
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.16}>
          <p className="max-w-lg mx-auto text-slate-400 text-lg mt-5 leading-relaxed">
            Everything your business needs to run on modern technology —
            starting today.
          </p>
        </AnimatedSection>
      </div>

      {/* ── 2. Featured Service Sections ──────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 space-y-4 pb-16">
        {featuredServices.map((service, index) => (
          <AnimatedSection key={service.num} delay={index * 0.08}>
            <div className="grid lg:grid-cols-2 items-stretch">
              {/* Image Column */}
              <div
                className={
                  service.reversed ? "lg:order-2" : "lg:order-1"
                }
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    unoptimized
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              {/* Text Column */}
              <div
                className={`flex flex-col justify-center py-10 px-8 sm:px-12 lg:py-0 lg:px-14 ${
                  service.reversed ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <span className="text-6xl font-extrabold text-white/[0.04] leading-none mb-3 select-none">
                  {service.num}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-400 leading-relaxed mb-6 text-sm sm:text-base">
                  {service.description}
                </p>
                <ul className="space-y-2.5">
                  {service.checks.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-slate-300"
                    >
                      <Check className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* ── 3. Complete Service List ──────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 pb-20">
        <div className="section-divider mb-16" />

        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
            The Complete Service List
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-4">
          {serviceCards.map((service, index) => (
            <AnimatedSection key={service.title} delay={index * 0.05}>
              <div className="pro-card p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-sm bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    {service.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-white">
                    {service.title}
                  </h3>
                </div>
                <ul className="space-y-1.5">
                  {service.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="text-xs text-slate-400 leading-relaxed"
                    >
                      &bull; {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* ── 4. Bottom CTA ─────────────────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 pb-24 text-center">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Not sure what you need?
          </h2>
        </AnimatedSection>
        <AnimatedSection delay={0.08}>
          <p className="text-slate-400 mb-8 text-base sm:text-lg">
            Let&apos;s figure it out together.
          </p>
        </AnimatedSection>
        <AnimatedSection delay={0.16}>
          <Button
            onClick={() => navigate("contact")}
            className="bg-white text-[#050a12] font-semibold px-8 py-3.5 rounded-sm hover:bg-slate-100 h-auto"
          >
            Get in Touch
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
}