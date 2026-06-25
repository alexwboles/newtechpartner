"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Sparkles,
  ChevronDown,
  ArrowRight,
  Check,
  Star,
  Bot,
  Zap,
  Clock,
  Quote,
  MousePointerClick,
  Cpu,
  Layers,
  LineChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/* ────────────────────────────── Helper Components ────────────────────────────── */

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
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FloatingParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    opacity: Math.random() * 0.4 + 0.1,
    duration: `${Math.random() * 6 + 4}s`,
    delay: `${Math.random() * 5}s`,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle absolute rounded-full bg-emerald-400"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            ["--duration" as string]: p.duration,
            ["--delay" as string]: p.delay,
          }}
        />
      ))}
    </div>
  );
}

function CountUp({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

/* ────────────────────────────── Main Component ────────────────────────────── */

export default function HomePage({
  navigate,
}: {
  navigate: (page: string) => void;
}) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  /* ──────────────── 1. HERO SECTION ──────────────── */
  const heroSection = (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image + overlays */}
      <motion.div className="absolute inset-0" style={{ y: heroY }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-bg.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a]/70 via-[#0a0f1a]/50 to-[#0a0f1a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1a]/60 via-transparent to-[#0a0f1a]/60" />
      </motion.div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg" />

      {/* Floating particles */}
      <FloatingParticles />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center"
        style={{ opacity: heroOpacity }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Badge
            variant="outline"
            className="mb-8 px-4 py-2 text-sm border-emerald-500/30 bg-emerald-500/5 text-emerald-300 gap-2 rounded-full"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Business Technology
          </Badge>
        </motion.div>

        {/* H1 */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          Your Entire Tech
          <br />
          <span className="gradient-text">Department</span>
          <br />
          <span className="text-slate-200">
            for{" "}
          </span>
          <span className="gradient-text">$200</span>
          <span className="text-slate-200">/mo</span>

          {/* SVG underline */}
          <svg
            className="mx-auto mt-2 block"
            viewBox="0 0 400 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="400"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              d="M2 8 Q100 2 200 7 Q300 12 398 4"
              stroke="url(#emerald-underline)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <defs>
              <linearGradient
                id="emerald-underline"
                x1="0"
                y1="0"
                x2="400"
                y2="0"
              >
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-4 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          AI automation, custom apps, websites, dashboards, and 24/7
          support — all handled by a dedicated team of senior engineers and AI
          specialists.
        </motion.p>
        <motion.p
          className="text-base font-medium text-emerald-400 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          No contracts. No surprises.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Button
            size="lg"
            className="glow-emerald bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-8 py-6 text-base rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer"
            onClick={() => navigate("contact")}
          >
            Get Your Custom Plan
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white font-medium px-8 py-6 text-base rounded-xl transition-all duration-300 cursor-pointer"
            onClick={() => navigate("services")}
          >
            See All 30+ Services
            <ChevronDown className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className="glass-card rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
            {[
              {
                value: 30,
                suffix: "+",
                label: "Services",
                icon: <Layers className="w-4 h-4 text-emerald-400" />,
              },
              {
                value: 48,
                suffix: "h",
                label: "Response",
                icon: <Clock className="w-4 h-4 text-emerald-400" />,
              },
              {
                value: 100,
                suffix: "%",
                label: "Satisfaction",
                icon: <LineChart className="w-4 h-4 text-emerald-400" />,
              },
              {
                value: 0,
                suffix: "",
                label: "Contracts",
                icon: <Check className="w-4 h-4 text-emerald-400" />,
                display: "Zero",
              },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  {stat.icon}
                  <span className="text-2xl sm:text-3xl font-bold text-white">
                    {stat.display ? (
                      stat.display
                    ) : (
                      <CountUp
                        target={stat.value}
                        suffix={stat.suffix}
                      />
                    )}
                  </span>
                </div>
                <span className="text-sm text-slate-400">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-slate-500"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          {/* Mouse icon */}
          <div className="w-6 h-10 rounded-full border-2 border-slate-500/50 flex items-start justify-center pt-2">
            <motion.div
              className="w-1 h-2.5 bg-emerald-400 rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );

  /* ──────────────── 2. SOCIAL PROOF STRIP ──────────────── */
  const industries = [
    "Healthcare",
    "Real Estate",
    "E-Commerce",
    "Education",
    "Finance",
    "Hospitality",
  ];

  const socialProofStrip = (
    <section className="border-y border-white/[0.06] py-12 bg-[#0a0f1a] relative overflow-hidden">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <p className="text-center text-sm uppercase tracking-widest text-slate-500 mb-8">
            Trusted by businesses across every industry
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {industries.map((industry, i) => (
              <motion.div
                key={industry}
                className="flex items-center justify-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors duration-300"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Star className="w-4 h-4 text-emerald-500/70 fill-emerald-500/70" />
                <span className="font-medium text-sm">{industry}</span>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );

  /* ──────────────── 3. VALUE PROPS SECTION ──────────────── */
  const valueProps = [
    {
      icon: <Bot className="w-6 h-6" />,
      title: "AI-First Approach",
      description:
        "Automate, scale, and stay ahead with AI built into every tool. From intelligent chatbots to predictive analytics, your business runs smarter — not harder.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Everything Included",
      description:
        "30+ services, one flat rate, no per-project fees. Websites, apps, automations, dashboards, and 24/7 support — all under a single, predictable subscription.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Days, Not Months",
      description:
        "Most projects delivered in 3–7 business days. No bloated timelines, no scope creep. Just fast, high-quality results that move your business forward.",
    },
  ];

  const valuePropsSection = (
    <section className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 px-3 py-1 text-xs border-emerald-500/30 bg-emerald-500/5 text-emerald-300 rounded-full"
          >
            <Cpu className="w-3 h-3 mr-1" />
            Why TechPartner
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Built for businesses that
            <br />
            <span className="gradient-text">move fast</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Stop juggling freelancers, agencies, and in-house hires. Get a
            complete tech department that scales with you.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {valueProps.map((prop, i) => (
            <AnimatedSection key={prop.title} delay={i * 0.15}>
              <div className="glass-card rounded-2xl p-6 sm:p-8 h-full transition-all duration-500 hover:scale-[1.02] group cursor-default">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center mb-5 group-hover:from-emerald-500/30 group-hover:to-cyan-500/30 transition-colors duration-300">
                  <span className="text-emerald-400">{prop.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {prop.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">
                  {prop.description}
                </p>
                <button
                  onClick={() => navigate("services")}
                  className="inline-flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors duration-300 group/link cursor-pointer"
                >
                  Learn more
                  <ArrowRight className="ml-1 w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                </button>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );

  /* ──────────────── 4. TESTIMONIALS SECTION ──────────────── */
  const testimonials = [
    {
      quote:
        "TechPartner cut our admin workload by 50% with custom automations we didn't even know were possible. Our team finally focuses on what matters — our clients.",
      author: "Sarah M.",
      role: "Founder, Bloom Wellness Studio",
      metric: "50% less admin time",
      icon: <MousePointerClick className="w-4 h-4" />,
    },
    {
      quote:
        "We were paying $4,000/month for a part-time IT guy who could barely keep up. Now we get faster support, better tools, and we're saving a fortune.",
      author: "James R.",
      role: "Owner, JR Properties",
      metric: "$3,800/mo saved",
      icon: <LineChart className="w-4 h-4" />,
    },
    {
      quote:
        "In six months, we've submitted over 30 requests — websites, dashboards, automations — and every single one was delivered on time. Absolutely incredible service.",
      author: "Maria L.",
      role: "Operations Director, FreshBite Catering",
      metric: "30+ requests fulfilled",
      icon: <Layers className="w-4 h-4" />,
    },
  ];

  const testimonialsSection = (
    <section className="py-24 sm:py-32 relative bg-[#080c16]">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 px-3 py-1 text-xs border-emerald-500/30 bg-emerald-500/5 text-emerald-300 rounded-full"
          >
            <Star className="w-3 h-3 mr-1" />
            Testimonials
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Loved by businesses
            <br />
            <span className="gradient-text">just like yours</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Don't take our word for it — hear from the teams that transformed
            their operations with TechPartner.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.author} delay={i * 0.15}>
              <div className="glass-card rounded-2xl p-6 sm:p-8 h-full flex flex-col transition-all duration-500 hover:scale-[1.02] group">
                {/* Quote icon */}
                <div className="mb-5">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <Quote className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>

                {/* Quote text */}
                <p className="text-slate-300 text-sm leading-relaxed flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 flex items-center justify-center text-sm font-bold text-emerald-300">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {t.author}
                    </p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>

                {/* Metric badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit">
                  {t.icon}
                  <span className="text-xs font-semibold text-emerald-400">
                    {t.metric}
                  </span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );

  /* ──────────────── 5. FINAL CTA SECTION ──────────────── */
  const finalCtaSection = (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Ready to Transform
            <br />
            <span className="gradient-text">Your Business?</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Join hundreds of businesses that replaced unpredictable tech costs
            with one simple, powerful subscription. Your complete tech team is
            ready.
          </p>
          <Button
            size="lg"
            className="glow-emerald-strong bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-10 py-7 text-lg rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer"
            onClick={() => navigate("contact")}
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );

  /* ──────────────── RENDER ──────────────── */
  return (
    <div>
      {heroSection}
      {socialProofStrip}
      {valuePropsSection}
      {testimonialsSection}
      {finalCtaSection}
    </div>
  );
}