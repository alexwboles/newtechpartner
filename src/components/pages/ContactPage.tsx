"use client";

import { useState, useRef, type ReactNode } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Mail,
  Clock,
  ArrowRight,
  Check,
  Phone,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CONTACT_EMAIL,
  deliverContactInquiry,
  prepareContactEmail,
  type ContactDelivery,
  type ContactInquiry,
} from "@/lib/contact-delivery";

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
/*  Contact info items                                                 */
/* ------------------------------------------------------------------ */
const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "alexwboles@gmail.com",
    href: "mailto:alexwboles@gmail.com",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 48 hours",
  },
  {
    icon: Phone,
    label: "Availability",
    value: "Mon – Fri, 9 AM – 6 PM EST",
  },
];

/* ------------------------------------------------------------------ */
/*  What to expect steps                                               */
/* ------------------------------------------------------------------ */
const expectations = [
  {
    num: "1",
    title: "Submit your inquiry",
    description: "Tell us about your business and what you need help with.",
  },
  {
    num: "2",
    title: "Receive a response",
    description: "We review your request and respond within 48 hours.",
  },
  {
    num: "3",
    title: "Get your custom plan",
    description: "We outline a prioritized tech roadmap tailored to you.",
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
  const contactWebhookUrl = import.meta.env.VITE_CONTACT_WEBHOOK_URL?.trim();
  const [delivery, setDelivery] = useState<ContactDelivery | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "manual">("idle");
  const inFlight = useRef(false);
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    email: "",
    message: "",
  });

  const updateField = (field: keyof ContactInquiry, value: string) => {
    setFormData((previous) => ({ ...previous, [field]: value }));
    setDelivery(null);
    setError(null);
    setCopyStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inFlight.current) return;
    inFlight.current = true;
    setSending(true);
    setError(null);
    setDelivery(null);
    setCopyStatus("idle");
    try {
      setDelivery(await deliverContactInquiry({ ...formData }, { webhookUrl: contactWebhookUrl }));
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "Your inquiry could not be submitted. Your message is still here.");
    } finally {
      inFlight.current = false;
      setSending(false);
    }
  };

  const copyDraft = async () => {
    if (delivery?.mode !== "email") return;
    try {
      await navigator.clipboard.writeText(`To: ${CONTACT_EMAIL}\nSubject: ${delivery.subject}\n\n${delivery.body}`);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("manual");
    }
  };

  const inputBase =
    "bg-transparent border-b border-white/[0.08] text-white placeholder:text-slate-600 focus:border-emerald-500/50 rounded-none px-0 h-11 text-sm transition-colors";

  return (
    <div className="min-h-screen">
      {/* ----- 1. Background Video + Header ----- */}
      <section className="relative overflow-hidden">
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="hero-video"
          aria-hidden="true"
        >
          <source src="/video/contact-bg.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlay to blend video into dark background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050a12]/40 via-[#050a12]/70 to-[#050a12]" />

        {/* Header content */}
        <div className="relative z-10 pt-32 pb-12">
          <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
            <AnimatedSection>
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-400 font-medium mb-6">
                Contact
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.15]">
                Let&apos;s Talk
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="mt-5 text-slate-400 text-[15px] leading-relaxed max-w-lg">
                Tell us about your business and the challenges you&apos;re
                facing. We&apos;ll get back to you with a custom plan — no
                commitment, no pressure.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ----- 2. Two-Column Layout ----- */}
      <section>
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
          <div className="grid lg:grid-cols-5 gap-16 lg:gap-20">
            {/* Left: Contact Info + What to Expect */}
            <div className="lg:col-span-2">
              {/* Contact info */}
              <AnimatedSection>
                <div className="space-y-5">
                  {contactInfo.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-start gap-3.5">
                        <Icon className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs text-slate-600 uppercase tracking-wider mb-0.5">
                            {item.label}
                          </p>
                          {item.href ? (
                            <a
                              href={item.href}
                              className="text-sm text-white/80 hover:text-white transition-colors"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-sm text-white/80">
                              {item.value}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </AnimatedSection>

              {/* Separator */}
              <div className="mt-10 section-divider" />

              {/* What to expect */}
              <AnimatedSection delay={0.1}>
                <p className="text-xs uppercase tracking-[0.15em] text-slate-500 mb-6">
                  What to expect
                </p>
                <div className="space-y-4">
                  {expectations.map((step) => (
                    <div key={step.num} className="flex items-start gap-3">
                      <span className="text-xs font-mono text-slate-600 mt-0.5 shrink-0 w-4">
                        {step.num}.
                      </span>
                      <div>
                        <p className="text-sm text-white/80 font-medium">
                            {!contactWebhookUrl && step.num === "1" ? "Send your email" : step.title}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                            {!contactWebhookUrl && step.num === "1"
                              ? "Prepare your message below, then send it in your email app."
                              : step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3">
              <AnimatedSection>
                <div className="border-t border-white/[0.06] pt-10">
                  <AnimatePresence mode="wait">
                    {delivery?.mode === "submitted" ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-center justify-center py-20 text-center"
                      >
                        <div className="w-10 h-10 border border-emerald-500/30 flex items-center justify-center mb-5">
                          <Check className="h-5 w-5 text-emerald-400" />
                        </div>
                        <h3 className="text-lg font-medium text-white mb-1.5">
                          Inquiry submitted
                        </h3>
                        <p className="text-sm text-slate-400 max-w-xs">
                          The contact service confirmed acceptance. We&apos;ll
                          review your inquiry and respond within 48 hours.
                        </p>
                        <details className="mt-5 w-full text-left">
                          <summary className="cursor-pointer text-sm text-white/80">Your submitted details</summary>
                          <pre className="mt-3 whitespace-pre-wrap break-words text-xs text-slate-300">{prepareContactEmail(formData).body}</pre>
                        </details>
                        <button type="button" className="mt-6 text-sm text-emerald-300 underline" onClick={() => {
                          setDelivery(null);
                          setError(null);
                          setCopyStatus("idle");
                          setFormData({ name: "", business: "", email: "", message: "" });
                        }}>Start another inquiry</button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onSubmit={handleSubmit}
                        className="space-y-8"
                      >
                        {/* Name + Business */}
                        <div className="grid sm:grid-cols-2 gap-8">
                          <div>
                            <label
                              htmlFor="contact-name"
                              className="text-xs text-slate-500 uppercase tracking-wider font-medium block mb-2"
                            >
                              Name{" "}
                              <span className="text-emerald-500/70">*</span>
                            </label>
                            <Input
                              id="contact-name"
                              placeholder="John Smith"
                              required
                              maxLength={120}
                              disabled={sending}
                              value={formData.name}
                              onChange={(e) => updateField("name", e.target.value)}
                              className={inputBase}
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="contact-business"
                              className="text-xs text-slate-500 uppercase tracking-wider font-medium block mb-2"
                            >
                              Business
                            </label>
                            <Input
                              id="contact-business"
                              placeholder="Acme Inc."
                              maxLength={160}
                              disabled={sending}
                              value={formData.business}
                              onChange={(e) => updateField("business", e.target.value)}
                              className={inputBase}
                            />
                          </div>
                        </div>

                        {/* Email */}
                        <div>
                          <label
                            htmlFor="contact-email"
                            className="text-xs text-slate-500 uppercase tracking-wider font-medium block mb-2"
                          >
                            Email <span className="text-emerald-500/70">*</span>
                          </label>
                          <Input
                            id="contact-email"
                            type="email"
                            placeholder="john@example.com"
                            required
                            maxLength={254}
                            disabled={sending}
                            value={formData.email}
                            onChange={(e) => updateField("email", e.target.value)}
                            className={inputBase}
                          />
                        </div>

                        {/* Message */}
                        <div>
                          <label
                            htmlFor="contact-message"
                            className="text-xs text-slate-500 uppercase tracking-wider font-medium block mb-2"
                          >
                            How can we help?
                          </label>
                          <Textarea
                            id="contact-message"
                            placeholder="Tell us about your project, challenge, or what you'd like to accomplish..."
                            rows={4}
                            maxLength={10000}
                            disabled={sending}
                            value={formData.message}
                            onChange={(e) => updateField("message", e.target.value)}
                            className={`${inputBase} resize-none border-b`}
                          />
                        </div>

                        {/* Submit */}
                        <div className="pt-2">
                          <button
                            type="submit"
                            disabled={sending}
                            className="inline-flex items-center gap-2.5 bg-white text-[#050a12] font-semibold rounded-sm hover:bg-slate-100 px-7 py-3 text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            {sending ? (
                              "Sending..."
                            ) : (
                              <>
                                {contactWebhookUrl ? "Send Message" : "Prepare email"}
                                <ArrowRight className="w-3.5 h-3.5" />
                              </>
                            )}
                          </button>
                        </div>

                        {sending && <p role="status" className="text-sm text-slate-300">Submitting your inquiry...</p>}
                        {error && <p role="alert" className="text-sm text-amber-200">{error}</p>}
                        {delivery?.mode === "email" && (
                          <div className="space-y-3 rounded-lg border border-emerald-500/25 bg-emerald-500/5 p-5">
                            <div role="status">
                              <h3 className="text-base font-semibold text-white">Finish sending in your email app</h3>
                              <p className="mt-2 text-sm text-slate-300">Nothing has been sent to TechPartner yet. Open the draft, review it, and press Send in your email app. Keep this page open until you finish.</p>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm">
                              <a href={delivery.mailto} className="font-medium text-emerald-300 underline">Open email draft</a>
                              <button type="button" onClick={copyDraft} className="text-white/90 underline">Copy email details</button>
                            </div>
                            <p className="break-words text-sm text-slate-300">Send to <a className="text-emerald-300 underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
                            <p className="break-words text-xs text-slate-400">Subject: {delivery.subject}</p>
                            <label className="block text-xs text-slate-400" htmlFor="contact-email-copy">Your message (available for manual copy)</label>
                            <Textarea id="contact-email-copy" readOnly value={delivery.body} rows={7} className="w-full bg-[#050a12] text-sm text-slate-200" />
                            {copyStatus === "copied" && <p role="status" className="text-sm text-emerald-300">Copied. Paste it into an email and send it to Alex.</p>}
                            {copyStatus === "manual" && <p role="status" className="text-sm text-amber-200">Automatic copy is unavailable. Select the message above and copy it manually.</p>}
                          </div>
                        )}

                        {!contactWebhookUrl && <p className="text-xs text-slate-400">This form prepares an email draft. TechPartner receives it only after you send it from your email app.</p>}

                        <p className="text-xs text-slate-600">
                          Free consultation. No commitment. Cancel anytime.
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

      {/* ----- 3. Bottom Navigation ----- */}
      <section className="py-24 border-t border-white/[0.04]">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 text-center">
          <AnimatedSection>
            <p className="text-sm text-slate-500">
              Not ready to reach out?
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="flex items-center justify-center gap-4 mt-4">
              <button
                onClick={() => navigate("services")}
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                Services
              </button>
              <span className="text-slate-700">/</span>
              <button
                onClick={() => navigate("pricing")}
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                Pricing
              </button>
              <span className="text-slate-700">/</span>
              <button
                onClick={() => navigate("faq")}
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                FAQ
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
