import { getClassStats } from "@/lib/data";
import type { ClassRecord } from "@/types";

// ── Custom premium SVG icons (all in the brand crimson accent) ──────────────

function IconAvgGPA() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17l4-8 4 4 3-6 4 8" />
      <path d="M3 21h18" strokeWidth="1.2" opacity="0.4" />
    </svg>
  );
}

function IconTopScore() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l2.4 6.4H21l-5.4 4 2 6.4L12 15l-5.6 3.8 2-6.4L3 8.4h6.6L12 2z" />
    </svg>
  );
}

function IconPassRate() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" />
    </svg>
  );
}

function IconEnrollment() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="7" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6" />
      <circle cx="17" cy="8" r="2.5" />
      <path d="M13.5 20c0-2.8 1.6-5 4.5-5s4.5 2.2 4.5 5" />
    </svg>
  );
}

export function BatchMetrics({ data }: { data: ClassRecord }) {
  const stats = getClassStats(data.students);
  const highestCGPA = data.students.length > 0 ? data.students[0].cgpa.toFixed(2) : "0.00";

  const metrics = [
    {
      title: "Class Average CGPA",
      val: stats.avgCGPA.toFixed(2),
      sub: "Across all enrolled students",
      Icon: IconAvgGPA,
    },
    {
      title: "Highest Score",
      val: highestCGPA,
      sub: "Top performer this batch",
      Icon: IconTopScore,
    },
    {
      title: "Passing Ratio",
      val: `${stats.passRate}%`,
      sub: `${stats.passing} of ${stats.total} students`,
      Icon: IconPassRate,
    },
    {
      title: "Total Enrollment",
      val: String(stats.total),
      sub: `Batch ${data.batch} · ${data.shift}`,
      Icon: IconEnrollment,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
      {metrics.map((m, i) => {
        const Icon = m.Icon;
        return (
          <div
            key={m.title}
            className="relative bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 overflow-hidden group hover:border-[#8F141B]/20 hover:shadow-md transition-all duration-300"
          >
            {/* Accent top bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#8F141B] to-[#8F141B]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />

            {/* Decorative circle */}
            <div className="absolute -right-5 -bottom-5 w-20 h-20 rounded-full bg-[#8F141B]/[0.04] group-hover:scale-150 transition-transform duration-500" />

            {/* Icon + Label */}
            <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
              <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#8F141B]/[0.07] text-[#8F141B] shrink-0">
                <Icon />
              </div>
              <p className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-[0.12em] leading-tight">{m.title}</p>
            </div>

            {/* Value */}
            <p className="text-[26px] sm:text-[32px] font-black text-[#1f2432] tabular-nums tracking-tight leading-none mb-1">
              {m.val}
            </p>
            <p className="text-[10px] sm:text-[11px] font-semibold text-gray-400">{m.sub}</p>
          </div>
        );
      })}
    </div>
  );
}
