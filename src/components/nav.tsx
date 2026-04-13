"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  Search, Bell, User, Menu, X, ChevronRight, 
  FileText, Medal, BarChart3, Calculator, 
  Settings, HelpCircle, LogOut, ExternalLink
} from "lucide-react";
import { useState, useEffect, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";

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
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

const [currentTime, setCurrentTime] = useState<Date | null>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setShowNotifications(false);
    setShowProfileMenu(false);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-notifications]")) setShowNotifications(false);
      if (!target.closest("[data-profile-menu]")) setShowProfileMenu(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update time for relative timestamps when notifications are shown
  useEffect(() => {
    if (showNotifications) {
      setCurrentTime(new Date());
      const interval = setInterval(() => setCurrentTime(new Date()), 60000);
      return () => clearInterval(interval);
    }
  }, [showNotifications]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim().length === 0) return;
    const seatNo = searchQuery.trim().toUpperCase();
    const sanitizedSeat = encodeURIComponent(seatNo.replace(/[^a-zA-Z0-9-]/g, ''));
    setSearchQuery("");
    setMobileMenuOpen(false);
    setShowMobileSearch(false);
    startTransition(() => {
      router.push(`/student/${sanitizedSeat}`);
    });
  }

  function formatRelativeTime(dateString: string) {
    if (!currentTime) return "";
    const date = new Date(dateString);
    const seconds = Math.floor((currentTime.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return 'yesterday';
    if (days < 30) return `${days} day${days !== 1 ? 's' : ''} ago`;
    const months = Math.floor(days / 30);
    return `${months} month${months !== 1 ? 's' : ''} ago`;
  }

  // Use the time provided in the prompt context to make it feel completely realistic
  const NOTIFICATIONS = [
    {
      id: "1",
      content: <>Admin added the result of <span className="font-bold">morning BSSE 2025</span> batch.</>,
      timestamp: "2026-04-13T22:31:00+05:00",
      read: false
    },
    {
      id: "2",
      content: <>Result for <span className="font-bold">CS sec B morning</span> semester 2 added.</>,
      timestamp: "2026-04-12T15:30:00+05:00",
      read: false
    },
    {
      id: "3",
      content: <>Result portal for <span className="font-bold">Batch 2025 Evening</span> is now live.</>,
      timestamp: "2026-04-10T08:00:00+05:00",
      read: true
    }
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm h-[60px] md:h-[68px] flex items-center">
        
        {/* ── MOBILE HEADER (Coursera Layout Style) ─────────────────────────── */}
        {showMobileSearch ? (
          <div className="md:hidden w-full flex items-center px-4 gap-3 bg-white h-full z-50">
             <form onSubmit={handleSearch} className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search seat number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-lg text-[14px] outline-none border-none focus:ring-2 focus:ring-[#0056D2]/20"
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
                {NOTIFICATIONS.some(n => !n.read) && (
                  <span className="absolute top-[8px] right-[8px] w-2.5 h-2.5 bg-[#EF4444] rounded-full border-[1.5px] border-white" />
                )}
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

        {/* ── DESKTOP HEADER ─────────────────────────────────────────── */}
        <div className="hidden md:flex mx-auto w-full max-w-[1800px] items-center justify-between px-8">

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
              <Link
                href="/leaderboards"
                className={`text-[13px] font-semibold transition-colors relative pb-0.5 ${
                  pathname === '/leaderboards'
                    ? 'text-[#0056D2] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#0056D2] after:rounded-full'
                    : 'text-gray-600 hover:text-[#0056D2]'
                }`}
              >
                Leaderboards
              </Link>
              <Link
                href="/calculator"
                className={`text-[13px] font-semibold transition-colors relative pb-0.5 ${
                  pathname === '/calculator'
                    ? 'text-[#0056D2] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#0056D2] after:rounded-full'
                    : 'text-gray-600 hover:text-[#0056D2]'
                }`}
              >
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
                aria-label="Notifications"
                onClick={() => { setShowNotifications(!showNotifications); setMobileMenuOpen(false); }}
                className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 text-gray-600 hover:text-[#0056D2] transition-colors"
              >
                <Bell className="w-5 h-5" />
                {NOTIFICATIONS.some(n => !n.read) && (
                  <span className="absolute top-[8px] right-[8px] w-2.5 h-2.5 bg-[#EF4444] rounded-full border-[1.5px] border-white" />
                )}
              </button>

              {/* Desktop Notification Panel */}
              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-40 hidden md:block" onClick={() => setShowNotifications(false)} />
                  <div className="hidden md:block absolute right-0 mt-2 w-80 bg-white border border-gray-200 shadow-2xl rounded-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                      <span className="font-bold text-[13px] text-[#1f2432]">Notifications</span>
                      <button onClick={() => setShowNotifications(false)} className="text-[11px] text-[#0056D2] font-semibold hover:underline">Mark all read</button>
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      {NOTIFICATIONS.map((n) => (
                        <div key={n.id} className="p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 cursor-pointer">
                          <div className="flex gap-3">
                            <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.read ? 'bg-gray-300' : 'bg-blue-500'}`} />
                            <div>
                              <p className="text-[13px] text-[#1f2432] font-medium leading-snug">{n.content}</p>
                              <p className="text-[11px] text-gray-400 mt-1">{formatRelativeTime(n.timestamp)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Desktop User icon & Dropdown */}
            <div className="relative hidden md:block" data-profile-menu>
              <button
                aria-label="Profile menu"
                onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); }}
                className="flex h-9 w-9 rounded-full border border-gray-200 bg-ubit-navy text-white items-center justify-center cursor-pointer hover:opacity-90 transition shadow-sm overflow-hidden"
              >
                <div className="text-[14px] font-bold">S</div>
              </button>

              {/* Profile Dropdown Card */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                  {/* Header */}
                  <Link 
                    href="/profile" 
                    onClick={() => setShowProfileMenu(false)}
                    className="block px-5 py-5 border-b border-gray-50 bg-gray-50/50 hover:bg-gray-100 transition-colors group/header"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-ubit-navy flex items-center justify-center text-white text-lg font-bold group-hover/header:scale-105 transition-transform">
                        S
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[15px] font-bold text-gray-900 leading-tight">Guest Student</span>
                        <span className="text-[12px] text-gray-500 font-medium">BSSE 2025 Morning</span>
                      </div>
                    </div>
                  </Link>

                  {/* Links Group 1: Academic */}
                  <div className="py-2">
                    <Link href="/profile" onClick={() => setShowProfileMenu(false)} className="w-full flex items-center gap-3 px-5 py-2.5 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                      <FileText className="w-4 h-4 text-gray-400" />
                      My Transcript
                    </Link>
                    <Link href="/leaderboards" onClick={() => setShowProfileMenu(false)} className="w-full flex items-center gap-3 px-5 py-2.5 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                      <Medal className="w-4 h-4 text-gray-400" />
                      Medals & Rankings
                    </Link>
                    <button className="w-full flex items-center gap-3 px-5 py-2.5 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                      <BarChart3 className="w-4 h-4 text-gray-400" />
                      Cumulative Stats
                    </button>
                  </div>

                  <div className="h-px bg-gray-100 mx-5" />

                  {/* Links Group 2: Tools */}
                  <div className="py-2">
                    <Link href="/calculator" onClick={() => setShowProfileMenu(false)} className="w-full flex items-center gap-3 px-5 py-2.5 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                      <Calculator className="w-4 h-4 text-gray-400" />
                      GPA Calculator
                    </Link>
                    <button className="w-full flex items-center gap-3 px-5 py-2.5 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                      <Settings className="w-4 h-4 text-gray-400" />
                      Portal Settings
                    </button>
                  </div>

                  <div className="h-px bg-gray-100 mx-5" />

                  {/* Links Group 3: Support */}
                  <div className="py-2">
                    <button className="w-full flex items-center gap-3 px-5 py-2.5 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                      Help Center
                    </button>
                    <button className="w-full flex items-center gap-3 px-5 py-2.5 text-[13px] font-semibold text-[#8F141B] hover:bg-red-50/50 transition-colors">
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </button>
                  </div>

                  {/* Premium CTA Footer */}
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
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ── MOBILE: Notification Bottom Sheet ──────────────────── */}
      {showNotifications && (
        <div className="md:hidden">
          <div className="fixed inset-0 bg-black/50 z-[60] animate-in fade-in" onClick={() => setShowNotifications(false)} />
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[70] flex flex-col max-h-[85vh] animate-in slide-in-from-bottom-full duration-300">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <span className="font-bold text-[20px] text-[#1f2432]">Notifications</span>
              <button onClick={() => setShowNotifications(false)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto pb-6">
              {NOTIFICATIONS.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                   <h3 className="text-lg font-bold text-gray-900 mb-2">No notifications</h3>
                   <p className="text-[14px] text-gray-500">We'll let you know when deadlines are approaching, or there is a course update</p>
                </div>
              ) : (
                NOTIFICATIONS.map((n) => (
                  <div key={n.id} className="px-5 py-4 hover:bg-gray-50 border-b border-gray-100/50 flex gap-4 cursor-pointer">
                    <div className={`mt-1.5 w-2.5 h-2.5 rounded-full shrink-0 ${n.read ? 'bg-gray-200' : 'bg-[#0056D2]'}`} />
                    <div>
                      <p className="text-[15px] font-medium text-[#1f2432] leading-snug mb-1">{n.content}</p>
                      <p className="text-[12px] text-gray-400">{formatRelativeTime(n.timestamp)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── MOBILE: Hamburger Drawer (Slide from Left) ─────────── */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="fixed inset-0 bg-black/60 z-[60] animate-in fade-in duration-300" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed top-0 left-0 bottom-0 w-[85vw] max-w-[320px] bg-white z-[70] shadow-2xl flex flex-col animate-in slide-in-from-left duration-300 ease-out">
            
            {/* Drawer Brand Header */}
            <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100 bg-white">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 shrink-0">
                  <Image src="/ubit-logo.jpg" alt="UBIT" width={28} height={28} className="object-contain rounded-sm" />
                  <span className="text-[18px] font-bold text-[#8F141B] tracking-tight leading-none">
                    UBIT Results
                  </span>
                </Link>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
                   <X className="w-6 h-6" strokeWidth={1.5} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto pb-6">
              {/* Header */}
              <Link 
                href="/profile" 
                onClick={() => setMobileMenuOpen(false)}
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

              {/* Links Group 1: Academic */}
              <div className="py-2.5">
                <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between px-6 py-3.5 text-[15px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <FileText className="w-[18px] h-[18px] text-gray-400" />
                    My Transcript
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Link>
                <Link href="/leaderboards" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between px-6 py-3.5 text-[15px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <Medal className="w-[18px] h-[18px] text-gray-400" />
                    Medals & Rankings
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Link>
                <button className="w-full flex items-center justify-between px-6 py-3.5 text-[15px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <BarChart3 className="w-[18px] h-[18px] text-gray-400" />
                    Cumulative Stats
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="h-px bg-gray-100 mx-6 my-1" />

              {/* Links Group 2: Tools */}
              <div className="py-2.5">
                <Link href="/calculator" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between px-6 py-3.5 text-[15px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
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

              {/* Links Group 3: Support */}
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

              {/* Premium CTA Footer */}
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
      )}
    </>
  );
}
