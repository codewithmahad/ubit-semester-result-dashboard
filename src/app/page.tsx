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
    <main className="min-h-screen bg-[#fafafa]">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <nav className="border-b border-gray-200 px-6 sm:px-10 py-5 flex items-center justify-between bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <Image 
            src="/uok-logo.png" 
            alt="University of Karachi" 
            width={40} 
            height={40} 
            className="object-contain"
          />
          <div className="flex flex-col">
            <span className="font-extrabold text-gray-900 tracking-tight leading-none text-base">
              University of Karachi
            </span>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">
              Department of Computer Science
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/calculator"
            className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Calculator className="h-4 w-4" />
            <span className="hidden sm:inline">GPA Calculator</span>
          </Link>
          <Link
            href="/class/2025/evening"
            className="flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow"
          >
            <Trophy className="h-3.5 w-3.5" />
            Class Leaderboard
          </Link>
        </div>
      </nav>

      {/* ── Main Hero Section ──────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center px-4 pt-24 pb-20 text-center overflow-hidden">
        
        {/* Subtle background crest */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
          <Image src="/uok-logo.png" alt="" width={600} height={600} className="object-contain" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-gray-900 mb-6 drop-shadow-sm">
            Academic Results Portal
          </h1>

          <p className="text-base sm:text-lg text-gray-600 mb-10 leading-relaxed font-medium">
            Search for any student, view their comprehensive transcript, and explore the complete 
            BSSE Batch 2025 (Evening) academic standings.
          </p>

          {/* Giant Search Bar */}
          <div className="w-full max-w-2xl mx-auto mb-16 shadow-xl rounded-full">
            <SearchOmnibar students={searchData} />
          </div>
        </div>

        {/* Global Stats Strip */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto w-full px-4">
          {[
            { label: "Total Students", value: stats.total },
            { label: "Passing Students", value: stats.passing },
            { label: "Overall Pass Rate", value: `${stats.passRate}%` },
            { label: "Average Class CGPA", value: stats.avgCGPA.toFixed(2) },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-gray-200/60 p-6 flex flex-col justify-center items-center text-center transition-transform hover:-translate-y-0.5">
              <span className="text-3xl font-black text-gray-900 mb-2 tabular-nums">{stat.value}</span>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Top Performers ─────────────────────────────────────────── */}
      {topStudents.length > 0 && (
        <section className="bg-white border-t border-gray-200 px-6 py-20 relative">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Highest Achievers</h2>
                <p className="text-gray-500 mt-2 font-medium">Top 3 students ranked by Cumulative GPA across all semesters</p>
              </div>
              <Link
                href="/class/2025/evening"
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full"
              >
                View Full Leaderboard <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid gap-6 lg:grid-cols-3">
              {topStudents.map((student, i) => {
                const medals = [
                  { color: "text-amber-500", bg: "bg-amber-50 border-amber-200 shadow-amber-100/50", label: "Rank 1 — Gold" },
                  { color: "text-gray-500", bg: "bg-gray-50 border-gray-200 shadow-gray-100/50", label: "Rank 2 — Silver" },
                  { color: "text-orange-600", bg: "bg-orange-50 border-orange-200 shadow-orange-100/50", label: "Rank 3 — Bronze" },
                ];
                const m = medals[i];
                
                return (
                  <Link
                    key={student.rollNo}
                    href={`/student/${student.rollNo}`}
                    className={`group relative rounded-2xl border p-8 transition-all hover:shadow-xl hover:-translate-y-1 ${m.bg} shadow-md`}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className={`px-3 py-1 rounded-full bg-white border font-bold text-[10px] uppercase tracking-widest shadow-sm ${m.color}`}>
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
                    
                    <div className="mt-8 flex items-end justify-between border-t border-black/5 pt-6">
                      <div>
                        <div className="text-4xl font-black text-gray-900 tracking-tight tabular-nums">{student.cgpa.toFixed(2)}</div>
                        <div className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mt-1">Cumulative GPA</div>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors border border-gray-100">
                        <ArrowRight className="h-5 w-5" />
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
