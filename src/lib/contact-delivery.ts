export const CONTACT_EMAIL = "alexwboles@gmail.com";

export type ContactInquiry = {
  name: string;
  business: string;
  email: string;
  message: string;
};

export type PreparedContactEmail = {
  mode: "email";
  subject: string;
  body: string;
  mailto: string;
};

export type ContactDelivery = PreparedContactEmail | { mode: "submitted" };

function normalize(inquiry: ContactInquiry): ContactInquiry {
  const value = {
    name: inquiry.name.trim().replace(/[\r\n]+/g, " "),
    business: inquiry.business.trim().replace(/[\r\n]+/g, " "),
    email: inquiry.email.trim(),
    message: inquiry.message,
  };
  if (!value.name || !/^[^\s@]+@[^\s@]+$/.test(value.email)) {
    throw new Error("Enter your name and a valid email address.");
  }
  if (value.name.length > 120 || value.business.length > 160 ||
      value.email.length > 254 || value.message.length > 10000) {
    throw new Error("Please shorten your contact details or message.");
  }
  return value;
}

export function prepareContactEmail(inquiry: ContactInquiry): PreparedContactEmail {
  const value = normalize(inquiry);
  const subject = `New TechPartner Inquiry from ${value.name}${value.business ? ` (${value.business})` : ""}`;
  const body = [
    `Name: ${value.name}`,
    ...(value.business ? [`Business: ${value.business}`] : []),
    `Email: ${value.email}`,
    "",
    "Message:",
    value.message || "(no message)",
  ].join("\n");
  return {
    mode: "email",
    subject,
    body,
    mailto: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
  };
}

export async function deliverContactInquiry(
  inquiry: ContactInquiry,
  options: {
    webhookUrl?: string;
    fetcher?: typeof fetch;
    timeoutMs?: number;
  } = {},
): Promise<ContactDelivery> {
  const value = normalize(inquiry);
  const webhookUrl = options.webhookUrl?.trim();
  if (!webhookUrl) return prepareContactEmail(value);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), options.timeoutMs ?? 15000);
  try {
    const response = await (options.fetcher ?? fetch)(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...value, subject: prepareContactEmail(value).subject }),
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error("Your inquiry could not be submitted. Your message is still here; try again or email Alex directly.");
    }
    const confirmation = await response.json().catch(() => null);
    if (confirmation?.accepted !== true) {
      throw new Error("Your inquiry was not confirmed by the contact service. Your message is still here; email Alex directly before retrying.");
    }
    return { mode: "submitted" };
  } catch (error) {
    if (controller.signal.aborted) {
      throw new Error("The request timed out. Your message is still here. Email Alex directly or check before retrying to avoid duplicates.");
    }
    if (error instanceof Error && error.message.startsWith("Your inquiry")) throw error;
    throw new Error("The connection failed. Your message is still here; try again or email Alex directly.");
  } finally {
    clearTimeout(timer);
  }
}
