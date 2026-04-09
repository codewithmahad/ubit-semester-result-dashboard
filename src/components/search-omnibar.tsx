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
      {/* Outer capsule */}
      <div className="p-1.5 md:p-2 rounded-2xl border border-gray-200 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all hover:shadow-[0_4px_32px_rgba(0,0,0,0.08)] hover:border-gray-300 w-full">

        {/* Inner field */}
        <div
          className={`flex items-center w-full rounded-xl transition-all duration-200 relative ${
            focused
              ? "bg-white shadow-[0_0_0_2px_#0056D2] ring-4 ring-[#0056D2]/10"
              : "bg-[#f0f3f7] hover:bg-[#eaecf1]"
          }`}
        >
          <input
            ref={inputRef}
            type="text"
            inputMode="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Enter your Seat No. (e.g. EB25210106004)..."
            className="flex-1 w-full bg-transparent pl-4 md:pl-6 pr-3 py-3.5 md:py-4 text-base font-semibold text-[#1f2432] placeholder:text-gray-400 placeholder:text-[14px] md:placeholder:text-[15px] outline-none"
            autoComplete="off"
            spellCheck={false}
          />

          {/* Submit button — minimum 44px tap target */}
          <button
            type="submit"
            disabled={query.trim().length === 0 || isPending}
            className={`flex items-center justify-center w-[44px] h-[44px] md:w-[50px] md:h-[50px] mr-1.5 rounded-xl transition-all duration-200 shrink-0 ${
              query.trim().length > 0
                ? "bg-[#1f2432] text-white shadow-md hover:bg-[#0056D2] hover:scale-[1.03] active:scale-95"
                : "bg-gray-200 text-gray-400 pointer-events-none"
            }`}
          >
            <Search className={`w-[18px] h-[18px] md:w-5 md:h-5 ${isPending ? "animate-pulse" : ""}`} />
          </button>
        </div>
      </div>
    </form>
  );
}
