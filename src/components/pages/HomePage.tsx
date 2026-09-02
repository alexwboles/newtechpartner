"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [videoReady, setVideoReady] = useState(false);

  return (
    <div>
      {/* ──────────────── 1. HERO ──────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Ken Burns image fallback — visible until video is ready, then hidden behind it */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            videoReady ? "opacity-0" : "opacity-100"
          }`}
        >
          <img
            src="/img/hero-office.jpg"
            alt=""
            className="kenburns object-cover w-full h-full"
            loading="eager"
          />
        </div>

        {/* Primary video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          onCanPlayThrough={() => setVideoReady(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src="/video/hero-bg.mp4" type="video/mp4" />
        </video>

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
              className="bg-white text-[#050a12] font-semibold px-8 py-3.5 rounded-sm hover:bg-slate-100 transition-colors h-auto text-base cursor-pointer"
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              onClick={() => navigate("services")}
              variant="outline"
              className="border-white/20 text-white px-8 py-3.5 rounded-sm hover:bg-white/5 transition-colors h-auto text-base bg-transparent cursor-pointer"
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

      {/* ──────────────── 2. LOGO / INDUSTRY STRIP ──────────────── */}
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
              <div className="rounded-sm overflow-hidden aspect-[4/3]">
                <img
                  src="/img/team-collab.jpg"
                  alt="Team collaborating on a project"
                  className="object-cover w-full h-full"
                  loading="lazy"
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
                  className="border-white/20 text-white px-8 py-3.5 rounded-sm hover:bg-white/5 transition-colors h-auto text-sm bg-transparent cursor-pointer"
                >
                  See All Services
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </AnimatedSection>

            {/* Right: Image — 4:3 aspect, NOT square */}
            <AnimatedSection delay={0.15}>
              <div className="rounded-sm overflow-hidden aspect-[4/3]">
                <img
                  src="/img/ai-chatbot.jpg"
                  alt="AI chatbot interface on a phone"
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ──────────────── 5. FINAL CTA ──────────────── */}
      <section className="py-32 relative overflow-hidden">
        {/* Background image at 12% opacity */}
        <img
          src="/img/tech-abstract.jpg"
          alt=""
          className="absolute inset-0 object-cover w-full h-full opacity-[0.12]"
          loading="lazy"
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
              className="bg-white text-[#050a12] font-semibold px-10 py-4 rounded-sm text-lg hover:bg-slate-100 transition-colors h-auto cursor-pointer"
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