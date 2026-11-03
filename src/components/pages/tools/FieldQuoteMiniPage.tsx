"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import ToolPageLayout from "@/components/products/ToolPageLayout";

const DEFAULTS = {
  jobName: "",
  materials: "850",
  laborHours: "6",
  laborRate: "65",
  overheadPct: "10",
  markupPct: "35",
};

const FIELDS = [
  { key: "materials", label: "Materials & supplies ($)", placeholder: "850" },
  { key: "laborHours", label: "Labor hours", placeholder: "6" },
  { key: "laborRate", label: "Labor rate ($/hr)", placeholder: "65" },
  { key: "overheadPct", label: "Overhead (% of direct cost)", placeholder: "10" },
  { key: "markupPct", label: "Markup (%)", placeholder: "35" },
] as const;

export default function FieldQuoteMiniPage({
  navigate,
}: {
  navigate: (page: string) => void;
}) {
  const [form, setForm] = useState(DEFAULTS);

  const set = (key: keyof typeof DEFAULTS, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const nums = {
    materials: Number(form.materials),
    laborHours: Number(form.laborHours),
    laborRate: Number(form.laborRate),
    overheadPct: Number(form.overheadPct),
    markupPct: Number(form.markupPct),
  };

  const invalidFields = FIELDS.filter((f) => {
    const n = nums[f.key];
    return form[f.key] === "" || Number.isNaN(n) || n < 0;
  }).map((f) => f.label);
  const pctOutOfRange =
    nums.overheadPct < 0 ||
    nums.overheadPct > 100 ||
    nums.markupPct < 0 ||
    nums.markupPct > 100;

  const valid = invalidFields.length === 0 && !pctOutOfRange;

  const directCost = nums.materials + nums.laborHours * nums.laborRate;
  const overhead = directCost * (nums.overheadPct / 100);
  const totalCost = directCost + overhead;
  const price = totalCost * (1 + nums.markupPct / 100);
  const profit = price - totalCost;
  const marginPct = price > 0 ? (profit / price) * 100 : 0;

  const money = (n: number) =>
    `$${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

  const inputBase =
    "bg-transparent border-b border-white/[0.08] text-white placeholder:text-slate-600 focus:border-[#D4A853]/60 rounded-none px-0 h-11 text-sm transition-colors w-full outline-none";

  const reset = () => setForm(DEFAULTS);

  return (
    <ToolPageLayout
      title="FieldQuote Mini"
      price="$99 branded version"
      status="Working prototype"
      intro="Price field-service jobs with confidence: enter your costs, apply overhead and markup, and see your gross margin before the quote goes out the door."
      assumptions={[
        "Overhead is applied as a percentage of direct cost (materials + labor).",
        "Suggested price = total cost × (1 + markup %).",
        "Gross margin = (price − total cost) ÷ price. It excludes taxes, discounts, and payment fees.",
        "Nothing you enter leaves this page.",
      ]}
      navigate={navigate}
    >
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs uppercase tracking-wider text-slate-500 font-medium">
          Quote calculator
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
          <div>
            <label className="text-[10px] text-slate-500 uppercase tracking-wider font-medium block mb-1.5">
              Job name (optional)
            </label>
            <input
              value={form.jobName}
              onChange={(e) => set("jobName", e.target.value)}
              placeholder="Water heater replacement"
              className={inputBase}
            />
          </div>
          {FIELDS.map((f) => (
            <div key={f.key}>
              <label className="text-[10px] text-slate-500 uppercase tracking-wider font-medium block mb-1.5">
                {f.label}
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form[f.key]}
                onChange={(e) => set(f.key, e.target.value)}
                placeholder={f.placeholder}
                className={inputBase}
              />
            </div>
          ))}
        </div>

        {/* Results */}
        <div className="border border-white/[0.06] bg-[#0e1525] p-6 h-fit">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-4">
            Quote summary
          </p>
          {!valid ? (
            <p className="text-sm text-red-400 leading-relaxed">
              {pctOutOfRange
                ? "Percentages must be between 0 and 100."
                : `Enter valid numbers (0 or more) for: ${invalidFields.join(", ")}.`}
            </p>
          ) : (
            <>
              {form.jobName.trim() && (
                <p className="text-sm font-medium text-white mb-4">
                  {form.jobName.trim()}
                </p>
              )}
              <dl className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-slate-400">Direct cost</dt>
                  <dd className="text-slate-200">{money(directCost)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-400">Overhead ({nums.overheadPct}%)</dt>
                  <dd className="text-slate-200">{money(overhead)}</dd>
                </div>
                <div className="flex justify-between border-t border-white/[0.06] pt-2.5">
                  <dt className="text-slate-400">Total cost</dt>
                  <dd className="text-slate-200">{money(totalCost)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-400">Suggested price</dt>
                  <dd className="text-[#D4A853] font-semibold text-base">
                    {money(price)}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-white/[0.06] pt-2.5">
                  <dt className="text-slate-400">Gross profit</dt>
                  <dd className="text-[#E8D5B7]">{money(profit)}</dd>
                </div>
              </dl>

              {/* Margin bar */}
              <div className="mt-6">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-500">Gross margin</span>
                  <span className="text-[#D4A853] font-semibold">
                    {marginPct.toFixed(1)}%
                  </span>
                </div>
                <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#B8860B] via-[#D4A853] to-[#E8D5B7] transition-all duration-300"
                    style={{ width: `${Math.min(100, Math.max(0, marginPct))}%` }}
                  />
                </div>
                {marginPct < 15 && (
                  <p className="text-[11px] text-[#E8D5B7]/80 mt-2.5">
                    Margin under 15% — one surprise on the job can erase the
                    profit. Consider a higher markup or revisit costs.
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
}