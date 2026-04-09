"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Users, ChevronRight, UserCheck } from "lucide-react";
import { Nav } from "@/components/nav";
import Image from "next/image";

const sections = [
  {
    id: "2025-evening-a",
    batch: "2025",
    section: "BSSE Batch 2025 (Evening) - Section A",
    degree: "Software Engineering",
    semester: "Semester II · University of Karachi",
    students: 68,
    cr: "Kazim Hussain",
    topPerformer: "Shaikh Mahad",
    href: "/class/2025/evening",
    live: true,
  },
];

export default function LeaderboardsPage() {
  const [query, setQuery] = useState("");

  const filtered = sections.filter(
    (s) =>
      s.section.toLowerCase().includes(query.toLowerCase()) ||
      s.batch.includes(query) ||
      s.degree.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f5f7f8] flex flex-col">
      <Nav />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 md:py-12 md:px-8">

        {/* ── Page Header ─────────────────────────────────────── */}
        <div className="mb-7 md:mb-10">
          <h1 className="text-[26px] sm:text-[34px] md:text-[40px] font-black text-[#1f2432] mb-2 md:mb-3 tracking-tight leading-tight">
            Class Leaderboards
          </h1>
          <p className="text-[13px] sm:text-[14px] md:text-[15px] text-gray-500 font-medium leading-relaxed max-w-xl">
            Browse official university sections and batches. Access comprehensive analytics, course-wise performance, and student ranking records.
          </p>
        </div>

        {/* ── Search Bar ─────────────────────────────────────── */}
        <div className="flex gap-2 mb-8 md:mb-12 max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by batch, section, or degree..."
              className="w-full h-11 bg-white pl-10 pr-4 rounded-xl border border-gray-200 text-[14px] text-base text-[#1f2432] placeholder:text-gray-400 outline-none focus:border-[#0056D2] transition-colors shadow-sm"
            />
          </div>
          <button className="h-11 px-5 bg-[#1f2432] hover:bg-[#00255d] text-white rounded-xl text-[13px] font-bold transition-colors whitespace-nowrap shrink-0">
            Search
          </button>
        </div>

        {/* ── Results Label ───────────────────────────────────── */}
        <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-4">
          Available Results ({filtered.length})
        </p>

        {/* ── Section Cards ───────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div className="py-10 px-4 border border-dashed border-gray-300 rounded-xl bg-white/60 text-center">
            <p className="text-gray-500 font-medium text-[14px]">No results found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filtered.map((sec) => (
              <Link
                key={sec.id}
                href={sec.href}
                className="group flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md active:scale-[0.99] transition-all duration-200"
              >
                {/* Card header image block */}
                <div className="bg-[#1f2432] h-20 relative p-3 flex items-start justify-between overflow-hidden">
                  <div className="absolute right-0 top-0 bottom-0 w-28 opacity-10 flex items-center justify-center">
                    <Image src="/ubit-logo.jpg" alt="" width={140} height={140} className="object-contain scale-150 rotate-12" />
                  </div>

                  <div className="bg-white/10 p-2 rounded-lg z-10">
                    <Image src="/ubit-logo.jpg" width={24} height={24} alt="UBIT" className="object-contain" />
                  </div>

                  {sec.live && (
                    <div className="bg-[#8F141B] text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest z-10">
                      Active
                    </div>
                  )}
                </div>

                {/* Info body */}
                <div className="p-4 flex-1 flex flex-col">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                    {sec.degree}
                  </p>
                  <h2 className="text-[15px] font-extrabold text-[#1f2432] leading-tight mb-1">
                    {sec.section}
                  </h2>
                  <p className="text-[11px] text-gray-500 mb-4 font-medium">{sec.semester}</p>

                  <div className="space-y-2 mt-auto">
                    <div className="flex items-center gap-2 text-[12px] text-gray-600">
                      <Users className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span className="font-medium">{sec.students} Students Enrolled</span>
                    </div>
                    <div className="flex items-center gap-2 text-[12px] text-gray-600">
                      <UserCheck className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span className="font-medium">CR: <strong className="text-[#1f2432]">{sec.cr}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Card footer */}
                <div className="bg-gray-50 border-t border-gray-100 px-4 py-3 flex items-center justify-between group-hover:bg-[#8F141B]/5 transition-colors">
                  <div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Top Performer</p>
                    <p className="text-[13px] font-bold text-[#8F141B]">{sec.topPerformer}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#8F141B] transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
