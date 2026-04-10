"use client";

import { useState, useMemo } from "react";
import { Plus, Trash2, RotateCcw } from "lucide-react";
import { Nav } from "@/components/nav";
import { UBIT_GRADE_SCALE } from "@/constants/academic";
import { getGradeInfo, getGradeColor } from "@/lib/utils/academic-math";
import type { CalculatorRow } from "@/types";

const DEFAULT_ROWS: CalculatorRow[] = [
  { id: "1", subject: "", credits: 3, marks: 75 },
  { id: "2", subject: "", credits: 3, marks: 75 },
  { id: "3", subject: "", credits: 3, marks: 75 },
];

/**
 * GPA Calculator page.
 *
 * Allows students to enter expected marks for each course and instantly
 * see their projected SGPA based on the official UBIT grading scale.
 * All grade computation is delegated to `getGradeInfo` from academic-math.ts.
 */
export default function CalculatorPage() {
  const [rows, setRows] = useState<CalculatorRow[]>(DEFAULT_ROWS);

  /** Appends a new blank course row to the calculator. */
  function addRow() {
    setRows((r) => [...r, { id: String(Date.now()), subject: "", credits: 3, marks: 75 }]);
  }

  /** Removes a course row by its unique ID. */
  function removeRow(id: string) {
    setRows((r) => r.filter((row) => row.id !== id));
  }

  /** Partially updates a course row, merging the patch into the existing row. */
  function updateRow(id: string, patch: Partial<CalculatorRow>) {
    setRows((r) => r.map((row) => (row.id === id ? { ...row, ...patch } : row)));
  }

  /** Resets all rows to the default three blank courses. */
  function reset() {
    setRows(DEFAULT_ROWS);
  }

  const { sgpa, totalCredits, totalQP } = useMemo(() => {
    let qp = 0, tc = 0;
    rows.forEach((row) => {
      const { gradePoint } = getGradeInfo(row.marks);
      qp += gradePoint * row.credits;
      tc += row.credits;
    });
    return { sgpa: tc > 0 ? Number((qp / tc).toFixed(2)) : 0, totalCredits: tc, totalQP: qp };
  }, [rows]);

  return (
    <div className="min-h-screen bg-[#f5f7f8] flex flex-col">
      <Nav />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 py-6 md:py-10 md:px-8">

        {/* ── Header ──────────────────────────────────────────── */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-[24px] sm:text-[32px] md:text-[40px] font-black text-[#1f2432] tracking-tight leading-tight mb-2">
            Semester GPA Calculator
          </h1>
          <p className="text-[13px] md:text-[15px] text-gray-500 font-medium leading-relaxed max-w-xl">
            Estimate your SGPA instantly. Enter expected marks — the tool auto-computes grades using the official UBIT grading scale.
          </p>
        </div>

        {/* ── SGPA Result Card (mobile: full-width top, desktop: sidebar) ── */}
        <div className="lg:hidden mb-6">
          <SGPACard sgpa={sgpa} totalCredits={totalCredits} totalQP={totalQP} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px] items-start">

          {/* ── Main Form ──────────────────────────────────────── */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

            {/* Desktop Table Header */}
            <div className="hidden md:grid bg-[#1f2432] grid-cols-[1fr_80px_90px_60px_52px] gap-3 px-5 py-3.5">
              {["Course Name", "Credits", "Marks", "Grade", "GP"].map((label) => (
                <span key={label} className="text-[10px] font-black text-white/80 uppercase tracking-widest text-center first:text-left">
                  {label}
                </span>
              ))}
            </div>

            {/* Rows */}
            <div className="divide-y divide-gray-100">
              {rows.map((row, i) => {
                const { grade, gradePoint } = getGradeInfo(row.marks);
                return (
                  <div key={row.id} className="group p-4 md:px-5 md:py-3.5">

                    {/* Mobile: row header with label + delete */}
                    <div className="flex md:hidden items-center justify-between mb-2.5">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Course {i + 1}</span>
                      {rows.length > 1 && (
                        <button onClick={() => removeRow(row.id)} className="p-2 -m-1 text-gray-400 hover:text-red-600 transition-colors rounded-lg active:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    {/* Desktop: all in one grid row; Mobile: stacked */}
                    <div className="flex flex-col md:grid md:grid-cols-[1fr_80px_90px_60px_52px] md:items-center gap-2.5 md:gap-3">

                      {/* Subject input */}
                      <input
                        type="text"
                        className="w-full bg-gray-50 md:bg-transparent border border-gray-200 md:border-0 md:border-b rounded-lg md:rounded-none px-3 md:px-1 py-2.5 md:py-1.5 text-base md:text-[14px] font-medium text-[#1f2432] placeholder:text-gray-400 focus:outline-none focus:border-[#0056D2] transition-colors"
                        placeholder={`Course ${i + 1} name (optional)`}
                        value={row.subject}
                        onChange={(e) => updateRow(row.id, { subject: e.target.value })}
                      />

                      {/* Credits + Marks on same row on mobile */}
                      <div className="flex md:contents gap-2.5">
                        <div className="flex-1 flex flex-col gap-1 md:block">
                          <label className="text-[9px] font-black text-gray-400 uppercase tracking-wider md:hidden">Credits</label>
                          <select
                            className="w-full h-11 md:h-auto bg-gray-50 border border-gray-200 rounded-lg md:rounded-md px-2 py-2 text-base md:text-[13px] font-bold text-[#1f2432] focus:outline-none focus:border-[#0056D2] transition-colors cursor-pointer"
                            value={row.credits}
                            onChange={(e) => updateRow(row.id, { credits: Number(e.target.value) })}
                          >
                            {[1, 2, 3, 4].map(cr => <option key={cr} value={cr}>{cr}</option>)}
                          </select>
                        </div>

                        <div className="flex-1 flex flex-col gap-1 md:block">
                          <label className="text-[9px] font-black text-gray-400 uppercase tracking-wider md:hidden">Marks (0–100)</label>
                          <input
                            type="number"
                            min={0}
                            max={100}
                            inputMode="numeric"
                            className="w-full h-11 md:h-auto bg-white border border-gray-200 rounded-lg px-3 py-2 text-base md:text-[14px] font-black tabular-nums text-center text-[#1f2432] focus:outline-none focus:border-[#0056D2] transition-colors shadow-sm"
                            value={row.marks}
                            onChange={(e) => updateRow(row.id, { marks: Math.max(0, Math.min(100, Number(e.target.value))) })}
                          />
                        </div>
                      </div>

                      {/* Grade + GP row on mobile */}
                      <div className="flex md:contents items-center justify-between bg-gray-50 md:bg-transparent rounded-lg md:rounded-none p-2.5 md:p-0 gap-2">
                        <div className="flex items-center gap-3 md:justify-center md:w-full">
                          <label className="text-[10px] font-bold text-gray-400 uppercase md:hidden">Grade</label>
                          <span className={`inline-flex items-center justify-center h-8 w-10 rounded border text-[12px] font-bold ${getGradeColor(grade)}`}>
                            {grade}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 md:justify-between md:w-full">
                          <label className="text-[10px] font-bold text-gray-400 uppercase md:hidden">GP</label>
                          <span className="text-[16px] md:text-[15px] font-black tabular-nums text-gray-800">{gradePoint.toFixed(1)}</span>
                          {rows.length > 1 && (
                            <button
                              onClick={() => removeRow(row.id)}
                              className="hidden md:flex p-2 rounded-lg text-gray-300 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

            {/* Actions footer */}
            <div className="bg-gray-50 border-t border-gray-100 p-4 flex items-center justify-between">
              <button
                onClick={addRow}
                className="flex items-center gap-2 px-5 h-11 text-[13px] font-bold text-white bg-[#1f2432] rounded-xl hover:bg-[#00255d] transition-all active:scale-95"
              >
                <Plus className="h-4 w-4" /> Add Course
              </button>
              <button
                onClick={reset}
                className="flex items-center gap-2 px-4 h-11 text-[13px] font-semibold text-gray-500 hover:text-gray-900 transition-colors rounded-xl hover:bg-gray-100 active:scale-95"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </button>
            </div>
          </div>

          {/* ── Sidebar (desktop only) ──────────────────────────── */}
          <div className="hidden lg:flex flex-col gap-5">
            <SGPACard sgpa={sgpa} totalCredits={totalCredits} totalQP={totalQP} />

            {/* Grading Scale Reference */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-100 px-4 py-3 text-center">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Official Grading Scale</p>
              </div>
              <div className="divide-y divide-gray-100">
                {UBIT_GRADE_SCALE.map(g => (
                  <div key={g.grade} className="flex justify-between items-center px-4 py-2.5 hover:bg-gray-50/70 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center justify-center w-9 h-6 rounded border text-[11px] font-bold ${getGradeColor(g.grade)}`}>{g.grade}</span>
                      <span className="text-[12px] text-gray-500 font-medium tabular-nums">{g.min}–{g.max}</span>
                    </div>
                    <span className="font-extrabold text-[#1f2432] text-[13px] tabular-nums">{g.gp.toFixed(1)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Grading Scale below form */}
        <div className="lg:hidden mt-6">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-100 px-4 py-3">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Grading Scale Reference</p>
            </div>
            <div className="grid grid-cols-2 divide-x divide-gray-100">
              {UBIT_GRADE_SCALE.map(g => (
                <div key={g.grade} className="flex items-center justify-between px-3 py-2.5 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/70">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center justify-center w-8 h-6 rounded border text-[11px] font-bold ${getGradeColor(g.grade)}`}>{g.grade}</span>
                    <span className="text-[11px] text-gray-400 tabular-nums">{g.min}–{g.max}</span>
                  </div>
                  <span className="font-extrabold text-[12px] text-[#1f2432] tabular-nums">{g.gp.toFixed(1)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/**
 * Displays the computed SGPA result in a premium dark card.
 * Used both in the sidebar (desktop) and above the form (mobile).
 *
 * @param sgpa          - The computed semester GPA (0.00–4.00).
 * @param totalCredits  - Sum of credit hours across all calculator rows.
 * @param totalQP       - Sum of quality points (gradePoint × credits).
 */
function SGPACard({ sgpa, totalCredits, totalQP }: { sgpa: number; totalCredits: number; totalQP: number }) {
  return (
    <div className="bg-[#00255d] rounded-xl shadow-lg p-6 text-center relative overflow-hidden">
      <div className="absolute right-0 top-0 w-40 h-40 bg-gradient-to-br from-[#0056D2] to-[#00255d] rounded-bl-[80px] opacity-50 -mr-8 -mt-8" />
      <div className="relative z-10">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 pb-3 border-b border-white/10">Projected SGPA</p>
        <div className="text-[60px] md:text-[68px] leading-none font-black text-white tabular-nums tracking-tighter">
          {sgpa.toFixed(2)}
        </div>
        <div className="flex justify-center gap-6 mt-5 pt-4 border-t border-white/10 text-[12px] font-bold text-gray-400">
          <span><strong className="text-white text-[14px]">{totalCredits}</strong> Credits</span>
          <span><strong className="text-white text-[14px]">{totalQP.toFixed(1)}</strong> QP</span>
        </div>
      </div>
    </div>
  );
}
