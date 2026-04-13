import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Award, BookOpen, AlertCircle, CheckCircle2 } from "lucide-react";
import { getStudent } from "@/lib/data";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SemesterCard } from "@/components/semester-card";
import { LogVisit } from "@/components/log-visit";
import { PrintButton } from "@/components/print-button";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ rollNo: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { rollNo } = await params;
  const student = await getStudent(rollNo);
  if (!student) return { title: "Student Not Found" };
  return {
    title: `${student.name} — Academic Record`,
  };
}

/**
 * Student profile page — displays the full computed academic record
 * for a single student identified by their roll number.
 *
 * Data is fetched server-side via `getStudent()` from lib/data.ts.
 * Returns a 404 if the roll number is not found in the dataset.
 * Includes a print-ready transcript trigger via an inline script.
 */
export default async function StudentPage({ params }: Props) {
  const { rollNo } = await params;
  const student = await getStudent(rollNo);
  if (!student) notFound();

  const overallPass = student.cgpa >= 2.0;

  return (
    <div className="min-h-screen bg-[#f5f7f8]">
      <Nav />
      <LogVisit student={{
        roll: student.rollNo,
        name: student.name,
        batch: student.batch,
        shift: student.shift
      }} />

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
          href="/"
          className="no-print mb-8 inline-flex items-center gap-2 text-sm font-bold text-[#8F141B] hover:text-[#0056D2] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to Home Dashboard
        </Link>

        {/* ── Student Information Card ─────────────────────────── */}
        <div className="bg-white rounded-xl shadow-md border border-[#e2e6ea] overflow-hidden print-card mb-6 sm:mb-8">
          <div className="p-5 sm:p-8 lg:p-10 flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-6 relative">
            
            {/* Identity Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-[#8F141B] text-white px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest shadow-sm">
                  BSSE
                </span>
                <span className="text-sm font-semibold text-[#1f2432]">
                  Batch {student.batch} • {student.shift}
                </span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1f2432] tracking-tight leading-none mb-2 break-words">
                {student.name}
              </h1>
              <p className="font-medium text-base sm:text-lg text-[#0056D2] tracking-wide">{student.rollNo}</p>
            </div>

            {/* Quick Actions / Print */}
            <div className="no-print shrink-0 self-start">
              <PrintButton />
            </div>
          </div>

          {/* Academic Summary Strip */}
          <div className="bg-[#fcfdfd] border-t border-[#e2e6ea] px-5 sm:px-8 lg:px-10 py-6 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div>
              <p className="text-[11px] font-bold text-[#8F141B] uppercase tracking-widest mb-1">Cumulative GPA</p>
              <p className="text-3xl sm:text-4xl font-extrabold text-[#1f2432] tabular-nums">{student.cgpa.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#8F141B] uppercase tracking-widest mb-1">Class Rank</p>
              <div className="flex items-center gap-2">
                <p className="text-3xl sm:text-4xl font-extrabold text-[#1f2432] tabular-nums">#{student.cgpaRank ?? "—"}</p>
                {student.cgpaRank && student.cgpaRank <= 3 && (
                  <Award className="h-5 w-5 sm:h-6 sm:w-6 text-[#0056D2]" />
                )}
              </div>
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#8F141B] uppercase tracking-widest mb-1">Credits Earned</p>
              <p className="text-3xl sm:text-4xl font-extrabold text-[#1f2432] tabular-nums">{student.totalCredits}</p>
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#8F141B] uppercase tracking-widest mb-1">Total Marks</p>
              <p className="text-3xl sm:text-4xl font-extrabold text-[#1f2432] tabular-nums">{student.totalMarks}</p>
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
        <div className="flex items-center gap-2 mb-5">
          <BookOpen className="h-5 w-5 text-[#8F141B]" />
          <h2 className="text-[20px] font-bold text-[#1f2432]">Academic History</h2>
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
      <Footer />
    </div>
  );
}
