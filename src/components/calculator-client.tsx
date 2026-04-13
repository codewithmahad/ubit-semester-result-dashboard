"use client";

import { useState, useMemo, useCallback } from "react";
import { Plus, Trash2, RotateCcw, ChevronDown, ChevronUp } from "lucide-react";
import { UBIT_GRADE_SCALE } from "@/constants/academic";
import { getGradeInfo } from "@/lib/utils/academic-math";
import type { CalculatorRow } from "@/types";

const DEFAULT_ROWS: CalculatorRow[] = [
  { id: "1", subject: "Data Structures", credits: 3, marks: 78 },
  { id: "2", subject: "Calculus II",     credits: 3, marks: 82 },
  { id: "3", subject: "OOP",             credits: 3, marks: 71 },
];

// ── Grade to bar color ─────────────────────────────────────────
function gradeBarColor(grade: string): string {
  if (grade === "F")                   return "bg-rose-500";
  if (grade.startsWith("A"))           return "bg-emerald-500";
  if (grade.startsWith("B"))           return "bg-[#0056D2]";
  if (grade.startsWith("C"))           return "bg-amber-400";
  return "bg-slate-400";
}

function gradeTextColor(grade: string): string {
  if (grade === "F")             return "text-rose-500";
  if (grade.startsWith("A"))     return "text-emerald-500";
  if (grade.startsWith("B"))     return "text-[#0056D2]";
  if (grade.startsWith("C"))     return "text-amber-500";
  return "text-slate-400";
}

function sgpaLabel(sgpa: number): { text: string; color: string } {
  if (sgpa >= 3.8) return { text: "Distinction",     color: "text-emerald-400" };
  if (sgpa >= 3.0) return { text: "Merit",           color: "text-[#60a5fa]" };
  if (sgpa >= 2.0) return { text: "Satisfactory",    color: "text-amber-400" };
  if (sgpa >  0)   return { text: "At Risk",         color: "text-rose-400" };
  return           { text: "—",                      color: "text-slate-600" };
}

// ── Grading scale expanded toggle ────────────────────────────
function GradeReference() {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-white/[0.06]">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-4 text-[11px] font-black uppercase tracking-[0.18em] text-slate-600 hover:text-slate-400 transition-colors"
      >
        UBIT Official Grading Scale
        {open
          ? <ChevronUp  className="w-3.5 h-3.5" />
          : <ChevronDown className="w-3.5 h-3.5" />}
      </button>
      {open && (
        <div className="pb-4 px-4">
          <div className="grid grid-cols-2 gap-1">
            {UBIT_GRADE_SCALE.map(g => {
              const barW = Math.round((g.gp / 4.0) * 100);
              return (
                <div
                  key={g.grade}
                  className="flex items-center justify-between bg-white/[0.03] hover:bg-white/[0.06] rounded-lg px-3 py-2 transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`text-[12px] font-black w-7 shrink-0 ${gradeTextColor(g.grade)}`}>
                      {g.grade}
                    </span>
                    <span className="text-[10px] text-slate-600 tabular-nums">{g.min}–{g.max}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${gradeBarColor(g.grade)} opacity-70`}
                        style={{ width: `${barW}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-black text-slate-300 tabular-nums w-7 text-right">
                      {g.gp.toFixed(1)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────
export function CalculatorClient() {
  const [rows, setRows] = useState<CalculatorRow[]>(DEFAULT_ROWS);

  const addRow = useCallback(() => {
    setRows(r => [...r, { id: String(Date.now()), subject: "", credits: 3, marks: 75 }]);
  }, []);

  const removeRow = useCallback((id: string) => {
    setRows(r => r.filter(row => row.id !== id));
  }, []);

  const updateRow = useCallback((id: string, patch: Partial<CalculatorRow>) => {
    setRows(r => r.map(row => (row.id === id ? { ...row, ...patch } : row)));
  }, []);

  const reset = useCallback(() => setRows(DEFAULT_ROWS), []);

  const { sgpa, totalCredits, totalQP } = useMemo(() => {
    let qp = 0, tc = 0;
    rows.forEach(row => {
      const { gradePoint } = getGradeInfo(row.marks);
      qp += gradePoint * row.credits;
      tc += row.credits;
    });
    return { sgpa: tc > 0 ? Number((qp / tc).toFixed(2)) : 0, totalCredits: tc, totalQP: Number(qp.toFixed(2)) };
  }, [rows]);

  const label = sgpaLabel(sgpa);

  // SGPA arc progress (0–4 → 0–180deg)
  const arcDeg = Math.min((sgpa / 4) * 180, 180);

  return (
    <div className="min-h-[60vh] grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">

      {/* ── LEFT: Course input card ─────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

        {/* Header */}
        <div className="bg-[#0F172A] px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">
              Semester GPA Calculator
            </p>
            <p className="text-[13px] font-semibold text-slate-300">
              Enter marks per course — grades compute live
            </p>
          </div>
          <button
            onClick={reset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-bold text-slate-400 hover:text-white transition-all"
            aria-label="Reset all courses"
          >
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
        </div>

        {/* Desktop column headers */}
        <div className="hidden md:grid grid-cols-[36px_1fr_80px_100px_60px_44px] gap-x-3 px-5 py-2.5 border-b border-gray-100 bg-gray-50/70">
          {["#", "Course Name", "Credits", "Marks", "Grade", ""].map((h, i) => (
            <span
              key={i}
              className="text-[9px] font-black uppercase tracking-[0.18em] text-gray-400"
            >
              {h}
            </span>
          ))}
        </div>

        {/* Rows */}
        <div className="divide-y divide-gray-50">
          {rows.map((row, i) => {
            const { grade, gradePoint } = getGradeInfo(row.marks);
            const pct = (row.marks / 100) * 100;

            return (
              <div
                key={row.id}
                className="group relative px-5 py-4 hover:bg-slate-50/50 transition-colors"
              >
                {/* Mobile header */}
                <div className="flex md:hidden items-center justify-between mb-3">
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                    Course {i + 1}
                  </span>
                  {rows.length > 1 && (
                    <button
                      onClick={() => removeRow(row.id)}
                      className="p-1.5 text-gray-300 hover:text-rose-500 transition-colors rounded-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Desktop row grid */}
                <div className="hidden md:grid grid-cols-[36px_1fr_80px_100px_60px_44px] gap-x-3 items-center">
                  {/* Index */}
                  <span className="text-[12px] font-black text-gray-300 tabular-nums text-center">
                    {i + 1}
                  </span>

                  {/* Course name */}
                  <input
                    type="text"
                    placeholder={`Course ${i + 1}`}
                    value={row.subject}
                    onChange={e => updateRow(row.id, { subject: e.target.value })}
                    className="w-full bg-transparent border-b border-gray-200 focus:border-[#0056D2] py-1 text-[13px] font-semibold text-[#1f2432] placeholder:text-gray-300 outline-none transition-colors"
                  />

                  {/* Credits */}
                  <select
                    value={row.credits}
                    onChange={e => updateRow(row.id, { credits: Number(e.target.value) })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 text-[13px] font-bold text-[#1f2432] focus:outline-none focus:border-[#0056D2] cursor-pointer transition-colors"
                  >
                    {[1, 2, 3, 4].map(cr => <option key={cr} value={cr}>{cr} cr</option>)}
                  </select>

                  {/* Marks — with live progress bar */}
                  <div className="relative">
                    <input
                      type="number"
                      min={0} max={100}
                      inputMode="numeric"
                      value={row.marks}
                      onChange={e => updateRow(row.id, { marks: Math.max(0, Math.min(100, Number(e.target.value))) })}
                      className="w-full bg-white border border-gray-200 rounded-lg px-2 py-1.5 text-[13px] font-black tabular-nums text-center text-[#1f2432] focus:outline-none focus:border-[#0056D2] transition-colors shadow-sm"
                    />
                    {/* Tiny marks fill bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${gradeBarColor(grade)}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  {/* Grade */}
                  <div className="flex justify-center">
                    <span className={`text-[13px] font-black ${gradeTextColor(grade)}`}>
                      {grade}
                      <span className="block text-[9px] font-bold text-gray-400 text-center tabular-nums">
                        {gradePoint.toFixed(1)}
                      </span>
                    </span>
                  </div>

                  {/* Delete */}
                  {rows.length > 1 ? (
                    <button
                      onClick={() => removeRow(row.id)}
                      className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-300 hover:text-rose-500 hover:bg-rose-50 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  ) : <span />}
                </div>

                {/* Mobile row content */}
                <div className="md:hidden space-y-3">
                  <input
                    type="text"
                    placeholder={`Course ${i + 1} name (optional)`}
                    value={row.subject}
                    onChange={e => updateRow(row.id, { subject: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-medium text-[#1f2432] placeholder:text-gray-300 outline-none focus:border-[#0056D2] transition-colors"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1.5">Credits</p>
                      <select
                        value={row.credits}
                        onChange={e => updateRow(row.id, { credits: Number(e.target.value) })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-[14px] font-bold text-[#1f2432] focus:outline-none focus:border-[#0056D2] cursor-pointer"
                      >
                        {[1, 2, 3, 4].map(cr => <option key={cr} value={cr}>{cr} credit hrs</option>)}
                      </select>
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1.5">Marks / 100</p>
                      <input
                        type="number" min={0} max={100} inputMode="numeric"
                        value={row.marks}
                        onChange={e => updateRow(row.id, { marks: Math.max(0, Math.min(100, Number(e.target.value))) })}
                        className="w-full bg-white border border-gray-200 rounded-xl px-3 py-3 text-[16px] font-black tabular-nums text-center text-[#1f2432] focus:outline-none focus:border-[#0056D2] shadow-sm"
                      />
                    </div>
                  </div>
                  {/* Grade result row */}
                  <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-2.5">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Grade</p>
                      <p className={`text-[16px] font-black ${gradeTextColor(grade)}`}>{grade}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Grade Points</p>
                      <p className="text-[16px] font-black text-[#1f2432] tabular-nums">{gradePoint.toFixed(1)}</p>
                    </div>
                    {/* mini bar */}
                    <div className="flex-1 mx-4 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${gradeBarColor(grade)}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer: Add Course */}
        <div className="bg-gray-50 border-t border-gray-100 px-5 py-4 flex items-center justify-between">
          <button
            onClick={addRow}
            className="flex items-center gap-2 px-5 h-10 text-[13px] font-bold text-white bg-[#0F172A] rounded-xl hover:bg-[#1e2940] transition-all active:scale-95 shadow-sm"
          >
            <Plus className="h-4 w-4" /> Add Course
          </button>
          <p className="text-[11px] text-gray-400 font-medium tabular-nums">
            {rows.length} course{rows.length !== 1 ? "s" : ""} &nbsp;·&nbsp; {totalCredits} credits
          </p>
        </div>
      </div>

      {/* ── RIGHT: SGPA display + grade reference ─────────────────── */}
      <div className="flex flex-col gap-4">

        {/* SGPA Card */}
        <div className="bg-[#0F172A] rounded-2xl overflow-hidden border border-white/[0.06]">

          {/* Arc dial */}
          <div className="flex flex-col items-center pt-8 pb-6 px-6">
            <div className="relative w-44 h-24 mb-3">
              {/* Background arc SVG */}
              <svg viewBox="0 0 200 108" className="absolute inset-0 w-full h-full">
                {/* Track */}
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                {/* Fill — proportional to SGPA / 4.0 */}
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke={
                    sgpa >= 3.8 ? "#34d399"
                    : sgpa >= 3.0 ? "#60a5fa"
                    : sgpa >= 2.0 ? "#fbbf24"
                    : sgpa > 0   ? "#f87171"
                    : "rgba(255,255,255,0.06)"
                  }
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (arcDeg / 180) * 251.2}
                  style={{ transition: "stroke-dashoffset 0.4s ease, stroke 0.4s ease" }}
                />
                {/* Tick marks at 1, 2, 3, 4 */}
                {[0, 45, 90, 135, 180].map((deg, i) => {
                  const rad = ((deg - 180) * Math.PI) / 180;
                  const cx = 100 + 80 * Math.cos(rad);
                  const cy = 100 + 80 * Math.sin(rad);
                  return (
                    <circle key={i} cx={cx} cy={cy} r="2"
                      fill="rgba(255,255,255,0.15)" />
                  );
                })}
              </svg>

              {/* Center value */}
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
                <span
                  className="text-[40px] font-black text-white tracking-tight tabular-nums leading-none"
                  style={{ transition: "all 0.3s ease" }}
                >
                  {sgpa.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Standing label */}
            <p className={`text-[12px] font-black uppercase tracking-[0.2em] ${label.color} transition-colors mb-1`}>
              {label.text}
            </p>
            <p className="text-[10px] text-slate-600 font-semibold uppercase tracking-widest">
              Projected SGPA
            </p>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 border-t border-white/[0.06]">
            <div className="flex flex-col items-center py-4 border-r border-white/[0.06]">
              <p className="text-[22px] font-black text-white tabular-nums leading-none mb-1">
                {totalCredits}
              </p>
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-600">
                Credit Hours
              </p>
            </div>
            <div className="flex flex-col items-center py-4">
              <p className="text-[22px] font-black text-white tabular-nums leading-none mb-1">
                {totalQP.toFixed(1)}
              </p>
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-600">
                Quality Points
              </p>
            </div>
          </div>

          {/* Grading scale accordion */}
          <GradeReference />
        </div>

        {/* Tip card */}
        <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#8F141B] mb-2">
            How it works
          </p>
          <p className="text-[12px] text-gray-500 font-medium leading-relaxed">
            SGPA = Σ(Grade Points × Credits) ÷ Total Credits.{" "}
            Grade points follow the official UBIT scale published by the
            Department of Computer Science, University of Karachi.
          </p>
        </div>
      </div>

    </div>
  );
}
