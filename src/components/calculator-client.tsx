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
  return           { text: "—",                      color: "text-white" }; 
}

// ── Grading scale reference ────────────────────────────
function GradeReference() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-8 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-5 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <span className="text-[13px] font-black uppercase tracking-[0.18em] text-[#1f2432]">
          UBIT Official Grading Scale
        </span>
        {open ? <ChevronUp className="w-5 h-5 text-[#8F141B]" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>
      
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-8 bg-white border-t border-gray-100">
            <h3 className="text-center text-[#8F141B] font-bold tracking-widest uppercase text-[15px] mb-4 mt-6">
              Grade Point Table
            </h3>
            <div className="max-w-2xl mx-auto overflow-x-auto scrollbar-hide">
              <table className="w-full text-center border-collapse border border-gray-500">
                <thead>
                  <tr className="bg-[#EAEAEA]">
                    <th className="px-2 py-2.5 md:px-4 md:py-3 border border-gray-500 text-[11px] md:text-[14px] font-bold text-[#1f2432] leading-tight">Numeric Score</th>
                    <th className="px-2 py-2.5 md:px-4 md:py-3 border border-gray-500 text-[11px] md:text-[14px] font-bold text-[#1f2432] leading-tight">Alphabetic Grade</th>
                    <th className="px-2 py-2.5 md:px-4 md:py-3 border border-gray-500 text-[11px] md:text-[14px] font-bold text-[#1f2432] leading-tight">Grade Point</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {UBIT_GRADE_SCALE.map((g) => (
                    <tr key={g.grade} className="transition-colors">
                      <td className="px-2 py-2.5 md:px-4 md:py-3 border border-gray-500 text-[12px] md:text-[14px] text-gray-700 tabular-nums font-medium">
                        {g.min === 90 ? "90 & above" : g.min === 0 ? "BELOW 50" : `${g.min}-${g.max}`}
                      </td>
                      <td className="px-2 py-2.5 md:px-4 md:py-3 border border-gray-500 text-[13px] md:text-[15px] font-semibold text-[#1f2432]">
                        {g.grade === "F" ? "FAILS" : g.grade}
                      </td>
                      <td className="px-2 py-2.5 md:px-4 md:py-3 border border-gray-500 text-[12px] md:text-[14px] font-medium text-[#1f2432] tabular-nums">
                        {g.gp.toFixed(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
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
  const arcDeg = Math.min((sgpa / 4) * 180, 180);

  return (
    <div className="flex flex-col">
      <div className="min-h-[60vh] grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">

        {/* ── LEFT: Course input card ─────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">

          {/* Unified Desktop Header */}
          <div className="hidden md:grid grid-cols-[36px_1fr_80px_100px_60px_44px] gap-x-3 items-center px-5 py-5 bg-[#0F172A] border-b border-gray-800">
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white text-center">#</span>
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white">Course Name</span>
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white text-center">Credits</span>
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white text-center">Marks</span>
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white text-center">Grade</span>
            <div className="flex justify-end pr-1">
              <button
                onClick={reset}
                className="group flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.08] hover:bg-[#8F141B] text-slate-200 hover:text-white transition-all shadow-sm"
                aria-label="Reset all courses"
                title="Reset Calculator"
              >
                <RotateCcw className="h-4 w-4 group-hover:-rotate-90 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Mobile Header (retained for mobile view only) */}
          <div className="md:hidden bg-[#0F172A] px-5 py-4 flex items-center justify-between border-b border-gray-800">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white">
              GPA Calculator
            </span>
            <button
              onClick={reset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.08] hover:bg-[#8F141B] active:scale-95 text-[11px] font-bold text-white transition-all shadow-sm"
            >
              <RotateCcw className="h-3 w-3" /> Reset
            </button>
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-50 flex-1">
            {rows.map((row, i) => {
              const { grade, gradePoint } = getGradeInfo(row.marks);
              const pct = (row.marks / 100) * 100;

              return (
                <div
                  key={row.id}
                  className="group relative px-5 py-4 hover:bg-slate-50/50 transition-colors"
                >
                  {/* Mobile row header */}
                  <div className="flex md:hidden items-center justify-between mb-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#1f2432]">
                      Course {i + 1}
                    </span>
                    {rows.length > 1 && (
                      <button
                        onClick={() => removeRow(row.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors rounded-lg"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {/* Desktop row grid */}
                  <div className="hidden md:grid grid-cols-[36px_1fr_80px_100px_60px_44px] gap-x-3 items-center">
                    {/* Index */}
                    <span className="text-[12px] font-black text-slate-400 tabular-nums text-center">
                      {i + 1}
                    </span>

                    {/* Course name */}
                    <input
                      type="text"
                      placeholder={`Course ${i + 1}`}
                      value={row.subject}
                      onChange={e => updateRow(row.id, { subject: e.target.value })}
                      className="w-full bg-transparent border-b border-gray-200 focus:border-[#0056D2] py-1 text-[14px] font-semibold text-[#1f2432] placeholder:text-slate-300 outline-none transition-colors"
                    />

                    {/* Credits */}
                    <select
                      value={row.credits}
                      onChange={e => updateRow(row.id, { credits: Number(e.target.value) })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 text-[14px] font-bold text-[#1f2432] focus:outline-none focus:border-[#0056D2] cursor-pointer transition-colors"
                    >
                      {[1, 2, 3, 4].map(cr => <option key={cr} value={cr}>{cr} cr</option>)}
                    </select>

                    {/* Marks — with strictly bounded live progress bar */}
                    <div className="relative w-full bg-white border border-gray-200 rounded-lg focus-within:border-[#0056D2] transition-colors shadow-sm overflow-hidden flex flex-col justify-center h-[36px]">
                      <input
                        type="number"
                        min={0} max={100}
                        inputMode="numeric"
                        value={row.marks}
                        onChange={e => updateRow(row.id, { marks: Math.max(0, Math.min(100, Number(e.target.value))) })}
                        className="w-full bg-transparent border-none px-2 text-[14px] font-black tabular-nums text-center text-[#1f2432] outline-none [&::-webkit-inner-spin-button]:appearance-none pt-0.5"
                      />
                      {/* Bounded marks fill bar */}
                      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gray-50 flex items-end">
                        <div
                          className={`h-[2px] transition-all duration-500 ${gradeBarColor(grade)}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>

                    {/* Grade */}
                    <div className="flex justify-center">
                      <span className={`text-[14px] font-black ${gradeTextColor(grade)}`}>
                        {grade}
                        <span className="block text-[10px] font-bold text-slate-400 text-center tabular-nums">
                          {gradePoint.toFixed(1)}
                        </span>
                      </span>
                    </div>

                    {/* Delete */}
                    {rows.length > 1 ? (
                      <button
                        onClick={() => removeRow(row.id)}
                        className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50 opacity-0 group-hover:opacity-100 transition-all ml-auto"
                      >
                        <Trash2 className="h-4 w-4" />
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
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-medium text-[#1f2432] placeholder:text-slate-400 outline-none focus:border-[#0056D2] transition-colors"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-[#1f2432] mb-1.5 pl-1">Credits</p>
                        <select
                          value={row.credits}
                          onChange={e => updateRow(row.id, { credits: Number(e.target.value) })}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-[14px] font-bold text-[#1f2432] focus:outline-none focus:border-[#0056D2] cursor-pointer"
                        >
                          {[1, 2, 3, 4].map(cr => <option key={cr} value={cr}>{cr} credit hrs</option>)}
                        </select>
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-[#1f2432] mb-1.5 pl-1">Marks / 100</p>
                        <div className="relative w-full bg-white border border-gray-200 rounded-xl focus-within:border-[#0056D2] transition-colors shadow-sm overflow-hidden flex flex-col justify-center h-[46px]">
                          <input
                            type="number" min={0} max={100} inputMode="numeric"
                            value={row.marks}
                            onChange={e => updateRow(row.id, { marks: Math.max(0, Math.min(100, Number(e.target.value))) })}
                            className="w-full bg-transparent border-none px-3 text-[16px] font-black tabular-nums text-center text-[#1f2432] outline-none [&::-webkit-inner-spin-button]:appearance-none pt-0.5"
                          />
                          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gray-50 flex items-end">
                            <div
                              className={`h-[2px] transition-all duration-500 ${gradeBarColor(grade)}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Grade result row */}
                    <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-2.5">
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Grade</p>
                        <p className={`text-[16px] font-black ${gradeTextColor(grade)}`}>{grade}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Grade Points</p>
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
          <div className="bg-gray-50 border-t border-gray-100 px-5 py-4 flex items-center justify-between mt-auto">
            <button
              onClick={addRow}
              className="flex items-center gap-2 px-5 h-10 text-[13px] font-bold text-white bg-[#0F172A] rounded-xl hover:bg-[#1e2940] transition-all active:scale-95 shadow-sm"
            >
              <Plus className="h-4 w-4" /> Add Course
            </button>
            <p className="text-[11px] text-[#1f2432] font-semibold tabular-nums tracking-wide">
              {rows.length} course{rows.length !== 1 ? "s" : ""} &nbsp;·&nbsp; {totalCredits} credits
            </p>
          </div>
        </div>

        {/* ── RIGHT: SGPA display ─────────────────── */}
        <div className="flex flex-col gap-4">

          {/* SGPA Card */}
          <div className="bg-[#0F172A] rounded-2xl overflow-hidden shadow-md border border-[#1e293b]">

            {/* Arc dial */}
            <div className="flex flex-col items-center pt-10 pb-8 px-6">
              <div className="relative w-48 h-24 mb-6">
                {/* Background arc SVG */}
                <svg viewBox="0 0 200 108" className="absolute inset-0 w-full h-full">
                  {/* Track */}
                  <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
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
                        fill="rgba(255,255,255,0.2)" />
                    );
                  })}
                </svg>

                {/* Center value */}
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-3">
                  <span
                    className="text-[48px] font-black text-white tracking-tight tabular-nums leading-none drop-shadow-lg"
                    style={{ transition: "all 0.3s ease" }}
                  >
                    {sgpa.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Standing label */}
              <p className={`text-[13px] font-black uppercase tracking-[0.2em] ${label.color} transition-colors mb-2`}>
                {label.text}
              </p>
              <p className="text-[11px] text-white font-black uppercase tracking-[0.25em] opacity-90">
                Projected SGPA
              </p>
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-2 border-t border-[#1e293b]">
              <div className="flex flex-col items-center py-6 border-r border-[#1e293b] bg-white/[0.02]">
                <p className="text-[28px] font-black text-white tabular-nums leading-none mb-1.5">
                  {totalCredits}
                </p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-200">
                  Credit Hours
                </p>
              </div>
              <div className="flex flex-col items-center py-6 bg-white/[0.02]">
                <p className="text-[28px] font-black text-white tabular-nums leading-none mb-1.5">
                  {totalQP.toFixed(1)}
                </p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-200">
                  Quality Points
                </p>
              </div>
            </div>
          </div>

          {/* Tip card */}
          <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5 shadow-sm">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#8F141B] mb-2.5">
              How it works
            </p>
            <p className="text-[12px] text-gray-500 font-medium leading-relaxed">
              SGPA = Σ(Grade Points × Credits) ÷ Total Credits. 
              Grade points follow the official UBIT scale published by the Department of Computer Science, University of Karachi.
            </p>
          </div>
        </div>

      </div>

      {/* Official Grading Scale */}
      <GradeReference />
    </div>
  );
}
