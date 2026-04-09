"use client";

import { useState, useMemo } from "react";
import { Plus, Trash2, Calculator, RotateCcw } from "lucide-react";
import { Nav } from "@/components/nav";

const GRADE_SCALE = [
  { min: 90, max: 100, grade: "A+", gp: 4.0 },
  { min: 85, max: 89,  grade: "A",  gp: 4.0 },
  { min: 80, max: 84,  grade: "A-", gp: 3.8 },
  { min: 75, max: 79,  grade: "B+", gp: 3.4 },
  { min: 71, max: 74,  grade: "B",  gp: 3.0 },
  { min: 68, max: 70,  grade: "B-", gp: 2.8 },
  { min: 64, max: 67,  grade: "C+", gp: 2.4 },
  { min: 61, max: 63,  grade: "C",  gp: 2.0 },
  { min: 57, max: 60,  grade: "C-", gp: 1.8 },
  { min: 53, max: 56,  grade: "D+", gp: 1.4 },
  { min: 50, max: 52,  grade: "D",  gp: 1.0 },
  { min: 0,  max: 49,  grade: "F",  gp: 0.0 },
];

function getGradeInfo(marks: number) {
  const entry = GRADE_SCALE.find((g) => marks >= g.min && marks <= g.max);
  return entry ?? GRADE_SCALE[GRADE_SCALE.length - 1];
}

interface Row {
  id: string;
  subject: string;
  credits: number;
  marks: number;
}

const DEFAULT_ROWS: Row[] = [
  { id: "1", subject: "", credits: 3, marks: 75 },
  { id: "2", subject: "", credits: 3, marks: 75 },
  { id: "3", subject: "", credits: 3, marks: 75 },
];

function gradeColor(grade: string) {
  if (grade === "F") return "text-red-700 bg-red-50 border-red-200";
  if (grade.startsWith("A")) return "text-green-700 bg-green-50 border-green-200";
  if (grade.startsWith("B")) return "text-blue-700 bg-blue-50 border-blue-200";
  if (grade.startsWith("C")) return "text-orange-700 bg-orange-50 border-orange-200";
  return "text-gray-600 bg-gray-50 border-gray-200";
}

export default function CalculatorPage() {
  const [rows, setRows] = useState<Row[]>(DEFAULT_ROWS);

  function addRow() {
    setRows((r) => [...r, { id: String(Date.now()), subject: "", credits: 3, marks: 75 }]);
  }

  function removeRow(id: string) {
    setRows((r) => r.filter((row) => row.id !== id));
  }

  function updateRow(id: string, patch: Partial<Row>) {
    setRows((r) => r.map((row) => (row.id === id ? { ...row, ...patch } : row)));
  }

  function reset() {
    setRows(DEFAULT_ROWS);
  }

  const { sgpa, totalCredits, totalQP } = useMemo(() => {
    let qp = 0;
    let tc = 0;
    rows.forEach((row) => {
      const { gp } = getGradeInfo(row.marks);
      qp += gp * row.credits;
      tc += row.credits;
    });
    const sgpa = tc > 0 ? Number((qp / tc).toFixed(2)) : 0;
    return { sgpa, totalCredits: tc, totalQP: qp };
  }, [rows]);

  return (
    <div className="min-h-screen bg-[#f5f7f8] flex flex-col">
      <Nav />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 py-8 sm:py-12 sm:px-8">
        
        {/* Header */}
        <div className="mb-10 max-w-2xl">
          <h1 className="text-[36px] sm:text-[42px] font-black text-[#1f2432] tracking-tight leading-tight mb-4">
            Semester GPA Calculator
          </h1>
          <p className="text-[15px] sm:text-[16px] text-gray-500 font-medium leading-relaxed">
            Estimate your SGPA instantly. This tool automatically aligns your entered scores with the official UBIT grading scale to compute precise grade points.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px] items-start">
          
          {/* Main Form */}
          <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#e2e6ea] overflow-hidden">
            <div className="overflow-x-auto styled-scrollbar">
              <div className="min-w-[500px]">
                {/* Table Header */}
                <div className="bg-[#1f2432] grid grid-cols-[1fr_80px_90px_60px_60px] gap-3 sm:gap-4 px-4 sm:px-6 py-4 rounded-t-xl">
                  {["Course Name", "Credits", "Marks", "Grade", "GP"].map((label) => (
                    <span key={label} className="text-[11px] font-black text-white uppercase tracking-widest text-center first:text-left">
                      {label}
                    </span>
                  ))}
                </div>

                {/* Rows */}
                <div className="divide-y divide-[#e2e6ea]">
                  {rows.map((row, i) => {
                    const { grade, gp } = getGradeInfo(row.marks);
                    return (
                      <div key={row.id} className="group grid grid-cols-[1fr_80px_90px_60px_60px] gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 items-center hover:bg-gray-50/50 transition-colors">
                        
                        <input
                          type="text"
                          className="w-full bg-transparent border-b border-gray-200 px-1 py-2 text-[15px] font-semibold text-[#1f2432] placeholder:text-gray-400 focus:outline-none focus:border-[#0056D2] transition-colors rounded-none"
                          placeholder={`Course ${i + 1}`}
                          value={row.subject}
                          onChange={(e) => updateRow(row.id, { subject: e.target.value })}
                        />

                        <select
                          className="w-full bg-gray-50 border border-gray-200 rounded-md px-2 py-2 text-[14px] font-bold text-[#1f2432] focus:outline-none focus:border-[#0056D2] transition-colors cursor-pointer"
                          value={row.credits}
                          onChange={(e) => updateRow(row.id, { credits: Number(e.target.value) })}
                        >
                          {[1, 2, 3, 4].map(cr => <option key={cr} value={cr}>{cr}</option>)}
                        </select>

                        <input
                          type="number"
                          min={0}
                          max={100}
                          className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-[15px] font-black tabular-nums text-center text-[#1f2432] focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2] transition-all shadow-sm"
                          value={row.marks}
                          onChange={(e) => updateRow(row.id, { marks: Math.max(0, Math.min(100, Number(e.target.value))) })}
                        />

                        <div className="flex justify-center">
                          <span className={`inline-flex items-center justify-center h-8 w-10 sm:h-9 sm:w-12 rounded border text-[13px] font-bold ${gradeColor(grade)}`}>
                            {grade}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-[15px] font-bold tabular-nums text-gray-700">{gp.toFixed(1)}</span>
                          {rows.length > 1 && (
                            <button
                              onClick={() => removeRow(row.id)}
                              className="md:opacity-0 group-hover:opacity-100 hover:bg-red-50 text-gray-400 hover:text-red-700 p-2 rounded transition-all focus:opacity-100"
                              title="Remove row"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-[#fcfdfd] border-t border-[#e2e6ea] p-4 sm:p-6 flex justify-between items-center">
              <button
                onClick={addRow}
                className="flex items-center gap-2 px-6 py-2.5 text-[13px] font-bold text-white bg-[#1f2432] rounded-lg hover:bg-[#00255d] border border-transparent hover:border-[#0056D2] transition-all shadow-[0_2px_10px_rgb(0,0,0,0.1)]"
              >
                <Plus className="h-4 w-4" /> Add Course
              </button>

              <button
                onClick={reset}
                className="flex items-center gap-2 px-4 py-2 text-[14px] font-semibold text-gray-500 hover:text-gray-900 transition-colors"
              >
                <RotateCcw className="h-4 w-4" /> Reset
              </button>
            </div>
          </div>

          {/* Sidebar / Results */}
          <div className="space-y-6">
            
            {/* Projected Score Card */}
            <div className="bg-[#00255d] rounded-xl shadow-xl p-8 text-center relative overflow-hidden">
              <div className="absolute right-0 top-0 w-48 h-48 bg-gradient-to-br from-[#0056D2] to-[#00255d] rounded-bl-[100px] opacity-50 -mr-10 -mt-10"></div>
              <div className="relative z-10">
                <p className="text-[12px] font-black text-gray-300 uppercase tracking-widest mb-3 border-b border-white/10 pb-3 inline-block">Projected SGPA</p>
                <div className="text-[72px] leading-none font-black text-white mb-2 tabular-nums tracking-tighter">
                  {sgpa.toFixed(2)}
                </div>
                <div className="flex justify-center gap-8 text-[13px] font-bold text-gray-400 mt-6 pt-5 border-t border-white/10">
                  <span><strong className="text-white text-[15px]">{totalCredits}</strong> Credits</span>
                  <span><strong className="text-white text-[15px]">{totalQP.toFixed(1)}</strong> QPs</span>
                </div>
              </div>
            </div>

            {/* Reference Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 p-4 text-center">
                <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Official Grading Scale</p>
              </div>
              <div className="divide-y divide-[#e2e6ea] text-sm">
                {GRADE_SCALE.map(g => (
                  <div key={g.grade} className="flex justify-between items-center p-3 px-5 hover:bg-gray-50/50">
                    <div className="flex items-center gap-4">
                      <span className={`inline-flex items-center justify-center w-10 h-7 rounded border text-[12px] font-bold ${gradeColor(g.grade)}`}>{g.grade}</span>
                      <span className="text-gray-500 font-medium tabular-nums">{g.min} <span className="text-gray-300 mx-1">–</span> {g.max}</span>
                    </div>
                    <span className="font-extrabold text-[#1f2432] tabular-nums">{g.gp.toFixed(1)}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
