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
              className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12)] hover:border-[#8F141B]/30 transition-all active:scale-[0.98] overflow-hidden"
            >
              {/* Institutional Header Strip */}
              <div className="h-2 w-full bg-[#0F172A] group-hover:bg-[#8F141B] transition-colors duration-500" />
              
              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-[#8F141B]/5 transition-colors">
                      <User className="w-4 h-4 text-slate-400 group-hover:text-[#8F141B]" />
                    </div>
                    <span className="text-[15px] font-bold text-[#1f2432] truncate tracking-tight">
                      {student.name}
                    </span>
                  </div>
                  {/* Verified Badge Mini */}
                  <div className="flex items-center justify-center w-[18px] h-[18px] bg-[#0056D2] rounded-full shrink-0">
                    <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-black text-[#0F172A] uppercase tabular-nums tracking-widest bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/50">
                    {student.roll}
                  </span>
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5 py-1">
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    Batch {student.batch}
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
