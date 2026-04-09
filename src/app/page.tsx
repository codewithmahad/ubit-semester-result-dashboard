import Link from "next/link";
import Image from "next/image";
import { BookOpen, ArrowRight } from "lucide-react";
import { getClassData, getClassStats } from "@/lib/data";
import { SearchOmnibar } from "@/components/search-omnibar";
import { Nav } from "@/components/nav";

export const metadata = {
  title: "UBIT Results Portal",
  description:
    "Official academic result portal for BSSE Batch 2025, Department of Computer Science (UBIT), University of Karachi.",
};

export default function LandingPage() {
  const { students } = getClassData();
  const stats = getClassStats(students);

  const topStudents = students.slice(0, 3);

  return (
    <main className="min-h-screen bg-white">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <Nav />

      {/* ── Fixed Background Watermark ─────────────────────────────── */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none z-0">
        <Image src="/uok-logo.png" alt="" width={600} height={600} className="object-contain" />
      </div>

      {/* ── Coursera-Themed Main Section ──────────────────────────────────────── */}
      <section className="pt-6 pb-20 max-w-[1800px] mx-auto z-10 bg-[#f5f7f8] min-h-screen">

        {/* Dark Mode/Info Banner - Moved to top and made compact */}
        <div className="px-4 sm:px-8 max-w-5xl mx-auto mb-8">
          <div className="bg-[#00255d] text-white rounded-lg p-3 sm:p-4 flex items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                <span className="font-bold text-xs">i</span>
              </div>
              <p className="text-[#d9dce2] text-[13px] sm:text-[14px]">
                <strong className="text-white mr-1">New Results:</strong>
                Semester II "OOPs" results are out. <span className="text-white font-medium cursor-pointer hover:underline">Check CGPA</span>
              </p>
            </div>
          </div>
        </div>

        {/* Welcome Header & Prominent Search */}
        <div className="px-4 sm:px-8 max-w-[900px] mx-auto flex flex-col items-center text-center mt-6 mb-16">
          <h1 className="text-[42px] sm:text-[56px] font-black text-[#1f2432] mb-4 tracking-tighter leading-tight">
            Academic Results Hub
          </h1>
          <p className="text-[16px] sm:text-[18px] text-gray-500 mb-12 max-w-2xl leading-relaxed">
            The official repository for <span className="font-bold text-[#8F141B] tracking-wide">UBIT Students</span>. Instant access to your academic transcripts, exact GPA metrics, and precise class standings.
          </p>

          {/* Monolithic Search Interface */}
          <div className="w-full relative shadow-[0_12px_40px_rgb(0,0,0,0.08)] rounded-[24px] bg-white border outline outline-4 outline-white border-[#e2e6ea] p-2 flex items-center group transition-all focus-within:shadow-[0_12px_48px_rgb(0,0,0,0.12)]">
            <div className="flex-1 w-full relative">
              <SearchOmnibar />
            </div>
          </div>
        </div>

        {/* Honor Board - Olympic Podium (Top 3 Performers) */}
        {topStudents.length === 3 && (
          <div className="max-w-5xl mx-auto px-4 sm:px-8 mt-12 mb-20">
            <div className="text-center mb-10">
              <h2 className="text-[24px] font-black text-[#1f2432] uppercase tracking-widest relative inline-block">
                Honor Board
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#8F141B]"></div>
              </h2>
            </div>

            <div className="flex flex-col md:flex-row items-end justify-center gap-4 sm:gap-6 lg:gap-8 h-auto md:h-[460px] pt-10">

              {/* Rank 2 (Left child) */}
              <Link
                href={`/student/${topStudents[1].rollNo}`}
                className="group order-2 md:order-1 relative w-full md:w-[280px] bg-white border border-[#e2e6ea] border-b-0 rounded-t-[20px] rounded-b-[20px] md:rounded-b-none p-6 pb-8 md:pb-6 shadow-sm hover:shadow-lg transition-transform md:hover:-translate-y-2 h-[340px] flex flex-col cursor-pointer"
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#e2e6ea] text-[#1f2432] rounded-full flex items-center justify-center font-bold text-[20px] shadow-sm border-4 border-white z-10">
                  2
                </div>
                <div className="text-center mt-6 flex-1 flex flex-col justify-center">
                  <div className="w-16 h-16 mx-auto bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center font-bold text-[22px] text-gray-400 mb-4 shadow-inner">
                    S
                  </div>
                  <h3 className="text-[17px] font-bold text-[#1f2432] leading-tight mb-2 group-hover:text-[#0056D2]">{topStudents[1].name}</h3>
                  <p className="text-[13px] text-gray-500 font-mono tracking-widest mb-4">{topStudents[1].rollNo}</p>
                  <div className="mt-auto inline-flex items-center justify-center gap-1.5 mx-auto bg-gray-50 px-3 py-1.5 rounded-full">
                    <span className="font-extrabold text-[#1f2432] text-[16px]">{topStudents[1].cgpa.toFixed(2)}</span>
                    <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">CGPA</span>
                  </div>
                </div>
              </Link>

              {/* Rank 1 (Center child - Highest) */}
              <Link
                href={`/student/${topStudents[0].rollNo}`}
                className="group order-1 md:order-2 relative w-full md:w-[320px] bg-[#1f2432] border border-[#1f2432] rounded-[20px] md:rounded-t-[32px] md:rounded-b-none p-8 pb-10 md:pb-8 shadow-xl hover:shadow-[0_20px_50px_rgb(0,0,0,0.3)] transition-transform md:hover:-translate-y-3 md:-mt-8 z-20 flex flex-col h-[400px] cursor-pointer"
              >
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 bg-[#d4af37] text-white rounded-full flex items-center justify-center font-black text-[26px] shadow-lg border-4 border-white z-10">
                  1
                </div>
                <div className="absolute top-4 left-4 right-4 flex justify-between">
                  {/* Subtle UoK Logo Watermark top left */}
                  <div className="opacity-[0.05] grayscale">
                    <Image src="/ubit-logo.jpg" alt="" width={60} height={60} />
                  </div>
                </div>
                <div className="text-center mt-6 flex-1 flex flex-col justify-center">
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="absolute inset-0 bg-[#d4af37] blur-md opacity-30 rounded-full"></div>
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center font-black text-[28px] text-[#8F141B] shadow-inner relative z-10">
                      S
                    </div>
                  </div>
                  <h3 className="text-[20px] font-black text-white leading-tight mb-2 tracking-tight group-hover:text-[#d4af37] transition-colors">{topStudents[0].name}</h3>
                  <p className="text-[14px] text-gray-400 font-mono tracking-widest mb-6">{topStudents[0].rollNo}</p>
                  <div className="mt-auto inline-flex items-center justify-center gap-2 mx-auto bg-[#2a3040] shadow-inner border border-[#3f465c] px-5 py-2 rounded-full">
                    <span className="font-black text-[#d4af37] text-[20px]">{topStudents[0].cgpa.toFixed(2)}</span>
                    <span className="text-[12px] text-gray-300 font-bold uppercase tracking-widest">CGPA</span>
                  </div>
                </div>
              </Link>

              {/* Rank 3 (Right child - Lowest) */}
              <Link
                href={`/student/${topStudents[2].rollNo}`}
                className="group order-3 md:order-3 relative w-full md:w-[280px] bg-white border border-[#e2e6ea] border-b-0 rounded-t-[20px] rounded-b-[20px] md:rounded-b-none p-6 pb-8 md:pb-6 shadow-sm hover:shadow-lg transition-transform md:hover:-translate-y-2 h-[310px] flex flex-col cursor-pointer"
              >
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-[#e2e6ea] text-[#1f2432] rounded-full flex items-center justify-center font-bold text-[18px] shadow-sm border-4 border-white z-10">
                  3
                </div>
                <div className="text-center mt-5 flex-1 flex flex-col justify-center">
                  <div className="w-14 h-14 mx-auto bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center font-bold text-[20px] text-gray-400 mb-4 shadow-inner">
                    S
                  </div>
                  <h3 className="text-[16px] font-bold text-[#1f2432] leading-snug mb-2 group-hover:text-[#0056D2]">{topStudents[2].name}</h3>
                  <p className="text-[13px] text-gray-500 font-mono tracking-widest mb-4">{topStudents[2].rollNo}</p>
                  <div className="mt-auto inline-flex items-center justify-center gap-1.5 mx-auto bg-gray-50 px-3 py-1 rounded-full">
                    <span className="font-extrabold text-[#1f2432] text-[15px]">{topStudents[2].cgpa.toFixed(2)}</span>
                    <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">CGPA</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="border-t border-[#e2e6ea] bg-white px-6 py-10 md:py-16">
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-start gap-10">

          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-4">
              <Image src="/ubit-logo.jpg" alt="UBIT" width={24} height={24} className="object-contain" />
              <h4 className="font-bold text-[#8F141B] text-[15px]">UBIT Results</h4>
            </div>
            <p className="text-[13px] text-gray-500 leading-relaxed mb-4">
              Providing a fast, accessible, and user-friendly way for students to view academic results, transcripts, and calculated standing metrics.
            </p>
            <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-widest">
              © {new Date().getFullYear()} BSSE '25 Initiative
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <h4 className="font-bold text-[#1f2432] text-[14px] mb-4">Resources</h4>
              <ul className="flex flex-col gap-3 text-[13px] text-[#0056D2]">
                <li><Link href="/class/2025/evening" className="hover:underline">Class Leaderboards</Link></li>
                <li><Link href="/calculator" className="hover:underline">GPA Calculators</Link></li>
                <li><Link href="/developer" className="hover:underline font-semibold flex items-center gap-1">About the Developer <ArrowRight className="w-3 h-3" /></Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[#1f2432] text-[14px] mb-4">Disclaimer</h4>
              <p className="text-[12px] text-gray-500 max-w-xs leading-relaxed">
                This is an independent project developed by students, for students. It is NOT an official University of Karachi website or property.
              </p>
            </div>
          </div>

        </div>
      </footer>
    </main>
  );
}
