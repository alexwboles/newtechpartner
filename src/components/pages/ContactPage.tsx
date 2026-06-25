"use client";

import { useState, useRef, type ReactNode, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Mail, Clock, Zap, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/* ------------------------------------------------------------------ */
/*  AnimatedSection — subtle fade-up on scroll                        */
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
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Benefits data                                                      */
/* ------------------------------------------------------------------ */
const benefits = [
  {
    icon: Mail,
    title: "Direct Access",
    description: "No ticket queues. Real person, real answers.",
  },
  {
    icon: Clock,
    title: "Fast Response",
    description: "Priority support within 48 hours.",
  },
  {
    icon: Zap,
    title: "Rapid Delivery",
    description: "First projects delivered in days.",
  },
  {
    icon: Check,
    title: "No Commitment",
    description: "Cancel anytime. No contracts.",
  },
];

/* ------------------------------------------------------------------ */
/*  ContactPage                                                        */
/* ------------------------------------------------------------------ */
export default function ContactPage({
  navigate,
}: {
  navigate: (page: string) => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", business: "", email: "", message: "" });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    "bg-[#080e1a] border-white/[0.06] rounded-lg text-white placeholder:text-slate-600 focus:border-emerald-500/50";

  return (
    <div className="min-h-screen">
      {/* ----- 1. Header ----- */}
      <section className="pt-32 pb-8 text-center">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
          <AnimatedSection>
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-400 mb-6">
              Contact
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Let&apos;s Talk
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="mt-5 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Get a personalized tech strategy. No commitment, no pressure —
              just a conversation about how we can help.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ----- 2. Two Columns ----- */}
      <section className="mt-12 pb-24">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Left column: Why TechPartner (hidden on mobile) */}
            <div className="hidden lg:block lg:col-span-2">
              <AnimatedSection delay={0.1}>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-8">
                  Why TechPartner
                </p>

                <div className="flex flex-col">
                  {benefits.map((benefit, i) => {
                    const Icon = benefit.icon;
                    return (
                      <div
                        key={benefit.title}
                        className="py-5 border-b border-white/[0.04] first:pt-0 last:border-0"
                      >
                        <div className="flex items-start gap-3.5">
                          <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                            <Icon className="h-4 w-4 text-emerald-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">
                              {benefit.title}
                            </p>
                            <p className="text-sm text-slate-500 mt-0.5">
                              {benefit.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </AnimatedSection>
            </div>

            {/* Right column: Form */}
            <div className="lg:col-span-3">
              <AnimatedSection delay={0.2}>
                <div className="pro-card p-8 sm:p-10">
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-center justify-center py-16 text-center"
                      >
                        <div className="h-14 w-14 rounded-full bg-emerald-500/10 flex items-center justify-center mb-5">
                          <Check className="h-7 w-7 text-emerald-400" />
                        </div>
                        <h3 className="text-lg font-medium text-white mb-1">
                          Message received
                        </h3>
                        <p className="text-sm text-slate-400">
                          We&apos;ll get back to you within 48 hours.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.3 }}
                        onSubmit={handleSubmit}
                        className="space-y-5"
                      >
                        {/* Name + Business */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label
                              htmlFor="contact-name"
                              className="text-sm font-medium text-white/80"
                            >
                              Name <span className="text-emerald-400">*</span>
                            </label>
                            <Input
                              id="contact-name"
                              placeholder="John Smith"
                              required
                              value={formData.name}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  name: e.target.value,
                                }))
                              }
                              className={inputClass}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label
                              htmlFor="contact-business"
                              className="text-sm font-medium text-white/80"
                            >
                              Business
                            </label>
                            <Input
                              id="contact-business"
                              placeholder="Acme Inc."
                              value={formData.business}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  business: e.target.value,
                                }))
                              }
                              className={inputClass}
                            />
                          </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                          <label
                            htmlFor="contact-email"
                            className="text-sm font-medium text-white/80"
                          >
                            Email <span className="text-emerald-400">*</span>
                          </label>
                          <Input
                            id="contact-email"
                            type="email"
                            placeholder="john@example.com"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                email: e.target.value,
                              }))
                            }
                            className={inputClass}
                          />
                        </div>

                        {/* Message */}
                        <div className="space-y-1.5">
                          <label
                            htmlFor="contact-message"
                            className="text-sm font-medium text-white/80"
                          >
                            Message
                          </label>
                          <Textarea
                            id="contact-message"
                            placeholder="Tell us about your project or challenge..."
                            rows={4}
                            value={formData.message}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                message: e.target.value,
                              }))
                            }
                            className={`${inputClass} resize-none`}
                          />
                        </div>

                        {/* Submit */}
                        <button
                          type="submit"
                          className="w-full bg-white text-[#050a12] font-semibold rounded-lg hover:bg-slate-100 py-3 text-sm transition-colors"
                        >
                          Send Message
                        </button>

                        <p className="text-center text-xs text-slate-600 mt-4">
                          Free consultation. No commitment. Response within 48
                          hours.
                        </p>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}