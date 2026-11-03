"use client";

import { ArrowUpRight } from "lucide-react";
import type { CheckoutOption } from "./data";

/* Stripe-hosted checkout link — opens in a new tab, billing terms always visible */
export default function CheckoutButton({
  option,
  variant = "primary",
}: {
  option: CheckoutOption;
  variant?: "primary" | "outline";
}) {
  const styles =
    variant === "primary"
      ? "bg-[#D4A853] text-[#050a12] hover:bg-[#E8D5B7]"
      : "border border-[#D4A853]/50 text-[#E8D5B7] hover:bg-[#D4A853]/[0.08]";

  return (
    <div className="w-full">
      <a
        href={option.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-2 rounded-sm font-semibold px-6 py-3 text-sm transition-colors w-full ${styles}`}
      >
        {option.label}
        <ArrowUpRight className="w-4 h-4" />
      </a>
      <p className="text-[11px] text-slate-500 text-center mt-1.5">
        {option.billing}
      </p>
    </div>
  );
}