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
    semester: "Semester II • University of Karachi",
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

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-12 sm:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-10">
          <h1 className="text-[36px] sm:text-[42px] font-black text-[#1f2432] mb-4 tracking-tight leading-tight">
            Class Leaderboards
          </h1>
          <p className="text-[15px] sm:text-[16px] text-gray-500 font-medium leading-relaxed mb-8">
            Browse through official university sections and batches. Access comprehensive
            analytics, course-wise performance, and student ranking records.
          </p>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row shadow-sm rounded-lg overflow-hidden border border-gray-300 w-full sm:max-w-xl bg-white">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by batch, section, or degree..."
                className="w-full bg-transparent pl-12 pr-4 py-3.5 text-[15px] text-[#1f2432] placeholder:text-gray-400 outline-none"
              />
            </div>
            <button className="bg-[#00255d] hover:bg-[#001d4a] text-white px-8 py-3.5 text-[14px] font-bold transition-colors whitespace-nowrap">
              Search Directory
            </button>
          </div>
        </div>

        {/* Available Results Summary */}
        <div className="mt-16 mb-6">
          <h3 className="font-bold text-[#1f2432] text-[16px]">
            Available Results ({filtered.length})
          </h3>
        </div>

        {/* Section Cards Grid */}
        {filtered.length === 0 ? (
          <div className="py-12 px-6 border border-dashed border-gray-300 rounded-xl bg-white/50 text-center">
            <p className="text-gray-500 font-medium">No results found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((sec) => (
              <Link
                key={sec.id}
                href={sec.href}
                className="group flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                {/* Image / Header Block */}
                <div className="bg-[#1f2432] h-24 relative p-4 flex items-start justify-between overflow-hidden">
                   {/* Background visual element */}
                   <div className="absolute right-0 top-0 bottom-0 w-32 opacity-10 flex items-center justify-center">
                      <Image src="/ubit-logo.jpg" alt="" width={150} height={150} className="object-contain scale-150 rotate-12" />
                   </div>
                   
                   {/* Logo Box */}
                   <div className="bg-gray-100 p-2.5 rounded-lg z-10 shadow-sm">
                     <Image src="/ubit-logo.jpg" width={26} height={26} alt="UBIT" className="object-contain" />
                   </div>

                   {/* Active Status Ribbon */}
                   {sec.live && (
                     <div className="bg-[#8F141B] border border-white/20 text-white text-[10px] font-black px-2.5 py-1 rounded-sm uppercase tracking-widest z-10 shadow-sm">
                       Active
                     </div>
                   )}
                </div>

                {/* Card Info Area */}
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                    {sec.degree}
                  </p>
                  <h2 className="text-[17px] font-extrabold text-[#1f2432] leading-tight mb-1.5">
                    {sec.section}
                  </h2>
                  <p className="text-[12px] text-gray-500 mb-6 font-medium">
                    {sec.semester}
                  </p>

                  <div className="space-y-2.5 mb-2 mt-auto">
                    <div className="flex items-center gap-2.5 text-[13px] text-gray-700">
                      <Users className="w-4 h-4 text-gray-400" /> 
                      <span className="font-medium">{sec.students} Students Enrolled</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-[13px] text-gray-700">
                      <UserCheck className="w-4 h-4 text-gray-400" /> 
                      <span className="font-medium">Class Rep: <strong className="text-[#1f2432]">{sec.cr}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="bg-gray-50 border-t border-gray-100 p-4 flex items-center justify-between group-hover:bg-[#8F141B]/5 transition-colors">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                      Top Performer
                    </p>
                    <p className="text-[14px] font-bold text-[#8F141B]">
                      {sec.topPerformer}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#8F141B] transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
