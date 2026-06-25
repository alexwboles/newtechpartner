"use client";

import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  ChevronDown,
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

/* ─── Page transition variants ─── */
const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3, ease: "easeIn" } },
};

/* ─── Page loading fallback ─── */
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center animate-pulse">
          <Cpu className="w-5 h-5 text-white" />
        </div>
        <p className="text-sm text-slate-500 animate-pulse">Loading...</p>
      </div>
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
    const handle = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  // Wrapper that closes mobile menu then navigates
  const go = useCallback(
    (page: string) => {
      setMobileOpen(false);
      navigate(page);
    },
    [navigate]
  );

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
          <button
            onClick={() => go("home")}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center transition-transform group-hover:scale-110">
              <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight">
              Tech<span className="text-emerald-400">Partner</span>
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => go(link.page)}
                className={`px-3 py-2 text-sm rounded-lg transition-all ${
                  currentPage === link.page
                    ? "text-emerald-400 bg-emerald-500/10 font-medium"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <button onClick={() => go("contact")}>
              <Button
                size="sm"
                className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/40"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
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
            className="lg:hidden bg-[#0a0f1a]/95 backdrop-blur-xl border-b border-white/5"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => go(link.page)}
                  className={`block w-full text-left px-3 py-2.5 text-sm rounded-lg transition-colors ${
                    currentPage === link.page
                      ? "text-emerald-400 bg-emerald-500/10 font-medium"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-3 border-t border-white/5">
                <button onClick={() => go("contact")} className="w-full">
                  <Button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ─── FOOTER ─── */
function Footer({ navigate }: { navigate: (page: string) => void }) {
  return (
    <footer className="relative border-t border-white/5 bg-[#0a0f1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <button
              onClick={() => navigate("home")}
              className="flex items-center gap-2 mb-4"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                <Cpu className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">
                Tech<span className="text-emerald-400">Partner</span>
              </span>
            </button>
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
                    className="text-sm text-slate-500 hover:text-emerald-400 transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "How It Works", page: "how-it-works" },
                { label: "Pricing", page: "pricing" },
                { label: "FAQ", page: "faq" },
                { label: "Contact", page: "contact" },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => navigate(item.page)}
                    className="text-sm text-slate-500 hover:text-emerald-400 transition-colors"
                  >
                    {item.label}
                  </button>
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
    // Update URL hash for deep linking
    if (page === "home") {
      window.history.replaceState(null, "", "/");
    } else {
      window.history.replaceState(null, "", `#/${page}`);
    }
    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Handle hash changes (back/forward browser navigation)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#/", "");
      if (hash && navLinks.some((l) => l.page === hash)) {
        setCurrentPage(hash);
      } else {
        setCurrentPage("home");
      }
    };

    // Set initial page from hash
    handleHash();

    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <div className="min-h-screen flex flex-col noise-overlay relative">
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