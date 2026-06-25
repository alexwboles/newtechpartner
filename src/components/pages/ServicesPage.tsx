"use client";

import { useState, useRef, type ReactNode } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  Bot,
  ChevronDown,
  Cpu,
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
import { Badge } from "@/components/ui/badge";

// ─── Inline helper: scroll-triggered fade-in ─────────────────────────
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
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Service category data ────────────────────────────────────────────
interface ServiceCategory {
  id: string;
  title: string;
  icon: ReactNode;
  color: string;
  iconGradient: string;
  iconText: string;
  hoverBorder: string;
  items: string[];
}

const serviceCategories: ServiceCategory[] = [
  {
    id: "ai-tools",
    title: "AI Tools & Smart Automation",
    icon: <Bot className="h-6 w-6" />,
    color: "emerald",
    iconGradient: "from-emerald-500/20 to-emerald-500/5",
    iconText: "text-emerald-400",
    hoverBorder: "hover:border-emerald-500/30",
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
    id: "apps-tools",
    title: "Apps & Custom Tools",
    icon: <Code2 className="h-6 w-6" />,
    color: "cyan",
    iconGradient: "from-cyan-500/20 to-cyan-500/5",
    iconText: "text-cyan-400",
    hoverBorder: "hover:border-cyan-500/30",
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
    id: "financial-data",
    title: "Financial & Data Tools",
    icon: <CreditCard className="h-6 w-6" />,
    color: "amber",
    iconGradient: "from-amber-500/20 to-amber-500/5",
    iconText: "text-amber-400",
    hoverBorder: "hover:border-amber-500/30",
    items: [
      "Enable your site to take on-site payment via credit card or other payment forms",
      "Connect your payment system to automatically log transactions in a spreadsheet",
      "Build financial dashboards to track revenue, expenses, and cash flow",
      "Set up automated invoicing and payment reminder systems",
    ],
  },
  {
    id: "website-setup",
    title: "Website & Online Setup",
    icon: <Globe className="h-6 w-6" />,
    color: "violet",
    iconGradient: "from-violet-500/20 to-violet-500/5",
    iconText: "text-violet-400",
    hoverBorder: "hover:border-violet-500/30",
    items: [
      "Build or refresh your website with custom features — I build, design, and code",
      "Connect your custom domain and set up business email addresses",
      "Add online booking, contact forms, or payment options to your site",
      "Create landing pages for special promotions, events, or seasonal offers",
      "Quickly update menus, service lists, photos, and contact info on your existing site",
    ],
  },
  {
    id: "business-security",
    title: "Business Systems & Security",
    icon: <ShieldCheck className="h-6 w-6" />,
    color: "rose",
    iconGradient: "from-rose-500/20 to-rose-500/5",
    iconText: "text-rose-400",
    hoverBorder: "hover:border-rose-500/30",
    items: [
      "Set up business email and cloud storage (Google Workspace or Microsoft 365)",
      "Add two-factor authentication and secure password systems to protect accounts",
      "Connect apps so information flows between your phone, computer, and team devices",
      "Organize shared folders so your team can access files from any device",
      "Install and configure most types of basic software",
    ],
  },
  {
    id: "tech-support",
    title: "Ongoing Tech Support",
    icon: <Headphones className="h-6 w-6" />,
    color: "sky",
    iconGradient: "from-sky-500/20 to-sky-500/5",
    iconText: "text-sky-400",
    hoverBorder: "hover:border-sky-500/30",
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
    id: "marketing-growth",
    title: "Marketing & Growth Tools",
    icon: <Megaphone className="h-6 w-6" />,
    color: "orange",
    iconGradient: "from-orange-500/20 to-orange-500/5",
    iconText: "text-orange-400",
    hoverBorder: "hover:border-orange-500/30",
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
    id: "team-workflow",
    title: "Team & Workflow Automation",
    icon: <Workflow className="h-6 w-6" />,
    color: "teal",
    iconGradient: "from-teal-500/20 to-teal-500/5",
    iconText: "text-teal-400",
    hoverBorder: "hover:border-teal-500/30",
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

// ─── Expandable service card ──────────────────────────────────────────
function ServiceCard({
  category,
  index,
  isExpanded,
  onToggle,
}: {
  category: ServiceCategory;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <AnimatedSection delay={index * 0.08}>
      <div
        className={`glass-card rounded-2xl p-6 transition-all duration-300 cursor-pointer ${category.hoverBorder} ${
          isExpanded ? "bg-[rgba(17,24,39,0.8)]" : ""
        }`}
        onClick={onToggle}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
      >
        {/* Card header */}
        <div className="flex items-center gap-4">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${category.iconGradient}`}
          >
            <span className={category.iconText}>{category.icon}</span>
          </div>
          <h3 className="flex-1 text-lg font-semibold text-foreground">
            {category.title}
          </h3>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-muted-foreground"
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </div>

        {/* Expanded checklist */}
        <AnimatePresence>
          {isExpanded && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-5 space-y-3 border-t border-border/50 pt-5">
                {category.items.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${category.iconText}`}
                    />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </div>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </AnimatedSection>
  );
}

// ─── Services page ────────────────────────────────────────────────────
export default function ServicesPage({
  navigate,
}: {
  navigate: (page: string) => void;
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative min-h-screen grid-bg">
      {/* Noise overlay */}
      <div className="noise-overlay pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-24">
        {/* ── Page header ─────────────────────────────────────── */}
        <div className="pt-32 pb-12 text-center">
          <AnimatedSection>
            <Badge
              variant="outline"
              className="mb-6 border-emerald-500/30 text-emerald-400"
            >
              Everything Included
            </Badge>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              30+ Services.{" "}
              <span className="gradient-text">One Flat Rate.</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Tap any category to see the full list. No hidden fees, no
              surprises. Everything your business needs to run on modern tech.
            </p>
          </AnimatedSection>
        </div>

        {/* ── Services grid ────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {serviceCategories.map((category, index) => (
            <ServiceCard
              key={category.id}
              category={category}
              index={index}
              isExpanded={expandedId === category.id}
              onToggle={() => handleToggle(category.id)}
            />
          ))}
        </div>

        {/* ── Bottom CTA ───────────────────────────────────────── */}
        <AnimatedSection className="mt-16 text-center" delay={0.15}>
          <p className="mb-4 text-lg text-muted-foreground">
            Not sure what you need?
          </p>
          <Button
            size="lg"
            className="glow-emerald rounded-full bg-emerald-600 px-8 text-base font-medium text-white hover:bg-emerald-500"
            onClick={() => navigate("contact")}
          >
            Let&apos;s Figure It Out
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
}