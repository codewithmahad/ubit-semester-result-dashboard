"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";

interface SearchResult {
  rollNo: string;
  name: string;
  cgpa: number;
  cgpaRank?: number;
}

interface SearchOmnibarProps {
  students: SearchResult[];
}

function cgpaColor(cgpa: number) {
  if (cgpa >= 3.8) return "text-green-700";
  if (cgpa >= 3.0) return "text-blue-700";
  if (cgpa >= 2.0) return "text-orange-700";
  return "text-red-700";
}

function RankBadge({ rank }: { rank?: number }) {
  if (!rank) return null;
  const styles =
    rank === 1
      ? "bg-yellow-100 text-yellow-800 border-yellow-200"
      : rank === 2
      ? "bg-gray-100 text-gray-700 border-gray-200"
      : rank === 3
      ? "bg-orange-100 text-orange-800 border-orange-200"
      : "bg-gray-50 text-gray-600 border-gray-200";
  return (
    <span className={`rounded-md border px-1.5 py-0.5 text-[10px] font-bold tabular-nums ${styles}`}>
      #{rank}
    </span>
  );
}

export function SearchOmnibar({ students }: SearchOmnibarProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const results =
    query.trim().length > 0
      ? students
          .filter(
            (s) =>
              s.name.toLowerCase().includes(query.toLowerCase()) ||
              s.rollNo.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 8)
      : [];

  const showDropdown = focused && query.trim().length > 0;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setFocused(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
        inputRef.current?.blur();
        setFocused(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function navigate(rollNo: string) {
    setQuery("");
    setFocused(false);
    startTransition(() => {
      router.push(`/student/${rollNo}`);
    });
  }

  return (
    <div ref={containerRef} className="relative w-full mx-auto">
      {/* Input */}
      <div
        className={`flex items-center gap-2 sm:gap-3 rounded-full border px-4 sm:px-5 py-3 sm:py-3.5 bg-white transition-shadow duration-200 ${
          focused
            ? "border-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.15)] outline-none"
            : "border-gray-300 shadow-sm hover:shadow-md"
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
          placeholder="Search by name or roll number…"
          className="flex-1 bg-transparent text-base sm:text-[15px] text-gray-900 placeholder:text-gray-400 outline-none w-full min-w-0"
          autoComplete="off"
          spellCheck={false}
        />
        {!focused && (
          <kbd className="hidden sm:flex items-center gap-1 rounded-[4px] border border-gray-200 bg-gray-50 px-2 py-1 text-[11px] font-semibold text-gray-400">
            <span>⌘</span>K
          </kbd>
        )}
        {focused && query.trim().length > 0 && (
          <button
            onClick={() => {
              setQuery("");
              setFocused(false);
            }}
            className="text-gray-400 hover:text-gray-600 text-xs font-semibold bg-gray-100 rounded px-2 py-1 transition-colors"
          >
            ESC
          </button>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
          {results.length > 0 ? (
            <div className="py-2">
              <div className="px-4 py-2 bg-gray-50/80 border-b border-gray-100">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  Search Results
                </span>
              </div>
              {results.map((s) => (
                <button
                  key={s.rollNo}
                  onClick={() => navigate(s.rollNo)}
                  className="flex w-full items-center gap-4 px-4 py-3 text-left transition-colors hover:bg-gray-50 focus:bg-gray-50 outline-none"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700">
                    {s.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-semibold text-gray-900">
                        {s.name}
                      </span>
                      <RankBadge rank={s.cgpaRank} />
                    </div>
                    <div className="mt-0.5 font-mono text-[12px] text-gray-500">
                      {s.rollNo}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className={`text-sm font-bold tabular-nums ${cgpaColor(s.cgpa)}`}>
                      {s.cgpa.toFixed(2)}
                    </div>
                    <div className="text-[10px] uppercase font-semibold text-gray-500">CGPA</div>
                  </div>
                </button>
              ))}
              <div className="border-t border-gray-100 p-2">
                <button
                  onClick={() => router.push("/class/2025/evening")}
                  className="w-full rounded-md px-3 py-2 text-center text-[12px] font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  View complete leaderboard
                </button>
              </div>
            </div>
          ) : (
            <div className="px-4 py-10 text-center">
              <Search className="mx-auto mb-3 h-6 w-6 text-gray-300" />
              <p className="text-sm font-semibold text-gray-900">No students found</p>
              <p className="mt-1 text-sm text-gray-500">Check the spelling or try a different roll number</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
