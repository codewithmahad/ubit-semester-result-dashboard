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
      {/* Input container */}
      <div
        className={`flex items-center gap-2 sm:gap-3 border px-4 sm:px-5 py-3 sm:py-3.5 bg-white transition-shadow duration-200 rounded-full border-gray-300 shadow-sm hover:shadow-md ${
          focused ? "border-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.15)] outline-none ring-0" : ""
        }`}
      >
        <Search
          className={`h-4 w-4 sm:h-5 sm:w-5 shrink-0 transition-colors ${focused ? "text-blue-500" : "text-gray-400"}`}
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Enter your Seat No. (e.g. EB25210106004)..."
          className="flex-1 bg-transparent text-base sm:text-[15px] text-gray-900 placeholder:text-gray-400 outline-none w-full min-w-0"
          autoComplete="off"
          spellCheck={false}
        />
        <button
          type="submit"
          disabled={query.trim().length === 0 || isPending}
          className="hidden sm:flex items-center gap-1 rounded-full bg-[#0056D2] px-4 py-1.5 text-[13px] font-bold text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {isPending ? "Searching..." : "Search Result"}
        </button>
      </div>
    </form>
  );
}
