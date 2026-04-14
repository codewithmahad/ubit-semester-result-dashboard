"use client";

import Link from "next/link";
import Image from "next/image";
import {
  X, ChevronRight, FileText, Medal, BarChart3,
  Calculator, Settings, HelpCircle, LogOut, ExternalLink, ShieldCheck,
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
            className="block px-5 py-6 border-b border-gray-100 bg-[#0F172A] hover:bg-[#151f38] transition-colors group/header"
          >
            <div className="flex items-center gap-4">
              <div className="w-[52px] h-[52px] rounded-full bg-[#1e293b] flex items-center justify-center text-white text-[20px] font-bold group-hover/header:scale-105 transition-transform shadow-md relative">
                S
                {/* Verified Badge */}
                <div className="absolute -bottom-1 -right-1 flex items-center justify-center w-[22px] h-[22px] bg-white rounded-full border-2 border-[#0F172A]">
                  <div className="w-full h-full bg-[#0056D2] rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[17px] font-bold text-white leading-tight">Guest Student</span>
                <span className="text-[13px] text-slate-400 font-medium pt-1">Dept. of Computer Science</span>
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

          </div>

          <div className="h-px bg-gray-100 mx-6 my-1" />

          {/* Tools links */}
          <div className="py-2.5">
            <Link
              href="/admin"
              onClick={onClose}
              className="w-full flex items-center justify-between px-6 py-3.5 text-[15px] font-bold text-[#8F141B] bg-red-50/20 hover:bg-red-50/40 transition-colors"
            >
              <div className="flex items-center gap-4">
                <ShieldCheck className="w-[18px] h-[18px]" />
                Admin Portal
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
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
          </div>

          <div className="h-px bg-gray-100 mx-6 my-1" />

          {/* Support links */}
          <div className="py-2.5">
            <Link
              href="/help-center"
              onClick={onClose}
              className="w-full flex items-center justify-between px-6 py-3.5 text-[15px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <HelpCircle className="w-[18px] h-[18px] text-gray-400" />
                Help Center
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
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
