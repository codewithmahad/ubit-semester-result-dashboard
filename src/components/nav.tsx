"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, Bell, Menu } from "lucide-react";
import { useState, useEffect, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { NOTIFICATIONS } from "@/constants/notifications";
import { NavMobileDrawer } from "@/components/nav-mobile-drawer";
import { NavNotificationsPanel } from "@/components/nav-notifications-panel";
import { NavDesktopProfile } from "@/components/nav-desktop-profile";

/**
 * Nav — sticky top navigation bar.
 *
 * State management and layout live here. Heavy UI panels are
 * each delegated to focused sub-components:
 *   - NavMobileDrawer         (hamburger slide-in)
 *   - NavNotificationsPanel   (desktop dropdown + mobile bottom sheet)
 *   - NavDesktopProfile       (desktop account dropdown)
 */
export function Nav() {
  const [searchQuery, setSearchQuery]         = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen]   = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [currentTime, setCurrentTime]         = useState<Date | null>(null);
  const [isPending, startTransition]          = useTransition();
  const router   = useRouter();
  const pathname = usePathname();

  // Close all panels on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setShowNotifications(false);
    setShowProfileMenu(false);
  }, [pathname]);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-notifications]")) setShowNotifications(false);
      if (!target.closest("[data-profile-menu]"))  setShowProfileMenu(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update time for relative timestamps when notifications are shown
  useEffect(() => {
    if (!showNotifications) return;
    setCurrentTime(new Date());
    const interval = setInterval(() => setCurrentTime(new Date()), 60_000);
    return () => clearInterval(interval);
  }, [showNotifications]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim().length === 0) return;
    const seatNo = searchQuery.trim().toUpperCase();
    const sanitizedSeat = encodeURIComponent(seatNo.replace(/[^a-zA-Z0-9-]/g, ""));
    setSearchQuery("");
    setMobileMenuOpen(false);
    setShowMobileSearch(false);
    startTransition(() => { router.push(`/student/${sanitizedSeat}`); });
  }

  const hasUnread = NOTIFICATIONS.some((n) => !n.read);

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm h-[60px] md:h-[68px] flex items-center">

        {/* ── MOBILE HEADER ──────────────────────────────────────── */}
        {showMobileSearch ? (
          <div className="md:hidden w-full flex items-center px-4 gap-3 bg-white h-full z-50">
            <form onSubmit={handleSearch} className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                autoFocus
                placeholder="Search seat number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100/80 rounded-xl text-[14px] font-medium outline-none border-2 border-transparent focus:bg-white focus:border-[#0F172A] focus:shadow-sm transition-all placeholder:text-gray-400"
              />
            </form>
            <button onClick={() => setShowMobileSearch(false)} className="text-[14px] font-medium text-[#0056D2]">
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex md:hidden items-center justify-between w-full px-4">
            <div className="flex items-center gap-3">
              <button
                aria-label="Open menu"
                className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                onClick={() => { setMobileMenuOpen(true); setShowNotifications(false); }}
              >
                <Menu className="w-[18px] h-[18px]" />
              </button>
              <Link href="/" className="flex items-center gap-2 shrink-0">
                <Image src="/ubit-logo.jpg" alt="UBIT" width={24} height={24} className="object-contain rounded-sm" />
                <span className="text-[17px] font-bold text-[#8F141B] tracking-tight leading-none">UBIT Results</span>
              </Link>
            </div>
            <div className="flex items-center gap-1">
              <button
                aria-label="Notifications"
                className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 text-gray-600 hover:text-[#0056D2] transition-colors"
                onClick={() => { setShowNotifications(true); setMobileMenuOpen(false); }}
              >
                <Bell className="w-5 h-5" />
                {hasUnread && <span className="absolute top-[8px] right-[9px] w-[9px] h-[9px] bg-[#8F141B] rounded-full border-2 border-white" />}
              </button>
              <button
                aria-label="Search"
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 text-gray-600 hover:text-[#0056D2] transition-colors"
                onClick={() => setShowMobileSearch(true)}
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* ── DESKTOP HEADER ─────────────────────────────────────── */}
        <div className="hidden md:flex mx-auto w-full max-w-[1800px] items-center justify-between px-8">

          {/* Left: Logo + nav links */}
          <div className="flex items-center gap-5 md:gap-8">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Image src="/ubit-logo.jpg" alt="UBIT" width={30} height={30} className="object-contain rounded-sm" />
              <span className="text-[17px] md:text-[20px] font-bold text-[#8F141B] tracking-tight leading-none">
                UBIT Results
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              {[
                { href: "/leaderboards", label: "Leaderboards" },
                { href: "/calculator",   label: "GPA Calculator" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`text-[13px] font-semibold transition-colors relative pb-0.5 ${
                    pathname === href
                      ? "text-[#0056D2] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#0056D2] after:rounded-full"
                      : "text-gray-600 hover:text-[#0056D2]"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Search + Bell + Profile */}
          <div className="flex items-center gap-2 md:gap-4">

            {/* Desktop search omnibar */}
            <form onSubmit={handleSearch} className="hidden md:flex relative items-center w-[260px] lg:w-[320px]">
              <Search className="absolute left-4 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search seat number..."
                className="w-full h-[40px] pl-10 pr-16 rounded-full border-2 border-transparent bg-gray-100/80 text-[13px] font-semibold outline-none text-[#1f2432] focus:bg-white focus:border-[#0F172A] transition-all hover:bg-gray-200/50 focus:shadow-[0_4px_20px_rgba(0,0,0,0.06)] placeholder:text-gray-400"
              />
              <button
                type="submit"
                disabled={isPending || searchQuery.trim().length === 0}
                className="absolute right-2 h-7 px-3.5 flex items-center justify-center bg-[#0F172A] rounded-full text-white text-[11px] font-bold tracking-wide hover:bg-[#8F141B] transition-colors cursor-pointer disabled:opacity-0 disabled:scale-95 duration-200"
              >
                Find
              </button>
            </form>

            {/* Notification bell */}
            <div className="relative" data-notifications>
              <button
                aria-label="Notifications"
                onClick={() => { setShowNotifications(!showNotifications); setMobileMenuOpen(false); }}
                className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 text-gray-600 hover:text-[#0056D2] transition-colors"
              >
                <Bell className="w-5 h-5" />
                {hasUnread && <span className="absolute top-[8px] right-[9px] w-[9px] h-[9px] bg-[#8F141B] rounded-full border-2 border-white" />}
              </button>
              <NavNotificationsPanel
                show={showNotifications}
                onClose={() => setShowNotifications(false)}
                currentTime={currentTime}
              />
            </div>

            {/* Desktop profile */}
            <div className="relative hidden md:block" data-profile-menu>
              <button
                aria-label="Profile menu"
                onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); }}
                className="flex h-9 w-9 rounded-full border border-gray-200 bg-ubit-navy text-white items-center justify-center cursor-pointer hover:opacity-90 transition shadow-sm overflow-hidden"
              >
                <div className="text-[14px] font-bold">S</div>
              </button>
              <NavDesktopProfile
                show={showProfileMenu}
                onClose={() => setShowProfileMenu(false)}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile notifications panel (rendered outside nav for z-index) */}
      {showNotifications && (
        <div className="md:hidden">
          <NavNotificationsPanel
            show={showNotifications}
            onClose={() => setShowNotifications(false)}
            currentTime={currentTime}
          />
        </div>
      )}

      {/* Mobile drawer */}
      <NavMobileDrawer open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
