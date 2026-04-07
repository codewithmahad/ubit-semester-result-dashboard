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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Nav />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 sm:px-6">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Calculator className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">
              Tools
            </span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900">
            GPA Calculator
          </h1>
          <p className="mt-2 text-base text-gray-500 max-w-2xl">
            Estimate your SGPA by entering expected marks. Uses the official UBIT grading scale 
            to automatically determine your grade points.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px] items-start">
          
          {/* Main Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Table Header */}
            <div className="bg-gray-50 border-b border-gray-200 grid grid-cols-[1fr_80px_100px_80px_80px] gap-4 px-6 py-3">
              {["Course Name", "Credits", "Marks", "Grade", "GP"].map((label) => (
                <span key={label} className="text-xs font-bold text-gray-500 uppercase tracking-wider text-center first:text-left">
                  {label}
                </span>
              ))}
            </div>

            {/* Rows */}
            <div className="divide-y divide-gray-100">
              {rows.map((row, i) => {
                const { grade, gp } = getGradeInfo(row.marks);
                return (
                  <div key={row.id} className="group grid grid-cols-[1fr_80px_100px_80px_80px] gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors">
                    
                    <input
                      type="text"
                      className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                      placeholder={`Course ${i + 1}`}
                      value={row.subject}
                      onChange={(e) => updateRow(row.id, { subject: e.target.value })}
                    />

                    <select
                      className="w-full bg-white border border-gray-300 rounded-md px-2 py-1.5 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm cursor-pointer"
                      value={row.credits}
                      onChange={(e) => updateRow(row.id, { credits: Number(e.target.value) })}
                    >
                      {[1, 2, 3, 4].map(cr => <option key={cr} value={cr}>{cr}</option>)}
                    </select>

                    <input
                      type="number"
                      min={0}
                      max={100}
                      className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm font-bold tabular-nums text-center text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
                      value={row.marks}
                      onChange={(e) => updateRow(row.id, { marks: Math.max(0, Math.min(100, Number(e.target.value))) })}
                    />

                    <div className="flex justify-center">
                      <span className={`inline-flex items-center justify-center h-7 w-10 rounded border text-xs font-bold ${gradeColor(grade)}`}>
                        {grade}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold tabular-nums text-gray-600">{gp.toFixed(1)}</span>
                      {rows.length > 1 && (
                        <button
                          onClick={() => removeRow(row.id)}
                          className="opacity-0 group-hover:opacity-100 hover:bg-red-50 text-gray-400 hover:text-red-600 p-1.5 rounded transition-all focus:opacity-100"
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

            {/* Actions */}
            <div className="bg-gray-50 border-t border-gray-200 p-4 flex justify-between items-center">
              <button
                onClick={addRow}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors shadow-sm"
              >
                <Plus className="h-4 w-4" /> Add Course
              </button>

              <button
                onClick={reset}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                <RotateCcw className="h-4 w-4" /> Reset
              </button>
            </div>
          </div>

          {/* Sidebar / Results */}
          <div className="space-y-6">
            
            {/* Projected Score Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Projected SGPA</p>
              <div className="text-6xl font-black rounded-lg text-gray-900 mb-2">
                {sgpa.toFixed(2)}
              </div>
              <div className="flex justify-between items-center text-sm font-medium text-gray-500 px-2 mt-4 pt-4 border-t border-gray-100">
                <span>{totalCredits} Credits</span>
                <span>{totalQP.toFixed(1)} QPs</span>
              </div>
            </div>

            {/* Reference Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 p-4">
                <p className="text-xs font-bold text-gray-900 uppercase">UBIT Grading Scale</p>
              </div>
              <div className="divide-y divide-gray-100 text-sm">
                {GRADE_SCALE.map(g => (
                  <div key={g.grade} className="flex justify-between items-center p-3 px-4 hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center justify-center w-8 h-6 rounded border text-[11px] font-bold ${gradeColor(g.grade)}`}>{g.grade}</span>
                      <span className="text-gray-500 font-medium">{g.min} – {g.max}</span>
                    </div>
                    <span className="font-bold text-gray-900 tabular-nums">{g.gp.toFixed(1)}</span>
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
