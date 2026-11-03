"use client";

import { useState } from "react";
import { Check, RotateCcw, Search, TriangleAlert, X } from "lucide-react";
import ToolPageLayout from "@/components/products/ToolPageLayout";

const EXAMPLE = `{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Acme Plumbing LLC",
  "telephone": "(555) 123-4567",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "118 Main St",
    "addressLocality": "Springfield",
    "addressRegion": "IL",
    "postalCode": "62701"
  }
}`;

const LOCAL_TYPES = [
  "LocalBusiness",
  "ProfessionalService",
  "Restaurant",
  "Store",
  "HealthAndBeautyBusiness",
  "HomeAndConstructionBusiness",
  "LegalService",
  "AutoRepair",
  "Electrician",
  "Plumber",
  "RoofingContractor",
  "HVACBusiness",
  "MovingCompany",
  "DryCleaningOrLaundry",
  "RealEstateAgent",
];

type CheckResult = {
  label: string;
  status: "pass" | "warn" | "fail";
  detail: string;
  required: boolean;
};

function runCheck(input: string): { error?: string; checks: CheckResult[] } {
  let parsed: any;
  try {
    parsed = JSON.parse(input);
  } catch {
    return { error: "That's not valid JSON yet — check for missing commas or braces.", checks: [] };
  }

  // Find the entity object (accepts a single object or a @graph array)
  const candidates: any[] = Array.isArray(parsed)
    ? parsed
    : parsed["@graph"]
    ? parsed["@graph"]
    : [parsed];
  const entity = candidates.find((c) => c && typeof c === "object" && "@type" in c);

  if (!entity) {
    return {
      error: "No schema.org entity found — expected an object with a @type property.",
      checks: [],
    };
  }

  const type = entity["@type"];
  const address = entity.address;
  const addressParts = ["streetAddress", "addressLocality", "addressRegion", "postalCode"];
  const missingAddress = addressParts.filter((p) => !address?.[p]);

  const checks: CheckResult[] = [
    {
      label: "@type is present",
      status: "pass",
      detail: `@type: ${Array.isArray(type) ? type.join(", ") : type}`,
      required: true,
    },
    {
      label: "@type is a LocalBusiness type",
      status: (Array.isArray(type) ? type : [type]).some((t) => LOCAL_TYPES.includes(t))
        ? "pass"
        : "fail",
      detail:
        "Google's local results expect @type LocalBusiness or one of its subtypes (e.g. Plumber, Restaurant).",
      required: true,
    },
    {
      label: "name",
      status: entity.name ? "pass" : "fail",
      detail: entity.name
        ? `Found: "${entity.name}"`
        : "Required — the business name search engines display.",
      required: true,
    },
    {
      label: "address (full postal address)",
      status: address && missingAddress.length === 0 ? "pass" : address ? "warn" : "fail",
      detail: address
        ? missingAddress.length === 0
          ? "All address parts present."
          : `Missing: ${missingAddress.join(", ")}.`
        : "Required — a PostalAddress with street, locality, region, and postal code.",
      required: true,
    },
    {
      label: "telephone",
      status: entity.telephone ? "pass" : "warn",
      detail: entity.telephone
        ? `Found: ${entity.telephone}`
        : "Recommended — how customers call you.",
      required: false,
    },
    {
      label: "url",
      status: entity.url ? "pass" : "warn",
      detail: entity.url
        ? `Found: ${entity.url}`
        : "Recommended — your website URL.",
      required: false,
    },
    {
      label: "geo coordinates",
      status: entity.geo?.latitude && entity.geo?.longitude ? "pass" : "warn",
      detail: entity.geo?.latitude
        ? "Latitude/longitude present."
        : "Recommended — helps map-based discovery.",
      required: false,
    },
    {
      label: "openingHours",
      status: entity.openingHours || entity.openingHoursSpecification ? "pass" : "warn",
      detail: entity.openingHours || entity.openingHoursSpecification
        ? "Business hours present."
        : "Recommended — when customers can reach you.",
      required: false,
    },
    {
      label: "priceRange",
      status: entity.priceRange ? "pass" : "warn",
      detail: entity.priceRange
        ? `Found: ${entity.priceRange}`
        : "Recommended — a simple range like '$$'.",
      required: false,
    },
    {
      label: "image / sameAs",
      status: entity.image || entity.sameAs ? "pass" : "warn",
      detail: entity.image || entity.sameAs
        ? "At least one present."
        : "Recommended — an image and your social profiles add trust signals.",
      required: false,
    },
  ];

  return { checks };
}

const STATUS_STYLES = {
  pass: { icon: Check, color: "text-emerald-400", label: "Pass" },
  warn: { icon: TriangleAlert, color: "text-[#E8D5B7]", label: "Recommended" },
  fail: { icon: X, color: "text-red-400", label: "Missing" },
} as const;

export default function SchemaCheckerPage({
  navigate,
}: {
  navigate: (page: string) => void;
}) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{
    error?: string;
    checks: CheckResult[];
  } | null>(null);

  const check = () => setResult(runCheck(input));
  const reset = () => {
    setInput("");
    setResult(null);
  };

  const requiredChecks = result?.checks.filter((c) => c.required) ?? [];
  const requiredPassed = requiredChecks.filter((c) => c.status === "pass").length;
  const recommendedPassed =
    result?.checks.filter((c) => !c.required && c.status === "pass").length ?? 0;
  const totalRecommended = result?.checks.filter((c) => !c.required).length ?? 0;

  return (
    <ToolPageLayout
      title="LocalBusiness Schema Checker"
      price="Free checker · $49 review · $149 implementation"
      status="Working prototype"
      intro="Paste your LocalBusiness JSON-LD structured data and get an instant preflight checklist of required and recommended properties — before search engines grade it."
      assumptions={[
        "The check runs entirely in your browser — your markup is never sent anywhere.",
        "'Required' reflects the properties search engines commonly need to display a local business listing; 'Recommended' properties improve completeness and trust.",
        "This is a preflight review, not a guarantee of search ranking.",
      ]}
      navigate={navigate}
    >
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs uppercase tracking-wider text-slate-500 font-medium">
          Preflight checker
        </p>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setInput(EXAMPLE)}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            Load example
          </button>
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={8}
        spellCheck={false}
        placeholder='Paste your JSON-LD here, e.g. { "@context": "https://schema.org", "@type": "LocalBusiness", ... }'
        className="w-full bg-[#0e1525] border border-white/[0.08] focus:border-[#D4A853]/50 text-[#E8D5B7] text-xs font-mono rounded-sm p-4 outline-none resize-y leading-relaxed placeholder:text-slate-600 placeholder:font-sans"
      />

      <button
        onClick={check}
        disabled={!input.trim()}
        className="mt-4 inline-flex items-center gap-2 bg-[#D4A853] text-[#050a12] font-semibold rounded-sm hover:bg-[#E8D5B7] px-6 py-2.5 text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <Search className="w-4 h-4" />
        Run check
      </button>

      {result?.error && (
        <p className="mt-6 text-sm text-red-400 border border-red-400/20 bg-red-400/[0.05] p-4 rounded-sm">
          {result.error}
        </p>
      )}

      {result && !result.error && (
        <div className="mt-8">
          <div className="flex flex-wrap gap-6 mb-6 pb-5 border-b border-white/[0.06]">
            <div>
              <p className="text-lg font-semibold text-white">
                {requiredPassed}/{requiredChecks.length}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                Required passed
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold text-[#E8D5B7]">
                {recommendedPassed}/{totalRecommended}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                Recommended passed
              </p>
            </div>
          </div>

          <ul className="space-y-3">
            {result.checks.map((c) => {
              const style = STATUS_STYLES[c.status];
              return (
                <li key={c.label} className="flex items-start gap-3">
                  <style.icon className={`w-4 h-4 shrink-0 mt-0.5 ${style.color}`} />
                  <div>
                    <p className="text-sm text-slate-200">
                      {c.label}
                      {c.required ? (
                        <span className="text-[10px] uppercase tracking-wider text-slate-600 ml-2">
                          Required
                        </span>
                      ) : null}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      {c.detail}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </ToolPageLayout>
  );
}