"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, Bell, User, Menu, X, ChevronRight } from "lucide-react";
import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";

/**
 * Nav — sticky top navigation bar.
 *
 * Features: Logo + desktop nav links, seat number search, notification bell
 * with a dropdown panel, and a responsive hamburger menu for mobile.
 * Uses Next.js `useRouter` for client-side navigation on seat search.
 */
export function Nav() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setShowNotifications(false);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-notifications]")) setShowNotifications(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim().length === 0) return;
    const seatNo = searchQuery.trim().toUpperCase();
    const sanitizedSeat = encodeURIComponent(seatNo.replace(/[^a-zA-Z0-9-]/g, ''));
    setSearchQuery("");
    setMobileMenuOpen(false);
    startTransition(() => {
      router.push(`/student/${sanitizedSeat}`);
    });
  }

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm h-[60px] md:h-[68px] flex items-center">
        <div className="mx-auto flex w-full max-w-[1800px] items-center justify-between px-4 md:px-8">

          {/* ── Left: Logo + Desktop Links ───────────────────────────── */}
          <div className="flex items-center gap-5 md:gap-8">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Image
                src="/ubit-logo.jpg"
                alt="UBIT"
                width={30}
                height={30}
                className="object-contain rounded-sm"
              />
              <span className="text-[17px] md:text-[20px] font-bold text-[#8F141B] tracking-tight leading-none">
                UBIT Results
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/leaderboards" className="text-[13px] font-semibold text-gray-600 hover:text-[#0056D2] transition-colors">
                Leaderboards
              </Link>
              <Link href="/calculator" className="text-[13px] font-semibold text-gray-600 hover:text-[#0056D2] transition-colors">
                GPA Calculator
              </Link>
            </div>
          </div>

          {/* ── Right: Search + Icons ─────────────────────────────────── */}
          <div className="flex items-center gap-2 md:gap-4">

            {/* Desktop search bar */}
            <form onSubmit={handleSearch} className="hidden md:flex relative items-center w-[260px] lg:w-[340px]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search seat number..."
                className="w-full h-9 pl-4 pr-10 rounded-full border border-gray-300 text-[13px] outline-none text-gray-900 bg-white focus:border-[#0056D2] transition-colors"
              />
              <button
                type="submit"
                disabled={isPending}
                className="absolute right-0 h-9 w-9 flex items-center justify-center bg-[#0056D2] rounded-full text-white hover:bg-blue-700 transition cursor-pointer disabled:opacity-75"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Notification Bell */}
            <div className="relative" data-notifications>
              <button
                onClick={() => { setShowNotifications(!showNotifications); setMobileMenuOpen(false); }}
                className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 text-gray-600 hover:text-[#0056D2] transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-[8px] right-[8px] w-2.5 h-2.5 bg-[#EF4444] rounded-full border-2 border-white shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse" />
              </button>

              {/* Notification Panel */}
              {showNotifications && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowNotifications(false)}
                  />

                  {/* Mobile: fixed & centered; Desktop: absolute from bell icon */}
                  <div className="
                    fixed left-1/2 -translate-x-1/2 w-[calc(100vw-32px)] max-w-[360px]
                    md:absolute md:fixed-[unset] md:left-auto md:translate-x-0 md:right-0 md:w-80
                    top-[68px] md:top-auto md:mt-2
                    bg-white border border-gray-200 shadow-2xl rounded-xl overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                      <span className="font-bold text-[13px] text-[#1f2432]">Notifications</span>
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="text-[11px] text-[#0056D2] font-semibold hover:underline cursor-pointer"
                      >
                        Mark all read
                      </button>
                    </div>

                    <div className="p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 cursor-pointer active:bg-gray-100">
                      <div className="flex gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 shrink-0" />
                        <div>
                          <p className="text-[13px] text-[#1f2432] font-medium leading-snug">Admin added the <span className="font-bold">OOPs results</span> and updated the class GPA.</p>
                          <p className="text-[11px] text-gray-400 mt-1">14 minutes ago</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer active:bg-gray-100">
                      <div className="flex gap-3">
                        <div className="w-2 h-2 bg-gray-300 rounded-full mt-1.5 shrink-0" />
                        <div>
                          <p className="text-[13px] text-[#1f2432] leading-snug">Result portal for Batch 2025 Evening is now live.</p>
                          <p className="text-[11px] text-gray-400 mt-1">2 days ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Desktop User icon */}
            <div className="hidden md:flex h-8 w-8 rounded-full border border-gray-300 bg-gray-50 text-gray-400 items-center justify-center cursor-pointer hover:bg-gray-100 transition">
              <User className="w-4 h-4" />
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
              onClick={() => { setMobileMenuOpen(!mobileMenuOpen); setShowNotifications(false); }}
            >
              {mobileMenuOpen ? <X className="w-[18px] h-[18px]" /> : <Menu className="w-[18px] h-[18px]" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile slide-down Menu ─────────── */}
      {mobileMenuOpen && (
        <>
          <div className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 top-[60px]" onClick={() => setMobileMenuOpen(false)} />
          <div className="md:hidden fixed top-[60px] left-0 right-0 bg-white border-b border-gray-200 shadow-xl z-50 flex flex-col">

            {/* Mobile search */}
            <div className="p-3 border-b border-gray-100">
              <form onSubmit={handleSearch} className="flex items-center gap-2 w-full overflow-hidden">
                <div className="relative flex-1 min-w-0">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search seat number..."
                    className="w-full h-11 pl-9 pr-3 rounded-xl border border-gray-200 text-base outline-none focus:border-[#0056D2] transition-colors bg-gray-50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isPending || searchQuery.trim().length === 0}
                  className="h-11 w-11 flex items-center justify-center bg-[#0056D2] rounded-xl text-white shrink-0 disabled:opacity-40 disabled:bg-gray-300 transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>

            <Link
              href="/leaderboards"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-6 py-5 border-b border-gray-100 text-[16px] font-semibold text-[#1f2432] hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              Class Leaderboards
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>

            <Link
              href="/calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-6 py-5 border-b border-gray-100 text-[16px] font-semibold text-[#1f2432] hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              GPA Calculator
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>

            <div className="px-5 py-4 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full border border-gray-200 bg-gray-100 text-gray-400 flex items-center justify-center shrink-0">
                <User className="w-4 h-4" />
              </div>
              <span className="text-[14px] font-semibold text-gray-500">Guest</span>
            </div>
          </div>
        </>
      )}
    </>
  );
}
