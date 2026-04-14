/**
 * table-helpers.tsx
 * 
 * Shared table primitives used by both ResultTable and CGPATable.
 * Extracted to eliminate duplication across large table components.
 */

import type React from "react";

// ── Th — header cell label ─────────────────────────────────────
export function Th({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-200"
    >
      {children}
    </span>
  );
}

// ── Result Table sticky column classes ────────────────────────
// rank(90px) + roll(150px)
export function thStickyClassResult(id: string): string {
  if (id === "rank")
    return "bg-[#0F172A] w-[52px] min-w-[52px] sm:w-[90px] sm:min-w-[90px] max-md:static sticky left-0 z-30 shadow-[1px_0_0_#1e293b]";
  if (id === "roll")
    return "bg-[#0F172A] w-[120px] min-w-[120px] sm:w-[150px] sm:min-w-[150px] max-md:static max-md:shadow-none sticky left-[90px] z-30 shadow-[2px_0_0_#1e293b]";
  return "";
}

export function tdStickyClassResult(id: string, bgClass: string): string {
  if (id === "rank")
    return `${bgClass || "bg-white"} w-[52px] min-w-[52px] sm:w-[90px] sm:min-w-[90px] max-md:static sticky left-0 z-10 shadow-[1px_0_0_#F1F5F9]`;
  if (id === "roll")
    return `${bgClass || "bg-white"} w-[120px] min-w-[120px] sm:w-[150px] sm:min-w-[150px] max-md:static max-md:shadow-none sticky left-[90px] z-10 shadow-[2px_0_5px_rgba(0,0,0,0.05)]`;
  return "";
}

// ── CGPA Table sticky column classes ──────────────────────────
// rank(90px) + roll(130px) + name(220px)
export function thStickyClassCGPA(id: string): string {
  if (id === "rank")
    return "bg-ubit-navy w-[52px] min-w-[52px] sm:w-[90px] sm:min-w-[90px] max-md:static sticky left-0 z-30 shadow-[1px_0_0_#1E293B]";
  if (id === "roll")
    return "bg-ubit-navy w-[100px] min-w-[100px] sm:w-[130px] sm:min-w-[130px] max-md:static max-md:shadow-none sticky left-[90px] z-30 shadow-[2px_0_0_#1E293B]";
  if (id === "name")
    return "bg-ubit-navy w-[160px] min-w-[160px] sm:w-[220px] sm:min-w-[220px] max-md:static max-md:shadow-none sticky left-[220px] z-30 shadow-[2px_0_0_#1E293B]";
  return "";
}

export function tdStickyClassCGPA(id: string, bgClass?: string): string {
  if (id === "rank")
    return `${bgClass || "bg-white"} w-[52px] min-w-[52px] sm:w-[90px] sm:min-w-[90px] max-md:static sticky left-0 z-10 shadow-[1px_0_0_#F1F5F9]`;
  if (id === "roll")
    return `${bgClass || "bg-white"} w-[100px] min-w-[100px] sm:w-[130px] sm:min-w-[130px] max-md:static max-md:shadow-none sticky left-[90px] z-10 shadow-[2px_0_5px_rgba(0,0,0,0.05)]`;
  if (id === "name")
    return `${bgClass || "bg-white"} w-[160px] min-w-[160px] sm:w-[220px] sm:min-w-[220px] max-md:static max-md:shadow-none sticky left-[220px] z-10 shadow-[2px_0_5px_rgba(0,0,0,0.05)]`;
  return "";
}

// ── Medal legend items ─────────────────────────────────────────
export const MEDAL_LEGEND = [
  { label: "Gold",   colorClass: "bg-ubit-gold" },
  { label: "Silver", colorClass: "bg-ubit-silver" },
  { label: "Bronze", colorClass: "bg-ubit-bronze" },
] as const;
