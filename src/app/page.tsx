import Link from "next/link";
import Image from "next/image";
import { BookOpen, ArrowRight } from "lucide-react";
import { getClassData, getClassStats } from "@/lib/data";
import { SearchOmnibar } from "@/components/search-omnibar";
import { Nav } from "@/components/nav";
import { NotificationBanner } from "@/components/notification-banner";

export const metadata = {
  title: "UBIT Results Portal",
  description:
    "Official academic result portal for BSSE Batch 2025, Department of Computer Science (UBIT), University of Karachi.",
};

export default function LandingPage() {
  const { students } = getClassData();
  const stats = getClassStats(students);
  return (
    <main className="min-h-screen bg-white">
      {/* ── Header & Notifications ─────────────────────────────────────────────────── */}
      <Nav />
      <NotificationBanner />

      {/* ── Fixed Background Watermark ─────────────────────────────── */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none z-0">
        <Image src="/uok-logo.png" alt="" width={600} height={600} className="object-contain" />
      </div>

      {/* ── Coursera-Themed Main Section ──────────────────────────────────────── */}
      <section className="pt-8 pb-20 max-w-[1800px] mx-auto z-10 bg-[#f5f7f8] min-h-screen">

        {/* Welcome Header & Prominent Search */}
        <div className="px-4 sm:px-8 max-w-[900px] mx-auto flex flex-col items-center text-center mt-6 mb-16">
          <h1 className="text-[42px] sm:text-[56px] font-black text-[#1f2432] mb-4 tracking-tighter leading-tight">
            Academic Results Hub
          </h1>
          <p className="text-[16px] sm:text-[18px] text-gray-500 mb-12 max-w-2xl leading-relaxed">
            The official repository for <span className="font-bold text-[#8F141B] tracking-wide">UBIT Students</span>. Instant access to your academic transcripts, exact GPA metrics, and precise class standings.
          </p>

          {/* Premium Search Interface */}
          <div className="w-full max-w-[800px] mt-4">
            <SearchOmnibar />
          </div>
        </div>

        {/* Promotional Banner Cards */}
        <div className="max-w-[1100px] mx-auto px-4 sm:px-8 mt-12 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1: Leaderboards */}
            <Link href="/leaderboards" className="group relative overflow-hidden rounded-[20px] bg-[#f0f4f9] border border-[#e2e6ea] p-8 sm:p-10 transition-transform hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between h-[260px] sm:h-[280px]">
              {/* Abstract Decorative Graphics */}
              <div className="absolute right-0 bottom-0 w-64 h-64 bg-[#0056D2] opacity-[0.04] rounded-tl-[120px] -mr-8 -mb-8 transition-transform group-hover:scale-110 duration-500"></div>
              <div className="absolute right-12 top-0 w-32 h-32 bg-[#8F141B] opacity-[0.03] rounded-full -mt-10 transition-transform group-hover:scale-150 duration-700"></div>
              
              <div className="relative z-10 max-w-[280px]">
                <div className="flex items-center gap-2 mb-3">
                   <Image src="/ubit-logo.jpg" alt="" width={20} height={20} className="object-contain mix-blend-multiply opacity-50" />
                   <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Global Ranking</span>
                </div>
                <h3 className="text-[24px] font-black text-[#1f2432] mb-3 leading-tight group-hover:text-[#0056D2] transition-colors">
                  Analyze Class Leaderboards
                </h3>
                <p className="text-[14px] text-gray-600 mb-8 font-medium leading-relaxed">
                  Discover top performers, official grade records, and track class-wide academic standings beautifully.
                </p>
                <div className="inline-flex items-center gap-2 border border-[#1f2432] text-[#1f2432] px-5 py-2.5 rounded-lg font-extrabold text-[13px] group-hover:bg-[#1f2432] group-hover:text-white transition-all shadow-[0_2px_10px_rgb(0,0,0,0.0)] group-hover:shadow-[0_4px_15px_rgb(0,0,0,0.1)]">
                  Explore directory <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>

            {/* Card 2: GPA Calculator */}
            <Link href="/calculator" className="group relative overflow-hidden rounded-[20px] bg-[#00255d] border border-[#001d4a] p-8 sm:p-10 transition-transform hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between h-[260px] sm:h-[280px]">
              {/* Abstract Decorative Graphics */}
              <div className="absolute right-0 top-0 w-72 h-72 bg-gradient-to-br from-[#0056D2] to-[#00255d] rounded-bl-[150px] opacity-60 -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-500"></div>
              <div className="absolute right-12 bottom-0 w-48 h-48 border-[24px] border-white/5 rounded-full -mb-20 transition-transform group-hover:scale-125 duration-700"></div>
              
              <div className="relative z-10 max-w-[280px]">
                <div className="flex items-center gap-2 mb-3">
                   <span className="bg-[#8F141B] text-white text-[10px] uppercase font-black tracking-widest px-2.5 py-1 rounded">Smart Tool</span>
                </div>
                <h3 className="text-[24px] font-black text-white mb-3 leading-tight group-hover:text-amber-400 transition-colors">
                  Calculate Target SGPA
                </h3>
                <p className="text-[14px] text-gray-300 mb-8 font-medium leading-relaxed">
                  Plan your semester results dynamically with our highly accurate, instantaneous grade point estimator.
                </p>
                <div className="inline-flex items-center gap-2 bg-white text-[#00255d] px-5 py-2.5 rounded-lg font-extrabold text-[13px] group-hover:bg-gray-100 transition-all shadow-sm group-hover:shadow-lg">
                  Open calculator <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>

          </div>
        </div>
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
