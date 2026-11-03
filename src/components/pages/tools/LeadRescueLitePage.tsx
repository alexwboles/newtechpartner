"use client";

import { useMemo, useState } from "react";
import { Plus, RotateCcw, Trash2 } from "lucide-react";
import ToolPageLayout from "@/components/products/ToolPageLayout";

type LeadStatus = "new" | "responded" | "won" | "missed";

interface Lead {
  id: number;
  name: string;
  source: string;
  value: number;
  status: LeadStatus;
}

const STATUSES: LeadStatus[] = ["new", "responded", "won", "missed"];
const SOURCES = ["Website", "Phone", "Referral", "Walk-in", "Ad"];

const SAMPLE_LEADS: Lead[] = [
  { id: 1, name: "Kitchen remodel inquiry", source: "Website", value: 4500, status: "responded" },
  { id: 2, name: "Emergency repair call", source: "Phone", value: 800, status: "missed" },
  { id: 3, name: "Fence quote request", source: "Referral", value: 2600, status: "new" },
  { id: 4, name: "Spring maintenance plan", source: "Walk-in", value: 650, status: "won" },
  { id: 5, name: "Gutter install estimate", source: "Phone", value: 1200, status: "missed" },
];

export default function LeadRescueLitePage({
  navigate,
}: {
  navigate: (page: string) => void;
}) {
  const [leads, setLeads] = useState<Lead[]>(SAMPLE_LEADS);
  const [nextId, setNextId] = useState(6);
  const [name, setName] = useState("");
  const [source, setSource] = useState(SOURCES[0]);
  const [valueInput, setValueInput] = useState("");
  const [errors, setErrors] = useState<{ name?: string; value?: string }>({});

  const fmt = (n: number) =>
    `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

  const metrics = useMemo(() => {
    const open = leads.filter((l) => l.status === "new" || l.status === "responded");
    const won = leads.filter((l) => l.status === "won");
    const missed = leads.filter((l) => l.status === "missed");
    return {
      total: leads.length,
      openValue: open.reduce((s, l) => s + l.value, 0),
      wonValue: won.reduce((s, l) => s + l.value, 0),
      missedCount: missed.length,
      missedValue: missed.reduce((s, l) => s + l.value, 0),
    };
  }, [leads]);

  const addLead = (e: React.FormEvent) => {
    e.preventDefault();
    const value = Number(valueInput);
    const next: typeof errors = {};
    if (!name.trim()) next.name = "Lead name is required";
    if (valueInput === "" || Number.isNaN(value) || value < 0)
      next.value = "Enter a value of 0 or more";
    setErrors(next);
    if (Object.keys(next).length) return;
    setLeads([
      ...leads,
      { id: nextId, name: name.trim(), source, value, status: "new" },
    ]);
    setNextId(nextId + 1);
    setName("");
    setValueInput("");
  };

  const setStatus = (id: number, status: LeadStatus) =>
    setLeads(leads.map((l) => (l.id === id ? { ...l, status } : l)));

  const removeLead = (id: number) => setLeads(leads.filter((l) => l.id !== id));

  const reset = () => {
    setLeads(SAMPLE_LEADS);
    setName("");
    setValueInput("");
    setErrors({});
  };

  const inputBase =
    "bg-transparent border-b border-white/[0.08] text-white placeholder:text-slate-600 focus:border-[#D4A853]/60 rounded-none px-0 h-11 text-sm transition-colors w-full outline-none";

  return (
    <ToolPageLayout
      title="LeadRescue Lite"
      price="$49 pilot"
      status="Working prototype"
      intro="A working prototype of the lead pipeline dashboard: track inbound leads, mark outcomes, and surface missed opportunities so you can re-engage them before the value is gone."
      assumptions={[
        "A lead is counted as missed only when you mark it missed — no response went out.",
        "Recovery value is the combined estimated value of missed leads you re-engage; it assumes the deal is still winnable, not guaranteed.",
        "All numbers are illustrative. Nothing you enter leaves this page.",
      ]}
      navigate={navigate}
    >
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs uppercase tracking-wider text-slate-500 font-medium">
          Pipeline dashboard
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {[
          { label: "Leads tracked", value: String(metrics.total) },
          { label: "Open pipeline", value: fmt(metrics.openValue) },
          { label: "Won value", value: fmt(metrics.wonValue) },
          { label: "Missed value", value: fmt(metrics.missedValue) },
        ].map((m) => (
          <div key={m.label} className="border border-white/[0.06] bg-[#0e1525] p-4">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1.5">
              {m.label}
            </p>
            <p className={`text-lg font-semibold ${m.label === "Missed value" ? "text-[#E8D5B7]" : "text-white"}`}>
              {m.value}
            </p>
          </div>
        ))}
      </div>

      {/* Missed opportunity alert */}
      {metrics.missedCount > 0 && (
        <div className="border border-[#E8D5B7]/25 bg-[#E8D5B7]/[0.04] p-4 mb-8">
          <p className="text-sm text-[#E8D5B7]">
            {metrics.missedCount} missed {metrics.missedCount === 1 ? "opportunity" : "opportunities"} worth{" "}
            <strong>{fmt(metrics.missedValue)}</strong> — reactivate below before the value goes cold.
          </p>
        </div>
      )}

      {/* Add lead form */}
      <form onSubmit={addLead} className="grid sm:grid-cols-[1fr_150px_140px_auto] gap-4 items-end mb-8">
        <div>
          <label className="text-[10px] text-slate-500 uppercase tracking-wider font-medium block mb-1.5">
            Lead name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="New estimate request"
            className={inputBase}
          />
          {errors.name && <p className="text-[11px] text-red-400 mt-1.5">{errors.name}</p>}
        </div>
        <div>
          <label className="text-[10px] text-slate-500 uppercase tracking-wider font-medium block mb-1.5">
            Source
          </label>
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="bg-transparent border-b border-white/[0.08] focus:border-[#D4A853]/60 text-white text-sm h-11 w-full outline-none"
          >
            {SOURCES.map((s) => (
              <option key={s} value={s} className="bg-[#0c1322]">
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-[10px] text-slate-500 uppercase tracking-wider font-medium block mb-1.5">
            Est. value ($)
          </label>
          <input
            type="number"
            min="0"
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
            placeholder="1200"
            className={inputBase}
          />
          {errors.value && <p className="text-[11px] text-red-400 mt-1.5">{errors.value}</p>}
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 bg-[#D4A853] text-[#050a12] font-semibold rounded-sm hover:bg-[#E8D5B7] px-5 h-11 text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </form>

      {/* Lead list */}
      {leads.length === 0 ? (
        <p className="text-sm text-slate-500 text-center py-10">
          No leads yet — add one above to start tracking.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-wider text-slate-500 border-b border-white/[0.06]">
                <th className="py-2.5 pr-4 font-medium">Lead</th>
                <th className="py-2.5 pr-4 font-medium">Source</th>
                <th className="py-2.5 pr-4 font-medium">Value</th>
                <th className="py-2.5 pr-4 font-medium">Status</th>
                <th className="py-2.5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-white/[0.04]">
                  <td className="py-3 pr-4 text-white">{lead.name}</td>
                  <td className="py-3 pr-4 text-slate-400">{lead.source}</td>
                  <td className="py-3 pr-4 text-slate-300">{fmt(lead.value)}</td>
                  <td className="py-3 pr-4">
                    <select
                      value={lead.status}
                      onChange={(e) => setStatus(lead.id, e.target.value as LeadStatus)}
                      className="bg-transparent border border-white/10 focus:border-[#D4A853]/60 text-xs text-slate-200 rounded-sm px-2 py-1 outline-none"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s} className="bg-[#0c1322]">
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 text-right">
                    <div className="inline-flex items-center gap-3">
                      {lead.status === "missed" && (
                        <button
                          onClick={() => setStatus(lead.id, "responded")}
                          className="text-xs text-[#D4A853] hover:text-[#E8D5B7] transition-colors"
                        >
                          Reactivate
                        </button>
                      )}
                      <button
                        onClick={() => removeLead(lead.id)}
                        className="text-slate-600 hover:text-red-400 transition-colors"
                        aria-label="Remove lead"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </ToolPageLayout>
  );
}