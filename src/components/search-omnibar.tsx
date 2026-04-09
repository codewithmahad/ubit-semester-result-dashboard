"use client";

import { useState, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function SearchOmnibar() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim().length === 0) return;

    // Convert to upper case and trim for standard roll number format
    const seatNo = query.trim().toUpperCase();

    setQuery("");
    inputRef.current?.blur();
    setFocused(false);

    startTransition(() => {
      router.push(`/student/${seatNo}`);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full mx-auto">
      {/* Outer Shell / Cushion */}
      <div className="p-2 sm:p-2.5 rounded-[36px] border border-gray-200/80 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] hover:border-gray-300 w-full">
        
        {/* Inner Search Field */}
        <div
          className={`flex items-center w-full rounded-[28px] transition-all duration-300 relative ${
            focused 
              ? "bg-white shadow-[0_0_0_2px_#0056D2] ring-4 ring-[#0056D2]/10" 
              : "bg-[#f0f3f7] hover:bg-[#e9edf2] border border-transparent"
          }`}
        >
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Enter your Seat No. (e.g. EB25210106004)..."
            className="flex-1 w-full bg-transparent pl-7 sm:pl-8 pr-4 py-4 sm:py-5 text-[15px] sm:text-[17px] font-semibold text-[#1f2432] placeholder:text-gray-400 outline-none"
            autoComplete="off"
            spellCheck={false}
          />
          
          {/* Aesthetic Icon Button */}
          <button
            type="submit"
            disabled={query.trim().length === 0 || isPending}
            className={`flex items-center justify-center w-[46px] h-[46px] sm:w-[54px] sm:h-[54px] mr-2 rounded-[20px] transition-all duration-300 shrink-0 ${
              query.trim().length > 0 
                ? "bg-[#1f2432] text-white shadow-[0_4px_12px_rgba(31,36,50,0.2)] hover:bg-[#0056D2] hover:scale-[1.02] active:scale-95" 
                : "bg-gray-200/80 text-gray-400 pointer-events-none"
            }`}
          >
            <Search className={`w-5 h-5 sm:w-[22px] sm:h-[22px] ${isPending ? "animate-pulse" : ""}`} />
          </button>
        </div>
      </div>
    </form>
  );
}
