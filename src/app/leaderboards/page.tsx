import { Nav } from "@/components/nav";
import { LeaderboardClient } from "@/components/leaderboard-client";
import type { Metadata } from "next";
import type { ClassSection } from "@/types";

export const metadata: Metadata = {
  title: "Class Leaderboards | UBIT Results Portal",
  description: "Browse official university sections and batches. Access comprehensive analytics, course-wise performance, and student ranking records.",
};

/** Registry of all available class sections with live result data. */
const sections: ClassSection[] = [
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

        <LeaderboardClient sections={sections} />
      </main>
    </div>
  );
}
