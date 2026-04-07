import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Calculator, Search, Trophy } from "lucide-react";
import { getClassData, getClassStats } from "@/lib/data";
import { SearchOmnibar } from "@/components/search-omnibar";

export const metadata = {
  title: "UBIT Results Portal",
  description:
    "Official academic result portal for BSSE Batch 2025, Department of Computer Science (UBIT), University of Karachi.",
};

export default function LandingPage() {
  const { students } = getClassData();
  const stats = getClassStats(students);

  const searchData = students.map(({ rollNo, name, cgpa, cgpaRank }) => ({
    rollNo,
    name,
    cgpa,
    cgpaRank,
  }));

  const topStudents = students.slice(0, 3);

  return (
    <main className="min-h-screen bg-white">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <nav className="border-b-2 border-gray-200 px-6 sm:px-10 py-4 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3 sm:gap-4">
          <Image 
            src="/uok-logo.png" 
            alt="University of Karachi" 
            width={48} 
            height={48} 
            className="object-contain"
          />
          <div className="flex flex-col">
            <span className="font-bold text-gray-900 uppercase tracking-widest text-[13px] sm:text-[15px] leading-tight">
              University of Karachi
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-widest mt-0.5">
              Department of Computer Science
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/calculator"
            className="text-[11px] sm:text-sm font-semibold text-gray-600 hover:text-blue-800 transition-colors uppercase tracking-wider"
          >
            <span className="hidden sm:inline">GPA Calculator</span>
            <span className="inline sm:hidden">Calc</span>
          </Link>
          <Link
            href="/class/2025/evening"
            className="text-[11px] sm:text-sm font-semibold text-gray-600 hover:text-blue-800 transition-colors uppercase tracking-wider"
          >
            <span className="hidden sm:inline">Leaderboard</span>
            <span className="inline sm:hidden">Board</span>
          </Link>
        </div>
      </nav>

      {/* ── Fixed Background Watermark ─────────────────────────────── */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none z-0">
        <Image src="/uok-logo.png" alt="" width={600} height={600} className="object-contain" />
      </div>

      {/* ── Main Hero Section ──────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center px-4 pt-24 pb-20 text-center z-10">

        {/* Content */}
        <div className="relative z-20 w-full max-w-4xl mx-auto border-t-4 border-blue-800 bg-white/80 backdrop-blur-sm shadow-xl p-8 sm:p-12 mt-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight uppercase tracking-wider">
            Academic Results Portal
          </h1>

          <p className="text-sm sm:text-base text-gray-700 mb-8 sm:mb-12 leading-relaxed font-medium max-w-2xl mx-auto">
            Official repository for student transcripts and performance metrics. 
            Search records or explore the complete BSSE Batch 2025 (Evening) standings.
          </p>

          {/* Giant Search Bar */}
          <div className="relative z-50 w-full max-w-2xl mx-auto mb-6">
            <SearchOmnibar students={searchData} />
          </div>
        </div>

        {/* Global Stats Strip */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-2 sm:px-4 mt-12 border-t-2 border-b-2 border-gray-100 py-8 bg-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 divide-x divide-gray-200">
          {[
            { label: "Total Students", value: stats.total },
            { label: "Passing Students", value: stats.passing },
            { label: "Overall Pass Rate", value: `${stats.passRate}%` },
            { label: "Average Class CGPA", value: stats.avgCGPA.toFixed(2) },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col justify-center items-center text-center px-4">
              <span className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-2 tabular-nums tracking-tight">{stat.value}</span>
              <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* ── Top Performers ─────────────────────────────────────────── */}
      {topStudents.length > 0 && (
        <section className="bg-white border-t border-gray-200 px-6 py-20 relative">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-widest">Highest Achievers</h2>
                <p className="text-gray-500 mt-2 font-medium">Top 3 students ranked by Cumulative GPA</p>
              </div>
              <Link
                href="/class/2025/evening"
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-800 hover:text-white transition-colors bg-white hover:bg-blue-800 px-6 py-3 border-2 border-blue-800 uppercase tracking-wider"
              >
                View Full Leaderboard <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid gap-6 lg:grid-cols-3">
              {topStudents.map((student, i) => {
                const medals = [
                  { color: "text-amber-700 bg-amber-50 border-amber-200", label: "Rank I" },
                  { color: "text-gray-700 bg-gray-50 border-gray-300", label: "Rank II" },
                  { color: "text-orange-800 bg-orange-50 border-orange-200", label: "Rank III" },
                ];
                const m = medals[i];
                
                return (
                  <Link
                    key={student.rollNo}
                    href={`/student/${student.rollNo}`}
                    className="group relative border border-gray-300 p-8 transition-all hover:border-blue-500 bg-white shadow-sm hover:shadow-md"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className={`px-3 py-1 border font-bold text-xs uppercase tracking-widest ${m.color}`}>
                        {m.label}
                      </div>
                      <div className="h-10 w-10 rounded-full bg-white shadow-sm flex items-center justify-center font-bold text-gray-900 border border-gray-100">
                        #{i + 1}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mt-2 mb-1 group-hover:text-blue-700 transition-colors">
                      {student.name}
                    </h3>
                    <div className="flex items-center gap-2">
                       <span className="font-mono text-xs text-gray-500">{student.rollNo}</span>
                    </div>
                    
                    <div className="mt-6 sm:mt-8 flex items-end justify-between border-t border-gray-200 pt-4 sm:pt-6">
                      <div>
                        <div className="text-3xl sm:text-4xl font-bold text-gray-900 tabular-nums">{student.cgpa.toFixed(2)}</div>
                        <div className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-widest mt-1">Cumulative GPA</div>
                      </div>
                      <div className="flex items-center justify-center text-blue-800 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="h-6 w-6" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-200 bg-white px-6 py-12 text-center">
        <div className="max-w-3xl mx-auto">
          <BookOpen className="h-6 w-6 text-gray-300 mx-auto mb-4" />
          <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">
             Disclaimer
          </p>
          <p className="text-sm font-medium text-gray-500 leading-relaxed">
            This is not an official University of Karachi website. This portal was independently 
            developed by students, for students, to provide a fast, accessible, and user-friendly 
            way to view academic results and transcripts.
          </p>
          <p className="text-xs text-gray-400 mt-6">
            © {new Date().getFullYear()} Student Initative · BSSE '25
          </p>
        </div>
      </footer>
    </main>
  );
}
