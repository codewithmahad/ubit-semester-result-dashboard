import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Printer, Award, BookOpen, AlertCircle, CheckCircle2 } from "lucide-react";
import { getStudent } from "@/lib/data";
import { Nav } from "@/components/nav";
import { SemesterCard } from "@/components/semester-card";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ rollNo: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { rollNo } = await params;
  const student = getStudent(rollNo);
  if (!student) return { title: "Student Not Found" };
  return {
    title: `${student.name} — Academic Record`,
  };
}

export default async function StudentPage({ params }: Props) {
  const { rollNo } = await params;
  const student = getStudent(rollNo);
  if (!student) notFound();

  const overallPass = student.cgpa >= 2.0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />

      {/* Print header — only visible when printing */}
      <div className="print-header print-only hidden">
        <div>
          <h1 className="text-2xl font-bold">Official Transcript</h1>
          <p className="text-gray-600">Department of Computer Science · University of Karachi</p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        {/* Breadcrumb / Back button */}
        <Link
          href="/class/2025/evening"
          className="no-print mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Class Leaderboard
        </Link>

        {/* ── Student Information Card ─────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden print-card mb-6 sm:mb-8">
          <div className="p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-6 relative">
            
            {/* Identity Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 sm:px-2.5 py-0.5 rounded text-[10px] sm:text-[11px] font-bold uppercase tracking-wide">
                  BSSE
                </span>
                <span className="text-xs sm:text-sm font-medium text-gray-500">
                  Batch {student.batch} · {student.shift}
                </span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight leading-none mb-1 sm:mb-2 break-words">
                {student.name}
              </h1>
              <p className="font-mono text-base sm:text-lg text-gray-500">{student.rollNo}</p>
            </div>

            {/* Quick Actions / Print */}
            <div className="no-print shrink-0 self-start">
              <button
                onClick={undefined}
                id="print-transcript"
                className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <Printer className="h-4 w-4 text-gray-500" />
                Print Transcript
              </button>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    document.addEventListener('DOMContentLoaded', function() {
                      var btn = document.getElementById('print-transcript');
                      if (btn) btn.addEventListener('click', function() { window.print(); });
                    });
                  `,
                }}
              />
            </div>
          </div>

          {/* Academic Summary Strip */}
          <div className="bg-gray-50 border-t border-gray-200 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div>
              <p className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">Cumulative GPA</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 tabular-nums">{student.cgpa.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">Class Rank</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 tabular-nums">#{student.cgpaRank ?? "—"}</p>
                {student.cgpaRank && student.cgpaRank <= 3 && (
                  <Award className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                )}
              </div>
            </div>
            <div>
              <p className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">Credits Earned</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 tabular-nums">{student.totalCredits}</p>
            </div>
            <div>
              <p className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">Total Marks</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 tabular-nums">{student.totalMarks}</p>
            </div>
          </div>
        </div>

        {/* ── Status Banner ────────────────────────────────────── */}
        <div className={`mb-8 flex items-start gap-3 rounded-xl border p-4 ${
          overallPass 
            ? "bg-green-50 border-green-200 text-green-800" 
            : "bg-red-50 border-red-200 text-red-800"
        }`}>
          {overallPass ? (
            <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5 text-green-600" />
          ) : (
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-red-600" />
          )}
          <div>
            <h3 className="font-bold text-sm">
              {overallPass ? "Academic Standing: Satisfactory" : "Academic Standing: Needs Attention"}
            </h3>
            <p className="text-sm mt-0.5 opacity-90">
              {overallPass 
                ? "The student has successfully met the minimum CGPA requirement (≥2.0) across all recorded semesters."
                : "The student's CGPA is currently below the minimum passing threshold of 2.0."}
            </p>
          </div>
        </div>

        {/* ── Semester Records ─────────────────────────────────── */}
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="h-5 w-5 text-gray-400" />
          <h2 className="text-lg font-bold text-gray-900">Academic History</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {student.semesters.map((sem) => (
            <SemesterCard key={sem.semesterNum} semester={sem} />
          ))}
        </div>

        {student.semesters.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
            <p className="font-medium text-gray-500">No semester records available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
