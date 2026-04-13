"use client";

import { useState, useCallback } from "react";
import { Copy, Share2, Check, Link2 } from "lucide-react";

interface StudentActionsProps {
  rollNo: string;
  studentName: string;
}

/**
 * StudentActions — client component for Copy Seat No. & Share Result Link.
 * Uses navigator.share on mobile (native share sheet) and falls back to
 * clipboard copy on desktop. Both show a polished inline toast on success.
 */
export function StudentActions({ rollNo, studentName }: StudentActionsProps) {
  const [copiedSeat, setCopiedSeat] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [sharedNative, setSharedNative] = useState(false);

  const handleCopySeat = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(rollNo);
      setCopiedSeat(true);
      setTimeout(() => setCopiedSeat(false), 2000);
    } catch {
      // Graceful fallback: select text
      const el = document.createElement("textarea");
      el.value = rollNo;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopiedSeat(true);
      setTimeout(() => setCopiedSeat(false), 2000);
    }
  }, [rollNo]);

  const handleShare = useCallback(async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const shareData = {
      title: `${studentName} — Academic Record`,
      text: `Check out ${studentName}'s academic results on UBIT Results Portal (Seat No: ${rollNo})`,
      url,
    };

    // Native share sheet (mobile) — try first
    if (typeof navigator.share === "function") {
      try {
        await navigator.share(shareData);
        setSharedNative(true);
        setTimeout(() => setSharedNative(false), 2000);
        return;
      } catch {
        // User cancelled or failed — fall through to clipboard
      }
    }

    // Desktop / clipboard fallback
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      /* silently ignore */
    }
  }, [rollNo, studentName]);

  return (
    <div className="no-print flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 self-start">

      {/* Copy Seat Number */}
      <button
        onClick={handleCopySeat}
        className={`relative group flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-bold border-2 transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          copiedSeat
            ? "bg-green-50 border-green-500 text-green-700 focus:ring-green-400"
            : "bg-white border-[#e2e6ea] text-[#1f2432] hover:border-[#0056D2] hover:text-[#0056D2] focus:ring-[#0056D2]"
        }`}
        aria-label="Copy seat number"
      >
        {copiedSeat ? (
          <>
            <Check className="h-3.5 w-3.5 text-green-600" />
            <span className="text-green-700">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Copy Seat No.</span>
            <span className="sm:hidden">Copy</span>
          </>
        )}
      </button>

      {/* Share / Copy Link */}
      <button
        onClick={handleShare}
        className={`relative group flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-bold border-2 transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          copiedLink || sharedNative
            ? "bg-green-50 border-green-500 text-green-700 focus:ring-green-400"
            : "bg-[#0056D2] border-[#0056D2] text-white hover:bg-blue-700 hover:border-blue-700 focus:ring-[#0056D2]"
        }`}
        aria-label="Share result link"
      >
        {copiedLink ? (
          <>
            <Check className="h-3.5 w-3.5 text-green-600" />
            <span className="text-green-700">Link Copied!</span>
          </>
        ) : sharedNative ? (
          <>
            <Check className="h-3.5 w-3.5 text-green-600" />
            <span className="text-green-700">Shared!</span>
          </>
        ) : (
          <>
            <Share2 className="h-3.5 w-3.5" />
            <span>Share Result</span>
          </>
        )}
      </button>

    </div>
  );
}
