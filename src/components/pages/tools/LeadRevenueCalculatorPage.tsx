"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import ToolPageLayout from "@/components/products/ToolPageLayout";

const DEFAULTS = {
  monthlyLeads: "40",
  pctMissed: "25",
  avgDealValue: "1500",
  closeRate: "30",
};

const FIELDS = [
  {
    key: "monthlyLeads",
    label: "Inbound leads per month",
    hint: "All sources — calls, forms, messages.",
    placeholder: "40",
  },
  {
    key: "pctMissed",
    label: "% missed or answered too late",
    hint: "Never answered, or answered after the moment passed.",
    placeholder: "25",
  },
  {
    key: "avgDealValue",
    label: "Average job / deal value ($)",
    hint: "What one won lead is worth to you.",
    placeholder: "1500",
  },
  {
    key: "closeRate",
    label: "Close rate on answered leads (%)",
    hint: "How many answered leads turn into work.",
    placeholder: "30",
  },
] as const;

export default function LeadRevenueCalculatorPage({
  navigate,
}: {
  navigate: (page: string) => void;
}) {
  const [form, setForm] = useState(DEFAULTS);

  const set = (key: keyof typeof DEFAULTS, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const n = {
    monthlyLeads: Number(form.monthlyLeads),
    pctMissed: Number(form.pctMissed),
    avgDealValue: Number(form.avgDealValue),
    closeRate: Number(form.closeRate),
  };

  const invalid = FIELDS.some(
    (f) => form[f.key] === "" || Number.isNaN(n[f.key]) || n[f.key] < 0
  );
  const pctInvalid = n.pctMissed < 0 || n.pctMissed > 100 || n.closeRate < 0 || n.closeRate > 100;

  const missedLeads = (n.monthlyLeads * n.pctMissed) / 100;
  const monthlyLost = missedLeads * (n.avgDealValue * n.closeRate) / 100;
  // Conservative assumption: re-engaged missed leads close at 50% of normal rate
  const recoverable = missedLeads * (n.avgDealValue * n.closeRate) / 100 * 0.5;
  const annualLost = monthlyLost * 12;

  const money = (v: number) =>
    `$${Math.round(v).toLocaleString()}`;

  const inputBase =
    "bg-transparent border-b border-white/[0.08] text-white placeholder:text-slate-600 focus:border-[#D4A853]/60 rounded-none px-0 h-11 text-sm transition-colors w-full outline-none";

  const reset = () => setForm(DEFAULTS);

  return (
    <ToolPageLayout
      title="Missed-Lead Revenue Calculator"
      price="Free tool"
      status="Live calculator"
      intro="Estimate the revenue walking out the door when inbound leads go unanswered — using your own numbers, with every assumption stated up front."
      assumptions={[
        "Missed leads are ones never answered, or answered after the opportunity went cold — your estimate, entered as a percentage.",
        "Monthly revenue lost = missed leads × your average deal value × your close rate on answered leads.",
        "The recoverable estimate assumes re-engaged missed leads close at 50% of your normal close rate — deliberately conservative.",
        "Nothing you enter is saved, sent, or tracked.",
      ]}
      navigate={navigate}
    >
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs uppercase tracking-wider text-slate-500 font-medium">
          Revenue impact calculator
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Inputs */}
        <div className="space-y-6">
          {FIELDS.map((f) => (
            <div key={f.key}>
              <label className="text-[10px] text-slate-500 uppercase tracking-wider font-medium block mb-1.5">
                {f.label}
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={form[f.key]}
                onChange={(e) => set(f.key, e.target.value)}
                placeholder={f.placeholder}
                className={inputBase}
              />
              <p className="text-[11px] text-slate-600 mt-1.5">{f.hint}</p>
            </div>
          ))}
        </div>

        {/* Results */}
        <div className="border border-white/[0.06] bg-[#0e1525] p-6 h-fit">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-4">
            Estimated impact
          </p>
          {invalid || pctInvalid ? (
            <p className="text-sm text-red-400 leading-relaxed">
              {pctInvalid
                ? "Percentages must be between 0 and 100."
                : "Enter valid numbers (0 or more) in every field."}
            </p>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-xs text-slate-400 mb-1">
                  Missed or late-answered leads per month
                </p>
                <p className="text-2xl font-semibold text-white">
                  {missedLeads.toFixed(0)} leads
                </p>
              </div>
              <div className="mb-6">
                <p className="text-xs text-slate-400 mb-1">
                  Estimated revenue lost per month
                </p>
                <p className="text-2xl font-semibold text-[#D4A853]">
                  {money(monthlyLost)}
                </p>
              </div>
              <div className="mb-6">
                <p className="text-xs text-slate-400 mb-1">
                  Conservative recoverable portion
                </p>
                <p className="text-2xl font-semibold text-[#E8D5B7]">
                  {money(recoverable)}
                  <span className="text-xs text-slate-500 font-normal"> /month</span>
                </p>
              </div>
              <div className="border-t border-white/[0.06] pt-4">
                <p className="text-xs text-slate-400 mb-1">
                  Annualized revenue lost
                </p>
                <p className="text-xl font-semibold text-white">
                  {money(annualLost)}
                </p>
              </div>

              {/* Proportion bar */}
              {n.monthlyLeads > 0 && (
                <div className="mt-6">
                  <div className="flex justify-between text-[11px] mb-2">
                    <span className="text-slate-500">
                      Answered ({(n.monthlyLeads - missedLeads).toFixed(0)})
                    </span>
                    <span className="text-[#E8D5B7]">
                      Missed ({missedLeads.toFixed(0)})
                    </span>
                  </div>
                  <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden flex">
                    <div
                      className="h-full bg-[#3B6A9E] transition-all duration-300"
                      style={{
                        width: `${Math.min(100, Math.max(0, 100 - n.pctMissed))}%`,
                      }}
                    />
                    <div
                      className="h-full bg-gradient-to-r from-[#D4A853] to-[#E8D5B7] transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.max(0, n.pctMissed))}%` }}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
}