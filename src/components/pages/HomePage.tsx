"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

/* ────────────────────────────── Helper Component ────────────────────────────── */

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
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ────────────────────────────── Main Component ────────────────────────────── */

export default function HomePage({
  navigate,
}: {
  navigate: (page: string) => void;
}) {
  return (
    <div>
      {/* ──────────────── 1. HERO ──────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated gradient fallback (visible behind / if image fails) */}
        <div className="absolute inset-0 hero-video-bg" />

        {/* Ken Burns background image */}
        <div className="absolute inset-0">
          <Image
            src="/img/hero-office.jpg"
            alt=""
            fill
            unoptimized
            className="kenburns object-cover w-full h-full"
            priority
          />
        </div>

        {/* Overlays */}
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 hero-overlay-side" />

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8 text-center">
          <motion.p
            className="text-xs uppercase tracking-[0.3em] text-emerald-400 font-medium mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Business Technology Partner
          </motion.p>

          <motion.h1
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            Technology That Powers
            <br />
            Your Business Forward
          </motion.h1>

          <motion.p
            className="text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            AI automation, custom software, and ongoing tech support for a flat
            monthly fee. Everything included. No surprises.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
          >
            <Button
              onClick={() => navigate("contact")}
              className="bg-white text-[#050a12] font-semibold px-8 py-3.5 rounded-lg hover:bg-slate-100 transition-colors h-auto text-base cursor-pointer"
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              onClick={() => navigate("services")}
              variant="outline"
              className="border-white/20 text-white px-8 py-3.5 rounded-lg hover:bg-white/5 transition-colors h-auto text-base bg-transparent cursor-pointer"
            >
              View Services
            </Button>
          </motion.div>

          <motion.p
            className="text-sm text-slate-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            Starting at $200/month
          </motion.p>
        </div>
      </section>

      {/* ──────────────── 2. LOGO STRIP ──────────────── */}
      <section className="py-16">
        <div className="section-divider" />
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 mt-16">
          <AnimatedSection>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-600 text-center">
              Trusted by businesses across every industry
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 mt-8">
              {[
                "Healthcare",
                "Real Estate",
                "E-Commerce",
                "Professional Services",
                "Restaurants",
                "Fitness",
              ].map((industry) => (
                <span
                  key={industry}
                  className="text-sm text-slate-500 font-medium"
                >
                  {industry}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ──────────────── 3. VALUE PROPOSITION ──────────────── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything Your Business Needs
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto">
              One partner. One flat rate. 30+ services.
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Image */}
            <AnimatedSection>
              <div className="rounded-2xl overflow-hidden aspect-[4/3]">
                <Image
                  src="/img/team-collab.jpg"
                  alt="Team collaborating on a project"
                  width={1344}
                  height={768}
                  unoptimized
                  className="object-cover w-full h-full"
                />
              </div>
            </AnimatedSection>

            {/* Right: Feature blocks */}
            <div>
              <AnimatedSection delay={0.1}>
                <div>
                  <p className="text-sm text-emerald-400 uppercase tracking-wider font-medium mb-2">
                    AI-First Approach
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Integrate AI directly into your workflows — from 24/7
                    chatbots to automated marketing. We build smart systems that
                    work while you sleep.
                  </p>
                </div>
              </AnimatedSection>

              <div className="my-6 section-divider" />

              <AnimatedSection delay={0.2}>
                <div>
                  <p className="text-sm text-emerald-400 uppercase tracking-wider font-medium mb-2">
                    Built for Speed
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Most projects delivered in 3–7 business days. Custom apps,
                    websites, automations — ready when you need them.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── 4. RESULT SECTION ──────────────── */}
      <section className="py-24 bg-[#080e1a]">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <AnimatedSection>
              <div>
                <p className="text-xs text-emerald-400 uppercase tracking-[0.2em] font-medium mb-4">
                  THE RESULT
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
                  A Complete Tech Department for $200/Month
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  Replace expensive specialists, unpredictable invoices, and
                  months-long timelines with one flat monthly rate. You get a
                  full team of engineers, designers, and AI specialists — on call
                  whenever you need them.
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    "AI automations & custom chatbots",
                    "Website builds & updates",
                    "Payment systems & analytics",
                    "Priority ongoing support",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-sm text-slate-300"
                    >
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => navigate("services")}
                  variant="outline"
                  className="border-white/20 text-white px-8 py-3.5 rounded-lg hover:bg-white/5 transition-colors h-auto text-sm bg-transparent cursor-pointer"
                >
                  See All Services
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </AnimatedSection>

            {/* Right: Image */}
            <AnimatedSection delay={0.15}>
              <div className="rounded-2xl overflow-hidden aspect-square">
                <Image
                  src="/img/ai-chatbot.jpg"
                  alt="AI chatbot interface on a phone"
                  width={1024}
                  height={1024}
                  unoptimized
                  className="object-cover w-full h-full"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ──────────────── 5. TESTIMONIALS ──────────────── */}
      <section className="py-24">
        <div className="section-divider" />
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 mt-24">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              What Our Clients Say
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "TechPartner completely transformed how we handle bookings. Our AI chatbot handles 80% of customer questions now, and our custom app cut admin time in half.",
                name: "Sarah M.",
                role: "Owner, Bloom Wellness Studio",
                image: "/img/person-1.jpg",
                metric: "50% less admin time",
              },
              {
                quote:
                  "I was paying $4,000/month for a freelance developer who took weeks. TechPartner delivers in days and covers everything — website, payments, automation.",
                name: "James R.",
                role: "Founder, JR Properties",
                image: "/img/person-2.jpg",
                metric: "$3,800/mo saved",
              },
              {
                quote:
                  "The monthly recap emails are game-changers. I always know what was done, what's next, and I can request anything new. Feels like having a CTO on retainer.",
                name: "Maria L.",
                role: "COO, FreshBite Catering",
                image: "/img/person-3.jpg",
                metric: "30+ requests fulfilled",
              },
            ].map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.1}>
                <div className="pro-card p-8 flex flex-col h-full">
                  <p className="text-4xl text-emerald-500/30 font-serif mb-4">
                    &ldquo;
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed flex-1 mb-6">
                    {t.quote}
                  </p>
                  <div className="flex items-center gap-3 border-t border-white/6 pt-6">
                    <Image
                      src={t.image}
                      alt={t.name}
                      width={40}
                      height={40}
                      unoptimized
                      className="w-10 h-10 rounded-full object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white">
                        {t.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {t.role}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs shrink-0"
                    >
                      {t.metric}
                    </Badge>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── 6. FINAL CTA ──────────────── */}
      <section className="py-32 relative overflow-hidden">
        {/* Background image at 15% opacity */}
        <Image
          src="/img/tech-abstract.jpg"
          alt=""
          fill
          unoptimized
          className="object-cover w-full h-full opacity-[0.15]"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050a12] via-[#050a12]/80 to-[#050a12]/60" />

        {/* Content */}
        <div className="relative z-10 max-w-2xl mx-auto px-6 sm:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              Get a personalized tech strategy. No commitment, no pressure.
            </p>
            <Button
              onClick={() => navigate("contact")}
              className="bg-white text-[#050a12] font-semibold px-10 py-4 rounded-lg text-lg hover:bg-slate-100 transition-colors h-auto cursor-pointer"
            >
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}