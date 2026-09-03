"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Info } from "lucide-react";

const BANNER_ID = "notification-banner-v4"; // bump this to show the banner again

export function NotificationBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(BANNER_ID);
    if (!dismissed) setVisible(true);
  }, []);

  function dismiss() {
    localStorage.setItem(BANNER_ID, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="sticky top-[60px] md:top-[68px] z-40 w-full bg-[#001c47] border-b border-[#00255d]">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-8 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="bg-white/10 w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
            <Info className="w-3.5 h-3.5 text-white" />
          </div>
          <p className="text-[#b1c0e0] text-[13px] sm:text-[14px] leading-snug">
            <strong className="text-white mr-1">Notice:</strong>
            Some results and student data may be outdated or incorrect. Please do not report these issues at the moment. A fully verified and heavily upgraded version with new features will launch on <strong className="text-white font-semibold">January 29, 2027</strong>.
          </p>
        </div>
        <button
          onClick={dismiss}
          className="text-[#a4b1cd] hover:text-white transition-colors p-1 rounded-md hover:bg-white/10 shrink-0"
          aria-label="Dismiss"
        >
          <X className="w-[18px] h-[18px]" />
        </button>
      </div>
    </div>
  );
}
