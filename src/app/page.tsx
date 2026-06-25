"use client";

import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Menu,
  XIcon,
  ArrowRight,
  DollarSign,
  Clock,
  Zap,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─── Lazy-load page components ─── */
const HomePage = lazy(() => import("@/components/pages/HomePage"));
const ServicesPage = lazy(() => import("@/components/pages/ServicesPage"));
const PricingPage = lazy(() => import("@/components/pages/PricingPage"));
const HowItWorksPage = lazy(() => import("@/components/pages/HowItWorksPage"));
const FAQPage = lazy(() => import("@/components/pages/FAQPage"));
const ContactPage = lazy(() => import("@/components/pages/ContactPage"));

/* ─── Page transition ─── */
const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

/* ─── Page loading fallback ─── */
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-5 h-5 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
    </div>
  );
}

/* ─── NAVBAR ─── */
const navLinks = [
  { label: "Home", page: "home" },
  { label: "Services", page: "services" },
  { label: "Pricing", page: "pricing" },
  { label: "How It Works", page: "how-it-works" },
  { label: "FAQ", page: "faq" },
  { label: "Contact", page: "contact" },
];

function Navbar({
  currentPage,
  navigate,
}: {
  currentPage: string;
  navigate: (page: string) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const go = useCallback(
    (page: string) => {
      setMobileOpen(false);
      navigate(page);
    },
    [navigate]
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050a12]/85 backdrop-blur-xl border-b border-white/[0.04]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[72px]">
          {/* Logo */}
          <button
            onClick={() => go("home")}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-sm bg-emerald-500 flex items-center justify-center transition-transform group-hover:scale-105">
              <Cpu className="w-4 h-4 text-white" />
            </div>
            <span className="text-[15px] font-semibold tracking-tight text-white">
              TechPartner
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => go(link.page)}
                className={`px-3.5 py-2 text-[13px] rounded-sm transition-all duration-200 ${
                  currentPage === link.page
                    ? "text-white font-medium bg-white/[0.04]"
                    : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.02]"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <button onClick={() => go("contact")}>
              <span className="inline-flex items-center gap-2 text-[13px] font-medium text-[#050a12] bg-white hover:bg-slate-100 px-5 py-2 rounded-sm transition-colors">
                Get Started
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <XIcon className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            className="lg:hidden bg-[#050a12]/98 backdrop-blur-xl border-t border-white/[0.04]"
          >
            <div className="px-6 py-6 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => go(link.page)}
                  className={`block w-full text-left px-3 py-2.5 text-sm rounded-sm transition-colors ${
                    currentPage === link.page
                      ? "text-white font-medium bg-white/[0.04]"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-4 mt-3 border-t border-white/[0.04]">
                <button onClick={() => go("contact")} className="w-full">
                  <span className="inline-flex items-center justify-center gap-2 w-full text-sm font-medium text-[#050a12] bg-white hover:bg-slate-100 px-4 py-2.5 rounded-sm transition-colors">
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ─── FOOTER ─── */
function Footer({ navigate }: { navigate: (page: string) => void }) {
  return (
    <footer className="border-t border-white/[0.04] bg-[#050a12]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <button
              onClick={() => navigate("home")}
              className="flex items-center gap-2.5 mb-4"
            >
              <div className="w-8 h-8 rounded-sm bg-emerald-500 flex items-center justify-center">
                <Cpu className="w-4 h-4 text-white" />
              </div>
              <span className="text-[15px] font-semibold tracking-tight text-white">
                TechPartner
              </span>
            </button>
            <p className="text-sm text-slate-600 leading-relaxed max-w-[260px]">
              Your dedicated monthly tech partner for AI, apps, websites, and
              more — all for one flat fee.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[11px] font-medium text-slate-400 uppercase tracking-[0.15em] mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {[
                { label: "AI Automation", page: "services" },
                { label: "Custom Apps", page: "services" },
                { label: "Website Development", page: "services" },
                { label: "Payment Systems", page: "services" },
                { label: "Marketing Tools", page: "services" },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => navigate(item.page)}
                    className="text-sm text-slate-600 hover:text-slate-300 transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[11px] font-medium text-slate-400 uppercase tracking-[0.15em] mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { label: "How It Works", page: "how-it-works" },
                { label: "Pricing", page: "pricing" },
                { label: "FAQ", page: "faq" },
                { label: "Contact", page: "contact" },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => navigate(item.page)}
                    className="text-sm text-slate-600 hover:text-slate-300 transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Stats */}
          <div>
            <h4 className="text-[11px] font-medium text-slate-400 uppercase tracking-[0.15em] mb-5">
              Why TechPartner
            </h4>
            <ul className="space-y-3">
              {[
                { icon: DollarSign, text: "Flat $200/mo" },
                { icon: Clock, text: "48-hour response" },
                { icon: Zap, text: "3–7 day delivery" },
                { icon: Wrench, text: "30+ services" },
              ].map((item) => (
                <li key={item.text} className="flex items-center gap-2.5">
                  <item.icon className="w-3.5 h-3.5 text-emerald-500/60 shrink-0" />
                  <span className="text-sm text-slate-600">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-700">
            &copy; {new Date().getFullYear()} TechPartner. All rights reserved.
          </p>
          <p className="text-xs text-slate-700">
            No contracts. Cancel anytime.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── PAGE RENDERER ─── */
function PageRenderer({ page, navigate }: { page: string; navigate: (page: string) => void }) {
  const pages: Record<string, React.ReactNode> = {
    home: <HomePage navigate={navigate} />,
    services: <ServicesPage navigate={navigate} />,
    pricing: <PricingPage navigate={navigate} />,
    "how-it-works": <HowItWorksPage navigate={navigate} />,
    faq: <FAQPage navigate={navigate} />,
    contact: <ContactPage navigate={navigate} />,
  };

  return (
    <Suspense fallback={<PageLoader />}>
      {pages[page] || <HomePage navigate={navigate} />}
    </Suspense>
  );
}

/* ─── MAIN APP ─── */
export default function TechPartnerApp() {
  const [currentPage, setCurrentPage] = useState("home");

  const navigate = useCallback((page: string) => {
    setCurrentPage(page);
    if (page === "home") {
      window.history.replaceState(null, "", "/");
    } else {
      window.history.replaceState(null, "", `#/${page}`);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#/", "");
      if (hash && navLinks.some((l) => l.page === hash)) {
        setCurrentPage(hash);
      } else {
        setCurrentPage("home");
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#050a12] text-slate-200">
      <Navbar currentPage={currentPage} navigate={navigate} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex-1"
        >
          <PageRenderer page={currentPage} navigate={navigate} />
        </motion.div>
      </AnimatePresence>

      <Footer navigate={navigate} />
    </div>
  );
}