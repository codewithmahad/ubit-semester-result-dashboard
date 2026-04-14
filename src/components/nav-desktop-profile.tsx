"use client";

import Link from "next/link";
import {
  FileText, Medal, BarChart3, Calculator,
  Settings, HelpCircle, LogOut, ExternalLink,
} from "lucide-react";

interface NavDesktopProfileProps {
  show: boolean;
  onClose: () => void;
}

/**
 * NavDesktopProfile — the profile/account dropdown rendered on desktop
 * when the user clicks their avatar button.
 */
export function NavDesktopProfile({ show, onClose }: NavDesktopProfileProps) {
  if (!show) return null;

  return (
    <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">

      {/* Header — profile card */}
      <Link
        href="/profile"
        onClick={onClose}
        className="block px-5 py-5 border-b border-gray-50 bg-gray-50/50 hover:bg-gray-100 transition-colors group/header"
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-ubit-navy flex items-center justify-center text-white text-lg font-bold group-hover/header:scale-105 transition-transform">
            S
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] font-bold text-gray-900 leading-tight">Guest Student</span>
            <span className="text-[12px] text-gray-500 font-medium">Department of Computer Science</span>
          </div>
        </div>
      </Link>

      {/* Academic group */}
      <div className="py-2">
        <Link href="/profile" onClick={onClose} className="w-full flex items-center gap-3 px-5 py-2.5 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
          <FileText className="w-4 h-4 text-gray-400" /> My Transcript
        </Link>
        <Link href="/leaderboards" onClick={onClose} className="w-full flex items-center gap-3 px-5 py-2.5 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
          <Medal className="w-4 h-4 text-gray-400" /> Medals &amp; Rankings
        </Link>
        <button className="w-full flex items-center gap-3 px-5 py-2.5 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
          <BarChart3 className="w-4 h-4 text-gray-400" /> Cumulative Stats
        </button>
      </div>

      <div className="h-px bg-gray-100 mx-5" />

      {/* Tools group */}
      <div className="py-2">
        <Link href="/calculator" onClick={onClose} className="w-full flex items-center gap-3 px-5 py-2.5 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
          <Calculator className="w-4 h-4 text-gray-400" /> GPA Calculator
        </Link>
        <button className="w-full flex items-center gap-3 px-5 py-2.5 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
          <Settings className="w-4 h-4 text-gray-400" /> Portal Settings
        </button>
      </div>

      <div className="h-px bg-gray-100 mx-5" />

      {/* Support group */}
      <div className="py-2">
        <button className="w-full flex items-center gap-3 px-5 py-2.5 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
          <HelpCircle className="w-4 h-4 text-gray-400" /> Help Center
        </button>
        <button className="w-full flex items-center gap-3 px-5 py-2.5 text-[13px] font-semibold text-[#8F141B] hover:bg-red-50/50 transition-colors">
          <LogOut className="w-4 h-4" /> Log Out
        </button>
      </div>

      {/* Footer CTA */}
      <div className="p-4 bg-gray-50 mt-1 border-t border-gray-100">
        <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm group cursor-pointer hover:border-[#8F141B]/30 transition-all">
          <p className="text-[12px] font-bold text-[#8F141B] flex items-center justify-between">
            Official Transcript
            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </p>
          <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
            Need an authorized document? Visit the UBIT Admin Office.
          </p>
        </div>
      </div>
    </div>
  );
}
