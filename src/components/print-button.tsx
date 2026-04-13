"use client";

import { Printer } from "lucide-react";

/**
 * PrintButton — client component that triggers window.print().
 * Extracted from the server-rendered student page to avoid the
 * broken `dangerouslySetInnerHTML` script pattern.
 */
export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="flex items-center gap-2 bg-white border-2 border-[#0056D2] text-[#0056D2] hover:bg-[#0056D2] hover:text-white px-5 py-2 rounded-full text-sm font-bold shadow-sm transition-all focus:ring-2 focus:ring-[#0056D2] focus:outline-none"
    >
      <Printer className="h-4 w-4" />
      Print Transcript
    </button>
  );
}
