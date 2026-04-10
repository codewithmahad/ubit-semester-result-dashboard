import { getClassData, getClassStats } from "@/lib/data";
import { TrendingUp, Award, BarChart, Users } from "lucide-react";

export function BatchMetrics() {
  const data = getClassData();
  const stats = getClassStats(data.students);
  
  const highestCGPA = data.students.length > 0 ? data.students[0].cgpa.toFixed(2) : "0.00";

  const metrics = [
    {
      title: "Class Average CGPA",
      val: stats.avgCGPA.toFixed(2),
      sub: "Across all sections",
      icon: TrendingUp,
      color: "text-blue-600",
      bg: "bg-blue-50/50",
    },
    {
      title: "Highest Score",
      val: highestCGPA,
      sub: "Current Batch Top",
      icon: Award,
      color: "text-amber-600",
      bg: "bg-amber-50/50",
    },
    {
      title: "Passing Ratio",
      val: `${stats.passRate}%`,
      sub: `${stats.passing} / ${stats.total} students`,
      icon: BarChart,
      color: "text-emerald-600",
      bg: "bg-emerald-50/50",
    },
    {
      title: "Total Enrollment",
      val: stats.total.toString(),
      sub: `Batch ${data.batch} ${data.shift}`,
      icon: Users,
      color: "text-indigo-600",
      bg: "bg-indigo-50/50",
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
      {metrics.map((m) => {
        const Icon = m.icon;
        return (
          <div key={m.title} className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm overflow-hidden relative group hover:border-[#0056D2]/30 transition-colors">
            <div className={`absolute -right-6 -top-6 w-20 h-20 rounded-full ${m.bg} opacity-20 group-hover:scale-150 transition-transform duration-500`} />
            
            <div className="flex items-center gap-3 mb-2 sm:mb-3">
              <div className={`p-2 rounded-lg ${m.bg} ${m.color}`}>
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
              </div>
              <p className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-widest">{m.title}</p>
            </div>
            
            <div className="mt-auto">
              <p className="text-2xl sm:text-3xl font-black text-[#1f2432] tabular-nums tracking-tight leading-none mb-1 sm:mb-1.5 flex items-baseline gap-1">
                {m.val}
              </p>
              <p className="text-[11px] font-semibold text-gray-400">{m.sub}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
