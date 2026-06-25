"use client";

import { useState, useRef, type ReactNode, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Mail, Clock, Zap, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/* ------------------------------------------------------------------ */
/*  AnimatedSection helper                                             */
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
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
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
    text: "Direct access — no ticket queues",
  },
  {
    icon: Clock,
    text: "Response within 48 hours",
  },
  {
    icon: Zap,
    text: "First project delivered in days",
  },
  {
    icon: Check,
    text: "No contracts, cancel anytime",
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

  return (
    <div className="min-h-screen grid-bg noise-overlay relative">
      {/* ----- 1. Page Header ----- */}
      <section className="pt-32 pb-8 px-4 text-center relative z-10">
        <AnimatedSection>
          <Badge
            variant="outline"
            className="border-emerald-500/30 text-emerald-400 mb-6"
          >
            Let&apos;s Talk
          </Badge>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Ready to{" "}
            <span className="gradient-text">Transform</span>{" "}
            Your Business?
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="mt-5 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Get a personalized tech strategy in just 2 minutes. No commitment,
            no pressure — just a conversation about how TechPartner can help you
            grow.
          </p>
        </AnimatedSection>
      </section>

      {/* ----- 2. Contact Section ----- */}
      <section className="px-4 max-w-4xl mx-auto relative z-10 pb-4">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* --- Left Column: Benefits --- */}
          <div className="hidden lg:block lg:col-span-2">
            <AnimatedSection delay={0.1}>
              <div className="glass-card rounded-2xl p-8 h-full">
                <h3 className="text-xl font-bold mb-6">
                  Why businesses love TechPartner
                </h3>
                <div className="flex flex-col gap-5">
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                        <benefit.icon className="h-5 w-5 text-emerald-400" />
                      </div>
                      <span className="text-foreground/90 text-sm leading-relaxed pt-2">
                        {benefit.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* --- Right Column: Form --- */}
          <div className="lg:col-span-3">
            <AnimatedSection delay={0.2}>
              <div className="glass-card animated-border rounded-2xl p-8">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <div className="h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-5">
                        <Check className="h-8 w-8 text-emerald-400" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground max-w-sm leading-relaxed">
                        We&apos;ll get back to you within 48 hours with a
                        personalized tech strategy for your business.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      {/* Name + Business row */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label
                            htmlFor="contact-name"
                            className="text-sm font-medium text-foreground/80"
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
                            className="bg-white/[0.03] border-white/10 focus:border-emerald-500/50 placeholder:text-muted-foreground/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="contact-business"
                            className="text-sm font-medium text-foreground/80"
                          >
                            Business{" "}
                            <span className="text-muted-foreground/50">
                              (optional)
                            </span>
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
                            className="bg-white/[0.03] border-white/10 focus:border-emerald-500/50 placeholder:text-muted-foreground/50"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label
                          htmlFor="contact-email"
                          className="text-sm font-medium text-foreground/80"
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
                          className="bg-white/[0.03] border-white/10 focus:border-emerald-500/50 placeholder:text-muted-foreground/50"
                        />
                      </div>

                      {/* Message */}
                      <div className="space-y-2">
                        <label
                          htmlFor="contact-message"
                          className="text-sm font-medium text-foreground/80"
                        >
                          What do you need help with?
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
                          className="bg-white/[0.03] border-white/10 focus:border-emerald-500/50 placeholder:text-muted-foreground/50 resize-none"
                        />
                      </div>

                      {/* Submit */}
                      <Button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold gap-2 h-12 text-base"
                      >
                        Get Your Custom Plan
                        <ArrowRight className="h-4 w-4" />
                      </Button>

                      <p className="text-center text-xs text-muted-foreground/70 pt-1">
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
      </section>

      {/* ----- 3. Bottom Note ----- */}
      <section className="mt-12 pb-20 px-4 text-center relative z-10">
        <AnimatedSection>
          <p className="text-sm text-slate-500">
            Prefer to talk? Reach out directly and I&apos;ll get back to you
            within 48 hours.
          </p>
        </AnimatedSection>
      </section>
    </div>
  );
}