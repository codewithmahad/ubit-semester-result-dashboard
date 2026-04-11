import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { LeaderboardClient } from "@/components/leaderboard-client";
import type { Metadata } from "next";
import type { ClassSection } from "@/types";

export const metadata: Metadata = {
  title: "Class Leaderboards | UBIT Results Portal",
  description: "Browse official university sections and batches. Access comprehensive analytics, course-wise performance, and student ranking records.",
};

import { CLASS_REGISTRY } from "@/data/registry";
import { getClassData } from "@/lib/data";

export default async function LeaderboardsPage() {
  const sections: ClassSection[] = await Promise.all(
    CLASS_REGISTRY.map(async (meta) => {
      const data = await getClassData(meta.id);
      const studentCount = data ? data.students.length : 0;
      return {
        id: meta.id,
        batch: meta.batch,
        section: `${meta.program} Batch ${meta.batch} (${meta.shift}) - ${meta.section}`,
        degree: meta.degree,
        semester: `Semesters: ${meta.activeSemesters.length} · University of Karachi`,
        students: studentCount,
        cr: meta.cr,
        topPerformer: meta.topPerformer,
        href: `/class/${meta.batch}/${meta.id.split('-').slice(2).join('-')}`, // e.g. /class/2025/evening-a or morning-b
        live: true,
      };
    })
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

        <LeaderboardClient sections={sections} />
      </main>
      <Footer />
    </div>
  );
}
