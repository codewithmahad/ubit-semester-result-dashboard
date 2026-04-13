"use client";

import Link from "next/link";
import Image from "next/image";
import {
  X, ChevronRight, FileText, Medal, BarChart3,
  Calculator, Settings, HelpCircle, LogOut, ExternalLink,
} from "lucide-react";

interface NavMobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

/**
 * NavMobileDrawer — full-screen left-side slide-in menu for mobile.
 * Mirrors all items present in the desktop profile dropdown.
 */
export function NavMobileDrawer({ open, onClose }: NavMobileDrawerProps) {
  if (!open) return null;

  return (
    <div className="md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-[60] animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div className="fixed top-0 left-0 bottom-0 w-[85vw] max-w-[320px] bg-white z-[70] shadow-2xl flex flex-col animate-in slide-in-from-left duration-300 ease-out">

        {/* Brand header */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100 bg-white">
          <Link href="/" onClick={onClose} className="flex items-center gap-2 shrink-0">
            <Image src="/ubit-logo.jpg" alt="UBIT" width={28} height={28} className="object-contain rounded-sm" />
            <span className="text-[18px] font-bold text-[#8F141B] tracking-tight leading-none">
              UBIT Results
            </span>
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-1.5 hover:bg-gray-100 rounded-full text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pb-6">
          {/* Profile card */}
          <Link
            href="/profile"
            onClick={onClose}
            className="block px-6 py-5 border-b border-gray-100 bg-gray-50/30 hover:bg-gray-50 transition-colors group/header"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-ubit-navy flex items-center justify-center text-white text-[19px] font-bold group-hover/header:scale-105 transition-transform shadow-sm">
                S
              </div>
              <div className="flex flex-col">
                <span className="text-[16px] font-bold text-gray-900 leading-tight">Guest Student</span>
                <span className="text-[13px] text-gray-500 font-medium pt-0.5">BSSE 2025 Morning</span>
              </div>
            </div>
          </Link>

          {/* Academic links */}
          <div className="py-2.5">
            {[
              { href: "/profile",      icon: <FileText className="w-[18px] h-[18px] text-gray-400" />, label: "My Transcript" },
              { href: "/leaderboards", icon: <Medal    className="w-[18px] h-[18px] text-gray-400" />, label: "Medals & Rankings" },
            ].map(({ href, icon, label }) => (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className="w-full flex items-center justify-between px-6 py-3.5 text-[15px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">{icon}{label}</div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
            ))}
            <button className="w-full flex items-center justify-between px-6 py-3.5 text-[15px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <BarChart3 className="w-[18px] h-[18px] text-gray-400" />
                Cumulative Stats
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="h-px bg-gray-100 mx-6 my-1" />

          {/* Tools links */}
          <div className="py-2.5">
            <Link
              href="/calculator"
              onClick={onClose}
              className="w-full flex items-center justify-between px-6 py-3.5 text-[15px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <Calculator className="w-[18px] h-[18px] text-gray-400" />
                GPA Calculator
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            <button className="w-full flex items-center justify-between px-6 py-3.5 text-[15px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <Settings className="w-[18px] h-[18px] text-gray-400" />
                Portal Settings
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="h-px bg-gray-100 mx-6 my-1" />

          {/* Support links */}
          <div className="py-2.5">
            <button className="w-full flex items-center justify-between px-6 py-3.5 text-[15px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <HelpCircle className="w-[18px] h-[18px] text-gray-400" />
                Help Center
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between px-6 py-3.5 text-[15px] font-bold text-[#8F141B] hover:bg-red-50/50 transition-colors">
              <div className="flex items-center gap-4">
                <LogOut className="w-[18px] h-[18px]" />
                Log Out
              </div>
            </button>
          </div>

          {/* Official transcript CTA */}
          <div className="px-5 pt-3 pb-6">
            <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-200">
              <p className="text-[13px] font-bold text-[#8F141B] flex items-center justify-between">
                Official Transcript
                <ExternalLink className="w-[14px] h-[14px] text-[#8F141B]" />
              </p>
              <p className="text-[12px] text-gray-500 mt-1.5 leading-relaxed">
                Need an authorized document? Visit the UBIT Admin Office.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
