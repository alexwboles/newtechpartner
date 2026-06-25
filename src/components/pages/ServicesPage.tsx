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

// ─── Inline helper: scroll-triggered fade-up ──────────────────────────
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
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Featured card data ───────────────────────────────────────────────
interface FeaturedCard {
  num: string;
  title: string;
  description: string;
  checks: string[];
  image: string;
  reversed: boolean;
}

const featuredCards: FeaturedCard[] = [
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
      "Custom websites, mobile-friendly booking forms, landing pages, and full apps delivered in days — not months.",
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
      "Business email setup, cloud storage, two-factor auth, team file sharing, and priority 48-hour support with monthly recaps.",
    checks: [
      "48-hour priority response",
      "Monthly work recaps",
      "Full system security setup",
    ],
    image: "/img/team-collab.jpg",
    reversed: false,
  },
];

// ─── All services grid data ───────────────────────────────────────────
interface ServiceItem {
  icon: ReactNode;
  title: string;
  bullets: string[];
}

const allServices: ServiceItem[] = [
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

// ─── Services page ────────────────────────────────────────────────────
export default function ServicesPage({
  navigate,
}: {
  navigate: (page: string) => void;
}) {
  return (
    <section className="relative min-h-screen">
      <div className="relative z-10">
        {/* ── 1. PAGE HEADER ─────────────────────────────────────── */}
        <div className="pt-32 pb-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-400 font-medium text-center mb-4">
              OUR SERVICES
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-center tracking-tight">
              30+ Services. One Flat Rate.
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="max-w-xl mx-auto text-slate-400 text-lg text-center mt-6">
              Everything your business needs to run on modern technology —
              starting today.
            </p>
          </AnimatedSection>
        </div>

        {/* ── 2. FEATURED SERVICES ───────────────────────────────── */}
        <div className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {featuredCards.map((card, index) => (
            <AnimatedSection
              key={card.num}
              delay={index * 0.1}
              className="mb-4 last:mb-0"
            >
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image */}
                <div
                  className={`relative ${
                    card.reversed ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      unoptimized
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>

                {/* Text */}
                <div
                  className={`p-8 sm:p-12 flex flex-col justify-center min-h-[400px] ${
                    card.reversed ? "bg-[#0a0f1a]" : "bg-[#080e1a]"
                  } ${card.reversed ? "lg:order-1" : "lg:order-2"}`}
                >
                  <span className="text-5xl font-bold text-white/5 mb-4">
                    {card.num}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {card.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed mb-6">
                    {card.description}
                  </p>
                  <ul className="space-y-3">
                    {card.checks.map((check, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-slate-300"
                      >
                        <Check className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{check}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* ── 3. ALL SERVICES GRID ───────────────────────────────── */}
        <div className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-divider mb-16" />

          <AnimatedSection>
            <h2 className="text-2xl font-bold text-white text-center mb-12">
              The Complete Service List
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-4">
            {allServices.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 0.06}>
                <div className="pro-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
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
                        • {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* ── 4. BOTTOM CTA ──────────────────────────────────────── */}
        <div className="py-20 text-center">
          <AnimatedSection>
            <p className="text-xl font-medium text-white mb-3">
              Not sure what you need?
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="text-slate-400 mb-8">
              Let&apos;s figure it out together.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <Button
              onClick={() => navigate("contact")}
              className="bg-white text-[#050a12] font-semibold px-8 py-3.5 rounded-lg hover:bg-slate-100"
            >
              Get in Touch
            </Button>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}