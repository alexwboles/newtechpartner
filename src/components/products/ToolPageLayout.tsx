"use client";

import type { ReactNode } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";

interface ToolPageLayoutProps {
  title: string;
  price: string;
  status: string;
  intro: string;
  assumptions: string[];
  navigate: (page: string) => void;
  children: ReactNode;
}

export default function ToolPageLayout({
  title,
  price,
  status,
  intro,
  assumptions,
  navigate,
  children,
}: ToolPageLayoutProps) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="pt-28 pb-8">
        <div className="max-w-[900px] mx-auto px-6 sm:px-8">
          <button
            onClick={() => navigate("products")}
            className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Products &amp; Tools
          </button>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            {title}
          </h1>
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="text-xs font-medium text-[#D4A853] border border-[#D4A853]/25 bg-[#D4A853]/[0.06] px-3 py-1 rounded-full">
              {price}
            </span>
            <span className="text-xs font-medium text-[#E8D5B7] border border-[#E8D5B7]/25 bg-[#E8D5B7]/[0.06] px-3 py-1 rounded-full">
              {status}
            </span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">{intro}</p>
          <p className="flex items-start gap-2 text-xs text-slate-500 mt-4 max-w-2xl">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4A853] shrink-0 mt-0.5" />
            Runs entirely in your browser — nothing you enter is saved, sent, or
            tracked.
          </p>
        </div>
      </div>

      {/* Tool body */}
      <div className="max-w-[900px] mx-auto px-6 sm:px-8 pb-24">
        <div className="pro-card p-6 sm:p-8 mb-6">{children}</div>

        <div className="border border-[#D4A853]/15 bg-[#D4A853]/[0.03] p-5 rounded-sm">
          <p className="text-xs uppercase tracking-wider text-[#D4A853] font-medium mb-3">
            Transparent assumptions
          </p>
          <ul className="space-y-2">
            {assumptions.map((a) => (
              <li key={a} className="flex items-start gap-2.5 text-xs text-slate-400 leading-relaxed">
                <span className="text-[#D4A853]/60 mt-px">—</span>
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}