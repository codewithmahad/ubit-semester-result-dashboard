"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

const BANNER_ID = "notification-banner-v3"; // bump this to show the banner again

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
        <div className="flex items-center gap-3">
          <div className="bg-white/10 w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0">
            <span className="font-bold text-[11px] text-white">i</span>
          </div>
          <p className="text-[#b1c0e0] text-[13px] sm:text-[14px]">
            <strong className="text-white mr-1">New Results:</strong>
            Semester II &quot;OOPs&quot; results are out.{" "}
            <Link href="/leaderboards" className="text-white font-medium cursor-pointer hover:underline mx-1">
              Check CGPA
            </Link>
          </p>
        </div>
        <button
          onClick={dismiss}
          className="text-[#a4b1cd] hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
        >
          <X className="w-[18px] h-[18px]" />
        </button>
      </div>
    </div>
  );
}
