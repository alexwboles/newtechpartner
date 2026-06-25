"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Bot,
  ChevronDown,
  Cpu,
  Globe,
  Lock,
  Mail,
  Megaphone,
  Workflow,
  Wrench,
  Zap,
  ArrowRight,
  Check,
  X,
  Menu,
  XIcon,
  Sparkles,
  DollarSign,
  Clock,
  Headphones,
  BarChart3,
  MousePointerClick,
  Code2,
  Smartphone,
  CreditCard,
  ShieldCheck,
  FolderSync,
  MailCheck,
  LineChart,
  QrCode,
  Search,
  PenTool,
  Bell,
  ClipboardList,
  Timer,
  FileText,
  ThumbsUp,
  MousePointer,
  Star,
  Quote,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/* ─── ANIMATED SECTION WRAPPER ─── */
function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── FLOATING PARTICLES ─── */
function FloatingParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 4,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.5 + 0.1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-emerald-500 particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            "--duration": `${p.duration}s`,
            "--delay": `${p.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

/* ─── COUNT UP ANIMATION ─── */
function CountUp({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ──────────────────────────────────────────────
   NAVBAR
   ────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const links = [
    { label: "Services", href: "#services" },
    { label: "Pricing", href: "#pricing" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0f1a]/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center transition-transform group-hover:scale-110">
              <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight">
              Tech<span className="text-emerald-400">Partner</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a href="#contact">
              <Button
                size="sm"
                className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/40"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <XIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0f1a]/95 backdrop-blur-xl border-b border-white/5"
          >
            <div className="px-4 py-4 space-y-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-white/5">
                <a href="#contact" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ──────────────────────────────────────────────
   HERO
   ────────────────────────────────────────────── */
function Hero() {
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 0.3], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-bg.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a]/70 via-[#0a0f1a]/50 to-[#0a0f1a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1a]/60 via-transparent to-[#0a0f1a]/60" />
      </motion.div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg z-[1]" />

      {/* Particles */}
      <FloatingParticles />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] z-[1]" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Badge
            variant="outline"
            className="mb-6 px-4 py-1.5 text-sm border-emerald-500/30 bg-emerald-500/5 text-emerald-400 backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            AI-Powered Business Technology
          </Badge>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
        >
          Your Entire Tech
          <br />
          <span className="gradient-text">Department</span>
          <br />
          <span className="text-slate-300">for </span>
          <span className="relative inline-block">
            <span className="gradient-text">$200</span>
            <span className="text-slate-300">/mo</span>
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 200 8"
              fill="none"
            >
              <path
                d="M1 5.5C47 2 153 2 199 5.5"
                stroke="url(#underline-grad)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="underline-grad" x1="0" y1="0" x2="200" y2="0">
                  <stop stopColor="#10b981" />
                  <stop offset="1" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          AI automation, custom apps, websites, payment systems, and 24/7 support
          — all covered in one flat monthly plan.{" "}
          <span className="text-emerald-400 font-medium">No contracts. No surprises.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#contact">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-base px-8 py-6 shadow-xl shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Your Custom Plan
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </a>
          <a href="#services">
            <Button
              variant="outline"
              size="lg"
              className="border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-semibold text-base px-8 py-6 backdrop-blur-sm transition-all hover:scale-[1.02]"
            >
              See All 30+ Services
              <ChevronDown className="w-4 h-4 ml-1" />
            </Button>
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7 }}
          className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-3xl mx-auto"
        >
          {[
            { value: 30, suffix: "+", label: "Services Included" },
            { value: 48, suffix: "h", label: "Response Time" },
            { value: 100, suffix: "%", label: "Satisfaction Rate" },
            { value: 0, prefix: "$", suffix: " contracts", label: "No Hidden Fees", isText: true },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {stat.isText ? (
                  <span>Zero</span>
                ) : (
                  <CountUp target={stat.value} suffix={stat.suffix} prefix={stat.prefix || ""} />
                )}
              </div>
              <div className="text-xs sm:text-sm text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   SOCIAL PROOF STRIP
   ────────────────────────────────────────────── */
function SocialProof() {
  const logos = [
    "Local Restaurants",
    "Real Estate Firms",
    "Healthcare Clinics",
    "Legal Practices",
    "E-Commerce Brands",
    "Fitness Studios",
  ];

  return (
    <section className="relative py-12 sm:py-16 border-y border-white/5 bg-[#0a0f1a]">
      <AnimatedSection>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-slate-500 uppercase tracking-widest mb-8 font-medium">
            Trusted by businesses across every industry
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {logos.map((name) => (
              <div
                key={name}
                className="text-slate-600 text-sm sm:text-base font-medium tracking-wide flex items-center gap-2"
              >
                <Star className="w-3.5 h-3.5 text-emerald-500/60" />
                {name}
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}

/* ──────────────────────────────────────────────
   SERVICES
   ────────────────────────────────────────────── */
const serviceCategories = [
  {
    icon: Bot,
    title: "AI Tools & Smart Automation",
    color: "from-emerald-500/20 to-emerald-500/5",
    iconColor: "text-emerald-400",
    borderColor: "hover:border-emerald-500/30",
    items: [
      "Build a chat assistant for your website that answers customer questions 24/7",
      "Design AI-based high-end custom graphics, logos, and social media images",
      "Set up appointment reminders that send themselves via text or email",
      "Build simple dashboards based on your inputs, feedback, and design needs",
      "Create AI tools that respond to customer emails or booking requests automatically",
      "Many other projects based on your designs and requests",
    ],
  },
  {
    icon: Code2,
    title: "Apps & Custom Tools",
    color: "from-cyan-500/20 to-cyan-500/5",
    iconColor: "text-cyan-400",
    borderColor: "hover:border-cyan-500/30",
    items: [
      "Build custom apps in 7 days or less for field crews or front-of-house staff",
      "Add mobile-friendly booking or request forms to your website",
      "Add chat widget to your website that collects customer info for quick lead response",
      "Create one-off landing pages for special projects or unique one-time events",
      "Connect your site scheduling tool to your calendar so appointments sync automatically",
      "Assemble a variety of other tools based on your design and requests",
    ],
  },
  {
    icon: CreditCard,
    title: "Financial & Data Tools",
    color: "from-amber-500/20 to-amber-500/5",
    iconColor: "text-amber-400",
    borderColor: "hover:border-amber-500/30",
    items: [
      "Enable your site to take on-site payment via credit card or other payment forms",
      "Connect your payment system to automatically log transactions in a spreadsheet",
      "Build financial dashboards to track revenue, expenses, and cash flow",
      "Set up automated invoicing and payment reminder systems",
    ],
  },
  {
    icon: Globe,
    title: "Website & Online Setup",
    color: "from-violet-500/20 to-violet-500/5",
    iconColor: "text-violet-400",
    borderColor: "hover:border-violet-500/30",
    items: [
      "Build or refresh your website with custom features — I build, design, and code",
      "Connect your custom domain and set up business email addresses",
      "Add online booking, contact forms, or payment options to your site",
      "Create landing pages for special promotions, events, or seasonal offers",
      "Quickly update menus, service lists, photos, and contact info on your existing site",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Business Systems & Security",
    color: "from-rose-500/20 to-rose-500/5",
    iconColor: "text-rose-400",
    borderColor: "hover:border-rose-500/30",
    items: [
      "Set up business email and cloud storage (Google Workspace or Microsoft 365)",
      "Add two-factor authentication and secure password systems to protect accounts",
      "Connect apps so information flows between your phone, computer, and team devices",
      "Organize shared folders so your team can access files from any device",
      "Install and configure most types of basic software",
    ],
  },
  {
    icon: Headphones,
    title: "Ongoing Tech Support",
    color: "from-sky-500/20 to-sky-500/5",
    iconColor: "text-sky-400",
    borderColor: "hover:border-sky-500/30",
    items: [
      "Troubleshoot many basic software issues, app connections, or website problems",
      "Keep you updated on new tools or features that could help your business",
      "Review your current systems and suggest ways to save time or reduce costs",
      "Answer tech questions and provide monthly check-ins to keep everything running",
      "Priority response within 48 hours on all support tickets",
      "End-of-month recap of all work completed and upcoming recommendations",
    ],
  },
  {
    icon: Megaphone,
    title: "Marketing & Growth Tools",
    color: "from-orange-500/20 to-orange-500/5",
    iconColor: "text-orange-400",
    borderColor: "hover:border-orange-500/30",
    items: [
      "Set up and connect Google Analytics to track website traffic and conversions",
      "Build automated email drip campaigns for new leads and follow-ups",
      "Connect your CRM to your website so leads flow in automatically",
      "Create QR code campaigns for events, menus, or promotions",
      "Set up Google Business Profile optimizations to improve local search",
      "Design and schedule social media posts using AI-assisted tools",
    ],
  },
  {
    icon: Workflow,
    title: "Team & Workflow Automation",
    color: "from-teal-500/20 to-teal-500/5",
    iconColor: "text-teal-400",
    borderColor: "hover:border-teal-500/30",
    items: [
      "Set up automated task assignments when new jobs or orders come in",
      "Build internal team notification systems via email, text, or Slack",
      "Create digital onboarding checklists for new hires or clients",
      "Connect time-tracking tools to project management systems",
      "Automate invoice generation when jobs are marked complete",
      "Build approval workflows for quotes, purchases, or requests",
    ],
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof serviceCategories)[0];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className={`glass-card rounded-2xl transition-all duration-300 cursor-pointer group ${service.borderColor}`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center transition-transform group-hover:scale-110`}
            >
              <service.icon className={`w-5 h-5 ${service.iconColor}`} />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-emerald-300 transition-colors">
              {service.title}
            </h3>
          </div>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="mt-1 text-slate-500"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <ul className="space-y-2.5 pt-2 pb-1">
                {service.items.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-2.5 text-sm text-slate-400"
                  >
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${service.iconColor}`} />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function Services() {
  return (
    <section id="services" className="relative py-20 sm:py-28">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center mb-14 sm:mb-16">
          <Badge
            variant="outline"
            className="mb-4 px-3 py-1 text-xs border-emerald-500/30 bg-emerald-500/5 text-emerald-400"
          >
            Everything Included
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            30+ Services.{" "}
            <span className="gradient-text">One Flat Rate.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Tap any category to see the full list. No hidden fees, no surprises.
            Everything your business needs to run on modern tech.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {serviceCategories.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   PRICING COMPARISON
   ────────────────────────────────────────────── */
function Pricing() {
  const traditionalRoles = [
    { title: "Freelance Developer", cost: "$5,000/mo", note: "One skill set, long timelines" },
    { title: "Graphic Designer", cost: "$3,000/mo", note: "Visuals only, no tech help" },
    { title: "IT Support", cost: "$2,000/mo", note: "Tech fixes, but no building" },
    { title: "SaaS Tools Stack", cost: "$300–700/mo", note: "Disconnected, no support" },
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

  return (
    <section id="pricing" className="relative py-20 sm:py-28 bg-[#0a0f1a]/50">
      <div className="absolute inset-0 grid-bg opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center mb-14 sm:mb-16">
          <Badge
            variant="outline"
            className="mb-4 px-3 py-1 text-xs border-emerald-500/30 bg-emerald-500/5 text-emerald-400"
          >
            Smart Value
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            <span className="gradient-text">$200/mo</span> Replaces a{" "}
            <span className="gradient-text">$10k+ Team</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Instead of hiring multiple specialists, one flat monthly plan covers everything.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Traditional Way */}
          <AnimatedSection delay={0.1}>
            <div className="glass-card rounded-2xl p-6 sm:p-8 h-full">
              <h3 className="text-xl font-bold text-slate-300 mb-6 flex items-center gap-2">
                <X className="w-5 h-5 text-red-400" />
                The Traditional Way
              </h3>
              <div className="space-y-4">
                {traditionalRoles.map((role) => (
                  <div
                    key={role.title}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5"
                  >
                    <div>
                      <p className="font-semibold text-white text-sm sm:text-base">{role.title}</p>
                      <p className="text-xs sm:text-sm text-slate-500">{role.note}</p>
                    </div>
                    <span className="text-sm sm:text-base font-bold text-red-400 whitespace-nowrap ml-4">
                      {role.cost}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-slate-400 font-medium">Total per month</span>
                <span className="text-2xl font-extrabold text-red-400">$10,300+</span>
              </div>
            </div>
          </AnimatedSection>

          {/* TechPartner */}
          <AnimatedSection delay={0.2}>
            <div className="relative glass-card rounded-2xl p-6 sm:p-8 h-full border-emerald-500/20 glow-emerald">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-xs px-3 py-1 font-bold shadow-lg shadow-emerald-500/30">
                  BEST VALUE
                </Badge>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-400" />
                With TechPartner
              </h3>

              <div className="mb-6">
                <ul className="space-y-2.5 mt-4">
                  {techPartnerFeatures.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2.5 text-sm text-slate-300"
                    >
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-6 border-t border-emerald-500/10 flex items-end justify-between">
                <div>
                  <span className="text-xs sm:text-sm text-slate-500 block">All-inclusive, per month</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-extrabold gradient-text">$200</span>
                  </div>
                </div>
                <a href="#contact">
                  <Button className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all hover:scale-105">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   HOW IT WORKS
   ────────────────────────────────────────────── */
const steps = [
  {
    step: "01",
    icon: MousePointerClick,
    title: "Tell Me What You Need",
    description:
      "Share your tech challenges, goals, and ideas in a quick 2-minute consultation. No jargon, no pressure.",
  },
  {
    step: "02",
    icon: Layers,
    title: "I Build Your Custom Plan",
    description:
      "I create a prioritized roadmap tailored to your business. You approve it before any work starts.",
  },
  {
    step: "03",
    icon: Cpu,
    title: "I Build, Launch & Maintain",
    description:
      "I handle every build, integration, and update. You get results in days, not months. Plus ongoing support.",
  },
  {
    step: "04",
    icon: LineChart,
    title: "You Grow, I Scale With You",
    description:
      "As your business evolves, your tech stack evolves too. New requests, new tools — always included.",
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-20 sm:py-28">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/3 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center mb-14 sm:mb-16">
          <Badge
            variant="outline"
            className="mb-4 px-3 py-1 text-xs border-emerald-500/30 bg-emerald-500/5 text-emerald-400"
          >
            Simple Process
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            From first call to fully operational in days, not months.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, i) => (
            <AnimatedSection key={item.step} delay={i * 0.1}>
              <div className="relative glass-card rounded-2xl p-6 h-full group hover:glow-emerald transition-all duration-300">
                {/* Step number */}
                <span className="text-6xl font-black text-emerald-500/10 absolute top-4 right-4 select-none">
                  {item.step}
                </span>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                </div>
                {/* Connector line (hidden on last item and mobile) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-emerald-500/30 to-transparent" />
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   TESTIMONIALS
   ────────────────────────────────────────────── */
const testimonials = [
  {
    quote:
      "TechPartner completely transformed how we handle bookings. Our AI chatbot handles 80% of customer questions now, and our custom app cut admin time in half.",
    author: "Sarah M.",
    role: "Owner, Bloom Wellness Studio",
    metric: "50% less admin time",
  },
  {
    quote:
      "I was paying $4,000/month for a freelance developer who took weeks. TechPartner delivers in days and covers everything — website, payments, automation. It's a no-brainer.",
    author: "James R.",
    role: "Founder, JR Properties",
    metric: "$3,800/mo saved",
  },
  {
    quote:
      "The monthly recap emails are game-changers. I always know what was done, what's next, and I can request anything new. Feels like having a CTO on retainer.",
    author: "Maria L.",
    role: "COO, FreshBite Catering",
    metric: "30+ requests fulfilled",
  },
];

function Testimonials() {
  return (
    <section className="relative py-20 sm:py-28 bg-[#0a0f1a]/50">
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center mb-14 sm:mb-16">
          <Badge
            variant="outline"
            className="mb-4 px-3 py-1 text-xs border-emerald-500/30 bg-emerald-500/5 text-emerald-400"
          >
            Client Results
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Businesses <span className="gradient-text">Love</span> TechPartner
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="glass-card rounded-2xl p-6 h-full flex flex-col group hover:glow-emerald transition-all duration-300">
                <Quote className="w-8 h-8 text-emerald-500/30 mb-4" />
                <p className="text-sm text-slate-300 leading-relaxed flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white text-sm">{t.author}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-xs border-emerald-500/30 text-emerald-400 bg-emerald-500/5"
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
  );
}

/* ──────────────────────────────────────────────
   FAQ
   ────────────────────────────────────────────── */
const faqItems = [
  {
    q: "What exactly do I get for $200/month?",
    a: "You get access to 30+ tech services including AI automation, custom app development, website building, payment integrations, business email setup, marketing tools, workflow automation, and ongoing priority tech support. Everything is included — no per-project fees, no hourly rates.",
  },
  {
    q: "Is there a contract or commitment?",
    a: "No contracts, no long-term commitments. You pay month-to-month and can cancel anytime. We believe in earning your business every single month with results, not locking you in.",
  },
  {
    q: "How fast can I expect results?",
    a: "Most projects are delivered within 3–7 business days. Simple requests like website updates or form integrations can be done within 48 hours. More complex builds like custom apps typically take 5–7 days.",
  },
  {
    q: "What types of businesses do you work with?",
    a: "We work with small to mid-sized businesses across all industries — restaurants, real estate, healthcare, legal, e-commerce, fitness, professional services, and more. If you use technology in your business, TechPartner is for you.",
  },
  {
    q: "How do I communicate with my TechPartner?",
    a: "You get direct access via your preferred channel — email, text, or phone. Support tickets receive priority response within 48 hours. You also get a monthly recap of all work completed and upcoming recommendations.",
  },
  {
    q: "What if I need something not listed in the services?",
    a: "The service list covers the most common needs, but if you have a unique request, just ask! We love creative challenges and will let you know upfront if it's within scope or how we can make it work.",
  },
  {
    q: "Can I upgrade or get additional services?",
    a: "The $200/month plan is designed to be comprehensive. For enterprise-level needs or highly specialized projects, we can discuss custom arrangements. But for 95% of businesses, the standard plan covers everything.",
  },
];

function FAQ() {
  return (
    <section id="faq" className="relative py-20 sm:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center mb-14 sm:mb-16">
          <Badge
            variant="outline"
            className="mb-4 px-3 py-1 text-xs border-emerald-500/30 bg-emerald-500/5 text-emerald-400"
          >
            FAQ
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Got <span className="gradient-text">Questions?</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Everything you need to know about TechPartner.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="glass-card rounded-xl border-0 overflow-hidden data-[state=open]:glow-emerald transition-all"
              >
                <AccordionTrigger className="px-5 sm:px-6 py-4 sm:py-5 text-left text-sm sm:text-base font-semibold text-white hover:no-underline hover:text-emerald-300 transition-colors [&>svg]:text-emerald-500">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="px-5 sm:px-6 pb-4 sm:pb-5 text-sm text-slate-400 leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   CONTACT / CTA
   ────────────────────────────────────────────── */
function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px]" />
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection>
          <div className="glass-card rounded-3xl p-8 sm:p-12 text-center animated-border">
            <Badge
              variant="outline"
              className="mb-4 px-3 py-1 text-xs border-emerald-500/30 bg-emerald-500/5 text-emerald-400"
            >
              Let&apos;s Talk
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Ready to <span className="gradient-text">Transform</span> Your Business?
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10">
              Get a personalized tech strategy in just 2 minutes. No commitment, no pressure
              — just a conversation about how TechPartner can help you grow.
            </p>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center gap-3 py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <Check className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                  <p className="text-slate-400 text-sm">
                    We&apos;ll get back to you within 48 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="max-w-lg mx-auto space-y-4 text-left"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-slate-400 mb-1.5 block">Name</label>
                      <Input
                        required
                        placeholder="John Smith"
                        className="bg-white/5 border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/20 text-white placeholder:text-slate-600 h-11"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-400 mb-1.5 block">Business</label>
                      <Input
                        placeholder="Your Company"
                        className="bg-white/5 border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/20 text-white placeholder:text-slate-600 h-11"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 mb-1.5 block">Email</label>
                    <Input
                      type="email"
                      required
                      placeholder="john@company.com"
                      className="bg-white/5 border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/20 text-white placeholder:text-slate-600 h-11"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 mb-1.5 block">
                      What do you need help with?
                    </label>
                    <Textarea
                      placeholder="Tell us about your business and what tech challenges you're facing..."
                      rows={4}
                      className="bg-white/5 border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/20 text-white placeholder:text-slate-600 resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-base py-6 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all hover:scale-[1.01] active:scale-[0.99]"
                  >
                    Get Your Custom Plan
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <p className="text-xs text-slate-600 text-center">
                    Free consultation. No commitment. Response within 48 hours.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   FOOTER
   ────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#0a0f1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                <Cpu className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">
                Tech<span className="text-emerald-400">Partner</span>
              </span>
            </a>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Your dedicated monthly tech partner for AI, apps, websites, and more
              — all for one flat fee.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {["AI Automation", "Custom Apps", "Website Development", "Payment Systems", "Marketing Tools"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#services"
                      className="text-sm text-slate-500 hover:text-emerald-400 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {["How It Works", "Pricing", "FAQ", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm text-slate-500 hover:text-emerald-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Stats */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Why TechPartner
            </h4>
            <ul className="space-y-3">
              {[
                { icon: DollarSign, text: "Flat $200/mo — no surprises" },
                { icon: Clock, text: "48-hour priority response" },
                { icon: Zap, text: "3–7 day delivery" },
                { icon: Wrench, text: "30+ services included" },
              ].map((item) => (
                <li key={item.text} className="flex items-center gap-2.5">
                  <item.icon className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-sm text-slate-500">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} TechPartner. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            No contracts. Cancel anytime. Built for businesses that move fast.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ──────────────────────────────────────────────
   MAIN PAGE
   ────────────────────────────────────────────── */
export default function TechPartnerPage() {
  return (
    <main className="min-h-screen flex flex-col noise-overlay relative">
      <Navbar />
      <Hero />
      <SocialProof />
      <Services />
      <Pricing />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}