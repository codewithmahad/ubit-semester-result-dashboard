"use client";

import { SearchX, RotateCcw } from "lucide-react";

interface TableEmptyStateProps {
  onReset: () => void;
  title?: string;
  description?: string;
}

export function TableEmptyState({ 
  onReset, 
  title = "No matches found", 
  description = "Adjust your search or filters to find what you're looking for." 
}: TableEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-in fade-in zoom-in-95 duration-500">
      <div className="w-20 h-20 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 relative">
        <SearchX className="w-8 h-8 text-slate-300" strokeWidth={1.5} />
        {/* Decorative dots */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-sm" />
      </div>
      
      <h3 className="text-[17px] font-bold text-gray-900 tracking-tight">
        {title}
      </h3>
      <p className="text-[14px] text-gray-500 mt-1 max-w-[260px] mx-auto leading-relaxed">
        {description}
      </p>

      <button
        onClick={onReset}
        className="mt-8 h-10 px-6 inline-flex items-center gap-2 rounded-xl bg-[#1f2432] text-white text-[13px] font-bold hover:bg-[#0056D2] transition-all hover:scale-[1.03] active:scale-95 shadow-lg shadow-black/5"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        Clear filters
      </button>
    </div>
  );
}
