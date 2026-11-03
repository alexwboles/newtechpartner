import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CONTACT_EMAIL, prepareContactEmail, type ContactInquiry, type PreparedContactEmail } from "@/lib/contact-delivery";
type Pilot = { title: string; price?: string; priceNote?: string };
export default function InquiryDialog({ pilot, onClose }: { pilot: Pilot | null; onClose: () => void }) {
  const [fields, setFields] = useState<ContactInquiry>({ name: "", email: "", business: "", message: "" });
  const [consent, setConsent] = useState(false);
  const [draft, setDraft] = useState<PreparedContactEmail | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");
  const returnFocus = useRef<HTMLElement | null>(null);
  useEffect(() => { setDraft(null); setError(""); setCopied(""); }, [pilot?.title]);
  const update = (field: keyof ContactInquiry, value: string) => { setFields(current => ({ ...current, [field]: value })); setDraft(null); setError(""); setCopied(""); };
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!pilot || !consent) return;
    try { setDraft(prepareContactEmail({ ...fields, message: [`Request: ${pilot.title}`, `Listed pricing: ${[pilot.price, pilot.priceNote].filter(Boolean).join(" · ") || "Scope to be agreed"}`, "", fields.message].join("\n") })); }
    catch (failure) { setError(failure instanceof Error ? failure.message : "Check your contact details."); }
  };
  const copy = async () => { if (!draft) return; try { await navigator.clipboard.writeText(`To: ${CONTACT_EMAIL}\nSubject: ${draft.subject}\n\n${draft.body}`); setCopied("Copied. Paste it into an email and send it to Alex."); } catch { setCopied("Automatic copy is unavailable. Select and copy the message below manually."); } };
  return <Dialog open={!!pilot} onOpenChange={open => { if (!open) onClose(); }}><DialogContent className="portfolio-detail" onOpenAutoFocus={() => { returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null; }} onCloseAutoFocus={event => { event.preventDefault(); queueMicrotask(() => { if (returnFocus.current?.isConnected) returnFocus.current.focus(); }); }}>
    <DialogHeader><p className="portfolio-eyebrow">Let’s talk through the scope</p><DialogTitle>{pilot?.title || "Project inquiry"}</DialogTitle><DialogDescription>{[pilot?.price, pilot?.priceNote].filter(Boolean).join(" · ") || "We’ll agree on scope, timing and pricing before starting."}</DialogDescription></DialogHeader>
    <form onSubmit={submit} className="portfolio-inquiry-form">
      <label htmlFor="pilot-name">Name <span aria-hidden="true">*</span></label><input id="pilot-name" required maxLength={120} value={fields.name} onChange={e => update("name", e.target.value)} autoComplete="name" />
      <label htmlFor="pilot-business">Business</label><input id="pilot-business" maxLength={160} value={fields.business} onChange={e => update("business", e.target.value)} autoComplete="organization" />
      <label htmlFor="pilot-email">Email <span aria-hidden="true">*</span></label><input id="pilot-email" required type="email" maxLength={254} value={fields.email} onChange={e => update("email", e.target.value)} autoComplete="email" />
      <label htmlFor="pilot-message">What would you like to get done?</label><textarea id="pilot-message" rows={3} maxLength={8500} value={fields.message} onChange={e => update("message", e.target.value)} />
      <label className="portfolio-consent"><input type="checkbox" required checked={consent} onChange={e => setConsent(e.target.checked)} /><span>I agree to TechPartner using these details to respond to this inquiry.</span></label>
      <button className="portfolio-primary-button" type="submit">Prepare email</button>
      {error && <p role="alert">{error}</p>}
    </form>
    {draft && <div className="portfolio-inquiry-draft"><p role="status"><strong>Your draft is ready. Nothing has been sent yet.</strong><br />Review it, then send it from your email app.</p><div className="portfolio-detail-actions"><a className="portfolio-primary-button" href={draft.mailto}>Open email draft</a><button className="portfolio-secondary-button" type="button" onClick={copy}>Copy email details</button></div><p>To: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p><p>Subject: {draft.subject}</p><label htmlFor="pilot-email-copy">Message for manual copy</label><textarea id="pilot-email-copy" readOnly value={draft.body} rows={6} />{copied && <p role="status">{copied}</p>}</div>}
    <p className="portfolio-footnote">Keep this page open until you finish sending. Don’t include passwords or private customer records. Prefer email? <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
  </DialogContent></Dialog>;
}
