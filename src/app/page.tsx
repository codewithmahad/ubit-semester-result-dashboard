import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
      <nav className="border-b border-gray-100 px-6 py-4 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold text-xs uppercase shadow-sm">
            UB
          </div>
          <span className="font-semibold text-gray-900 tracking-tight">University of Karachi</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/calculator"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            GPA Calculator
          </Link>
          <Link
            href="/class/2025/evening"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            Class Leaderboard
          </Link>
        </div>
      </nav>

      {/* ── Main Hero Section ──────────────────────────────────────── */}
      <section className="flex flex-col items-center justify-center px-4 pt-28 pb-20 text-center">
        {/* Department Badge */}
        <div className="mb-6 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700 mx-auto w-fit">
          Department of Computer Science (UBIT)
        </div>

        {/* Big Clean Title */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6">
          Academic Results
        </h1>

        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
          Official semester results for BSSE Batch 2025 (Evening). Search for any student, 
          view comprehensive transcripts, and download official academic records.
        </p>

        {/* Giant Search Bar */}
        <div className="w-full max-w-2xl mx-auto mb-16">
          <SearchOmnibar students={searchData} />
        </div>

        {/* Global Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto w-full">
          {[
            { label: "Total Students", value: stats.total },
            { label: "Passing", value: stats.passing },
            { label: "Pass Rate", value: `${stats.passRate}%` },
            { label: "Average CGPA", value: stats.avgCGPA.toFixed(2) },
          ].map((stat) => (
            <div key={stat.label} className="bg-gray-50 rounded-2xl border border-gray-100 p-6 flex flex-col justify-center items-center text-center">
              <span className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Top Performers ─────────────────────────────────────────── */}
      {topStudents.length > 0 && (
        <section className="bg-gray-50 border-t border-gray-200 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-gray-900">Highest Achievers</h2>
              <p className="text-gray-500 mt-2">Ranked by Cumulative GPA across all semesters</p>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-3">
              {topStudents.map((student, i) => {
                const isGold = i === 0;
                return (
                  <Link
                    key={student.rollNo}
                    href={`/student/${student.rollNo}`}
                    className={`group relative bg-white rounded-2xl border p-6 transition-shadow hover:shadow-lg ${
                      isGold ? "border-yellow-200 shadow-sm" : "border-gray-200"
                    }`}
                  >
                    {isGold && (
                      <div className="absolute -top-3 left-6 bg-yellow-400 text-yellow-900 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm shadow-sm">
                        Class Rank 1
                      </div>
                    )}
                    <span className="text-4xl font-black text-gray-100 absolute top-4 right-4 group-hover:text-gray-200 transition-colors">
                      {i + 1}
                    </span>
                    
                    <h3 className="text-lg font-bold text-gray-900 mt-2 group-hover:text-blue-600 transition-colors">
                      {student.name}
                    </h3>
                    <p className="text-sm font-mono text-gray-500 mt-1">{student.rollNo}</p>
                    
                    <div className="mt-8 flex items-end justify-between">
                      <div>
                        <div className="text-3xl font-bold text-gray-900">{student.cgpa.toFixed(2)}</div>
                        <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">CGPA</div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
                    </div>
                  </Link>
                );
              })}
            </div>
            
            <div className="mt-12 text-center">
              <Link
                href="/class/2025/evening"
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline"
              >
                View Full Leaderboard <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 bg-white px-6 py-8 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} University of Karachi. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
