"use client";

import { useEffect, useState } from "react";
import { getRecentViews, RecentStudent, clearRecentViews } from "@/lib/recent-views";
import { Clock, X, User, Hash, ExternalLink } from "lucide-react";
import Link from "next/link";

export function RecentViews() {
  const [recents, setRecents] = useState<RecentStudent[]>([]);

  useEffect(() => {
    setRecents(getRecentViews());

    const handleUpdate = () => setRecents(getRecentViews());
    window.addEventListener("recent-views-updated", handleUpdate);
    return () => window.removeEventListener("recent-views-updated", handleUpdate);
  }, []);

  if (recents.length === 0) return null;

  return (
    <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <h2 className="text-[14px] font-bold text-gray-500 uppercase tracking-widest">
            Recently Viewed
          </h2>
        </div>
        <button 
          onClick={clearRecentViews}
          className="text-[11px] font-bold text-gray-400 hover:text-[#8F141B] transition-colors"
        >
          Clear history
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {recents.map((student) => {
          const path = `/student/${encodeURIComponent(student.roll)}`;
          
          return (
            <Link 
              key={student.roll} 
              href={path}
              className="group flex flex-col justify-center p-4 min-h-[85px] bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#8F141B]/20 transition-all active:scale-[0.98] relative overflow-hidden"
            >
              {/* Subtle accent hover line */}
              <div className="absolute top-0 left-0 w-0 h-[2.5px] bg-[#8F141B] group-hover:w-full transition-all duration-400" />
              
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[15px] font-black text-[#1f2432] truncate tracking-tight group-hover:text-[#8F141B] transition-colors duration-300">
                    {student.name}
                  </span>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-1 group-hover:translate-x-0 hidden sm:block">
                     <div className="w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center">
                        <User className="w-3 h-3 text-gray-400 group-hover:text-[#8F141B]" />
                     </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tabular-nums tracking-widest bg-gray-50/80 px-2 py-0.5 rounded-md border border-gray-100">
                    {student.roll}
                  </span>
                  <div className="text-[10px] font-black text-[#8F141B] bg-[#8F141B]/5 border border-[#8F141B]/10 px-2.5 py-1 rounded-lg uppercase tracking-tight flex items-center gap-1.5 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8F141B] opacity-40" />
                    Batch {student.batch} • {student.shift}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
